# Sistem Pencatatan Perkembangan Proyek (.agent Version Control)

Direktori `.agent/` ini berfungsi sebagai **sistem version control internal** untuk mendokumentasikan setiap riwayat perubahan, iterasi kode, dokumen, serta keputusan teknis proyek **KerjaArah** secara transparan, terstruktur, dan kronologis layaknya Git commit log di GitHub.

---

## 📁 Struktur Direktori `.agent/`

```text
.agent/
├── README.md               # Dokumentasi panduan sistem version control .agent
├── milestones.md           # Tracking target & milestone proyek WIA 2026
├── current_state.json      # Snapshot status terkini proyek
├── memories/               # Riwayat memori, komit, dan rilis versi
│   ├── COMMITS.md          # Log detail setiap commit/perubahan (Commit History)
│   └── CHANGELOG.md        # Catatan rilis versi proyek (Semantic Versioning)
└── skills/                         # Koleksi agent skills
    ├── skills.md                   # Master Index & Panduan Sinergi Skills (Single Source of Truth)
    ├── design-mastery/             # Panduan estetika, tipografi, 8-pt grid, anti-klise AI
    ├── frontend-mobile-development/ # Standar mobile-first, touch target 44px, adaptif drawer
    ├── shadcn/                     # Primitif komponen UI, form controls, & semantic tokens
    └── security-audit/             # Vulnerability review, SQLite parameterization, & privacy checks
```

---

## 📝 Konvensi Pencatatan Commit (`COMMITS.md`)

Setiap perubahan yang dilakukan dicatat dengan format standar:

```markdown
### [Commit ID] - YYYY-MM-DD HH:mm:ss WIB
- **Tipe / Scope:** `feat` | `fix` | `docs` | `style` | `refactor` | `test` | `chore`
- **Pesan Commit:** Ringkasan perubahan dalam satu kalimat singkat dan jelas
- **Penulis (Author):** Agent / User
- **File Terdampak:**
  - `+` File baru ditambahkan
  - `M` File dimodifikasi
  - `-` File dihapus
- **Rincian Perubahan:**
  - Poin detail mengenai apa yang diubah dan alasannya
```

> ⚠️ **Kebijakan Retensi (Rolling 5 Commits):**  
> Dokumen [COMMITS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/COMMITS.md) hanya menyimpan **maksimal 5 commit terakhir**. Ketika commit baru ditambahkan dan total melebihi 5, commit paling lama (di posisi paling bawah) akan dipangkas agar berkas tetap ringkas dan efisien.

### Panduan Tipe Commit (Conventional Commits):
* `feat`: Fitur baru (misal: penambahan rule K1, implementasi UI scanner)
* `fix`: Perbaikan bug atau salah deteksi (false positive / negative)
* `docs`: Pembaruan dokumentasi, proposal, atau panduan
* `style`: Perubahan tampilan, CSS, layout tanpa mengubah logika
* `refactor`: Refactoring kode tanpa mengubah fungsionalitas
* `test`: Penambahan atau pembaruan unit test / dataset uji
* `chore`: Konfigurasi build, dependensi, atau setup proyek

---

## 🎯 Siklus Kerja (Workflow)
1. **Perubahan Terjadi:** Kode, desain, atau dokumen diperbarui.
2. **Commit Tercatat:** Tambahkan entri baru di bagian atas file [COMMITS.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/memories/COMMITS.md). Jika jumlah entri commit melebihi 5, pangkas entri tertua di bagian bawah.
3. **Pembaruan Status:** Perbarui [current_state.json](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/current_state.json) dan checklist di [milestones.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/milestones.md) jika milestone tercapai.

---

## 🧠 Manajemen & Verifikasi Skill (Optimalisasi Performa Agen)

Untuk mencegah *context bloating*, benturan instruksi (*instruction conflict*), dan penurunan performa penalaran (*reasoning degradation*), pengelolaan skill di `.agent/skills/` wajib mengikuti protokol berikut:

1. **Pemeriksaan Anti-Duplikasi:**  
   Sebelum mengunduh atau menambahkan skill baru, periksa seluruh daftar skill yang telah terpasang. Pastikan kapabilitas skill baru belum dicakup oleh skill yang ada.
2. **Protokol Verifikasi 2x (Double Verification):**  
   Apabila ditemukan skill yang memiliki fungsi serupa, mirip, atau tumpang tindih (*overlap*):
   - **Verifikasi 1 (Identifikasi & Analisis Trade-off):** Agen wajib memaparkan persamaan/perbedaan fungsional dengan skill lama dan menanyakan apakah pengguna ingin mengganti (*replace*), menggabungkan (*merge*), atau membatalkan penambahan.
   - **Verifikasi 2 (Konfirmasi Final & Efisiensi Konteks):** Sebelum perubahan ditulis ke disk, agen mengonfirmasi ulang keputusan pengguna serta dampak penambahan token terhadap batas konteks agen.
3. **Prinsip Lean Context:**  
   Simpan hanya skill yang relevan secara aktif untuk fase pengerjaan saat ini. Skill yang tidak lagi relevan atau terduplikasi harus segera dibersihkan agar performa agen tetap cepat, presisi, dan optimal.
