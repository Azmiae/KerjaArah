# AGENTS.md — Aturan untuk AI Agent (KerjaArah)

Proyek: KerjaArah, web pemeriksa indikasi penipuan lowongan kerja.
Stack: React + Tailwind (frontend), Python FastAPI (backend), SQLite (database), Vercel (frontend), GitHub.

Aturan ini berlaku untuk semua AI agent di IDE. Jika ragu, **berhenti dan tanya dulu**, jangan menebak.

---

## 1. Zona TERLARANG (jangan baca, ubah, atau cetak isinya)

- `.env`, `.env.*` (kecuali `.env.example`)
- `*.pem`, `*.key`, `*.p12`, `*.crt`, `*credentials*.json`, `*service-account*.json`
- Secret apa pun: secret key backend, token Vercel/GitHub, API key
- `.git/` (jangan edit langsung)
- Folder di luar root proyek ini

Aturan secret:
- Jangan menulis secret/kunci langsung di kode, komentar, log, atau dokumentasi.
- Gunakan variabel lingkungan (`process.env.*` / `import.meta.env.*`) dan perbarui hanya `.env.example` dengan nilai kosong.
- Jangan menampilkan isi variabel lingkungan di output atau terminal.

## 2. Zona HANYA-BACA (boleh dibaca, tidak boleh diubah tanpa izin eksplisit)

- `.github/workflows/`, `vercel.json`, `.vercel/`
- File database SQLite (`*.db`, `*.sqlite`, `*.sqlite3`): jangan diedit, ditimpa, atau dihapus langsung
- Folder migrasi/schema database jika ada (`migrations/`, `alembic/`, `schema.sql`): migrasi lama tidak boleh diedit
- `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`, `poetry.lock`, `uv.lock` (jangan diedit manual)
- `requirements.txt` dan `pyproject.toml` (dependency hanya diubah atas izin)
- Konfigurasi build/lint: `vite.config.*`, `tailwind.config.*`, `postcss.config.*`, `tsconfig*.json`, `eslint.config.*`, `.eslintrc*`, `.prettierrc*`
- `.gitignore`, `LICENSE`
- Dokumen proposal dan guidebook (`proposal_*.md`, `docs/`, `guidebook*`)

## 3. File yang di-generate (jangan diedit)

- `node_modules/`, `dist/`, `build/`, `.next/`, `coverage/`
- `.venv/`, `venv/`, `__pycache__/`, `.pytest_cache/`, `*.pyc`
- Output tool atau file hasil build lainnya

## 4. Area sensitif khusus KerjaArah (perlu persetujuan sebelum diubah)

- **Rule engine** (bobot poin indikator, ambang kategori skor, daftar domain resmi, aturan override Kritis): angka-angka ini dipakai di proposal dan evaluasi. Jangan ubah nilai, hapus, atau tambah indikator tanpa persetujuan. Jika menyarankan perubahan, jelaskan alasannya, jangan langsung menerapkannya.
- **Dataset uji dan label**: jangan ubah label, hapus contoh, atau memindahkan data uji ke data latih.
- **Test**: jangan menghapus, melonggarkan, atau menonaktifkan (`skip`/`only`) test agar lolos. Jika test gagal, perbaiki kode atau laporkan penyebabnya.
- **Privasi**: teks lowongan di fitur Job Scam Checker diproses di browser dan tidak boleh disimpan, dikirim ke server, dicatat di log, atau dikirim ke layanan pihak ketiga. Jangan menambah analytics atau logging yang menangkap isi input.
  - Satu-satunya pengecualian: fitur **Lapor Lowongan**, yang mengirim teks ke server hanya setelah redaksi otomatis, peninjauan, dan persetujuan eksplisit pengguna. Jangan mengumpulkan nama, email, atau pengenal perangkat pelapor.
  - Statistik anonim (opt-in) hanya boleh berisi kode indikator dan kategori skor, tanpa isi teks.
  - Dashboard hanya menampilkan data agregat. Jangan menampilkan teks laporan mentah atau nama perusahaan yang dilaporkan di halaman publik.
  - Data demo/seed harus diberi label "DATA SIMULASI". Jangan membuat statistik atau angka seolah-olah data nyata.
