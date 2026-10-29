"""
Seed data awal untuk database SQLite KerjaArah.
Semua data tren awal diberi label dan catatan jelas sebagai 'DATA SIMULASI'
sesuai pedoman transparansi dan aturan AGENTS.md.
"""

import os
import sys
import json
from datetime import datetime

_backend_dir = os.path.dirname(os.path.abspath(__file__))
if _backend_dir not in sys.path:
    sys.path.insert(0, _backend_dir)

try:
    from database import get_db
except ImportError:
    from backend.database import get_db

ARTICLES_DATA = [
    {
        "number": "01",
        "title": "Trik Biro Travel & Tiket Fiktif",
        "risk_level": "Kritis K1",
        "description": "Korban menerima surat panggilan wawancara mengatasnamakan korporasi besar di luar kota, namun diharuskan memesan tiket pesawat/akomodasi via agen travel tertentu dengan iming-iming penggantian uang (reimbursement).",
        "red_flags": [
            "Pengirim memakai email publik (@gmail, @yahoo) atau domain palsu",
            "Hanya diperbolehkan menghubungi biro travel yang ditunjuk",
            "Jadwal seleksi sangat mendesak (hanya 1-2 hari)",
        ],
    },
    {
        "number": "02",
        "title": "Pekerjaan Paruh Waktu Like & Subscribe (Ponzi)",
        "risk_level": "Kritis K3",
        "description": "Diberi misi harian ringan seperti like video TikTok/YouTube dengan imbalan puluhan ribu rupiah. Setelah beberapa misi, korban diarahkan masuk ke grup Telegram dan diminta deposit modal jutaan untuk membuka bonus VIP.",
        "red_flags": [
            "Tawaran masuk melalui WhatsApp/Telegram nomor tidak dikenal",
            "Ada skema deposit bertingkat sebelum penarikan uang",
            "Bukti transfer anggota grup biasanya rekayasa",
        ],
    },
    {
        "number": "03",
        "title": "Pencurian OTP & Pengambilalihan Akun",
        "risk_level": "Kritis K2",
        "description": "Pemberi kerja fiktif meminta kode OTP SMS atau PIN akun perbankan/e-wallet dengan alasan verifikasi nomor pegawai baru atau sinkronisasi kartu absensi daring.",
        "red_flags": [
            "Meminta 6 digit kode rahasia dari SMS operator",
            "Menanyakan nama gadis ibu kandung atau nomor kartu debit",
            "Mendesak dalam hitungan menit agar korban panik",
        ],
    },
    {
        "number": "04",
        "title": "Penyalahgunaan NIK KTP untuk Pinjol Ilegal",
        "risk_level": "Tinggi T1",
        "description": "Pelamar diwajibkan mengunggah foto KTP dan selfie bersama KTP di tahap seleksi berkas awal sebelum ada kejelasan profil dan lokasi fisik kantor perusahaan.",
        "red_flags": [
            "Permintaan selfie KTP di awal pendaftaran",
            "Perusahaan tidak memiliki alamat kantor fisik yang jelas",
            "Identitas pelamar dipakai membuka pinjaman online tanpa izin",
        ],
    },
    {
        "number": "05",
        "title": "Penahanan Ijazah Asli & Uang Jaminan Kerja",
        "risk_level": "Sedang S1",
        "description": "Perusahaan menahan ijazah asli pekerja dan menuntut penalti puluhan juta jika mengundurkan diri, atau mewajibkan uang tebusan seragam di hari pertama kerja.",
        "red_flags": [
            "Ijazah asli ditahan tanpa dasar perjanjian kerja bersama",
            "Denda penalti yang tidak sebanding dengan upah",
            "Ketiadaan tanda terima dan jaminan fisik dokumen",
        ],
    },
    {
        "number": "06",
        "title": "Prosedur Tanggap Darurat Jika Menjadi Korban",
        "risk_level": "Prosedur Mitigasi",
        "description": "Langkah taktis yang wajib segera dilakukan jika Anda terlanjur mentransfer uang, menyerahkan foto KTP, atau membagikan kode OTP ke pihak penipu.",
        "red_flags": [
            "Segera hubungi call center bank untuk blokir rekening/kartu tujuan transfer",
            "Ganti kata sandi & revoke active session akun email/aplikasi perbankan",
            "Laporkan rekening pelaku ke CekRekening.id dan buat aduan siber ke PatroliSiber.id",
        ],
    },
]

