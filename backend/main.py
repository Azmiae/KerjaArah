"""
KerjaArah Backend REST API — FastAPI
Mengimplementasikan endpoint transparansi publik, pelaporan terstruktur,
pelacakan status laporan, serta penyajian konten dan statistik agregat.
Mematuhi seluruh aturan pada .agent/agents.md.
"""

import os
import sys
import re
import random
import string
import csv
import io
import json
from datetime import datetime
from typing import List, Dict, Optional
from collections import defaultdict
from contextlib import asynccontextmanager

# Pastikan folder backend ada di sys.path agar impor modul lokal (database, schemas, seed_data)
# selalu berhasil baik dijalankan dari root maupun dari dalam folder backend
_backend_dir = os.path.dirname(os.path.abspath(__file__))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

from fastapi import FastAPI, HTTPException, Header, Depends, Response, status
from fastapi.middleware.cors import CORSMiddleware

try:
    from database import get_db, init_db
    from schemas import (
        ReportCreate,
        ReportTrackingResponse,
        StatusHistoryItem,
        StatusEventCreate,
        StatsSummaryResponse,
        AdminStatusUpdate,
        ArticleResponse,
        ChecklistItemResponse,
        OfficialDomainResponse,
    )
    from seed_data import seed_database
except ImportError:
    from backend.database import get_db, init_db
    from backend.schemas import (
        ReportCreate,
        ReportTrackingResponse,
        StatusHistoryItem,
        StatusEventCreate,
        StatsSummaryResponse,
        AdminStatusUpdate,
        ArticleResponse,
        ChecklistItemResponse,
        OfficialDomainResponse,
    )
    from backend.seed_data import seed_database


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Inisialisasi DB & Seed Data saat aplikasi start
    init_db()
    seed_database()
    yield


# Inisialisasi App
app = FastAPI(
    title="KerjaArah API",
    description="Backend API Platform Transparansi dan Pemeriksaan Indikasi Penipuan Lowongan Kerja",
    version="0.3.0",
    lifespan=lifespan,
)

# Konfigurasi CORS
cors_origins_env = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173")
origins = [origin.strip() for origin in cors_origins_env.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory Rate Limiting sederhana untuk mencegah spam bot
REQUEST_COUNTS: Dict[str, list] = defaultdict(list)
RATE_LIMIT_WINDOW = 60  # detik
RATE_LIMIT_MAX = 10  # maksimal 10 request per menit


def check_rate_limit(client_id: str):
    now = datetime.now().timestamp()
    timestamps = [t for t in REQUEST_COUNTS[client_id] if now - t < RATE_LIMIT_WINDOW]
    if len(timestamps) >= RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Batas pengiriman terlampaui. Harap tunggu beberapa saat sebelum mencoba lagi.",
        )
    timestamps.append(now)
    REQUEST_COUNTS[client_id] = timestamps


# Lapisan Kedua: Redaksi Data Pribadi di Sisi Server (Server-Side Redaction)
def server_redact(text: str) -> str:
    # Sensor NIK 16 digit
    text = re.sub(r"\b[1-9]\d{15}\b", "[NIK DISAMARKAN]", text)
    # Sensor Nomor Rekening (10-16 digit)
    text = re.sub(r"\b\d{10,16}\b", "[NO. REK DISAMARKAN]", text)
    # Sensor Nomor Telepon Indonesia
    text = re.sub(r"(?:\+62|62|0)8[1-9][0-9]{7,10}\b", "[NO. HP DISAMARKAN]", text)
    # Sensor Email Pribadi
    text = re.sub(r"[a-zA-Z0-9_.+-]+@(gmail|yahoo|hotmail|outlook)\.[a-zA-Z0-9-.]+", "[EMAIL PRIBADI DISAMARKAN]", text, flags=re.IGNORECASE)
    return text


def generate_tracking_code() -> str:
    random_str = "".join(random.choices(string.ascii_uppercase + string.digits, k=5))
    return f"KA-2026-{random_str}"


# -------------------------------------------------------------
# 1. PUBLIC ENDPOINTS: KONTEN EDUKASI & CHECKLIST
# -------------------------------------------------------------
@app.get("/", tags=["General"])
def read_root():
    return {
        "app": "KerjaArah API",
        "version": "0.3.0",
        "theme": "Designing Digital Futures – Powering Public Transparency",
        "docs_url": "/docs",
    }


@app.get("/api/health", tags=["General"])
def health_check():
    return {"status": "ok", "timestamp": datetime.now().isoformat()}


@app.get("/api/articles", response_model=List[ArticleResponse], tags=["Public Content"])
def get_articles():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, number, title, risk_level, description, red_flags FROM articles ORDER BY id ASC")
        rows = cursor.fetchall()
        return [
            ArticleResponse(
                id=row["id"],
                number=row["number"],
                title=row["title"],
                risk_level=row["risk_level"],
                description=row["description"],
                red_flags=json.loads(row["red_flags"]),
            )
            for row in rows
        ]


