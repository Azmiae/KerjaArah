# 📦 Changelog

Semua perubahan dan rilis versi utama proyek **KerjaArah** didokumentasikan dalam dokumen ini.
Format penulisan mengacu pada [Keep a Changelog](https://keepachangelog.com/id/1.0.0/) dan menganut prinsip [Semantic Versioning](https://semver.org/).

---

## [Unreleased]
### Planned
- Penyiapan dataset uji 40 loker (20 valid vs 20 fiktif) untuk verifikasi metrik F1-Score
- Finalisasi nama tim & anggota pada Bab 19 Proposal
- Pengujian end-to-end linting dan benchmarking

---

## [0.3.1-alpha] - 2026-10-28
### Added
- **14 Indikator Rule Engine Lengkap:** Pengaktifan indikator S2 (Identitas Sulit Diverifikasi), S3 (Wawancara Chat Saja), S5 (Tanpa Syarat Kualifikasi), dan S7 (Deskripsi Tidak Spesifik).
- **Integrasi API Dinamis Education Hub & Safety Checklist:** Pengambilan data artikel edukasi (termasuk Artikel 06 Prosedur Tanggap Darurat) dan checklist mandiri langsung dari endpoint backend FastAPI `/api/articles` dan `/api/checklist` dengan fallback offline andal.
- **Modal Batasan Sistem & Privasi (About):** Dokumentasi formal batasan sistem (§ 16 Proposal), komitmen privasi zero-cloud storage (§ 12 Proposal), dan transparansi civic tech.
- **Footer Komprehensif:** Navigasi cepat, disclaimer resmi, dan branding WIA 2026.
- **Filter Periode Dashboard:** Penyaringan agregasi data transparansi (7 hari, 30 hari, semua waktu).
- **Dialog Konfirmasi Penghapusan Tracker & Toast Notifikasi:** Peningkatan UX keselamatan data personal job tracker.

### Changed
- **Alur Persetujuan Redaksi Lapor:** Pengguna meninjau hasil redaksi sensor terlebih dahulu sebelum mencentang kotak persetujuan eksplisit.
- **Modernisasi Backend FastAPI:** Migrasi event startup ke pola `lifespan` async context manager modern.
- **Perbaikan Light Mode:** Layer remap CSS otomatis dan penyesuaian kontras gradien teks di mode terang.

---

## [0.3.0-alpha] - 2026-10-27
### Added
- **Dashboard Transparansi Publik:** Tampilan visual agregat tren modus penipuan, kanal penyebaran, dan tingkat kerugian dengan label transparan "DATA SIMULASI" serta tombol unduh dataset terbuka (CSV Open Data).
- **Layanan Civic Reporting & Tracking:** Formulir pelaporan loker mencurigakan dengan sensor data pribadi (NIK, HP, rekening, email) dan penerbitan kode pelacakan anonim (`KA-2026-XXXXX`).
- **Audit Trail Stepper:** Visualisasi pelacakan status laporan (Diterima -> Dalam Tinjauan -> Terverifikasi / Ditolak) beserta catatan publik moderator.
- **Transparansi Metodologi Publik:** Modal dialog interaktif yang merinci 14 indikator aturan deteksi (K1-K3, T1-T4, S1-S7), logika pembobotan skor, aturan override kritis, negation handling, dan disclaimer hukum.
- **Panduan & Direktori Verifikasi Resmi:** Langkah verifikasi taktis mandiri ke kanal resmi pemerintah (Ditjen AHU Kemenkumham, PSE Komdigi, SIAPkerja Kemnaker, OJK) dan direktori domain karir resmi korporasi/BUMN.
- **Koneksi Frontend & Backend:** Integrasi penuh antara client React dengan REST API FastAPI (`/api/stats`, `/api/reports`, `/api/domains`, `/api/stats/events`) dilengkapi fallback offline yang tangguh.

---

## [0.2.0-alpha] - 2026-10-27
### Added
- **Backend FastAPI & SQLite:** REST API berkinerja tinggi di `backend/` dengan 6 tabel SQLite, skema Pydantic, rate-limiting, dan redaksi otomatis lapis kedua.
- **Civic Reporting & Tracking:** Endpoint pelaporan (`POST /api/reports`) dan pelacakan transparan memakai kode unik tanpa login (`GET /api/reports/{kode}`).
- **Transparency Dashboard:** Endpoint statistik agregat (`GET /api/stats`) berlabel "DATA SIMULASI" dan ekspor CSV data terbuka (`GET /api/stats/export.csv`).
- **Frontend React 19 + Tailwind v4 + shadcn/ui:** Aplikasi web di `frontend/` dengan 4 tab interaktif (Scam Checker, Personal Job Tracker dengan Stage-Gate Checkpoint, Education Hub, dan Safety Checklist).
- **Client-Side Rule Engine:** 14 indikator risiko (K1–K3, T1–T4, S1–S7) dengan assertion test QC K1–K3 dan redaksi data sensitif lokal.

---

## [0.1.0-alpha] - 2026-10-23
### Added
- Dokumen rancangan konsep dan kerangka proposal resmi [proposal_konsep_kerjaarah_wia_2026.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/proposal_konsep_kerjaarah_wia_2026.md).
- Dokumen PDF pendukung [Proposal_Konsep_KerjaArah_WIA_2026.pdf](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/Proposal_Konsep_KerjaArah_WIA_2026.pdf).
- Pembentukan struktur sistem pencatatan perkembangan proyek internal mirip GitHub version control di folder `.agent/`.
- Perumusan indikator risiko deteksi (Kritis, Tinggi, Sedang), sistem pembobotan, dan mekanisme penanganan false positive.
