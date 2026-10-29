# KerjaArah
**Platform Transparansi dan Pemeriksaan Indikasi Penipuan Lowongan Kerja Berbasis Web**  
*DOKUMEN KONSEP DAN KERANGKA PROPOSAL (REVISI 3)*  
Web In Action (WIA) | Multimedia In Action 2026  
**Tema:** *Designing Digital Futures – Powering Public Transparency*

**Tagline:** *Cari Kerja Lebih Aman, Kenali Risiko Sebelum Melamar.*

---

## 1. Ringkasan Eksekutif

KerjaArah adalah rancangan aplikasi web yang membantu pencari kerja di Indonesia mengenali indikasi penipuan pada informasi lowongan pekerjaan sekaligus menjadikan data penipuan rekrutmen lebih transparan bagi publik. Pengguna menempelkan teks lowongan dan menerima hasil pemeriksaan berbasis indikator, penjelasan risiko, checklist keamanan, serta rekomendasi verifikasi melalui kanal resmi. Pemeriksaan berjalan di browser pengguna sehingga teks lowongan tidak perlu dikirim ke server.

Selain pemeriksaan individual, KerjaArah menyediakan kanal pelaporan terstruktur dengan pelacakan status laporan, serta dashboard transparansi yang menampilkan tren modus penipuan rekrutmen dari data teragregasi dan anonim. Logika deteksi, bobot, dan metrik evaluasinya dipublikasikan secara terbuka agar dapat diperiksa dan dipercaya. KerjaArah merupakan alat bantu penilaian awal, bukan sistem yang menjamin keaslian suatu lowongan.

---

## 2. Identitas Produk

| Aspek | Deskripsi |
| :--- | :--- |
| **Nama** | KerjaArah |
| **Kategori** | Civic Tech, Employment Technology, Cybersecurity, Social Impact |
| **Pengguna utama** | Fresh graduate, mahasiswa tingkat akhir, lulusan SMA/SMK, dan pencari kerja |
| **Masalah** | Kesulitan mengenali indikasi lowongan kerja fiktif, serta minimnya data publik yang transparan mengenai modus penipuan rekrutmen |
| **Solusi** | Pemeriksaan risiko berbasis aturan yang transparan, pelaporan dan pelacakan terstruktur, serta dashboard data teragregasi |
| **Platform** | Responsive web application |

---

## 3. Latar Belakang dan Rumusan Masalah

Informasi rekrutmen tersebar melalui situs pekerjaan, media sosial, dan layanan pesan. Sebagian penipuan menyalahgunakan identitas perusahaan, meminta pembayaran, mengarahkan korban ke tautan mencurigakan, atau meminta informasi pribadi sensitif. Pencari kerja membutuhkan panduan yang cepat, mudah diakses, dan transparan untuk mengenali tanda risiko.

Dari sisi publik, informasi tentang modus yang sedang beredar umumnya tersebar dan tidak terstruktur. Pencari kerja, institusi pendidikan, dan pihak yang berkepentingan sulit melihat modus apa yang sedang meningkat, melalui kanal apa, dan bagaimana laporan ditindaklanjuti. Rekrutmen yang aman adalah bagian dari layanan publik ketenagakerjaan, sehingga transparansi data dan proses pelaporannya menjadi kebutuhan nyata.

### Rumusan Masalah
- Bagaimana mengidentifikasi indikasi penipuan dari teks lowongan?
- Bagaimana menampilkan hasil pemeriksaan yang mudah dipahami dan dapat dipercaya?
- Bagaimana mengarahkan pencari kerja untuk melakukan verifikasi mandiri melalui kanal dan sumber data publik yang resmi?
- Bagaimana mengelola laporan masyarakat secara akuntabel, dengan status yang dapat dilacak dan data yang tetap aman?
- Bagaimana mengolah laporan menjadi data teragregasi yang membantu pengambilan keputusan berbasis data?
- Bagaimana menjaga keamanan data yang dimasukkan pengguna?

---

## 4. Tujuan dan Manfaat

- Membangun website untuk memeriksa indikasi risiko rekrutmen secara cepat.
- Menyediakan alasan yang jelas di balik setiap indikator risiko dan mempublikasikan metodologinya.
- Menyediakan kanal pelaporan dengan status yang dapat dilacak sehingga prosesnya akuntabel.
- Menyajikan data teragregasi dan anonim tentang tren modus penipuan rekrutmen dalam dashboard yang mudah dipahami.
- Meningkatkan literasi keamanan digital dalam proses pencarian kerja.
- Mendorong verifikasi melalui situs, kontak, dan sumber data publik resmi sebelum pengguna membagikan data atau uang.

---

## 5. Target Pengguna

| Persona | Kebutuhan |
| :--- | :--- |
| **Fresh graduate** (ilustratif 21–24 tahun) | Memeriksa tawaran pekerjaan dari media sosial dan pesan pribadi. |
| **Lulusan SMA/SMK** (ilustratif 18–21 tahun) | Memahami prosedur rekrutmen dan tanda-tanda permintaan tidak wajar. |
| **Pencari kerja berpengalaman** (ilustratif 25–35 tahun) | Memverifikasi kanal perekrut dan kewajaran penawaran kerja. |
| **Pusat karier/institusi pendidikan** (ilustratif) | Memantau tren modus untuk bahan sosialisasi dan edukasi kepada mahasiswa/siswa. |

> *Catatan: Persona dan rentang usia di atas merupakan hipotesis awal yang perlu divalidasi lewat wawancara pengguna.*

---

## 6. Fitur Utama dan Prioritas

