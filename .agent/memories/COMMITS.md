# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-015] - 2026-10-28 23:25:00 WIB
- **Tipe / Scope:** `feat(integration)`: Integrasi penuh Frontend-Backend dan penyelesaian seluruh temuan audit
- **Pesan Commit:** Menyelesaikan 10 poin rekomendasi audit: 14 indikator rule engine, API fetch Education Hub & Safety Checklist, About modal batasan sistem, flow consent redaksi, filter periode dashboard, konfirmasi hapus tracker, dan modernisasi backend lifespan
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Frontend Build Lolos 100%, Backend 8 Endpoint Teruji Sukses)
- **File Terdampak:**
  - `M` [frontend/src/lib/ruleEngine.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/ruleEngine.ts) (Lengkap 14 indikator: K1-K3, T1-T4, S1-S7)
  - `M` [frontend/src/index.css](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/index.css) (Light mode auto-remap CSS layer)
  - `+` [frontend/src/components/AboutModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/AboutModal.tsx) (Modal batasan sistem § 16, privasi, dan misi WIA 2026)
  - `M` [frontend/src/components/LaporLacak.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LaporLacak.tsx) (Alur consent: review sensor terlebih dahulu baru centang persetujuan)
  - `M` [frontend/src/components/DashboardTransparansi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/DashboardTransparansi.tsx) (Filter periode 7 hari / 30 hari / semua)
  - `M` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx) (Fetch API artikel & checklist, dialog konfirmasi delete, toast feedback, kuis 5 soal, footer)
  - `M` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py) (Migrasi startup event ke FastAPI lifespan async manager)
  - `M` [backend/seed_data.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/seed_data.py) (Artikel 06 Prosedur Tanggap Darurat & seeding idempoten)
  - `M` [.agent/current_state.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/current_state.json)
- **Rincian Perubahan:**
  - Menyelesaikan seluruh 10 poin temuan audit komprehensif.
  - Memastikan seluruh endpoint backend FastAPI dan antarmuka React terhubung secara serasi dengan fallback andal.

---

### [commit-014] - 2026-10-27 20:45:00 WIB
- **Tipe / Scope:** `feat(frontend)`: Integrasi penuh Dashboard Transparansi, Lapor & Lacak Laporan, Direktori Verifikasi Resmi, dan Modal Metodologi
- **Pesan Commit:** Mengintegrasikan Dashboard Transparansi, Civic Reporting & Tracking, Direktori Domain Resmi, dan Modal Metodologi 14 Indikator ke Frontend React
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Teruji Browser, Build Lolos 100%, Terhubung ke Backend API)
- **File Terdampak:**
  - `+` [frontend/src/lib/api.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/api.ts) (Typed API client ke backend FastAPI + fallback offline)
  - `+` [frontend/src/components/DashboardTransparansi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/DashboardTransparansi.tsx) (Dashboard agregat tren modus, kanal, dampak kerugian, & tombol unduh CSV Open Data)
  - `+` [frontend/src/components/LaporLacak.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LaporLacak.tsx) (Formulir lapor dengan preview redaksi sensor & pencarian status pelacakan dengan Audit Trail Stepper)
  - `+` [frontend/src/components/PanduanVerifikasi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/PanduanVerifikasi.tsx) (4 langkah taktis verifikasi, kanal publik resmi AHU/PSE/Kemnaker/OJK, & direktori domain terverifikasi)
  - `+` [frontend/src/components/MetodologiModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/MetodologiModal.tsx) (Penjelasan transparan 14 indikator K1-K3, T1-T4, S1-S7, formula skor, override kritis, & disclaimer hukum)
  - `M` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx) (Navigasi 6 tab, tombol "Laporkan ke Publik" dari hasil scan, tombol header Transparansi Metodologi, & pengiriman opt-in stats)
  - `M` [.agent/current_state.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/current_state.json)
  - `M` [.agent/milestones.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/milestones.md)
  - `M` [.agent/memories/CHANGELOG.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/CHANGELOG.md)