@app.get("/api/checklist", response_model=List[ChecklistItemResponse], tags=["Public Content"])
def get_checklist():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, question, weight FROM checklist_items ORDER BY id ASC")
        rows = cursor.fetchall()
        return [ChecklistItemResponse(id=row["id"], question=row["question"], weight=row["weight"]) for row in rows]


@app.get("/api/domains", response_model=List[OfficialDomainResponse], tags=["Public Content"])
def get_official_domains():
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, company_name, category, domain, career_url, verification_source FROM official_domains ORDER BY company_name ASC")
        rows = cursor.fetchall()
        return [
            OfficialDomainResponse(
                id=row["id"],
                company_name=row["company_name"],
                category=row["category"],
                domain=row["domain"],
                career_url=row["career_url"],
                verification_source=row["verification_source"],
            )
            for row in rows
        ]


# -------------------------------------------------------------
# 2. CIVIC REPORTING & PUBLIC SERVICE TRACKING
# -------------------------------------------------------------
@app.post("/api/reports", status_code=status.HTTP_201_CREATED, tags=["Reporting"])
def submit_report(payload: ReportCreate):
    # Validasi Honeypot anti-bot
    if payload.honeypot:
        # Bot detected silently
        return {"tracking_code": "KA-2026-SPAM", "status": "Diterima", "message": "Laporan diterima."}

    # Redaksi ganda di server
    clean_text = server_redact(payload.job_text)
    tracking_code = generate_tracking_code()
    now = datetime.now().isoformat()

    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO reports (
                tracking_code, category, channel, incident_date,
                loss_type, reported_company, redacted_job_text,
                status, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                tracking_code,
                payload.category,
                payload.channel,
                payload.incident_date or now.split("T")[0],
                payload.loss_type,
                payload.reported_company or "Tidak disebutkan",
                clean_text,
                "Diterima",
                now,
                now,
            ),
        )

        cursor.execute(
            """
            INSERT INTO report_status_history (tracking_code, status, note, timestamp)
            VALUES (?, ?, ?, ?)
            """,
            (tracking_code, "Diterima", "Laporan berhasil didaftarkan ke sistem publik", now),
        )
        conn.commit()

    return {
        "tracking_code": tracking_code,
        "status": "Diterima",
        "message": "Laporan berhasil dikirim. Simpan kode pelacakan ini untuk memantau status tindak lanjut tanpa perlu login.",
    }


