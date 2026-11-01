# KerjaArah — Platform Pemeriksa Indikasi Penipuan Lowongan Kerja & Pelacak Karir Aman

> **KerjaArah** adalah platform berbasis web yang membantu pencari kerja mendeteksi dini indikasi penipuan lowongan kerja (*job scam*) secara instan dan objektif langsung di peramban pengguna tanpa mengorbankan privasi (*Zero-Data Collection*). Platform ini juga mengawal proses pencarian kerja melalui *Personal Job Tracker* dengan pengingat keamanan otomatis di setiap tahapan rekrutmen.

---

## 🛠️ Tech Stack

- **Frontend:**
  - React 19 (TypeScript)
  - Vite
  - Tailwind CSS & Semantic Tokens (Lucide Icons, Radix UI primitives)
  - Client-Side Rule Engine (Pure TypeScript Regex & Risk Scoring)
- **Backend:**
  - Python 3.11+
  - FastAPI (REST API terstruktur & validasi Pydantic)
  - SQLite (Penyimpanan database relasional ringan & terparameter)
  - Uvicorn (ASGI Web Server)
- **Desain & Prototyping:**
  - FigCraft & Figma (Lo-Fi Wireframe & Hi-Fi Visual Design untuk Desktop 1440px dan Mobile 390px)

---

## 🚀 Cara Menjalankan Project (Quick Start)

Ikuti langkah berikut untuk meng-clone dan menjalankan KerjaArah di komputer lokal:

### 1. Clone Repository
```bash
git clone https://github.com/Azmiae/KerjaArah.git
cd KerjaArah
```

### 2. Jalankan Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Akses aplikasi melalui peramban di: `http://localhost:5173`

### 3. Jalankan Backend (FastAPI — Opsional untuk Sinkronisasi Laporan)
```bash
cd ../backend
python -m venv .venv

# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
Dokumentasi API Swagger interaktif dapat diakses di: `http://localhost:8000/docs`

---

## 📌 Progress Saat Ini (First Draft Submission — 01 November 2026)

Proyek KerjaArah saat ini telah menyelesaikan tahap prototipe interaktif dan MVP fungsional:

1. **Halaman Landing Page (Desktop & Mobile):**
   - Desain lengkap **Lo-Fi Wireframe** & **Hi-Fi Visual** (Desktop 1440px & Mobile 390px).
   - Layout *lean & thumb-friendly* di perangkat seluler dengan area sentuh minimum 44px dan ritme 8-point grid.
   - Simulasi pratinjau hasil deteksi (*product mockup*) dan alur edukasi 3 langkah.
2. **Halaman Produk Utama (Job Scam Checker):**
   - Modul deteksi pola penipuan kritis:
     - **K1:** Permintaan transfer biaya tiket pesawat/akomodasi hotel rekanan.
     - **K2:** Pencurian kode OTP / kredensial akun WhatsApp/perbankan.
     - **K3:** Skema bayar deposit tugas / *freelance commission trap*.
   - **Zero-Data Privacy:** Seluruh teks lowongan diproses 100% di memori peramban (*client-side*). Tidak ada data input pelamar yang dikirim atau disimpan ke cloud.
   - Fitur deteksi frasa negasi cerdas (*false positive prevention*) untuk klaim resmi perusahaan ("tanpa dipungut biaya apapun").
3. **Personal Job Tracker (Kanban Board):**
   - Manajemen lamaran 4 tahap (*Wishlist*, *Applied*, *Interview*, *Offering*).
   - *Stage-Gate Safety Warning* otomatis saat pengguna memindahkan kartu ke tahap wawancara untuk mengingatkan pengecekan surat panggilan.
4. **Dashboard Transparansi Publik:**
   - Visualisasi metrik agregat indikasi penipuan terlapor dan statistik tren modus kejahatan rekrutmen.

---

*Disusun untuk First Draft Submission Multimedia in Action (MIA) / Women in Action (WIA) 2026.*

