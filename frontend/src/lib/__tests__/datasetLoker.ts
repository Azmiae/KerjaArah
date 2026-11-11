/**
 * DATA SIMULASI — Dataset Uji Rule Engine KerjaArah
 *
 * Seluruh teks di bawah adalah contoh SINTETIS yang disusun khusus untuk pengujian,
 * BUKAN lowongan kerja nyata dan bukan hasil pengumpulan data lapangan. Nama instansi
 * dipakai semata sebagai konteks agar kalimatnya terasa wajar; tidak ada klaim bahwa
 * lowongan ini pernah diterbitkan oleh pihak mana pun.
 *
 * Komposisi: 20 loker asli dan 20 loker penipuan, sengaja dibobotkan ke KASUS SULIT
 * untuk menguji penanganan negasi — titik yang disorot pada evaluasi mentor.
 *
 * Kolom `jebakan` menjelaskan mengapa sebuah contoh dianggap sulit, sehingga hasil
 * false positive / false negative bisa ditelusuri sampai ke penyebabnya.
 */

export interface ContohLoker {
  id: string
  label: 'asli' | 'penipuan'
  jebakan: string
  teks: string
}

/** 20 lowongan ASLI — banyak di antaranya memuat frasa yang rawan memicu false positive. */
export const LOKER_ASLI: ContohLoker[] = [
  {
    id: 'A01',
    label: 'asli',
    jebakan: 'Frasa negasi "tidak dipungut biaya" berdekatan dengan kata biaya',
    teks: `Lowongan Frontend Developer PT Telekomunikasi Indonesia.
Kualifikasi: S1 Informatika, menguasai React dan TypeScript, pengalaman minimal 1 tahun.
Seluruh proses rekrutmen ini TIDAK dipungut biaya apapun.
Pendaftaran hanya melalui portal resmi telkom.co.id/career.`,
  },
  {
    id: 'A02',
    label: 'asli',
    jebakan: 'Peringatan waspada OTP mengandung kata OTP dan kata sandi',
    teks: `Rekrutmen Officer Development Program Bank Nasional.
WASPADA PENIPUAN: kami tidak pernah meminta kode OTP, PIN, atau kata sandi Anda.
Lamaran dikirim ke karir@banknasional.co.id paling lambat 30 November 2026.
Kualifikasi: S1 segala jurusan, IPK minimal 3.00.`,
  },
  {
    id: 'A03',
    label: 'asli',
    jebakan: 'Menyebut biro perjalanan dan tiket dalam kalimat penyangkalan',
    teks: `Pengumuman Seleksi Energi Nusantara.
Perusahaan tidak bekerjasama dengan biro perjalanan manapun dan tidak pernah meminta
peserta membayar tiket pesawat atau akomodasi hotel.
Seluruh tahapan seleksi tanpa biaya. Informasi resmi di situs karier perusahaan.`,
  },
  {
    id: 'A04',
    label: 'asli',
    jebakan: 'Imbauan jangan mentransfer uang memuat kata transfer',
    teks: `Lowongan Staf Administrasi Koperasi Sejahtera.
Jangan pernah mentransfer uang kepada siapapun yang mengatasnamakan panitia rekrutmen.
Kirim CV ke rekrutmen@koperasisejahtera.co.id.
Penempatan Jakarta Selatan, status karyawan tetap setelah masa percobaan 3 bulan.`,
  },
  {
    id: 'A05',
    label: 'asli',
    jebakan: 'Kata "gratis" muncul sebagai bagian fasilitas, bukan umpan',
    teks: `Dicari Barista untuk kedai kopi di Bandung.
Fasilitas: makan siang gratis, seragam disediakan perusahaan, BPJS Ketenagakerjaan.
Pengalaman minimal 6 bulan di bidang serupa.
Lamaran diantar langsung ke kedai pada jam kerja atau email ke hr@kopitiam.co.id.`,
  },
  {
    id: 'A06',
    label: 'asli',
    jebakan: 'Menyebut deposit dalam konteks sah (uang jaminan dikembalikan)',
    teks: `Lowongan Kurir Logistik Area Surabaya.
Perusahaan tidak memungut deposit atau potongan gaji dalam bentuk apapun.
Kendaraan operasional disediakan. Gaji pokok Rp 4.500.000 per bulan plus insentif.
Wawancara dilakukan tatap muka di kantor cabang Rungkut.`,
  },
  {
    id: 'A07',
    label: 'asli',
    jebakan: 'Program fresh graduate tanpa syarat pengalaman — memicu indikator S5',
    teks: `Management Trainee Batch 12 Grup Manufaktur Indonesia.
Terbuka untuk fresh graduate, tidak perlu pengalaman kerja sebelumnya.
Pelatihan penuh selama 6 bulan dengan gaji dan tunjangan sejak hari pertama.
Pendaftaran melalui situs karier resmi perusahaan.`,
  },
  {
    id: 'A08',
    label: 'asli',
    jebakan: 'Detail tugas dijelaskan saat onboarding — memicu indikator S7',
    teks: `Lowongan Operator Produksi, penempatan Cikarang.
Rincian tugas harian akan dijelaskan saat onboarding bersama supervisor lini.
Syarat: SMA/SMK sederajat, bersedia kerja sistem shift, sehat jasmani.
Lamaran melalui email hrd@pabrikcikarang.co.id.`,
  },
  {
    id: 'A09',
    label: 'asli',
    jebakan: 'UMKM memakai Google Form sebagai kanal lamaran — memicu indikator T2',
    teks: `Toko Bahan Kue Melati membuka lowongan Admin Online Shop.
Pendaftaran melalui formulir https://forms.gle/contohpendaftaran2026
Jam kerja Senin sampai Sabtu pukul 09.00 hingga 17.00.
Gaji Rp 3.200.000 per bulan sesuai UMK, dibayarkan setiap tanggal 1.`,
  },
  {
    id: 'A10',
    label: 'asli',
    jebakan: 'Meminta dokumen KTP namun pada tahap yang wajar',
    teks: `Penerimaan Perawat RS Harapan Bunda.
Berkas dibawa saat wawancara tatap muka: ijazah asli, STR aktif, dan fotokopi KTP.
Tidak ada pungutan dalam bentuk apapun selama proses seleksi.
Informasi lengkap di papan pengumuman RS dan situs resmi rumah sakit.`,
  },
  {
    id: 'A11',
    label: 'asli',
    jebakan: 'Menyebut WhatsApp sebagai kanal koordinasi tambahan, bukan satu-satunya',
    teks: `Lowongan Guru Les Privat Matematika SMA.
Koordinasi jadwal dilakukan via grup WhatsApp setelah kontrak ditandatangani.
Seleksi awal berupa microteaching tatap muka di kantor bimbel.
Honor Rp 150.000 per sesi 90 menit. Hubungi kantor di 021-5550123.`,
  },
  {
    id: 'A12',
    label: 'asli',
    jebakan: 'Gaji besar namun wajar untuk posisi senior',
    teks: `Dibutuhkan Senior Data Engineer, penempatan Jakarta.
Rentang gaji Rp 25.000.000 sampai Rp 35.000.000 per bulan sesuai pengalaman.
Syarat: minimal 5 tahun pengalaman, menguasai Spark, Airflow, dan SQL tingkat lanjut.
Proses: tes teknis, wawancara sistem desain, wawancara dengan VP Engineering.`,
  },
  {
    id: 'A13',
    label: 'asli',
    jebakan: 'Wawancara daring via Zoom disebut eksplisit',
    teks: `Lowongan UI/UX Designer kerja remote.
Wawancara dilakukan melalui Zoom bersama design lead dan HR.
Portofolio wajib dilampirkan dalam bentuk tautan Behance atau Dribbble.
Lamaran ke people@studiodesain.id dengan subjek UIUX-Remote-2026.`,
  },
  {
    id: 'A14',
    label: 'asli',
    jebakan: 'Batas waktu pendaftaran disebut jelas, bukan tekanan buatan',
    teks: `Rekrutmen Analis Kebijakan, pendaftaran ditutup 15 Desember 2026 pukul 23.59 WIB.
Seleksi administrasi, tes kompetensi, lalu wawancara panel.
Tidak ada biaya pendaftaran maupun biaya seleksi.
Pengumuman tiap tahap diunggah di situs resmi instansi.`,
  },
  {
    id: 'A15',
    label: 'asli',
    jebakan: 'Menyebut nomor rekening dalam konteks pembayaran gaji',
    teks: `Lowongan Staf Gudang, penempatan Semarang.
Nomor rekening karyawan hanya diminta setelah kontrak kerja ditandatangani,
semata untuk keperluan transfer gaji bulanan.
Syarat: SMA sederajat, usia maksimal 35 tahun, mampu mengoperasikan forklift.`,
  },
  {
    id: 'A16',
    label: 'asli',
    jebakan: 'Frasa "siapapun bisa melamar" dalam konteks inklusivitas',
    teks: `Lowongan Customer Service, terbuka untuk umum.
Siapapun bisa melamar tanpa memandang latar belakang pendidikan formal,
asalkan mampu berkomunikasi dengan baik dan bersedia mengikuti pelatihan internal.
Pelatihan dibiayai penuh oleh perusahaan. Kirim lamaran ke hr@layananpelanggan.co.id.`,
  },
  {
    id: 'A17',
    label: 'asli',
    jebakan: 'Loker magang sederhana tanpa frasa rawan sama sekali',
    teks: `Program Magang Bersertifikat bidang Akuntansi, durasi 6 bulan.
Syarat: mahasiswa semester 5 ke atas, IPK minimal 3.00, surat pengantar kampus.
Uang saku Rp 2.000.000 per bulan.
Pendaftaran melalui portal magang resmi kementerian terkait.`,
  },
  {
    id: 'A18',
    label: 'asli',
    jebakan: 'Email korporat pada domain resmi, bukan email gratisan',
    teks: `Dicari Apoteker Penanggung Jawab untuk apotek jaringan di Yogyakarta.
Syarat: STRA aktif, SIPA dapat diurus setelah diterima.
Lamaran dikirim ke recruitment@apotekjaringan.co.id.
Jam kerja 8 jam per hari dengan sistem shift pagi dan sore.`,
  },
  {
    id: 'A19',
    label: 'asli',
    jebakan: 'Menyebut pelatihan berbayar pihak ketiga yang bersifat opsional',
    teks: `Lowongan Teknisi Jaringan, penempatan Medan.
Sertifikasi tambahan bersifat opsional dan bukan syarat kelulusan seleksi.
Perusahaan tidak mewajibkan peserta membeli modul pelatihan manapun.
Seleksi: tes praktik instalasi dan wawancara teknis di kantor cabang.`,
  },
  {
    id: 'A20',
    label: 'asli',
    jebakan: 'Loker normal panjang dengan banyak angka, uji ketahanan redaksi',
    teks: `Lowongan Akuntan Junior, PT Mitra Akuntansi Prima.
Syarat: S1 Akuntansi, memahami PSAK, menguasai Excel tingkat lanjut.
Gaji Rp 6.500.000 per bulan, tunjangan transport Rp 750.000.
Kantor di Jalan Sudirman Nomor 45, Jakarta Pusat. Telepon kantor 021-5551234.`,
  },
]