- Jangan menambah fitur di luar cakupan MVP (Job Scam Checker, Risk Score, Safety Checklist, Education Hub) tanpa diminta.

## 5. Perintah dan operasi yang dilarang

- Penghapusan massal: `rm -rf`, `del /s`, `Remove-Item -Recurse`, dan sejenisnya
- Git berisiko: `git push --force`, `git reset --hard`, `git clean -fd`, `git checkout .`, `git rebase` pada branch bersama
- **Jangan `git commit` atau `git push` sendiri.** Usulkan pesan commit, biar saya yang menjalankannya.
- Perintah SQL destruktif: `DROP`, `TRUNCATE`, `DELETE`/`UPDATE` tanpa `WHERE`
- Menghapus atau menimpa file database SQLite (`rm`/`del` pada `*.db`, `*.sqlite*`), termasuk membuat ulang database kosong di atas file yang ada
- Menjalankan migrasi atau perintah terhadap database/produksi (misalnya `alembic upgrade`, reset/seed ulang database, deploy) tanpa izin
- Menginstal, menghapus, atau mengganti dependency tanpa bertanya (`npm install`, `npm uninstall`, `npm update`, `pip install`, `pip uninstall`, `uv add`, `poetry add`)
- Mengunduh dan menjalankan skrip dari internet (`curl ... | sh`)

## 6. Aturan Kerja & Pedoman Karpathy (Karpathy Guidelines)

Mengadopsi prinsip kehati-hatian Andrej Karpathy untuk mengeliminasi kesalahan umum AI coding:

1. **Think Before Coding (Pikirkan Sebelum Menulis Kode)**:
   - Nyatakan asumsi secara eksplisit sebelum implementasi. Jika tidak yakin, tanyakan.
   - Jika ada beberapa opsi interpretasi, sampaikan pilihannya — jangan memilih diam-diam.
   - Jika ada pendekatan yang jauh lebih sederhana, sampaikan dan dorong kesederhanaan.
   - Bila ada instruksi yang ambigu atau membingungkan, berhenti, sebutkan bagian yang tidak jelas, dan tanyakan.
2. **Simplicity First (Utamakan Kesederhanaan)**:
   - Tulis kode minimal yang menyelesaikan masalah. Jangan membuat kode spekulatif.
   - Tidak ada fitur di luar yang diminta.
   - Tidak membuat abstraksi untuk kode yang hanya dipakai sekali.
   - Tidak menambah "fleksibilitas/konfigurasi" yang tidak diminta.
   - Tidak membuat error handling berlebihan untuk skenario yang mustahil.
   - Jika menulis 200 baris padahal bisa 50 baris, tulis ulang lebih sederhana.
   - **UI/UX BUKAN Bloat**: Keindahan antarmuka, tata letak modern, responsivitas, transisi halus, micro-interactions, dan polesan desain premium adalah kebutuhan utama kompetisi, BUKAN *over-engineering*. Efisiensi kode ditujukan untuk arsitektur/logika internal, BUKAN untuk membatasi atau mereduksi kualitas visual dan interaksi pengguna.
3. **Surgical Changes (Perubahan Bedah / Presisi)**:
   - Sentuh hanya bagian yang wajib diubah.
   - Jangan "mempercantik" kode di sekitarnya, komentar, atau format yang tidak rusak.
   - Jangan refactor hal yang berfungsi dengan baik.
   - Sesuaikan gaya kode yang sudah ada, meskipun Anda terbiasa dengan gaya berbeda.
   - Setiap baris yang diubah harus dapat dilacak langsung ke instruksi pengguna.
   - Bersihkan hanya impor/variabel yang menjadi usang akibat perubahan kita; jangan hapus *dead code* pra-eksisting kecuali diminta.
4. **Goal-Driven Execution (Eksekusi Berorientasi Target)**:
   - Ubah tugas menjadi target yang terverifikasi ("buat/jalankan tes pembuktian dulu sebelum dan sesudah perubahan").
   - Untuk tugas multitahap, rumuskan rencana singkat:
     ```
     1. [Langkah] -> verifikasi: [cek]
     2. [Langkah] -> verifikasi: [cek]
     ```