@app.get("/api/reports/{tracking_code}", response_model=ReportTrackingResponse, tags=["Reporting"])
def track_report(tracking_code: str):
    code = tracking_code.strip().upper()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT tracking_code, category, channel, loss_type, status,
                   rejection_reason, created_at, updated_at
            FROM reports
            WHERE tracking_code = ?
            """,
            (code,),
        )
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Kode pelacakan laporan tidak ditemukan. Pastikan format benar (contoh: KA-2026-XXXXX).")

        # Ambil riwayat status
        cursor.execute(
            """
            SELECT status, note, timestamp
            FROM report_status_history
            WHERE tracking_code = ?
            ORDER BY id ASC
            """,
            (code,),
        )
        history_rows = cursor.fetchall()
        history = [StatusHistoryItem(status=h["status"], note=h["note"], timestamp=h["timestamp"]) for h in history_rows]

        return ReportTrackingResponse(
            tracking_code=row["tracking_code"],
            status=row["status"],
            category=row["category"],
            channel=row["channel"],
            loss_type=row["loss_type"],
            created_at=row["created_at"],
            updated_at=row["updated_at"],
            rejection_reason=row["rejection_reason"],
            history=history,
        )


# -------------------------------------------------------------
# 3. TRANSPARENCY DASHBOARD & AGGREGATE STATS
# -------------------------------------------------------------
@app.post("/api/stats/events", status_code=status.HTTP_204_NO_CONTENT, tags=["Statistics"])
def record_stat_event(event: StatusEventCreate):
    """Mencatat kode indikator yang terpicu secara anonim (opt-in) tanpa isi teks."""
    now = datetime.now().isoformat()
    with get_db() as conn:
        cursor = conn.cursor()
        for code in event.indicator_codes:
            cursor.execute(
                """
                INSERT INTO stat_counters (indicator_code, risk_category, created_at)
                VALUES (?, ?, ?)
                """,
                (code.strip().upper(), event.risk_category, now),
            )
        conn.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.get("/api/stats", response_model=StatsSummaryResponse, tags=["Statistics"])
def get_aggregated_stats():
    with get_db() as conn:
        cursor = conn.cursor()

        # Total laporan
        cursor.execute("SELECT COUNT(*) FROM reports")
        total_reports = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM reports WHERE status = 'Terverifikasi'")
        verified_reports = cursor.fetchone()[0]

        cursor.execute("SELECT COUNT(*) FROM reports WHERE status IN ('Diterima', 'Dalam Tinjauan')")
        pending_reports = cursor.fetchone()[0]

        # Distribusi Modus (Hanya laporan terverifikasi)
        cursor.execute(
            """
            SELECT category, COUNT(*) as count
            FROM reports
            WHERE status = 'Terverifikasi'
            GROUP BY category
            ORDER BY count DESC
            """
        )
        modus_rows = cursor.fetchall()
        modus_distribution = {row["category"]: row["count"] for row in modus_rows}

        # Distribusi Kanal
        cursor.execute(
            """
            SELECT channel, COUNT(*) as count
            FROM reports
            WHERE status = 'Terverifikasi'
            GROUP BY channel
            ORDER BY count DESC
            """
        )
        channel_rows = cursor.fetchall()
        channel_distribution = {row["channel"]: row["count"] for row in channel_rows}

        # Distribusi Kerugian
        cursor.execute(
            """
            SELECT loss_type, COUNT(*) as count
            FROM reports
            WHERE status = 'Terverifikasi'
            GROUP BY loss_type
            """
        )
        loss_rows = cursor.fetchall()
        loss_distribution = {row["loss_type"]: row["count"] for row in loss_rows}

        # Indikator paling sering terpicu dari stat_counters
        cursor.execute(
            """
            SELECT indicator_code, COUNT(*) as count
            FROM stat_counters
            GROUP BY indicator_code
            ORDER BY count DESC
            LIMIT 5
            """
        )
        top_rows = cursor.fetchall()
        top_indicators = [{"code": row["indicator_code"], "count": row["count"]} for row in top_rows]

        return StatsSummaryResponse(
            is_simulation=True,
            simulation_label="DATA SIMULASI",
            total_reports=total_reports,
            verified_reports=verified_reports,
            pending_reports=pending_reports,
            modus_distribution=modus_distribution,
            channel_distribution=channel_distribution,
            loss_distribution=loss_distribution,
            top_indicators=top_indicators,
        )


@app.get("/api/stats/export.csv", tags=["Statistics"])
def export_stats_csv():
    """Ekspor CSV data agregat publik (tanpa data teks dan identitas)."""
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT category, channel, loss_type, COUNT(*) as total_kejadian
            FROM reports
            WHERE status = 'Terverifikasi'
            GROUP BY category, channel, loss_type
            ORDER BY total_kejadian DESC
            """
        )
        rows = cursor.fetchall()

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["status_data", "DATA SIMULASI (Versi Prototipe)"])
    writer.writerow(["kategori_modus", "kanal_penyebaran", "jenis_kerugian", "total_kejadian"])
    for r in rows:
        writer.writerow([r["category"], r["channel"], r["loss_type"], r["total_kejadian"]])

    csv_content = output.getvalue()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=kerjaarah_statistik_transparansi.csv"},
    )


# -------------------------------------------------------------
# 4. ADMIN MODERATION ENDPOINTS (TERPROTEKSI SEDERHANA)
# -------------------------------------------------------------
def verify_admin_token(x_admin_key: Optional[str] = Header(None)):
    expected_key = os.getenv("ADMIN_API_KEY", "kerjaarah-admin-demo-2026")
    if x_admin_key != expected_key:
        raise HTTPException(status_code=403, detail="Akses ditolak: API Key moderator tidak valid.")
    return True


@app.get("/api/admin/reports", tags=["Moderation"])
def list_reports_for_moderation(authorized: bool = Depends(verify_admin_token)):
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id, tracking_code, category, channel, incident_date,
                   loss_type, reported_company, status, created_at
            FROM reports
            ORDER BY id DESC
            LIMIT 50
            """
        )
        rows = cursor.fetchall()
        return [dict(row) for row in rows]


@app.patch("/api/admin/reports/{tracking_code}/status", tags=["Moderation"])
def update_report_status(tracking_code: str, payload: AdminStatusUpdate, authorized: bool = Depends(verify_admin_token)):
    code = tracking_code.strip().upper()
    now = datetime.now().isoformat()
    with get_db() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, status FROM reports WHERE tracking_code = ?", (code,))
        row = cursor.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Laporan tidak ditemukan")

        cursor.execute(
            """
            UPDATE reports
            SET status = ?, rejection_reason = ?, updated_at = ?
            WHERE tracking_code = ?
            """,
            (payload.status, payload.rejection_reason, now, code),
        )

        note_text = payload.note or f"Status diubah menjadi {payload.status} oleh moderator"
        cursor.execute(
            """
            INSERT INTO report_status_history (tracking_code, status, note, timestamp)
            VALUES (?, ?, ?, ?)
            """,
            (code, payload.status, note_text, now),
        )
        conn.commit()

    return {"message": f"Status laporan {code} berhasil diperbarui menjadi {payload.status}"}


if __name__ == "__main__":
    import uvicorn
    # Pindah ke direktori file backend agar path database dan modul konsisten
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(backend_dir)
    print("=" * 60)
    print("  Menjalankan Backend KerjaArah (FastAPI)")
    print("  URL: http://127.0.0.1:8000")
    print("  Dokumentasi Swagger API: http://127.0.0.1:8000/docs")
    print("=" * 60)
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