| Fitur | Fungsi | Tahap |
| :--- | :--- | :--- |
| **Job Scam Checker** | Input teks lowongan dan analisis indikator mencurigakan secara instan | MVP |
| **Risk Score & Breakdown** | Visualisasi skor risiko (0–100), badge kategori, dan kutipan frasa pemicu | MVP |
| **Safety Checklist** | Panduan pemeriksaan mandiri interaktif sebelum mengirimkan lamaran | MVP |
| **Education Hub** | Ensiklopedia artikel modus penipuan terkini & kuis interaktif | MVP |
| **Lapor Lowongan Mencurigakan** | Formulir pelaporan terstruktur dengan redaksi otomatis data pribadi dan kode pelacakan | MVP (versi sederhana) |
| **Lacak Laporan** | Pengecekan status laporan memakai kode pelacakan, tanpa akun | MVP (versi sederhana) |
| **Dashboard Transparansi** | Statistik agregat modus, kanal, dan tren dari laporan dan data anonim opt-in | MVP (versi sederhana) |
| **Transparansi Metodologi** | Halaman publik berisi indikator, bobot, ambang, metrik evaluasi, dan catatan perubahan aturan | MVP |
| **Panduan Verifikasi Perusahaan** | Langkah dan tautan terkurasi ke sumber data publik/kanal resmi untuk mengecek perusahaan | MVP (versi statis) |
| **Personal Job Tracker** | Papan Kanban pelacakan lamaran kerja dengan *Stage-Gate Safety Checkpoint* | MVP |
| **Community Alert** | Papan peringatan dini berdasarkan laporan terkurasi dan termoderasi | Lanjutan |
| **Integrasi Verifikasi Otomatis** | Pengecekan otomatis badan usaha ke sumber data publik melalui API (bila tersedia) | Lanjutan |

> *Catatan prioritas: bila jadwal mepet, Personal Job Tracker adalah kandidat pertama untuk diturunkan ke tahap Lanjutan, karena fitur pelaporan, pelacakan, dan dashboard lebih langsung menjawab tema transparansi publik.*

### Rincian Konten MVP

**1. Personal Job Tracker (Brankas Lamaran & Kanban Berbasis Keselamatan):**
- **4 Kolom Status Lamaran:** *Wishlist/Disimpan*, *Dilamar (Applied)*, *Wawancara (Interview)*, dan *Penawaran (Offering/Accepted)*.
- **Metadata Kartu:** Nama Perusahaan, Posisi/Jabatan, Tanggal Lamar, Kontak Rekruter, Catatan Pribadi, serta Label Risiko yang otomatis tersambung dari hasil pemeriksaan *Job Scam Checker*.
- **Stage-Gate Safety Checkpoints:** Pemicu intervensi keamanan otomatis ketika status kartu digeser:
  - *Transisi ke Kolom Interview:* Sistem menampilkan pop-up verifikasi keselamatan: "Apakah lokasi wawancara wajar?", "Apakah Anda diminta memesan tiket/hotel melalui agen travel tertentu?".
  - *Transisi ke Kolom Offering:* Sistem menampilkan checklist akhir: "Apakah ada klausul penahanan ijazah asli?", "Apakah ada permintaan uang jaminan alat kerja/seragam?".
- **Privasi Penuh (Zero-Cloud Storage):** Seluruh data riwayat lamaran dan catatan pengguna disimpan secara lokal pada peramban (`localStorage`/`IndexedDB`), memastikan informasi karier pencari kerja tidak tersimpan di server.

**2. Safety Checklist** (contoh butir, dijawab ya/tidak oleh pengguna):
- Apakah perusahaan memiliki situs atau akun resmi yang dapat diverifikasi secara independen?
- Apakah kontak perekrut menggunakan email dengan domain resmi perusahaan?
- Apakah ada permintaan uang, deposit, atau biaya dengan alasan apa pun?
- Apakah proses seleksi (wawancara, tes) dilakukan melalui kanal yang wajar dan dapat dilacak?
- Apakah pemberi kerja meminta foto KTP, selfie, atau data rekening pada tahap awal?
- Apakah gaji dan tugas sesuai dengan kewajaran posisi?
- Apakah informasi lowongan juga tercantum di kanal resmi perusahaan?

**3. Education Hub (Artikel & Modus Terkini):**
1. *Bedah Modus Undangan Interview Fiktif:* Trik biro travel palsu dan penggantian uang tiket akomodasi.
2. *Waspada Kerja Paruh Waktu "Like & Subscribe":* Skema deposit tugas terstruktur dan jeratan Ponzi modern.
3. *Tanda Bahaya Phishing Rekrutmen:* Mengenali domain tiruan (*typosquatting*) dan alamat email gratisan atas nama korporasi.
4. *Panduan Keamanan Data Pribadi:* Kapan NIK KTP, foto selfie, dan rekening bank sah diminta dalam proses kerja?
5. *Prosedur Tanggap Darurat:* Langkah taktis jika terlanjur mentransfer uang atau membagikan kredensial/OTP ke pihak penipu.

**4. Lapor Lowongan Mencurigakan & Lacak Laporan:**
- **Isian laporan:** kategori modus (pilihan), kanal penyebaran (WhatsApp, Telegram, media sosial, portal lowongan, email, lainnya), tanggal kejadian, jenis kerugian (tidak ada / data pribadi / uang), nama perusahaan yang diduga dicatut (opsional), dan teks lowongan.
- **Redaksi otomatis:** nomor telepon, NIK, nomor rekening, dan email dalam teks disamarkan sebelum dikirim. Pelapor meninjau hasil redaksi sebelum menekan kirim.
- **Persetujuan eksplisit:** kotak persetujuan yang menjelaskan data apa yang disimpan dan tujuannya. Tidak memerlukan akun, nama, maupun email pelapor.
- **Kode pelacakan:** setiap laporan menghasilkan kode acak untuk memeriksa status tanpa login.
- **Status laporan:** *Diterima* → *Dalam Tinjauan* → *Terverifikasi (masuk statistik)* atau *Ditolak (disertai alasan singkat)*.
- **Perlindungan penyalahgunaan:** pembatasan laju pengiriman (*rate limiting*), validasi isian, dan kolom jebakan (*honeypot*) untuk mengurangi laporan spam.

**5. Dashboard Transparansi:**
- **Isi:** jumlah laporan terverifikasi per periode, distribusi modus, distribusi kanal, indikator yang paling sering terpicu, dan tren mingguan.
- **Sumber data:** (a) laporan terverifikasi, dan (b) penghitung anonim yang dikirim secara *opt-in* hanya berisi kode indikator yang terpicu dan kategori skor, tanpa isi teks.
- **Prinsip penyajian:** kategori dengan jumlah laporan di bawah ambang minimum digabung menjadi "Lainnya" untuk mengurangi risiko identifikasi. Setiap grafik diberi label sumber, periode, dan catatan bahwa data berasal dari laporan pengguna, bukan statistik resmi.
- **Data terbuka:** ekspor CSV untuk data agregat (tanpa data pelapor).
- **Data demo:** pada tahap prototipe, data awal berupa data simulasi yang diberi label jelas "DATA SIMULASI" agar tidak disalahartikan sebagai data nyata.

