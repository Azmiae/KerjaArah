# Master Index & Panduan Sinergi Skills (`skills.md`)

Dokumen ini adalah **pintu masuk utama** bagi AI agent untuk memahami, memilih, dan mensinergikan seluruh skills yang tersedia di direktori `.agent/skills/`.

> **Prinsip Utama:** Agent **TIDAK PERLU** membaca setiap subfolder skill satu per satu secara berulang. Cukup jadikan dokumen ringkasan ini sebagai referensi navigasi cepat untuk menentukan kombinasi skill yang relevan dengan tugas yang sedang dikerjakan.

---

## 1. Quick-Matrix: Skill Apa yang Harus Dipakai?

| Skenario / Jenis Tugas | Kombinasi Skill yang Direkomendasikan | Peran & Kontribusi Masing-Masing Skill |
|---|---|---|
| **Membuat / Memodifikasi Komponen UI** | `shadcn` + `design-mastery` | **`shadcn`**: Komponen primitif aksesibel (`Dialog`, `Button`, `Card`, form controls) & token tema.<br>**`design-mastery`**: Hierarki visual tegas, ritme 8-pt, estetika anti-klise AI. |
| **Optimasi Responsivitas & Tampilan Mobile** | `frontend-mobile-development` + `shadcn` | **`frontend-mobile-development`**: Touch target (min 44×44px), dynamic viewport (`min-h-dvh`), drawer/bottom sheet.<br>**`shadcn`**: Komponen `Sheet` / `Drawer` bawaan. |
| **Review & Polishing Visual / Estetika Halaman** | `design-mastery` | Audit tipografi, kontras warna token, ritme spasi, dan eliminasi efek neon/sparkle buatan. |
| **Modifikasi Endpoint API / Keamanan / Database** | `security-audit` | Validasi input Pydantic, query SQLite terparameter, sanitasi redaksi privasi pelapor. |
| **Fitur Full-Stack Baru (Frontend + Backend)** | `shadcn` + `design-mastery` + `frontend-mobile-development` + `security-audit` | Sinergi menyeluruh dari arsitektur UI ergonomis hingga keamanan alur data. |

---

## 2. Katalog & Intisari Playbook Skills

### A. [`shadcn`](./shadcn/SKILL.md) — Fondasi Komponen & Token Semantik
- **Fokus:** Menyediakan komponen aksesibel siap pakai berbasis Radix UI (`Dialog`, `Sheet`, `Button`, `Card`, `ToggleGroup`, `Input`, form controls).
- **Aturan Inti:**
  - **Wajib Semantic Tokens:** Gunakan `bg-background`, `bg-card`, `border-border`, `text-foreground`, `text-muted-foreground`, `bg-primary`, `text-destructive`. Dilarang keras hardcode hex (`#141820`, `#2F88F5`).
  - **`className` untuk Layout:** Gunakan untuk flex/grid/spacing (`flex flex-col gap-4`), bukan menimpa warna bawaan komponen secara manual.
  - **Hindari `space-y-*` / `space-x-*`:** Gunakan flexbox modern dengan `gap-*`.
  - **Komposisi daripada Buat Ulang:** Gabungkan primitif yang ada (contoh: Form = `FieldGroup` + `Field` + `Input`).

### B. [`design-mastery`](./design-mastery/SKILL.md) — Arah Estetika & Kualitas Visual Anti-Klise
- **Fokus:** Mengeliminasi tampilan generik "AI vibe-coding" dan memberikan karakter visual profesional berstandar industri dengan sentuhan interaktif taktil.
- **Aturan Inti:**
  - **Anti-Klise AI:** Dilarang menggunakan bayangan glow neon mengambang (`shadow-[#...]/...`), teks bergradien warna-warni berlebih, atau ikon `Sparkles` untuk fitur umum.
  - **Hierarki Tipografi:** Kontras yang tegas antara Display (`text-3xl font-bold tracking-tight`), Section (`text-xl font-semibold`), Subheading/Label (`text-sm font-medium`), dan Body (`text-sm text-muted-foreground leading-relaxed`).
  - **Ritme Spasi 8-Point Grid:** Gunakan kelipatan 4px/8px konsisten (`gap-2`, `gap-4`, `gap-6`, `gap-8`, `p-4`, `p-6`). Dilarang angka arbitrary seperti `gap-[13px]`.
  - **Kelengkapan State:** Wajib mendesain seluruh state (Default, Hover, Focus-visible, Loading Skeleton, Empty state, Error state).
  - **Micro-Interactions & Taktil:** Timing transisi 150–200ms (`ease-out`), feedback tekan tombol (`active:scale-[0.98]`), elevasi kartu halus (`hover:-translate-y-0.5`), dan kemunculan konten dinamis yang mengalir (`animate-in fade-in-50 slide-in-from-bottom-2`).

### C. [`frontend-mobile-development`](./frontend-mobile-development/SKILL.md) — Ergonomi & Responsivitas Mobile-First
- **Fokus:** Menjamin pengalaman pengguna yang mulus pada layar ponsel (<640px) hingga desktop.
- **Aturan Inti:**
  - **Mobile-First:** Bangun styling dasar untuk mobile terlebih dahulu, lalu perluas dengan breakpoint `sm:`, `md:`, `lg:`.
  - **Area Sentuh (Touch Target) Ramah Jempol:** Target interaktif minimal **44 × 44px** (`min-h-11 min-w-11`), jarak aman antar tombol untuk mencegah salah sentuh (*fat-finger errors*).
  - **Pola Adaptif Luwes:** Modal tengah di desktop bertransformasi menjadi bottom sheet (`Sheet side="bottom"` atau `Drawer`) di ponsel; tabel lebar diubah menjadi daftar kartu vertikal.
  - **Penanganan Viewport:** Gunakan `min-h-dvh` (bukan `100vh`) untuk mencegah layout terpotong URL bar mobile browser; pasang `overflow-x-hidden` pada wrapper utama; tangani safe-area notch perangkat.

### D. [`security-audit`](./security-audit/SKILL.md) — Audit Keamanan & Privasi Data
- **Fokus:** Menjaga batas kepercayaan (*trust boundary*), mencegah kerentanan, dan melindungi privasi pengguna.
- **Aturan Inti:**
  - **Privasi Lowongan:** Teks lowongan di Job Scam Checker diproses di sisi klien (browser) dan tidak boleh dikirim ke server.
  - **Sanitasi Laporan:** Fitur Lapor Lowongan wajib melalui redaksi otomatis PII (nama, nomor telepon, rekening) sebelum dikirim.
  - **Query Terparameter:** SQLite wajib menggunakan query terparameter (`?`) atau ORM; dilarang string concatenation / f-string pada SQL.
  - **Validasi Input Backend:** Validasi seluruh payload request menggunakan skema model Pydantic.

---

## 3. Protokol Harmonisasi Skills

1. **Bukan Dogmatis:** Jangan terkunci secara kaku hanya pada satu library. Gabungkan fondasi aksesibilitas dari `shadcn`, arahan estetika dari `design-mastery`, dan sentuhan responsivitas dari `frontend-mobile-development`.
2. **Kesesuaian Konteks:** Ambil panduan yang relevan saja untuk tugas spesifik. Hindari memuat atau menerapkan aturan yang tidak relevan dengan cakupan pekerjaan.
3. **Pelaporan Singkat:** Pada akhir setiap pengerjaan tugas, sebutkan secara ringkas skill apa saja yang bersinergi dalam solusi yang dihasilkan.