/** 20 lowongan PENIPUAN — termasuk modus halus dan modus yang menyamar memakai frasa negasi. */
export const LOKER_PENIPUAN: ContohLoker[] = [
  {
    id: 'P01',
    label: 'penipuan',
    jebakan: 'Modus K1 klasik: biaya tiket dan akomodasi berkedok reimburse',
    teks: `PANGGILAN SELEKSI KERJA MENGATASNAMAKAN PERUSAHAAN MIGAS.
Peserta wajib transfer biaya reservasi tiket pesawat dan akomodasi hotel
melalui biro travel rekanan kami.
Uang tiket akan diganti reimburse 100% setelah tiba di lokasi tes.`,
  },
  {
    id: 'P02',
    label: 'penipuan',
    jebakan: 'Modus K1 varian seragam dan administrasi',
    teks: `Selamat! Anda lolos tahap akhir rekrutmen.
Silakan transfer biaya seragam dan administrasi sebesar Rp 450.000
ke rekening panitia paling lambat hari ini.
Bukti transfer dikirim ke admin untuk diproses.`,
  },
  {
    id: 'P03',
    label: 'penipuan',
    jebakan: 'Modus K2: permintaan kode OTP berkedok verifikasi akun',
    teks: `Verifikasi data pelamar.
Silakan ketik kode OTP 6 digit yang dikirimkan ke nomor WhatsApp Anda
dan kirimkan kepada admin dalam batas waktu 10 menit.
Tanpa verifikasi ini lamaran Anda otomatis dibatalkan.`,
  },
  {
    id: 'P04',
    label: 'penipuan',
    jebakan: 'Modus K2 varian kata sandi akun perbankan',
    teks: `Pendaftaran payroll karyawan baru.
Mohon berikan password mobile banking Anda kepada petugas HRD kami
agar rekening gaji dapat segera diaktifkan.
Proses hanya memakan waktu 5 menit.`,
  },
  {
    id: 'P05',
    label: 'penipuan',
    jebakan: 'Modus K3: tugas like dan subscribe dengan komisi',
    teks: `Lowongan kerja paruh waktu dari rumah.
Cukup like dan subscribe channel yang kami kirim, langsung dapat komisi
Rp 50.000 per tugas. Pencairan setelah menyelesaikan 10 misi.
Daftar sekarang, slot terbatas.`,
  },
  {
    id: 'P06',
    label: 'penipuan',
    jebakan: 'Modus K3 varian deposit modal awal sebelum komisi cair',
    teks: `Kerja online mudah, penghasilan harian.
Anggota wajib melakukan top up deposit modal awal Rp 200.000
sebelum misi berbayar dapat dibuka dan komisi ditarik.
Semakin besar deposit, semakin besar komisi harian Anda.`,
  },
  {
    id: 'P07',
    label: 'penipuan',
    jebakan: 'Penipuan yang MENYAMAR memakai frasa negasi untuk mengelabui filter',
    teks: `Rekrutmen resmi, proses ini tidak dipungut biaya apapun.
Namun setiap peserta diwajibkan melakukan top up deposit jaminan keseriusan
sebesar Rp 300.000 yang akan dikembalikan setelah kontrak ditandatangani.
Segera konfirmasi ke admin sebelum kuota hari ini habis.`,
  },
  {
    id: 'P08',
    label: 'penipuan',
    jebakan: 'Modus T1: foto KTP dan buku tabungan wajib dikirim di awal',
    teks: `Tahap verifikasi berkas pelamar.
Foto KTP dan buku tabungan wajib kirim hari ini melalui chat pribadi.
Data digunakan untuk pembuatan akun payroll perusahaan.
Pelamar yang tidak melengkapi akan dicoret dari daftar.`,
  },
  {
    id: 'P09',
    label: 'penipuan',
    jebakan: 'Modus T2: tautan pemendek sebagai satu-satunya kanal',
    teks: `Loker admin gaji harian cair.
Daftar sekarang melalui https://bit.ly/lokerharian2026
Tidak perlu wawancara, langsung kerja besok.
Info lanjut hubungi admin setelah mengisi formulir.`,
  },
  {
    id: 'P10',
    label: 'penipuan',
    jebakan: 'Modus T3: gaji fantastis tanpa pengalaman',
    teks: `Dibutuhkan segera, penghasilan 20 juta per minggu tanpa pengalaman.
Kerja dari rumah, modal handphone saja.
Tidak ada target, tidak ada atasan.
Hubungi admin untuk proses cepat.`,
  },
  {
    id: 'P11',
    label: 'penipuan',
    jebakan: 'Modus T4: kanal eksklusif WhatsApp pribadi admin',
    teks: `Informasi lowongan terbatas.
Kontak hanya via whatsapp pribadi admin, jangan hubungi kantor pusat
karena jalur resmi sedang penuh dan tidak melayani pelamar baru.
Chat sekarang untuk dapat nomor antrean.`,
  },
  {
    id: 'P12',
    label: 'penipuan',
    jebakan: 'Modus S6: bahasa over-promising kerja santai',
    teks: `Kerja santai cukup rebahan di rumah, gaji pasti cair tiap hari.
Tidak perlu skill khusus, semua akan dibimbing.
Jaminan sukses dalam 7 hari pertama.
Slot tinggal sedikit, segera daftar.`,
  },
  {
    id: 'P13',
    label: 'penipuan',
    jebakan: 'Modus S4: rekrutmen korporat memakai email gratisan',
    teks: `Rekrutmen staf administrasi perusahaan multinasional.
Kirim lamaran lengkap ke hrd.recruitment2026@gmail.com
Proses cepat, pengumuman dalam 1x24 jam.
Pelamar terpilih akan dihubungi melalui pesan pribadi.`,
  },
  {
    id: 'P14',
    label: 'penipuan',
    jebakan: 'Modus S1: tekanan waktu buatan sebagai sinyal utama',
    teks: `Penerimaan karyawan baru, kuota terbatas hanya hari ini.
Segera konfirmasi sebelum hangus, posisi akan diberikan kepada pelamar lain.
Pendaftaran ditutup pukul 18.00 sore ini juga.
Balas pesan ini dengan nama lengkap dan alamat Anda.`,
  },
  {
    id: 'P15',
    label: 'penipuan',
    jebakan: 'Modus S3: seleksi hanya lewat chat Telegram',
    teks: `Lowongan operator data entry.
Wawancara hanya melalui telegram, tidak ada tatap muka dan tidak ada video call.
Pelamar akan diminta mengisi data diri lengkap saat sesi chat.
Hasil diumumkan langsung setelah sesi selesai.`,
  },
  {
    id: 'P16',
    label: 'penipuan',
    jebakan: 'Modus halus: hanya beberapa sinyal lemah, uji false negative',
    teks: `Dicari admin sosial media, kerja fleksibel dari rumah.
Tidak perlu ijazah, siapapun bisa bergabung.
Detail pekerjaan akan dijelaskan nanti setelah bergabung ke grup.
Hubungi kami untuk informasi lebih lanjut.`,
  },
  {
    id: 'P17',
    label: 'penipuan',
    jebakan: 'Modus halus kedua: terdengar profesional, sinyal tersamar',
    teks: `PT Sumber Rejeki Abadi membuka posisi staf gudang.
Perusahaan baru belum terdaftar resmi namun sudah beroperasi 2 tahun.
Proses seleksi singkat, cukup kirim data diri melalui chat.
Gaji dibayarkan mingguan secara tunai.`,
  },
  {
    id: 'P18',
    label: 'penipuan',
    jebakan: 'Gabungan K1 dan T2, dua sinyal kuat sekaligus',
    teks: `Loker pabrik penempatan luar kota.
Pendaftaran via https://s.id/lokerpabrik2026
Peserta wajib membayar biaya pelatihan sebesar Rp 750.000
sebelum keberangkatan ke lokasi penempatan.`,
  },
  {
    id: 'P19',
    label: 'penipuan',
    jebakan: 'Permintaan kartu keluarga dan NIK berkedok BPJS',
    teks: `Pendaftaran BPJS karyawan baru.
Kartu keluarga dan foto KTP wajib unggah melalui tautan yang dikirim admin.
Sertakan juga nomor rekening untuk pencairan tunjangan awal.
Lengkapi hari ini agar tidak tertunda.`,
  },
  {
    id: 'P20',
    label: 'penipuan',
    jebakan: 'Modus K1 berkedok uang jaminan alat kerja',
    teks: `Lowongan driver ekspedisi, unit motor disediakan perusahaan.
Pelamar cukup setor uang jaminan sebesar Rp 1.500.000
yang akan dikembalikan penuh setelah masa kerja 3 bulan.
Transfer ke rekening koordinator lapangan hari ini juga.`,
  },
]

export const DATASET_LOKER: ContohLoker[] = [...LOKER_ASLI, ...LOKER_PENIPUAN]