**6. Transparansi Metodologi:** halaman publik berisi daftar indikator dan bobotnya, ambang kategori, penjelasan aturan override, hasil evaluasi pada dataset uji (precision, recall), batasan sistem, dan catatan perubahan aturan (*changelog*) per versi.

**7. Panduan Verifikasi Perusahaan (versi statis):** langkah verifikasi bertahap beserta tautan terkurasi ke sumber publik yang relevan, misalnya pengecekan badan hukum/perusahaan, perizinan berusaha, dan situs/akun resmi perusahaan. *[Daftar sumber, tautan, dan ketersediaan layanan perlu diverifikasi sebelum dicantumkan di proposal final.]*

---

## 7. Alur Pengguna (User Journeys)

KerjaArah mengakomodasi alur penggunaan yang tidak hanya bersifat sekali pakai (*transactional*), melainkan menemani pencari kerja dari evaluasi awal hingga penerimaan kerja, serta menghubungkan pengalaman individu dengan data publik yang transparan.

### 7.1 Alur Pemeriksaan Risiko (Job Scam Checker)
1. **Buka Platform:** Pengguna mengakses situs KerjaArah dan membuka fitur *Job Scam Checker*.
2. **Tempel Teks:** Pengguna menempelkan isi teks lowongan kerja (dari WhatsApp, Telegram, LinkedIn, atau media sosial) ke kotak input.
3. **Analisis Lokal di Peramban:** Rule Engine JavaScript mengeksekusi normalisasi, pemeriksaan regex berbobot, analisis negasi, dan penilaian risiko secara instan (< 1 detik) tanpa mengirim data teks ke server.
4. **Tinjau Hasil & Pemicu:** Antarmuka menyajikan skor risiko (0–100), kategori (Rendah/Sedang/Tinggi), badge warna, serta kutipan kalimat yang memicu indikator risiko secara transparan.
5. **Aksi Cepat:** Pengguna dapat mengeklik *"Simpan ke Job Tracker"*, *"Laporkan Lowongan Ini"*, atau meninjau rekomendasi langkah verifikasi.

### 7.2 Alur Pelacakan & Perlindungan Berkelanjutan (Personal Job Tracker)
1. **Simpan Lamaran:** Lamaran yang telah diperiksa disimpan ke kolom *Wishlist* atau *Dilamar* pada papan Kanban pribadi.
2. **Pergerakan Tahapan:** Saat pengguna dihubungi oleh pihak rekruter, kartu lamaran digeser menuju kolom *Wawancara (Interview)*.
3. **Aktivasi Safety Gate:** Pergerakan kartu secara otomatis memicu jendela *Stage-Gate Checkpoint* berisi peringatan modus undangan palsu (misalnya imbauan biaya travel fiktif).
4. **Evaluasi Penawaran Kerja:** Ketika kartu dipindah ke kolom *Penawaran (Offering)*, checklist penahanan dokumen dan biaya deposit muncul untuk memastikan kontrak kerja aman sebelum ditandatangani.

### 7.3 Alur Peningkatan Literasi (Education Hub)
1. Pengguna membuka modul *Education Hub* untuk membaca artikel studi kasus penipuan nyata.
2. Pengguna dapat mencoba simulasi kuis interaktif mandiri (*Interactive Safety Quiz*) di browser untuk menguji ketajaman insting mengenali modus rekrutmen fiktif.

### 7.4 Alur Pelaporan dan Pelacakan (Akuntabilitas)
1. **Mulai Laporan:** Pengguna membuka *Lapor Lowongan* (atau menekan tombol laporan dari halaman hasil, sehingga teks dan indikator terpicu terisi otomatis).
2. **Tinjau Redaksi:** Sistem menyamarkan data pribadi pada teks. Pengguna memeriksa hasilnya, melengkapi isian, dan memberi persetujuan.
3. **Kirim & Terima Kode:** Laporan tersimpan dengan status *Diterima* dan pengguna mendapat kode pelacakan.
4. **Tinjauan Moderator:** Moderator memeriksa laporan melalui halaman admin terproteksi, lalu mengubah status menjadi *Terverifikasi* atau *Ditolak* beserta alasan singkat.
5. **Lacak Status:** Pengguna memasukkan kode pada halaman *Lacak Laporan* untuk melihat status dan riwayat perubahannya.
6. **Masuk Statistik:** Laporan terverifikasi ikut dihitung dalam dashboard secara agregat dan anonim.

### 7.5 Alur Pemanfaatan Data (Dashboard Transparansi)
1. Pengguna (pencari kerja, pusat karier, atau pihak berkepentingan) membuka *Dashboard Transparansi*.
2. Pengguna memilih periode, melihat modus dan kanal yang sedang dominan, lalu membuka artikel Education Hub atau panduan verifikasi yang relevan.
3. Pengguna dapat mengunduh data agregat (CSV) untuk bahan sosialisasi atau analisis.

---

## 8. Mesin Deteksi: Aturan, Skor, dan Kategori

### 8.1 Daftar Indikator Prototipe

Indikator dikelompokkan berdasarkan tingkat keparahan. Setiap indikator yang terpicu ditampilkan bersama kutipan teks pemicunya dan alasan mengapa hal itu berisiko.

| Kode | Indikator | Tingkat | Poin |
| :--- | :--- | :--- | :---: |
| K1 | Permintaan transfer/biaya sebelum proses rekrutmen (pelatihan, seragam, administrasi, deposit) | Kritis | +35 |
| K2 | Permintaan OTP, PIN, atau kata sandi | Kritis | +35 |
| K3 | Pekerjaan berbasis tugas dengan setoran/top-up (like, subscribe, komisi) | Kritis | +30 |
| T1 | Permintaan data sensitif (foto KTP, selfie KTP, rekening) melalui kanal tidak jelas | Tinggi | +20 |
| T2 | Tautan menyerupai domain resmi atau tautan pendek mencurigakan | Tinggi | +20 |
| T3 | Gaji tidak wajar untuk posisi/level yang ditawarkan | Tinggi | +15 |
| T4 | Kontak hanya via WhatsApp/Telegram pribadi tanpa email domain perusahaan | Tinggi | +15 |
| S1 | Tekanan waktu untuk segera bertindak | Sedang | +15 |
| S2 | Identitas perusahaan sulit diverifikasi | Sedang | +15 |
| S3 | Wawancara/penerimaan hanya melalui chat | Sedang | +10 |
| S4 | Email gratisan (misalnya Gmail/Yahoo) atas nama perusahaan | Sedang | +10 |
| S5 | Tanpa syarat kualifikasi atau pengalaman apa pun | Sedang | +10 |
| S6 | Bahasa terlalu persuasif ("kerja santai, bonus besar") | Sedang | +10 |
| S7 | Deskripsi pekerjaan tidak spesifik | Sedang | +5 |

