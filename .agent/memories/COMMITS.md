# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-024] - 2026-11-11 19:12:08 WIB
- **Tipe / Scope:** `chore(design)`: Pembaruan berkas prototipe interaktif FigCraft
- **Pesan Commit:** Perbarui berkas desain KerjaArah_FullProject_InteractiveReal.figcraft (berkas biner, 100 KB -> 145 KB)
- **Penulis (Author):** User (dicommit oleh Agent)
- **Status:** Selesai (commit `2fbaca0`)
- **File Terdampak:**
  - `M` [design/KerjaArah_FullProject_InteractiveReal.figcraft](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/design/KerjaArah_FullProject_InteractiveReal.figcraft)
- **Rincian Perubahan:**
  - Berkas biner desain sudah termodifikasi di working tree sebelum sesi agent dimulai; isi perubahan tidak dapat diverifikasi baris per baris karena format biner.
  - Dicommit terpisah dari perbaikan kode agar riwayat tetap bersih dan mudah dilacak.

---

### [commit-023] - 2026-11-11 19:12:03 WIB
- **Tipe / Scope:** `fix(rule-engine)`: Perbaikan urutan redaksi data pribadi pada client-side rule engine
- **Pesan Commit:** Pindahkan redaksi nomor HP ke atas blok rekening agar self-test QC K1-K3 kembali lolos
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `02fbe75`, tsc 0 error, self-test QC lolos, terverifikasi di UI)
- **File Terdampak:**
  - `M` [frontend/src/lib/ruleEngine.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/ruleEngine.ts) (Fungsi `redactSensitiveData` dan `runSelfTest`)
- **Rincian Perubahan:**
  - **Temuan:** self-test QC gagal di konsol dengan pesan `FAILED QC: Redaksi data pribadi gagal!`. Penyebabnya, pola redaksi nomor rekening (10-16 digit) dijalankan lebih dulu sehingga nomor HP seperti 081234567890 tertangkap sebagai nomor rekening dan label `[NO. HP DISAMARKAN]` tidak pernah muncul.
  - **Perbaikan:** blok redaksi nomor HP dipindah ke atas blok rekening, namun tetap di bawah redaksi NIK. Urutan NIK → HP → Rekening bersifat mengikat, sebab pola HP tidak berbatas kata di bagian depan sehingga dapat memotong NIK 16 digit bila dinaikkan terlalu tinggi.
  - **QC Dual-Verification (AGENTS.md § 7.2):** ditambahkan Test 6 pada `runSelfTest` sebagai guard regresi urutan, memastikan nomor rekening 13 digit dan NIK 16 digit tetap tersamarkan setelah urutan ditukar.
  - **Batasan perubahan:** bobot indikator, ambang kategori skor, dan aturan override Kritis tidak disentuh sama sekali (sesuai AGENTS.md § 4).

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
