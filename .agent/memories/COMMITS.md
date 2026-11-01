# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-022] - 2026-11-01 20:15:00 WIB
- **Tipe / Scope:** `docs(readme)`: Pembuatan dan penyusunan komprehensif README.md dokumentasi repositori
- **Pesan Commit:** Menyusun README.md lengkap mencakup judul, deskripsi proyek 1-2 halaman, tech stack, panduan instalasi/eksekusi, serta penegasan status Prototype Tahap 1
- **Penulis (Author):** Antigravity Agent
- **Status:** Selesai
- **File Terdampak:**
  - `M` [README.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/README.md) (Dokumentasi utama proyek)
  - `M` [.agent/memories/COMMITS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/COMMITS.md) (Rolling log commit-022)
- **Rincian Perubahan:**
  - Menyusun judul dan tagline resmi selaras tema *Designing Digital Futures – Powering Public Transparency*.
  - Menyusun narasi latar belakang, analisis 3 modus kritis (K-1 s.d. K-3), solusi keterbukaan data, 4 pilar fitur, dan arsitektur privasi *Zero-Cloud Storage* sesuai UU PDP No. 27/2022.
  - Mendokumentasikan tabel tech stack lengkap (React 19, TypeScript, Vite, Tailwind CSS, FastAPI, SQLite3, FigCraft/Figma).
  - Memberikan panduan eksekusi repositori dua opsi (All-in-One via `npm run dev` / `node dev.js` dan cara manual terpisah per direktori).
  - Menegaskan status pengembangan: **Prototype Tahap 1 (First Draft Submission)** yang **belum melalui User-Testing dan Manual Testing formal**, disertai roadmap tahap 2.

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