### 8.2 Logika Skor dan Kategori

- **Skor akhir** = jumlah poin indikator yang terpicu, dengan batas maksimum 100 (`min(100, total)`). Karena jumlah semua bobot melebihi 100, batas ini diperlukan agar skala tetap konsisten.
- **Kategori risiko:**

| Skor | Kategori | Warna | Pesan Utama |
| :---: | :--- | :--- | :--- |
| 0–29 | Rendah | Hijau | Belum ditemukan indikator kuat. Tetap verifikasi ke kanal resmi. |
| 30–59 | Sedang | Kuning | Ada tanda yang perlu diperiksa sebelum melamar. |
| 60–100 | Tinggi | Merah | Hindari memberi uang atau data pribadi sebelum verifikasi. |

- **Aturan override:** jika salah satu indikator Kritis (K1–K3) terpicu, kategori minimal **Tinggi** terlepas dari total skor, karena permintaan uang atau kredensial adalah sinyal yang tidak boleh "tertutup" oleh skor lain yang rendah.
- Skor rendah **bukan** jaminan lowongan aman. Bobot dan ambang kategori merupakan rancangan awal yang dikalibrasi ulang berdasarkan hasil uji pada dataset berlabel (lihat Bagian 15). Seluruh aturan, bobot, dan perubahannya dipublikasikan pada halaman *Transparansi Metodologi*.

### 8.3 Penanganan Salah Klasifikasi (False Positive/Negative)

Pendekatan rule-based dirancang agar tidak sekadar mencocokkan kata kunci:

1. **Normalisasi teks:** huruf kecil, penyeragaman spasi dan tanda baca, serta pemetaan variasi penulisan yang sering dipakai untuk menghindari deteksi (misalnya "tr4nsfer", "t r a n s f e r").
2. **Pola berkonteks:** indikator K1 hanya terpicu jika kata aksi (transfer, bayar, setor) muncul dekat dengan kata tujuan (biaya, administrasi, pelatihan, seragam, deposit) dalam jendela beberapa kata, bukan dari satu kata tunggal.
3. **Penanganan negasi:** frasa seperti "tidak dipungut biaya", "bebas biaya", "tanpa biaya", atau "tidak pernah meminta transfer" dikenali sebagai pengecualian dan tidak memicu indikator terkait.
4. **Frasa peringatan:** kalimat yang justru memperingatkan penipuan (misalnya "waspada penipuan, jangan berikan OTP") tidak dihitung sebagai permintaan OTP.
5. **Pengecekan tautan:** domain dibandingkan dengan daftar domain resmi yang dikurasi dan pola penyamaran umum (typosquatting, penambahan kata seperti "-karir" atau "-official").
6. **Evaluasi berkelanjutan:** setiap kasus salah klasifikasi dari pengujian dicatat dan dipakai memperbaiki pola, kemudian diukur ulang (precision dan recall).

---

## 9. Keamanan dan Privasi Data

| Aspek | Rancangan |
| :--- | :--- |
| **Pemeriksaan teks (Checker)** | Dijalankan di sisi klien (browser). Teks lowongan tidak dikirim ke server dan tidak disimpan. Hasil hanya ada di memori sesi dan hilang saat halaman ditutup. |
| **Job Tracker** | Data lamaran disimpan lokal di peramban pengguna, tidak dikirim ke server. |
| **Pelaporan (opt-in)** | Teks hanya dikirim ke server jika pengguna menekan kirim laporan setelah meninjau hasil redaksi dan memberi persetujuan eksplisit. Tidak ada akun, nama, atau email pelapor yang dikumpulkan. |
| **Redaksi otomatis** | Nomor telepon, NIK, nomor rekening, dan alamat email disamarkan di antarmuka hasil dan sebelum laporan dikirim. Server menerapkan redaksi ulang sebagai lapisan kedua. |
| **Data statistik anonim (opt-in)** | Hanya kode indikator yang terpicu dan kategori skor, tanpa isi teks, tanpa identitas, dan tanpa pengenal perangkat. |
| **Agregasi dan ambang minimum** | Dashboard hanya menampilkan data agregat. Kategori dengan jumlah laporan di bawah ambang minimum digabung agar individu atau kejadian tunggal tidak teridentifikasi. |
| **Perlindungan nama perusahaan** | Nama perusahaan yang dilaporkan dicatut tidak ditampilkan publik pada tahap MVP. Penayangan pada tahap lanjutan hanya setelah verifikasi moderator dan dengan label "dilaporkan dicatut", disertai mekanisme sanggahan. |
| **Keamanan layanan** | Validasi input (Pydantic), query terparameter, pembatasan laju pengiriman, autentikasi halaman admin moderasi, dan secret disimpan di variabel lingkungan. |
| **Retensi** | Laporan memiliki batas waktu penyimpanan yang ditetapkan dan dapat dihapus atas permintaan menggunakan kode pelacakan. |
| **Keselarasan regulasi** | Prinsip minimisasi data dan persetujuan disusun selaras dengan UU Pelindungan Data Pribadi (UU No. 27 Tahun 2022). Detail pasal perlu diverifikasi sebelum dicantumkan di proposal final. |
| **Peringatan pengguna** | Antarmuka mengingatkan pengguna agar tidak menempelkan data pribadi sendiri (KTP, rekening, OTP) ke kolom input. |

---

## 10. Arsitektur Sistem

### 10.1 Alur Data MVP

```
[Pengguna] -> tempel teks, kelola lamaran, lapor, lihat dashboard
     |
     v
[Frontend React + Tailwind + shadcn/ui]
  |-- Normalisasi & redaksi data pribadi
  |-- Rule Engine (JavaScript, berjalan di browser / privacy-first)
  |      -> daftar indikator terpicu + skor + kategori
  |-- Tampilan hasil + rekomendasi + checklist
  |-- Kanban Tracker (disimpan di browser localStorage)
  |-- Halaman Dashboard, Lapor, Lacak Laporan, Transparansi Metodologi
     |
     v  (REST API: konten, laporan, statistik agregat)
[Backend FastAPI (Python)]
  |-- Validasi (Pydantic) + redaksi lapis kedua + rate limiting
  |-- Endpoint moderasi (terproteksi) + agregasi statistik
     |
     v
[Database SQLite]
  |-- articles, checklist_items, official_domains   (konten)
  |-- reports, report_status_history                (laporan & riwayat status)
  |-- stat_counters                                 (penghitung agregat anonim)
```

