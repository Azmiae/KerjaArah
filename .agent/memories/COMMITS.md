# 📜 Commit History (Version Control Log)

Daftar seluruh riwayat perubahan proyek **KerjaArah** dicatat secara kronologis terbalik (paling baru di atas).  
> **Catatan Retensi:** Dokumen ini menerapkan sistem *rolling log* yang hanya menyimpan **maksimal 5 commit terakhir** untuk efisiensi dan keringkasan dokumen.

---

### [commit-034] - 2026-11-11 21:45:42 WIB
- **Tipe / Scope:** `style(ui)`: Penghapusan terjemahan Inggris mubazir pada judul antarmuka
- **Pesan Commit:** Hapus lima kurungan Inggris yang hanya menerjemahkan ulang judul berbahasa Indonesia
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `af5024f`)
- **File Terdampak:**
  - `M` [frontend/src/components/LaporLacak.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/LaporLacak.tsx)
  - `M` [frontend/src/components/MetodologiModal.tsx](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/components/MetodologiModal.tsx)
- **Rincian Perubahan:**
  - Menghapus (Civic Reporting), (Public Service Tracking), (Audit Trail), (Redacted), dan (Civic Disclaimer) sesuai AGENTS.md § 8 tentang bahasa antarmuka.
  - Sengaja dipertahankan: komentar kode, nama tema lomba, serta istilah teknis dan nama fitur yang menamai konsep nyata.

---

### [commit-033] - 2026-11-11 21:45:30 WIB
- **Tipe / Scope:** `fix(privacy)`: Penutupan kebocoran redaksi nomor telepon dan pengacakan kode pelacakan
- **Pesan Commit:** Tutup celah redaksi nomor telepon berpemisah, samakan urutan pola, dan ganti random dengan secrets
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `173e0b2`, diverifikasi lewat pemanggilan langsung server_redact)
- **File Terdampak:**
  - `M` [backend/main.py](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/backend/main.py)
- **Rincian Perubahan:**
  - **Kebocoran nyata:** nomor seperti 0812-9876-5432 dan 0812 9876 5432 tidak tersamarkan sama sekali dan tersimpan utuh di basis data. Pola kini menoleransi pemisah tanda hubung, titik, dan spasi.
  - Urutan pola disamakan dengan frontend menjadi NIK, telepon, lalu rekening. Keterikatan urutan ini dicatat sebagai komentar di kedua berkas sebab bug yang sama pernah muncul dua kali.
  - Kode pelacakan beralih dari `random` ke `secrets`. Panjang tetap 5 karakter agar format publik KA-2026-XXXXX tidak berubah.
  - Verifikasi memanggil `server_redact` langsung, bukan lewat endpoint, agar tidak menambah baris uji ke kerjaarah.db.

---

### [commit-032] - 2026-11-11 21:45:15 WIB
- **Tipe / Scope:** `fix(rule-engine)`: Perbaikan negasi, pola K1/K3, ambang kategori, dan redaksi nomor telepon
- **Pesan Commit:** Perbaiki empat akar masalah akurasi deteksi yang ditemukan lewat pengukuran dataset
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `b731afa`, presisi naik ke 100% tanpa false positive)
- **File Terdampak:**
  - `M` [frontend/src/lib/ruleEngine.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/ruleEngine.ts)
- **Rincian Perubahan:**
  - **Negasi dibatasi per kalimat.** Jendela lama bebas menembus batas kalimat sehingga penipu cukup menempelkan penyangkalan di kalimat pembuka. Ganti baris tunggal sengaja tidak dijadikan pembatas, sebab teks lowongan lazim membungkus kalimat ke beberapa baris.
  - **Kosakata negasi diperluas** agar frasa sah "tidak ada biaya pendaftaran" tidak lagi memicu alarm palsu.
  - **Pola K1 dan K3 menoleransi sisipan maksimal 3 kata**, sehingga frasa wajar seperti "setor uang jaminan sebesar" tertangkap.
  - **Jumlah indikator Tinggi ikut menentukan kategori.** Bobot tiap indikator tidak diubah.
  - Hasil ukur: presisi 83,3% menjadi 100%, recall 25% menjadi 30%, F1 38,5% menjadi 46,2%. Sisa 14 penipuan yang lolos disebabkan cakupan kata kunci, di luar lingkup perbaikan ini.

---

### [commit-031] - 2026-11-11 21:44:55 WIB
- **Tipe / Scope:** `test(rule-engine)`: Penambahan dataset uji 20 vs 20 dan suite Vitest
- **Pesan Commit:** Tambah dataset 40 lowongan berlabel dan suite pengujian pengukur metrik
- **Penulis (Author):** Agent
- **Status:** Selesai (commit `2452fa8`, menutup milestone "Penyiapan dataset uji")
- **File Terdampak:**
  - `+` [frontend/src/lib/__tests__/datasetLoker.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/__tests__/datasetLoker.ts)
  - `+` [frontend/src/lib/__tests__/ruleEngine.test.ts](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/src/lib/__tests__/ruleEngine.test.ts)
  - `M` [frontend/package.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/frontend/package.json) (skrip `npm test`)
- **Rincian Perubahan:**
  - Dataset berisi 40 contoh SINTETIS berlabel, dibobotkan ke kasus sulit terutama kalimat bernegasi. Setiap contoh punya kolom "jebakan" agar kesalahan klasifikasi dapat ditelusuri ke penyebabnya.
  - Lapis metrik sengaja tidak meng-assert ambang mutu apa pun supaya angka yang keluar jujur. Metrik dilaporkan dalam dua definisi, ketat dan longgar.
  - Menjawab evaluasi mentor agar pengujian rule engine diperluas ke kalimat kompleks.

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