CHECKLIST_DATA = [
    ("Apakah nama perusahaan dan situs resminya dapat ditemukan di Google secara independen?", 1),
    ("Apakah alamat email perekrut menggunakan domain resmi korporat (@perusahaan.com), bukan email publik (@gmail)?", 1),
    ("Apakah proses rekrutmen BEBAS dari segala bentuk permintaan uang, deposit, atau pembelian tiket travel?", 2),
    ("Apakah proses seleksi (tes tertulis, wawancara) dilakukan melalui kanal resmi atau kantor fisik yang jelas?", 1),
    ("Apakah pihak perekrut TIDAK meminta foto KTP atau nomor rekening pada tahap awal pendaftaran?", 1),
    ("Apakah tawaran gaji dan deskripsi pekerjaan sesuai dengan standar kewajaran industri?", 1),
    ("Apakah lowongan ini juga tercantum di situs karir resmi atau akun LinkedIn resmi perusahaan?", 1),
]

OFFICIAL_DOMAINS_DATA = [
    ("PT Telkom Indonesia (Persero) Tbk", "BUMN Telekomunikasi", "telkom.co.id", "https://careers.telkom.co.id", "Kementerian BUMN"),
    ("PT Pertamina (Persero)", "BUMN Energi", "pertamina.com", "https://recruitment.pertamina.com", "Kementerian BUMN"),
    ("PT Bank Mandiri (Persero) Tbk", "Perbankan BUMN", "bankmandiri.co.id", "https://mandirikarier.net", "OJK & BUMN"),
    ("PT Bank Central Asia Tbk", "Perbankan Swasta", "bca.co.id", "https://karir.bca.co.id", "Otoritas Jasa Keuangan"),
    ("PT Perusahaan Listrik Negara (Persero)", "BUMN Ketenagalistrikan", "pln.co.id", "https://rekrutmen.pln.co.id", "Kementerian BUMN"),
    ("PT Kereta Api Indonesia (Persero)", "BUMN Transportasi", "kai.id", "https://recruitment.kai.id", "Kementerian BUMN"),
    ("PT Astra International Tbk", "Konglomerasi Swasta", "astra.co.id", "https://career.astra.co.id", "Bursa Efek Indonesia"),
    ("PT GoTo Gojek Tokopedia Tbk", "Teknologi Digital", "gotocompany.com", "https://careers.gotocompany.com", "Bursa Efek Indonesia"),
]

# 12 Laporan Simulasi Awal (Diberi label jelas untuk demonstrasi dashboard)
SIMULATED_REPORTS = [
    ("KA-2026-TRV01", "Tiket Travel / Akomodasi Palsu", "WhatsApp", "2026-10-21", "uang", "PT Pertamina (Dicatut)", "Undangan tes di Surabaya wajib pesan tiket di Angkasa Tour Rp 1.5jt", "Terverifikasi", None),
    ("KA-2026-TRV02", "Tiket Travel / Akomodasi Palsu", "Email", "2026-10-22", "uang", "PT PLN (Dicatut)", "Surat panggilan wawancara BUMN PLN di Balikpapan tiket via Travelindo", "Terverifikasi", None),
    ("KA-2026-TSK01", "Tugas Like & Subscribe (Ponzi)", "Telegram", "2026-10-23", "uang", "E-Commerce VIP", "Misi subscribe Youtube awal dibayar 20rb, pas topup 500rb admin kabur", "Terverifikasi", None),
    ("KA-2026-TSK02", "Tugas Like & Subscribe (Ponzi)", "WhatsApp", "2026-10-24", "uang", "Global Task Marketing", "Pekerjaan paruh waktu online nonton video modal deposit 300rb", "Terverifikasi", None),
    ("KA-2026-OTP01", "Pencurian OTP & Kredensial", "WhatsApp", "2026-10-24", "data_pribadi", "HRD Rekrutmen Digital", "Diminta kode SMS OTP dengan dalih aktivasi absensi pegawai", "Terverifikasi", None),
    ("KA-2026-KTP01", "Permintaan Data Sensitif / KTP", "Media Sosial", "2026-10-25", "data_pribadi", "Agensi Staff WFH", "Wajib kirim foto KTP bolak balik dan foto buku rekening di formulir", "Terverifikasi", None),
    ("KA-2026-IJZ01", "Penahanan Ijazah Asli", "Portal Lowongan", "2026-10-25", "tidak_ada", "Toko Ritel Jaya", "Wajib serahkan ijazah asli S1 selama masa kontrak 2 tahun", "Terverifikasi", None),
    ("KA-2026-REV01", "Tiket Travel / Akomodasi Palsu", "WhatsApp", "2026-10-26", "tidak_ada", "PT Chevron (Dicatut)", "Undangan tes wawancara via WA tiket travel", "Dalam Tinjauan", None),
    ("KA-2026-REV02", "Tugas Like & Subscribe (Ponzi)", "Telegram", "2026-10-26", "uang", "TikTok Affiliate Palsu", "Top up modal tugas like akun produk", "Dalam Tinjauan", None),
    ("KA-2026-REC01", "Pencurian OTP & Kredensial", "WhatsApp", "2026-10-27", "tidak_ada", "Admin HR", "Minta PIN OVO pelamar", "Diterima", None),
    ("KA-2026-REJ01", "Informasi Umum", "WhatsApp", "2026-10-20", "tidak_ada", "Keluarga", "Hanya pertanyaan biasa bukan lowongan fiktif", "Ditolak", "Laporan tidak mengandung unsur penipuan rekrutmen"),
]