5. **Kebijakan Umum Kerja**:
   - Kerjakan hanya yang diminta. Jangan mengubah file di luar cakupan tugas.
   - Perubahan sekecil mungkin. Hindari refactor besar, pemindahan folder, atau rename massal tanpa persetujuan.
   - Sebelum mengubah banyak file, jelaskan rencana singkat dan file yang akan disentuh.
   - Jangan membuat file baru di root proyek tanpa alasan yang jelas.
   - Setelah selesai, laporkan ringkas: file yang diubah dan alasannya.
   - Jika instruksi bertentangan dengan aturan ini, ingatkan dan minta konfirmasi sebelum lanjut.
   - Jangan mengarang data, sumber, atau angka statistik (terutama untuk konten Education Hub dan dokumen proposal). Beri tanda `[perlu verifikasi]` bila tidak yakin.

## 7. Kontrol Kualitas Logika Berisiko (QC K-1 s.d. K-3 & Self-Check)

1. **Mandatory Self-Check untuk Logika Kritis**:
   - Setiap penulisan atau modifikasi logika berisiko tinggi (terutama indikator penipuan Kritis **K1–K3**, parsing regex berbobot, sanitasi input, dan redaksi data sensitif) **WAJIB** menyertakan unit test atau *assert-based self-check*.
2. **Dual-Verification Testing (True Positive vs False Positive)**:
   - *Skenario Terpicu (True Positive):* Pastikan frasa indikasi (permintaan transfer/biaya, minta OTP/kredensial, deposit pekerjaan) memicu indikator dengan tepat.
   - *Skenario Negasi (False Positive Prevention):* Pastikan frasa penegasan resmi ("tidak dipungut biaya", "tanpa biaya", "waspada penipuan OTP") **TIDAK** memicu salah deteksi.
3. **Explicit Shortcuts**:
   - Jika terpaksa mengambil jalan pintas teknis demi batas waktu MVP, wajib menuliskan komentar: `// shortcut: <batasan saat ini>, <kapan harus di-upgrade>`.
4. **Never Cut Defense & Delight**:
   - Jangan pernah memangkas validasi keamanan, penanganan error, aksesibilitas, redaksi data privasi, serta kualitas visual dan pengalaman pengguna (UI/UX yang memukau) hanya demi mengejar kode yang lebih ringkas.

## 8. Gaya kode (singkat)

- Bahasa antarmuka dan konten: Bahasa Indonesia. Nama variabel dan komentar kode: bebas, tetapi konsisten.
- Ikuti gaya dan struktur kode yang sudah ada.
- Validasi dan sanitasi semua input pengguna. Di backend gunakan model Pydantic untuk validasi request.
- Query SQLite wajib terparameter (placeholder `?` atau ORM). Dilarang menyusun SQL dengan string concatenation/f-string dari input pengguna.
- Gunakan virtual environment (`.venv`) untuk Python, dan jangan install paket ke interpreter global.

## 9. Harmonisasi & Sinergi Skills

Playbook skills yang tersedia berada di `.agent/skills/` (misal: `shadcn`, `design-mastery`, `frontend-mobile-development`, `security-audit`). Seluruh panduan navigasi cepat dan sinergi terangkum di **`.agent/skills/skills.md`** sebagai indeks utama sehingga agent tidak perlu membuka subfolder skill satu per satu.