### 10.2 Peran Komponen

| Komponen | Peran pada MVP | Peran pada Tahap Lanjutan |
| :--- | :--- | :--- |
| **Frontend (React + Tailwind + shadcn/ui)** | Antarmuka responsif, Kanban Tracker, visualisasi skor, formulir laporan, pelacakan laporan, dashboard | Community Alert dan dashboard lanjutan |
| **Rule Engine (JS)** | Analisis teks sepenuhnya di sisi peramban untuk kecepatan dan jaminan privasi data | Modul validasi teks laporan di sisi server |
| **Backend (Python + FastAPI)** | REST API konten, penerimaan dan pelacakan laporan, moderasi, agregasi statistik, ekspor CSV agregat | Integrasi verifikasi otomatis ke sumber data publik, peringatan komunitas |
| **Database (SQLite)** | Basis data relasional *lightweight* dan *self-contained* untuk konten, laporan, riwayat status, dan penghitung agregat | Log audit dan, bila beban meningkat, migrasi ke PostgreSQL |

### 10.3 Daftar Endpoint Utama (rancangan)

| Endpoint | Fungsi | Akses |
| :--- | :--- | :--- |
| `GET /api/articles`, `GET /api/checklist`, `GET /api/domains` | Konten edukasi, checklist, dan daftar domain resmi | Publik |
| `POST /api/reports` | Kirim laporan (mengembalikan kode pelacakan) | Publik, dibatasi laju |
| `GET /api/reports/{kode}` | Status dan riwayat laporan | Publik dengan kode |
| `POST /api/stats/events` | Penghitung anonim indikator terpicu (opt-in) | Publik, dibatasi laju |
| `GET /api/stats`, `GET /api/stats/export.csv` | Data agregat dashboard dan ekspor | Publik |
| `GET/PATCH /api/admin/reports...` | Tinjauan dan perubahan status laporan | Admin (terautentikasi) |

Pemisahan ini menjawab pertanyaan "mengapa perlu backend jika deteksi rule-based": pemeriksaan teks sensitif tetap dieksekusi lokal di peramban, sedangkan backend dan basis data dibutuhkan untuk fungsi yang memang bersifat publik dan bersama, yaitu pengelolaan laporan, pelacakan status, moderasi, dan agregasi statistik.

---

## 11. Analisis Solusi Serupa dan Diferensiasi

| Alternatif yang Ada | Kelebihan | Keterbatasan | Posisi KerjaArah |
| :--- | :--- | :--- | :--- |
| Pencarian manual (mesin pencari, forum, media sosial) | Fleksibel, tanpa biaya | Memerlukan waktu dan pengetahuan, hasil tidak terstruktur | Memberi pemeriksaan terstruktur dalam hitungan detik |
| Kanal aduan/pelaporan resmi | Berwenang menindaklanjuti | Bersifat reaktif (setelah ada korban), tidak membantu penilaian sebelum melamar, pelapor sering tidak melihat kelanjutan | Bersifat preventif, mengarahkan ke kanal resmi, dan menyediakan pelacakan status serta data agregat yang terbuka |
| Fitur pelaporan pada portal lowongan | Terintegrasi dengan platform | Terbatas pada lowongan di portal tersebut, alasan keputusan dan data jarang dibuka | Memeriksa teks dari kanal apa pun, termasuk media sosial dan pesan pribadi |
| Chatbot AI umum | Fleksibel dan interaktif | Jawaban tidak konsisten, logika tidak transparan, data masuk ke layanan pihak ketiga | Aturan transparan, konsisten, dan diproses lokal |

**Diferensiasi utama:** pemeriksaan lintas kanal, alasan skor yang dapat ditelusuri, metodologi yang dipublikasikan, pelaporan dengan status yang dapat dilacak, dan data tren agregat yang terbuka.

---

## 12. Keunggulan Konsep

- **Fokus Pemeriksaan Multi-Kanal:** Fokus pada evaluasi informasi lowongan dari berbagai kanal, bukan membuat portal lowongan baru.
- **Transparansi Logika Deteksi:** Menjelaskan alasan di balik skor risiko, dan mempublikasikan indikator, bobot, serta metrik evaluasinya.
- **Akuntabilitas Proses:** Laporan memiliki status dan riwayat yang dapat dilacak pelapor tanpa akun.
- **Data untuk Keputusan:** Dashboard agregat membantu pencari kerja, pusat karier, dan pihak berkepentingan memahami tren modus.
- **Koneksi Edukasi & Aksi:** Menghubungkan hasil analisis langsung dengan tindakan verifikasi dan edukasi yang relevan.
- **Privasi sejak Rancangan:** Pemrosesan teks di sisi klien, pengiriman data hanya atas persetujuan, dan agregasi dengan ambang minimum.
- **Kemudahan Demonstrasi:** Mudah didemonstrasikan dalam berbagai skenario lowongan kerja yang berbeda.

---

## 13. Sitemap dan Desain Antarmuka

- **Halaman yang Direncanakan:** Home, Job Scam Checker, Risk Result, Safety Checklist, Job Tracker, Education Hub, Lapor Lowongan, Lacak Laporan, Dashboard Transparansi, Panduan Verifikasi Perusahaan, Transparansi Metodologi, dan About (memuat batasan sistem dan kebijakan privasi). Halaman Admin Moderasi bersifat terproteksi dan tidak tampil di navigasi publik.
- **Pendekatan Desain:** Pendekatan *mobile-first*, navigasi ringkas, serta skema warna dominan biru/ungu.
- **Indikator Visual:** Warna hijau, kuning, dan merah digunakan secara terbatas sebagai petunjuk visual tingkat risiko. Tingkat risiko juga ditampilkan dengan label teks dan ikon agar dapat dipahami pengguna dengan keterbatasan penglihatan warna.
- **Halaman Hasil:** menampilkan skor, kategori, daftar indikator terpicu beserta kutipan teks pemicunya, langkah verifikasi yang disarankan, tautan ke Safety Checklist, dan tombol laporan.
- **Dashboard:** grafik sederhana (batang/garis) dengan judul yang menyatakan temuan utama, label sumber dan periode, serta tabel alternatif untuk pembaca layar.
- **Aksesibilitas:** kontras warna memadai, ukuran teks yang dapat dibaca di layar kecil, dan bahasa yang sederhana.

