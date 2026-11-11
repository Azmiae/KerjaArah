# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-027] - 2026-11-11 19:57:35 WIB
- **Tipe / Scope:** `docs(agent)`: Pencatatan commit-023 dan commit-024 pada log version control internal
- **Pesan Commit:** Catat commit-023 dan commit-024 di COMMITS.md serta perbarui snapshot current_state.json
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `3d40399`)
- **File Terdampak:**
  - `M` [.agent/memories/COMMITS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/COMMITS.md)
  - `M` [.agent/current_state.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/current_state.json)
- **Rincian Perubahan:**
  - Menambahkan entri commit-023 dan commit-024, lalu memangkas commit-018 dan commit-019 sesuai kebijakan retensi rolling 5 commit.
  - Memperbarui totalCommits dari 22 menjadi 24 beserta lastCommitId, lastCommitMessage, dan lastUpdated.

---

### [commit-026] - 2026-11-11 19:57:26 WIB
- **Tipe / Scope:** `feat(landing)`: Penerapan logo baru, perampingan hero dan kartu, serta perbaikan responsif
- **Pesan Commit:** Pakai logo baru di navbar dan footer, rampingkan hero dan kartu modul, perbaiki scroll horizontal di ponsel
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `e3051d7`, tsc 0 error, terverifikasi di desktop dan viewport 375px)
- **File Terdampak:**
  - `M` [frontend/src/components/LandingPage.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LandingPage.tsx)
- **Rincian Perubahan:**
  - **Logo:** kotak teks "KA" di navbar dan footer diganti ikon logo KerjaArah, dipotong bulat lewat `rounded-full` agar sudut putih sumbernya tidak terlihat.
  - **Perampingan tampilan:** menghapus badge eyebrow "Inisiatif Keamanan Karir Digital Terpadu 2026", baris trust badge di hero, ikon dan badge MODUL 01-03 pada tiga kartu modul, serta badge status, baris tingkat risiko, dan komentar penutup pada dua kartu simulasi deteksi.
  - **Keterbacaan:** judul kartu modul diperbesar dari `text-base` ke `text-lg` dan deskripsinya dari `text-xs` ke `text-sm`. Skor dipindah sebaris dengan nama perusahaan agar tidak menggantung sendirian setelah badge-nya dihapus.
  - **Responsif:** menambahkan `flex-wrap` dan `justify-center` pada baris tombol section privasi. Sebelumnya lebarnya 438px di viewport 375px sehingga memicu scroll horizontal; setelah perbaikan scrollWidth sama dengan clientWidth dan nol elemen meluber.
  - Impor `ShieldAlert`, `Briefcase`, `BarChart3`, `CheckCircle2`, dan `AlertTriangle` diperiksa dan tetap dipertahankan karena masih dipakai di bagian lain berkas.

---

### [commit-025] - 2026-11-11 19:57:16 WIB
- **Tipe / Scope:** `chore(assets)`: Pemasangan aset logo KerjaArah dan pembersihan ikon lama
- **Pesan Commit:** Pasang logo-kerjaarah.png dan favicon.png, arahkan index.html, hapus favicon.svg dan icons.svg
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `c98f1af`, build lolos, aset ikut ter-bundle ke dist)
- **File Terdampak:**
  - `+` [frontend/public/logo-kerjaarah.png](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/public/logo-kerjaarah.png) (126x126, logo navbar dan footer)
  - `+` [frontend/public/favicon.png](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/public/favicon.png) (126x126, mask lingkaran beralfa transparan)
  - `M` [frontend/index.html](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/index.html) (Referensi ikon diarahkan ke favicon.png)
  - `-` `frontend/public/favicon.svg`, `frontend/public/icons.svg` (Tidak lagi dirujuk)
- **Rincian Perubahan:**
  - Ikon varian warna penuh dipotong dari lembar logo resmi pada koordinat x 276-398, y 653-777, hasil pemindaian terprogram atas pita ikon, bukan perkiraan manual.
  - Favicon dibuat terpisah dengan mask lingkaran beralfa transparan, sebab peramban menampilkan berkas apa adanya sehingga sudut putih bawaan sumber JPEG akan tampak sebagai kotak di tab.
  - favicon.svg dan icons.svg dihapus setelah disisir dari tiga sudut pencarian di seluruh repositori dan terbukti nol referensi.

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