- **Rincian Perubahan:**
  - Menghubungkan Frontend React dengan Backend FastAPI pada port 8000.
  - Membangun `DashboardTransparansi` dengan visualisasi breakdown modus, kanal sebaran, tingkat kerugian, badge "DATA SIMULASI", dan tombol direct download `export.csv`.
  - Mengimplementasikan `LaporLacak` dengan dialog preview redaksi sensor otomatis sebelum pengiriman dan visual audit timeline stepper status laporan (Diterima -> Dalam Tinjauan -> Terverifikasi / Ditolak) berbasis tracking code.
  - Mengimplementasikan `PanduanVerifikasi` berisi langkah verifikasi mandiri ke sumber data resmi Republik Indonesia (AHU, PSE, KarirHub, OJK) dan direktori pencarian domain asli perusahaan.
  - Mempublikasikan rincian metodologi deteksi melalui `MetodologiModal`.
  - Memverifikasi interaksi browser secara komprehensif menggunakan subagent browser.
  - Menerapkan rolling 5 commits (commit-009 dipangkas).

---

### [commit-013] - 2026-10-27 19:35:00 WIB
- **Tipe / Scope:** `feat(backend)`: Setup Backend FastAPI, SQLite, dan endpoint pelaporan & dashboard transparansi
- **Pesan Commit:** Membangun backend FastAPI di `backend/` dengan SQLite, model Pydantic, rate limiting, dan seed data simulasi
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Server Aktif di Port 8000 & Teruji 100%)
- **File Terdampak:**
  - `+` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py) (FastAPI app, endpoint reporting, tracking, stats CSV, & moderation)
  - `+` [backend/database.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/database.py) (SQLite schema & connection manager dengan parameterized queries)
  - `+` [backend/schemas.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/schemas.py) (Pydantic validation models)
  - `+` [backend/seed_data.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/seed_data.py) (Data awal artikel, checklist, official domains, & laporan simulasi)
  - `+` [backend/requirements.txt](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/requirements.txt) & [backend/.env.example](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/.env.example)

---

### [commit-021] - 2026-10-29 11:13:00 WIB
- **Tipe / Scope:** `fix(workspace)`: Full scan dan perbaikan menyeluruh masalah modul hilang dan error TypeScript di VS Code
- **Pesan Commit:** Konfigurasi root tsconfig & vscode settings, isolasi file contoh skill shadcn, dan perbaiki impor modul backend di root
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (0 error)
- **File Terdampak:**
  - `+` [tsconfig.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/tsconfig.json) (Root TypeScript project config, exclude .agent & backend)
  - `+` [.agent/tsconfig.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/tsconfig.json) (Isolasi contoh .tsx shadcn dari Language Server)
  - `+` [.agent/skills/shadcn/examples/tsconfig.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/skills/shadcn/examples/tsconfig.json)
  - `M` [.vscode/settings.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.vscode/settings.json) (Atur interpreter python .venv dan tsdk frontend)
  - `M` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py) (Perbaiki sys.path dan fallback import dari root)
  - `M` [backend/seed_data.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/seed_data.py)

---

### [commit-020] - 2026-10-29 10:56:00 WIB
- **Tipe / Scope:** `chore(dx)`: Satukan skrip runner menjadi satu berkas `run.bat`
- **Pesan Commit:** Satukan seluruh skrip peluncur menjadi satu file `run.bat` terintegrasi dengan menu interaktif dan dukungan argumen CLI
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai
- **File Terdampak:**
  - `+` [run.bat](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/run.bat) (All-in-one launcher untuk backend dan frontend)
  - `-` `run_backend.bat`, `run_frontend.bat`, `run_all.bat` (Dihapus agar root bersih)

---

### [commit-019] - 2026-10-29 10:53:00 WIB
- **Tipe / Scope:** `dx(backend)`: Simplifikasi cara menjalankan backend dan frontend
- **Pesan Commit:** Tambahkan runner otomatis di `backend/main.py` dan skrip satu klik `run_backend.bat`, `run_frontend.bat`, serta `run_all.bat`
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Teruji)
- **File Terdampak:**
  - `M` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py) (Menambahkan entrypoint `__main__` uvicorn runner)
  - `+` [run_backend.bat](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/run_backend.bat) (Runner backend satu klik otomatis memakai `.venv`)
  - `+` [run_frontend.bat](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/run_frontend.bat) (Runner frontend satu klik bebas error execution policy)
  - `+` [run_all.bat](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/run_all.bat) (Runner backend + frontend sekaligus)

