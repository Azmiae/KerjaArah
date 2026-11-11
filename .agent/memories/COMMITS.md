# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-030] - 2026-11-11 21:11:52 WIB
- **Tipe / Scope:** `feat(ui)`: Penggantian logo header aplikasi dan penambahan micro-interaction menyeluruh
- **Pesan Commit:** Ganti ikon header App.tsx dengan logo KerjaArah, jadikan blok logo sebagai tombol pulang, dan tambah micro-interaction di landing page serta tampilan aplikasi
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `71b1d2b`, tsc 0 error, jumlah warning lint tidak bertambah)
- **File Terdampak:**
  - `M` [frontend/src/App.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/App.tsx)
  - `M` [frontend/src/components/LandingPage.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LandingPage.tsx)
  - `M` [frontend/src/index.css](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/index.css)
- **Rincian Perubahan:**
  - Ikon ShieldCheck di header aplikasi diganti logo KerjaArah. Tombol "Landing Page" dihapus dan fungsinya dipindah ke blok logo yang kini menjadi tombol setinggi 44px dan dapat difokus keyboard, sebab `setCurrentView('landing')` sebelumnya hanya ada pada tombol tersebut.
  - Kartu modul landing page memakai `group`: kartu terangkat, judul berubah warna, dan panah menggeser secara serempak saat hover. Kartu simulasi dan kartu Kanban mendapat angkat halus.
  - Kartu hasil analisis masuk dengan `fade-in slide-in`, dan skor risiko menghitung naik memakai easing ease-out cubic lewat hook `useCountUp`.
  - Ditambahkan guard `prefers-reduced-motion` global di `index.css`; sebelumnya proyek tidak menanganinya sama sekali. Hook `useCountUp` mengembalikan nilai target tanpa state update saat setelan tersebut aktif agar tidak menambah warning `react(set-state-in-effect)`.
  - Catatan: kehalusan animasi hitung-naik belum terverifikasi di peramban nyata karena `requestAnimationFrame` di panel pratinjau ter-throttle sekitar 2 FPS. Logika easing diuji terpisah dan menghasilkan deret monoton yang berhenti tepat di nilai target.

---

### [commit-029] - 2026-11-11 20:35:42 WIB
- **Tipe / Scope:** `docs(agent)`: Pencatatan commit-025 sampai commit-027 pada log version control internal
- **Pesan Commit:** Catat tiga commit terbaru di COMMITS.md dan perbarui snapshot current_state.json
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `37b60fb`)
- **File Terdampak:**
  - `M` [.agent/memories/COMMITS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/COMMITS.md)
  - `M` [.agent/current_state.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/current_state.json)
- **Rincian Perubahan:**
  - Menambahkan entri commit-025, commit-026, dan commit-027, lalu memangkas commit-020 sampai commit-022 sesuai kebijakan retensi rolling 5 commit.
  - Memperbarui totalCommits dari 24 menjadi 27.
  - Setelah commit ini disepakati bahwa entri log tidak lagi dibuatkan commit `docs(agent)` tersendiri, melainkan ditumpangkan ke commit substantif berikutnya agar tidak menghasilkan commit administratif beruntun.

---

### [commit-028] - 2026-11-11 20:35:36 WIB
- **Tipe / Scope:** `style(landing)`: Penghapusan ikon gembok dan badge pada section privasi
- **Pesan Commit:** Hapus ikon gembok berlingkaran dan badge Jaminan Privasi & Zero-Cloud Architecture
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `2273007`, tsc 0 error)
- **File Terdampak:**
  - `M` [frontend/src/components/LandingPage.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LandingPage.tsx)
- **Rincian Perubahan:**
  - Section Zero-Data Collection kini langsung dibuka oleh judulnya, tanpa ikon dan badge pengantar.
  - Impor `Lock` dari lucide-react dibuang karena menjadi yatim. Impor `Badge` dipertahankan sebab masih dipakai di dua tempat lain pada berkas yang sama.

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