1. **Sinergi Antar-Skill (Bukan Dogmatis):** Jangan memaksakan satu skill secara kaku jika situasi memerlukan kolaborasi beberapa keahlian. Gabungkan playbook yang memiliki keselarasan fungsional (misal: arsitektur komponen dari `shadcn`, estetika dari `design-mastery`, dan responsivitas jempol dari `frontend-mobile-development`).
2. **Pilih Sesuai Konteks Tugas:** Gunakan skill yang benar-benar relevan dengan ranah masalah yang sedang dikerjakan. Jangan memaksakan panduan yang tidak kontekstual.
3. **Sebutkan di Laporan:** Cantumkan secara ringkas skill apa saja yang bersinergi dalam pengerjaan tugas.
4. **Aturan `AGENTS.md` Tetap Menjadi Payung Utama:** Jika ada langkah skill yang berbenturan dengan batasan keamanan/privasi atau zona terlarang di file ini, prioritaskan aturan `AGENTS.md`.
5. **Alur Penambahan Skill Baru (Scan → Approval → Integrasi Terstruktur):**
   - **Tahap 1 (Audit & Pemindaian Awal):** Jika pengguna mengajukan skill atau referensi baru, agent **WAJIB** menganalisis dan memindai isinya terlebih dahulu. Periksa efektivitasnya, nilai tambah nyata, serta potensi **tumpang tindih (redundansi)** atau konflik dengan skill yang sudah ada dan batasan `AGENTS.md`.
   - **Tahap 2 (Konfirmasi & ACC Pengguna):** Laporkan hasil analisis secara objektif (kelebihan, potensi tumpang tindih, dan rekomendasi). **DILARANG** menambahkan berkas skill sebelum pengguna memberikan persetujuan eksplisit ("ACC").
   - **Tahap 3 (Integrasi Terpadu Otomatis):** Setelah di-ACC pengguna, agent langsung mengintegrasikannya ke ekosistem:
     - Membuat/mengadaptasi playbook ke `.agent/skills/<nama-skill>/SKILL.md`.
     - Mendaftarkan skill baru ke master index **`.agent/skills/skills.md`** (memperbarui Quick-Matrix, ringkasan playbook, dan protokol sinergi).

## 10. Desain Antarmuka & Harmonisasi Frontend UI/UX

Hindari keterikatan mutlak pada satu library semata. Manfaatkan keunggulan masing-masing playbook secara proporsional dan selaras:

1. **Fondasi Komponen & Token Semantik (`shadcn`)**:
   - Manfaatkan komponen teruji aksesibilitasnya (`Dialog`, `Sheet`, `Button`, `Card`, dsb.) sebagai building block yang konsisten.
   - Gunakan token semantik resmi (`bg-background`, `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-destructive`, dll.) agar tema gelap dan terang bekerja otomatis.
   - Hindari warna hex mentah (`#141820`, `#2F88F5`). Bila memerlukan komponen kustom di luar bawaan library, bangun dengan Tailwind menggunakan token semantik yang selaras.
2. **Arah Estetika & Kualitas Visual (`design-mastery`)**:
   - Eliminasi kebiasaan klise AI (tanpa glow neon mengambang, tanpa ikon *sparkles* acak, tanpa 3-card grid yang monoton).
   - Terapkan hierarki tipografi tegas (Display, Headings, Subheadings, Body, Caption) dan ritme spasi berbasis **8-point grid** (`gap-2`, `gap-4`, `gap-6`, `gap-8`).
   - Lengkapi seluruh status komponen (Default, Hover, Focus-visible, Loading Skeleton, Empty, Error).
3. **Ergonomi & Adaptabilitas Mobile-First (`frontend-mobile-development`)**:
   - Pastikan area sentuh interaktif ramah jempol dengan ukuran minimum **44 × 44px** (`min-h-11 min-w-11`).
   - Terapkan pola adaptif yang luwes (misal: modal tengah di desktop bertransformasi menjadi bottom sheet/drawer di layar ponsel).
   - Tangani dynamic viewport (`min-h-dvh`), hindari scroll horizontal liar (`overflow-x-hidden`), dan beri ruang aman (*safe-area padding*) untuk perangkat berponi/home bar.
4. **Kebersihan Kode Layout**:
   - Gunakan flexbox modern dengan `gap-*` (misal: `flex flex-col gap-4`) dan hindari utilitas usang `space-y-*` / `space-x-*` yang rawan memicu konflik margin.

---

*Catatan: file ini adalah instruksi untuk agent, bukan pengaman teknis. Perlindungan teknis tetap diatur lewat pengaturan IDE, `.gitignore`, dan branch protection di GitHub.*
