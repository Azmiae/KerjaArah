# KerjaArah — Teman Cari Kerja, Bantu Kenali Loker Palsu

> **KerjaArah** adalah platform berbasis web yang membantu pencari kerja mendeteksi dini indikasi penipuan lowongan kerja (*job scam*) secara instan dan objektif langsung di peramban pengguna tanpa mengorbankan privasi (*Zero-Data Collection*). Platform ini juga mengawal proses pencarian kerja melalui *Personal Job Tracker* dengan pengingat keamanan otomatis di setiap tahapan rekrutmen.

---

## 🛠️ Tech Stack

- **Frontend:**
  - React 19 (TypeScript 7)
  - Vite 8
  - Tailwind CSS 4 & Semantic Tokens (Lucide Icons, Radix UI primitives)
  - Client-Side Rule Engine (Pure TypeScript Regex & Risk Scoring)
- **Backend:**
  - Python 3.11+
  - FastAPI (REST API terstruktur & validasi Pydantic)
  - SQLite (Penyimpanan database relasional ringan & terparameter)
  - Uvicorn (ASGI Web Server)
- **Pengujian:**
  - Vitest (unit test rule engine & dataset uji 40 lowongan berlabel)
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

### 2. Siapkan Dependensi
```bash
npm --prefix frontend install
```

```bash
cd backend && python -m venv .venv
```

Aktifkan virtual environment, lalu pasang dependensi Python:

```bash
# Windows:
.venv\Scripts\activate
# Linux/macOS:
# source .venv/bin/activate

pip install -r requirements.txt
```

### 3. Jalankan Aplikasi

**Opsi A — sekaligus (direkomendasikan).** Dari direktori root proyek, satu perintah menyalakan frontend dan backend bersamaan:

```bash
npm run dev
```

**Opsi B — terpisah.** Jalankan di dua terminal berbeda:

```bash
npm --prefix frontend run dev
```

```bash
cd backend && python main.py
```

| Layanan | Alamat |
| --- | --- |
| Aplikasi Web | `http://localhost:5173` |
| REST API | `http://127.0.0.1:8000` |
| Dokumentasi Swagger | `http://127.0.0.1:8000/docs` |

### 4. Jalankan Pengujian

```bash
npm --prefix frontend test
```

---

## 📌 Progress Saat Ini (11 November 2026)

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
5. **Lapor & Lacak Laporan Publik:**
   - Redaksi sensor ganda: data pribadi disamarkan di peramban, lalu divalidasi ulang di server sebelum disimpan.
   - Pelaporan tanpa akun. Pelapor menerima kode pelacakan acak (`secrets`) untuk memantau status tanpa login.
   - Endpoint moderasi dilindungi kunci admin; halaman publik tidak pernah menampilkan teks laporan mentah.

---

## 🧪 Pengujian & Validasi Rule Engine

Rule engine diuji terhadap **dataset 40 lowongan sintetis berlabel** (20 asli, 20 penipuan) yang sengaja dibobotkan ke kasus sulit, terutama kalimat bernegasi seperti *"tidak dipungut biaya"*. Seluruh angka di bawah dapat direproduksi dengan `npm --prefix frontend test`.

| Metrik | Ketat | Longgar |
| --- | --- | --- |
| Presisi | 100% | 91,7% |
| Recall | 30,0% | 55,0% |
| F1-Score | 46,2% | 68,7% |

*Ketat* menghitung deteksi berhasil hanya bila kategori **Tinggi**; *longgar* juga menghitung kategori **Sedang**, yang di antarmuka tetap tampil sebagai peringatan bagi pengguna.

Pengujian juga mencakup kontrak QC K1–K3 (*dual-verification*) dan jaminan redaksi data pribadi. **Catatan jujur:** recall masih menjadi keterbatasan utama. 14 dari 20 contoh penipuan belum mencapai kategori Tinggi, dan penyebab utamanya adalah cakupan kata kunci indikator yang masih perlu diperluas. Keterbatasan ini didokumentasikan terbuka, bukan disembunyikan, sebagai dasar iterasi berikutnya.

---

*Disusun untuk First Draft Submission Multimedia in Action (MIA) / Web in Action (WIA) 2026.*