---

### [commit-018] - 2026-10-29 02:38:00 WIB
- **Tipe / Scope:** `refactor(ui)`: Penghapusan teks dan badge WIA di seluruh antarmuka aplikasi
- **Pesan Commit:** Hapus badge WIA 2026 pada header utama, modal About, banner transparansi, footer, dan metadata
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Build lolos 100%, 0 error)
- **File Terdampak:**
  - `M` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx) (Hapus badge WIA di samping logo header dan footer)
  - `M` [frontend/src/components/AboutModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/AboutModal.tsx) (Hapus badge dan label WIA)
  - `M` [frontend/src/components/DashboardTransparansi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/DashboardTransparansi.tsx) (Ubah badge menjadi Public Transparency)
  - `M` [frontend/index.html](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/index.html)
  - `M` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py)

---

### [commit-017] - 2026-10-29 02:18:00 WIB
- **Tipe / Scope:** `refactor(ui)`: Kepatuhan Penuh Skill shadcn dan Aturan UI Non-Neon Tanpa Hardcoded Hex
- **Pesan Commit:** Refactor menyeluruh frontend ke semantic design system shadcn, eliminasi 100% hardcoded hex color & neon glow, pembersihan UI primitives (`button`, `badge`, `card`, `input`, `textarea`), dan pembaruan komponen modal & dashboard
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Build lolos 100%, 0 error)
- **File Terdampak:**
  - `M` [.agent/AGENTS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/AGENTS.md) (Penambahan Aturan Tetap Bagian 9 Kepatuhan Skill shadcn)
  - `M` [frontend/src/index.css](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/index.css) (CSS semantic tokens `:root` dan `.dark`)
  - `M` [frontend/src/components/ui/button.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/button.tsx)
  - `M` [frontend/src/components/ui/badge.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/badge.tsx)
  - `M` [frontend/src/components/ui/card.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/card.tsx)
  - `M` [frontend/src/components/ui/input.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/input.tsx)
  - `M` [frontend/src/components/ui/textarea.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/textarea.tsx)
  - `M` [frontend/src/components/ui/tabs.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/tabs.tsx)
  - `M` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx)
  - `M` [frontend/src/components/AboutModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/AboutModal.tsx)
  - `M` [frontend/src/components/MetodologiModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/MetodologiModal.tsx)
  - `M` [frontend/src/components/DashboardTransparansi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/DashboardTransparansi.tsx)
  - `M` [frontend/src/components/LaporLacak.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LaporLacak.tsx)
  - `M` [frontend/src/components/PanduanVerifikasi.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/PanduanVerifikasi.tsx)

---

### [commit-012] - 2026-10-27 19:12:00 WIB
- **Tipe / Scope:** `feat(frontend)`: Inisialisasi basis aplikasi web React + Vite + Tailwind v4 + shadcn/ui dan implementasi fitur MVP
- **Pesan Commit:** Inisialisasi basis proyek frontend di `frontend/`, implementasi Rule Engine K1-K3, Scam Checker, Kanban Tracker, dan Education Hub
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai (Terverifikasi Browser & Build 100% Lolos)
- **File Terdampak:**
  - `+` [frontend/src/lib/ruleEngine.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/ruleEngine.ts) (Rule Engine 14 indikator + QC K1-K3 self-check)
  - `+` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx) (Scam Checker, Kanban 4 kolom, Stage-Gate modal, Quiz, Checklist)
  - `+` [frontend/components.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/components.json) & [frontend/src/components/ui/](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/ui/)

---

### [commit-011] - 2026-10-27 18:32:00 WIB
- **Tipe / Scope:** `docs(proposal)`: Integrasi Personal Job Tracker, alur pengguna multi-journey, dan artikel konkret Education Hub
- **Pesan Commit:** Memperbarui Bab 6, 7, dan 17 proposal dengan fitur Kanban Tracker, Stage-Gate Checkpoint, dan kurasi artikel
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai
- **File Terdampak:**
  - `M` [proposal_konsep_kerjaarah_wia_2026.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/proposal_konsep_kerjaarah_wia_2026.md)