---

## 14. Rekomendasi Teknologi

| Komponen | Pilihan |
| :--- | :--- |
| **Frontend** | React (Vite / Next.js) + Tailwind CSS + shadcn/ui, pustaka grafik ringan untuk dashboard |
| **Backend** | Python (FastAPI) |
| **Database** | SQLite (ringan, self-contained, bebas konfigurasi cloud rumit) |
| **Mesin Deteksi** | JavaScript rule-based (berjalan di sisi klien / privacy-first) |
| **Hosting & Deployment** | Vercel (Frontend) dan Railway / Render / Local Demo (Backend FastAPI) |
| **Kolaborasi & Version Control** | GitHub |

*Pilihan FastAPI (Python) memberikan performa asinkron yang sangat cepat, dokumentasi OpenAPI/Swagger otomatis bawaan, serta kemudahan integrasi jika di masa depan sistem ingin ditingkatkan dengan modul NLP. Basis data SQLite memastikan aplikasi dapat berjalan secara mandiri (*self-contained*), portabel saat pengujian dan demonstrasi juri tanpa dependensi koneksi cloud pihak ketiga, serta hemat sumber daya.*

*Catatan SQLite: karena backend kini menerima laporan, file database memerlukan penyimpanan yang persisten (misalnya volume pada platform hosting) dan pencadangan berkala. Platform serverless tidak cocok untuk SQLite yang dapat ditulis.*

---

## 15. Metode Pengembangan dan Pengujian

- **Empathize & Define:** Wawancara 5–10 pencari kerja serta identifikasi kebutuhan spesifik mereka.
- **Ideate & Prototype:** Pembuatan *user flow*, *wireframe*, desain antarmuka, dan penyusunan daftar aturan deteksi.
- **Develop:** Pembangunan pemeriksa teks, modul hasil skor, checklist keamanan, konten edukasi, alur pelaporan dan pelacakan, serta dashboard.
- **Test & Improve:** Pengujian menggunakan lowongan kerja riil (normal vs mencurigakan), evaluasi kesalahan klasifikasi (*false positive/negative*), pengujian alur pelaporan dan moderasi, dan perbaikan UX.

### Dataset Uji Deteksi

| Aspek | Rancangan |
| :--- | :--- |
| **Komposisi (target)** | Minimal 40 teks lowongan: sekitar 20 normal dan 20 mencurigakan |
| **Sumber lowongan normal** | Lowongan dari situs resmi perusahaan atau portal kerja terpercaya |
| **Sumber lowongan mencurigakan** | Contoh dari pemberitaan, edukasi, dan laporan publik, dengan data pribadi dihapus |
| **Pelabelan** | Dilabeli minimal dua anggota tim secara independen, selisih label dibahas bersama |
| **Metrik** | Precision, recall, dan jumlah kasus salah klasifikasi per indikator |
| **Pemisahan data** | Sebagian contoh dipakai merancang aturan, sebagian dipisahkan khusus untuk pengujian agar hasil tidak bias |

### Target Pengujian Prototipe

| Indikator Pengujian | Target Rancangan |
| :--- | :--- |
| Pengguna uji coba | 10 orang |
| Skenario fungsi | Minimal 20 skenario (termasuk kirim laporan, lacak status, moderasi, dan tampilan dashboard) |
| Keberhasilan penyelesaian alur | Minimal 90% |
| Waktu respons input teks sederhana | Maksimal 5 detik |
| Kepuasan pengguna | Minimal 4 / 5 |
| Recall pada kategori Kritis | Ditetapkan setelah uji awal pada dataset uji |
| Efektivitas redaksi data pribadi | Seluruh pola uji (telepon, NIK, rekening, email) tersamarkan pada pengujian |
| Konsistensi dashboard | Angka dashboard sesuai dengan data laporan terverifikasi pada pengujian |

*Target tersebut merupakan sasaran pengembangan, bukan hasil uji yang telah dicapai. Akurasi deteksi perlu dilaporkan berbasis dataset uji yang terdefinisi dengan jelas.*

---

## 16. Batasan Sistem

- KerjaArah adalah alat bantu penilaian awal dan tidak menyatakan suatu lowongan pasti asli atau pasti palsu.
- Skor rendah bukan jaminan keamanan. Penipu dapat menyusun teks yang tidak memicu aturan.
- Sistem hanya membaca teks yang ditempelkan. Gambar/poster lowongan, tangkapan layar, dan konten dalam bentuk file belum didukung (pembacaan gambar dengan OCR menjadi opsi pengembangan lanjutan).
- Aturan berfokus pada bahasa Indonesia dan sebagian istilah bahasa Inggris. Dialek, singkatan, atau teks campuran dapat menurunkan akurasi.
- Sistem tidak memverifikasi keberadaan perusahaan secara langsung. Verifikasi dilakukan pengguna melalui kanal resmi berdasarkan panduan.
- Dashboard menggambarkan laporan yang masuk ke KerjaArah dan tidak mewakili statistik resmi maupun tingkat kejadian penipuan secara nasional. Angka dapat bias karena hanya pengguna tertentu yang melapor.
- Pada tahap prototipe, data dashboard berupa data simulasi yang diberi label jelas.
- KerjaArah bukan lembaga penegak hukum dan tidak menjanjikan tindak lanjut hukum atas laporan. Pengguna diarahkan ke kanal pelaporan resmi.
- Bobot dan ambang kategori merupakan rancangan awal dan dapat berubah setelah pengujian.

---

## 17. Dampak dan Keberlanjutan

### Dampak yang Dituju

| Pihak | Dampak |
| :--- | :--- |
| **Pencari kerja** | Lebih waspada, lebih cepat mengenali tanda risiko, dan terbiasa memverifikasi sebelum memberi data atau uang |
| **Institusi pendidikan** | Alat bantu literasi digital dan sumber data tren modus untuk sosialisasi kepada lulusan yang bersiap masuk dunia kerja |
| **Perusahaan dan platform** | Berkurangnya penyalahgunaan nama perusahaan dan kepercayaan yang lebih baik pada proses rekrutmen |
| **Masyarakat dan pemangku kepentingan** | Akses ke data agregat yang transparan tentang modus penipuan rekrutmen sebagai dasar edukasi dan pengambilan keputusan |