def seed_database():
    with get_db() as conn:
        cursor = conn.cursor()

        # Seed Artikel (idempotent per artikel agar artikel baru otomatis tersinkronisasi)
        for art in ARTICLES_DATA:
            cursor.execute("SELECT id FROM articles WHERE number = ?", (art["number"],))
            if not cursor.fetchone():
                cursor.execute(
                    """
                    INSERT INTO articles (number, title, risk_level, description, red_flags)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    (art["number"], art["title"], art["risk_level"], art["description"], json.dumps(art["red_flags"])),
                )

        # Seed Checklist
        cursor.execute("SELECT COUNT(*) FROM checklist_items")
        if cursor.fetchone()[0] == 0:
            for item in CHECKLIST_DATA:
                cursor.execute(
                    """
                    INSERT INTO checklist_items (question, weight)
                    VALUES (?, ?)
                    """,
                    (item[0], item[1]),
                )

        # Seed Official Domains
        cursor.execute("SELECT COUNT(*) FROM official_domains")
        if cursor.fetchone()[0] == 0:
            for dom in OFFICIAL_DOMAINS_DATA:
                cursor.execute(
                    """
                    INSERT INTO official_domains (company_name, category, domain, career_url, verification_source)
                    VALUES (?, ?, ?, ?, ?)
                    """,
                    dom,
                )

        # Seed Laporan Awal (Simulasi Terlabel)
        cursor.execute("SELECT COUNT(*) FROM reports")
        if cursor.fetchone()[0] == 0:
            now = datetime.now().isoformat()
            for rep in SIMULATED_REPORTS:
                cursor.execute(
                    """
                    INSERT INTO reports (
                        tracking_code, category, channel, incident_date,
                        loss_type, reported_company, redacted_job_text,
                        status, rejection_reason, created_at, updated_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (rep[0], rep[1], rep[2], rep[3], rep[4], rep[5], rep[6], rep[7], rep[8], now, now),
                )
                # Tambah riwayat status
                cursor.execute(
                    """
                    INSERT INTO report_status_history (tracking_code, status, note, timestamp)
                    VALUES (?, ?, ?, ?)
                    """,
                    (rep[0], "Diterima", "Laporan masuk ke sistem", now),
                )
                if rep[7] in ("Dalam Tinjauan", "Terverifikasi", "Ditolak"):
                    cursor.execute(
                        """
                        INSERT INTO report_status_history (tracking_code, status, note, timestamp)
                        VALUES (?, ?, ?, ?)
                        """,
                        (rep[0], rep[7], f"Status diperbarui menjadi {rep[7]}", now),
                    )

            # Seed Opt-In Stat Counters
            cursor.execute("SELECT COUNT(*) FROM stat_counters")
            if cursor.fetchone()[0] == 0:
                sample_indicators = [
                    ("K1", "Tinggi"), ("K1", "Tinggi"), ("K1", "Tinggi"),
                    ("K2", "Tinggi"), ("K2", "Tinggi"),
                    ("K3", "Tinggi"), ("K3", "Tinggi"), ("K3", "Tinggi"), ("K3", "Tinggi"),
                    ("T1", "Sedang"), ("T1", "Tinggi"),
                    ("T2", "Sedang"), ("T3", "Sedang"),
                    ("S1", "Sedang"), ("S4", "Sedang"), ("S6", "Sedang")
                ]
                for ind, cat in sample_indicators:
                    cursor.execute(
                        """
                        INSERT INTO stat_counters (indicator_code, risk_category, created_at)
                        VALUES (?, ?, ?)
                        """,
                        (ind, cat, now),
                    )

        conn.commit()
    print("[Seed] Database SQLite KerjaArah berhasil diisi data awal.")


if __name__ == "__main__":
    seed_database()
