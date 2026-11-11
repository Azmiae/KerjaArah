"""
Database layer untuk KerjaArah Backend.
Menggunakan SQLite dengan query 100% terparameter (parameterized queries)
sesuai pedoman AGENTS.md.
"""

import sqlite3
import os
from contextlib import contextmanager

DB_DIR = os.path.dirname(os.path.abspath(__file__))
# Di hosting, arahkan DATABASE_PATH ke volume persisten agar laporan tidak hilang
# setiap kali kontainer dimulai ulang. Bila kosong, tetap di folder backend
# sehingga pengembangan lokal tidak berubah sama sekali.
DB_PATH = os.getenv("DATABASE_PATH", "").strip() or os.path.join(DB_DIR, "kerjaarah.db")
os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)


@contextmanager
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


def init_db():
    """Inisialisasi tabel-tabel SQLite jika belum ada."""
    with get_db() as conn:
        cursor = conn.cursor()

        # 1. Tabel Laporan Masyarakat (Civic Reporting)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS reports (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tracking_code TEXT UNIQUE NOT NULL,
                category TEXT NOT NULL,
                channel TEXT NOT NULL,
                incident_date TEXT,
                loss_type TEXT NOT NULL,
                reported_company TEXT,
                redacted_job_text TEXT NOT NULL,
                status TEXT NOT NULL DEFAULT 'Diterima',
                rejection_reason TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )

        # 2. Tabel Riwayat Status Laporan (Public Service Tracking)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS report_status_history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                tracking_code TEXT NOT NULL,
                status TEXT NOT NULL,
                note TEXT,
                timestamp TEXT NOT NULL,
                FOREIGN KEY (tracking_code) REFERENCES reports (tracking_code)
            )
            """
        )

        # 3. Tabel Penghitung Anonim (Opt-In Data Aggregation)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS stat_counters (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                indicator_code TEXT NOT NULL,
                risk_category TEXT NOT NULL,
                created_at TEXT NOT NULL
            )
            """
        )

        # 4. Tabel Artikel Edukasi (Education Hub)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS articles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                number TEXT NOT NULL,
                title TEXT NOT NULL,
                risk_level TEXT NOT NULL,
                description TEXT NOT NULL,
                red_flags TEXT NOT NULL
            )
            """
        )

        # 5. Tabel Safety Checklist
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS checklist_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                question TEXT NOT NULL,
                weight INTEGER DEFAULT 1
            )
            """
        )

        # 6. Tabel Domain Resmi Terverifikasi (Company Verification Guide)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS official_domains (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                company_name TEXT NOT NULL,
                category TEXT NOT NULL,
                domain TEXT NOT NULL,
                career_url TEXT NOT NULL,
                verification_source TEXT NOT NULL
            )
            """
        )

        # 7. Tabel Sinkronisasi Brankas Zero-Knowledge (Seed ID Vault Sync)
        cursor.execute(
            """
            CREATE TABLE IF NOT EXISTS user_vault_sync (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                seed_hash TEXT UNIQUE NOT NULL,
                encrypted_blob TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )

        conn.commit()