### Cara Mengukur Dampak (rancangan)

| Indikator | Cara Ukur |
| :--- | :--- |
| **Peningkatan literasi & insting keamanan** | Evaluasi skor kuis interaktif mandiri (*client-side Interactive Safety Quiz*) sebelum dan setelah membaca studi kasus di Education Hub (skor dihitung lokal tanpa mengoleksi data pribadi) |
| **Penerapan verifikasi mandiri** | Rasio penyelesaian butir *Safety Checklist* dan pemenuhan *Stage-Gate Checkpoints* saat pengguna memindahkan kartu lamaran di papan Kanban |
| **Kualitas & ketajaman deteksi** | Pengukuran nilai *Precision*, *Recall*, dan *F1-Score* terhadap dataset uji benchmark (40 teks lowongan: 20 valid vs 20 fiktif) |
| **Akuntabilitas pelaporan** | Persentase laporan yang memiliki status akhir dan rata-rata waktu dari *Diterima* hingga status akhir |
| **Pemanfaatan data transparansi** | Jumlah kunjungan dashboard dan unduhan data agregat (data agregat anonim) |
| **Tingkat retensi & keterikatan pengguna** | Jumlah kartu lamaran aktif yang dikelola pengguna pada *Personal Job Tracker* (tercatat di penyimpanan lokal peramban) |

### Rencana Pengembangan dan Keberlanjutan

1. **Tahap 1 (MVP Kompetisi):** Job Scam Checker, Risk Score & Breakdown, Safety Checklist, Education Hub, Lapor dan Lacak Laporan, Dashboard Transparansi, Transparansi Metodologi, Panduan Verifikasi (statis), dan Personal Job Tracker.
2. **Tahap 2:** Community Alert berbasis laporan terkurasi dan integrasi verifikasi otomatis ke sumber data publik resmi (bila tersedia akses yang sah).
3. **Tahap 3:** Modul pembacaan poster/gambar loker via OCR, perluasan aturan deteksi berbasis laporan, dan kolaborasi data dengan pihak resmi.
4. **Keberlanjutan & Efisiensi:** Kolaborasi dengan pusat karier universitas (CDC), SMK, dan komunitas pencari kerja untuk sosialisasi, validasi modul edukasi, dan moderasi laporan. Arsitektur *client-side rule engine* menjaga biaya operasional server tetap rendah, sehingga platform dapat bertahan mandiri dengan hosting tier gratis/terjangkau. *(Model moderasi jangka panjang dan sumber pembiayaan perlu dirumuskan lebih lanjut.)*

---

## 18. Rencana Waktu Kompetisi

| Tanggal | Kegiatan |
| :--- | :--- |
| **19–22 Oktober 2026** | Riset, perumusan masalah, user flow |
| **23–26 Oktober** | Desain UI/UX dan frontend |
| **27–31 Oktober** | Backend, integrasi, pengujian awal |
| **1 November** | Target internal pengumpulan first draft |
| **3–7 November** | Evaluasi dan feedback mentor |
| **8–10 November** | Revisi dan pengujian |
| **11 November** | Final submission |

> *Catatan: Guidebook memuat perbedaan tanggal first draft antara 1 dan 2 November. Tetapkan 1 November sebagai target internal dan lakukan konfirmasi tanggal resmi kepada panitia.*

---

## 19. Pembagian Peran Tim

| Peran | Tanggung Jawab Utama | Nama |
| :--- | :--- | :--- |
| **Project Lead & Penulis Proposal** | Koordinasi, jadwal, penyusunan dokumen, komunikasi dengan panitia/mentor | [isi nama] |
| **UI/UX Designer** | User flow, wireframe, desain antarmuka, aksesibilitas, desain dashboard | [isi nama] |
| **Frontend Developer** | Implementasi antarmuka, halaman hasil, dashboard, integrasi rule engine | [isi nama] |
| **Developer Rule Engine & Backend** | Aturan deteksi, skor, API laporan/statistik, basis data, moderasi | [isi nama] |
| **Konten & QA** | Konten edukasi, checklist, dataset uji, pengujian pengguna | [isi nama] |

*Sesuaikan dengan jumlah anggota tim. Satu orang dapat memegang lebih dari satu peran.*

---

## 20. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
| :--- | :--- | :--- |
| Jadwal padat (19 Okt – 11 Nov) dan cakupan MVP bertambah | MVP tidak selesai | Kunci cakupan MVP, turunkan Personal Job Tracker ke Lanjutan bila perlu, tinjau progres tiap 2–3 hari |
| Dataset uji kecil atau tidak representatif | Hasil evaluasi kurang kuat | Kumpulkan contoh dari beragam sumber, jelaskan keterbatasan secara jujur di proposal |
| Salah klasifikasi tinggi | Pengguna kehilangan kepercayaan | Negasi/konteks pada aturan, tampilkan alasan, siapkan pesan batasan sistem |
| Perbedaan tema dengan studi kasus panitia | Skor kesesuaian tema turun | Petakan fitur ke tema dan subtema resmi (Bagian 22) dan konfirmasi ke panitia |
| Pengguna menempelkan data pribadi sendiri | Risiko privasi | Peringatan di antarmuka, redaksi otomatis berlapis, tanpa penyimpanan teks pada Checker |
| Laporan spam atau palsu | Dashboard menyesatkan | Rate limiting, honeypot, moderasi sebelum masuk statistik, label sumber data |
| Pencemaran nama baik perusahaan yang dicatut | Risiko hukum dan reputasi | Nama perusahaan tidak ditampilkan publik pada MVP, penayangan lanjutan hanya setelah verifikasi dan dengan mekanisme sanggahan |
| Beban moderasi | Laporan menumpuk | Batasi cakupan MVP, tampilkan estimasi waktu tinjauan, siapkan kolaborasi pusat karier |
| Data dashboard demo dikira data nyata | Informasi menyesatkan | Label "DATA SIMULASI" yang jelas, dokumentasikan sumber dan metode data |
| SQLite pada hosting tanpa penyimpanan persisten | Data laporan hilang | Gunakan volume persisten, backup berkala, siapkan jalur migrasi ke PostgreSQL |
| Perbedaan tanggal first draft pada guidebook | Salah jadwal | Gunakan 1 November sebagai target internal dan konfirmasi ke panitia |

---

## 21. Struktur Proposal Final (Maksimal 30 Halaman)

| Bagian | Estimasi Halaman |
| :--- | :---: |
| Cover dan Ringkasan Eksekutif | 2 |
| BAB I. Pendahuluan (termasuk keterkaitan dengan tema) | 4 |
| BAB II. Analisis Permasalahan (termasuk analisis solusi serupa) | 5 |
| BAB III. Konsep Solusi (termasuk pemetaan tema dan subtema) | 5 |
| BAB IV. Perancangan Sistem (aturan deteksi, arsitektur, privasi) | 6 |
| BAB V. Implementasi dan Pengujian (termasuk batasan sistem) | 4 |
| BAB VI. Dampak dan Pengembangan | 2 |
| Penutup dan Referensi | 2 |

---

## 22. Dasar Penilaian dan Pemetaan Tema

Berdasarkan Guidebook WIA 2026 (hlm. 18–19), kriteria penilaian babak penyisihan mencakup:
- **Orisinalitas ide dan konsep:** 20%
- **Fungsionalitas website:** 25%
- **Desain dan estetika:** 20%
- **Konten dan informasi:** 20%
- **Kesesuaian tema dan subtema:** 15%

### Pemetaan Kriteria ke Bagian Dokumen

| Kriteria | Bagian yang Menjawab |
| :--- | :--- |
| Orisinalitas ide dan konsep | Bagian 11 (diferensiasi), Bagian 12 (keunggulan), Bagian 9 (privasi sejak rancangan) |
| Fungsionalitas website | Bagian 6–8 (fitur, alur, mesin deteksi), Bagian 10 (arsitektur dan API), Bagian 15 (pengujian) |
| Desain dan estetika | Bagian 13 (sitemap, antarmuka, aksesibilitas) |
| Konten dan informasi | Konten Education Hub, Safety Checklist, dan Dashboard (Bagian 6), referensi terverifikasi (Bagian 23) |
| Kesesuaian tema dan subtema | Tabel pemetaan di bawah |

### Pemetaan Tema Resmi

**Tema:** *Designing Digital Futures – Powering Public Transparency.* Tema ini meminta peserta merancang website yang mengubah data dan layanan publik menjadi transparan, mudah diakses, dan dapat dipercaya, serta tidak hanya menyajikan informasi visual tetapi juga mengolah, mengintegrasikan, dan menyajikan data secara fungsional untuk mendorong akuntabilitas publik dan pengambilan keputusan berbasis data.

| Unsur Tema | Wujud di KerjaArah |
| :--- | :--- |
| Transparan | Halaman Transparansi Metodologi (indikator, bobot, metrik, changelog), alasan skor yang ditampilkan per indikator |
| Mudah diakses | Mobile-first, bahasa sederhana, tanpa akun, aksesibilitas warna dan grafik |
| Dapat dipercaya | Redaksi data pribadi, privasi sejak rancangan, label sumber data, batasan sistem yang dinyatakan terbuka |
| Mengolah data | Rule engine mengolah teks menjadi skor dan indikator; backend mengagregasi laporan |
| Mengintegrasikan data | Integrasi tautan dan panduan verifikasi ke sumber publik resmi; integrasi hasil Checker ke Tracker dan laporan |
| Menyajikan data fungsional | Dashboard Transparansi dengan filter dan ekspor CSV agregat |
| Akuntabilitas publik | Pelaporan terstruktur dengan status yang dapat dilacak dan alasan penolakan |
| Keputusan berbasis data | Dashboard tren modus dan kanal untuk pencari kerja dan pusat karier |

### Pemetaan Subtema

| Subtema | Tingkat Kesesuaian | Fitur KerjaArah yang Menjawab |
| :--- | :--- | :--- |
| **Civic Reporting & Accountability** | Utama | Lapor Lowongan Mencurigakan, verifikasi dan moderasi, tindak lanjut berupa status laporan dan arahan ke kanal resmi, partisipasi warga dalam pengawasan publik |
| **Data-Driven Decision Support** | Pendukung | Dashboard Transparansi: tren modus, kanal, dan indikator, dengan ekspor data agregat |
| **Public Service Tracking** | Pendukung | Lacak Laporan dengan kode, status bertahap, dan riwayat perubahan yang transparan bagi pelapor |
| **Open Government Data** | Terbatas | Rujukan ke sumber data publik resmi pada Panduan Verifikasi dan konteks dashboard. Belum menarik data pemerintah secara real-time pada MVP |

*[Konfirmasi ke guidebook/panitia: apakah peserta wajib memilih satu subtema atau boleh menggabungkan lebih dari satu. Bila harus satu, ajukan Civic Reporting & Accountability.]*

*Website harus disesuaikan dengan studi kasus atau tema resmi dari panitia. Konsep KerjaArah tetap perlu diselaraskan dengan arahan dan ketentuan tersebut.*

---

## 23. Referensi dan Kebutuhan Verifikasi Data

- **Sumber Utama:** Guidebook Web In Action, Multimedia In Action 2026, halaman 2, 10–19.
- **Data Pendukung:** Data mengenai tren lowongan fiktif dan ketenagakerjaan perlu dikutip dari rilis resmi Kementerian Komunikasi dan Digital (Komdigi) serta Badan Pusat Statistik (BPS) setelah tautan, tanggal terbit, dan definisinya diverifikasi. Hindari menyebut angka penipuan sebagai jumlah korban tanpa rujukan data yang valid.
- **Rujukan Lanjutan:**
  - Situs resmi Kementerian Komunikasi dan Digital ([komdigi.go.id](https://www.komdigi.go.id))
  - Badan Pusat Statistik ([bps.go.id](https://www.bps.go.id))

---

## 24. Rekomendasi Akhir

1. **Fokuskan MVP:** Prioritaskan Job Scam Checker, Risk Score, Safety Checklist, Education Hub, serta fitur transparansi publik (Lapor dan Lacak Laporan, Dashboard Transparansi, Transparansi Metodologi).
2. **Siapkan Skenario Demo:** Siapkan minimal 3 variasi skenario uji:
   - Lowongan normal/valid
   - Lowongan mencurigakan yang meminta pembayaran/transfer
   - Lowongan penipuan yang meminta OTP/kredensial akun
3. **Kekuatan Proposal:** Lengkapi proposal dengan hasil validasi pengguna, penjelasan transparansi indikator aturan deteksi, serta batasan sistem yang jujur agar solusi kuat secara teknis maupun dampak sosial.