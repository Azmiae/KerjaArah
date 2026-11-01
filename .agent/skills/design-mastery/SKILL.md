---
name: design-mastery
description: Playbook panduan desain UI/UX tingkat tinggi untuk mengeliminasi desain AI generik ("vibe-coding" / template klise), menetapkan hierarki tipografi tegas, ritme layout 8-pt, estetika arketipe profesional, dan integrasi penuh dengan semantic tokens shadcn/Tailwind. Gunakan skill ini saat mendesain antarmuka baru, merancang tata letak halaman, atau mereview kualitas estetika UI.
user-invocable: false
---

# Design Mastery Playbook

Playbook ini dirancang untuk memastikan antarmuka pengguna (UI/UX) memiliki standar estetika profesional, terstruktur secara arsitektural, dan bebas dari kebiasaan buruk desain AI generik ("AI cliché").

---

## 1. Prinsip Anti-Generik (Anti-Cliché Rules)

Model AI sering menghasilkan antarmuka yang seragam dan terasa seperti "vibe-coding" murahan. Terapkan prinsip berikut untuk menghindarinya:

- **Dilarang Glow Neon & Gradien Berlebihan**: Jangan menambahkan bayangan neon artifisial (`shadow-[#...]/...`) atau teks dengan gradien pelangi tanpa konteks branding yang matang.
- **Hindari Ikon "Sparkles" Klise**: Jangan memasang ikon bintang/sparkle untuk fitur umum agar tidak terkesan artifisial.
- **Hindari 3-Card Grid yang Monoton**: Jangan selalu membuat 3 kartu berdampingan dengan ukuran dan visual weight yang identik. Ciptakan fokus visual melalui variasi penekanan (Primary vs Secondary cards).
- **Berikan Ruang Bernapas yang Nyata (Intentional Whitespace)**: Jangan menjejalkan seluruh informasi dalam satu container sempit. Pisahkan blok informasi dengan padding dan gap yang proporsional.

---

## 2. Tipografi & Hierarki Visual

Hierarki tipografi harus langsung memandu mata pengguna ke informasi paling penting dalam 3 detik pertama.

### Skala & Peran Teks
1. **Hero / Display (`text-3xl` s.d. `text-4xl font-bold tracking-tight`)**:
   - Hanya untuk judul utama halaman atau nilai metrik utama (misal: skor risiko).
2. **Section Headings (`text-xl` s.d. `text-2xl font-semibold tracking-tight`)**:
   - Untuk nama modul atau kartu analisis.
3. **Subheadings / Label Komponen (`text-sm font-medium`)**:
   - Untuk label input, nama kategori indikator, atau status badge.
4. **Body Text (`text-sm` atau `text-base text-muted-foreground leading-relaxed`)**:
   - Penjelasan, detail temuan, atau instruksi.
5. **Microcopy / Meta (`text-xs text-muted-foreground`)**:
   - Timestamp, disclaimer privasi, atau ID referensi.

### Aturan Kontras Berat Font
- Selalu variasikan ketebalan teks (`font-semibold` berpasangan dengan `text-muted-foreground font-normal`).
- Jangan biarkan seluruh halaman dipenuhi teks reguler tanpa anchor pembeda.

---

## 3. Sistem Spasi & Ritme Layout (8-Point Grid Rhythm)

Gunakan kelipatan 4px / 8px yang konsisten pada Tailwind untuk menciptakan harmoni visual:

- **Micro Spacing (dalam komponen)**:
  - `gap-1.5` (6px) atau `gap-2` (8px) untuk ikon + teks atau badge.
  - `p-3` (12px) atau `p-4` (16px) untuk padding dalam kartu kompak.
- **Macro Spacing (antar komponen & section)**:
  - `gap-4` (16px) s.d. `gap-6` (24px) untuk jarak antar kartu dalam grid/flex list.
  - `gap-8` (32px) s.d. `gap-12` (48px) untuk pemisah section utama pada halaman.
- **Larangan**: Dilarang menggunakan nilai arbitrary seperti `gap-[13px]` atau `p-[19px]`.

---

## 4. Kepatuhan Sistem Desain (Wajib Semantic Tokens)

Sesuai aturan proyek (`AGENTS.md`), dilarang keras menggunakan warna hex manual (`#...`). Antarmuka wajib mendukung Dark & Light Mode secara otomatis melalui token semantik shadcn:

| Elemen UI | Token yang Digunakan | Larangan Keras |
|---|---|---|
| Background Utama | `bg-background` | `bg-[#0f172a]`, `bg-white` |
| Permukaan Kartu / Container | `bg-card text-card-foreground` | `bg-[#1e293b]`, `bg-gray-50` |
| Border & Divider | `border-border` | `border-[#334155]`, `border-gray-200` |
| Teks Utama | `text-foreground` | `text-[#f8fafc]`, `text-black` |
| Teks Sekunder / Keterangan | `text-muted-foreground` | `text-gray-400`, `text-[#94a3b8]` |
| Aksi Primer | `bg-primary text-primary-foreground` | `bg-blue-600`, `bg-[#2563eb]` |
| Status Danger / Kritis | `text-destructive`, `bg-destructive/10` | `text-[#ef4444]`, `bg-red-500` |

---

## 5. State Design yang Lengkap

Setiap kali mendesain atau mengedit komponen interaktif, wajib memikirkan seluruh kemungkinan state:

1. **Default**: Tampilan normal yang bersih dan proporsional.
2. **Hover / Active**: Transisi lembut (`transition-colors duration-150`), jangan menggunakan animasi loncat yang mengganggu.
3. **Focus-Visible**: Ring fokus yang jelas untuk aksesibilitas (`focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`).
4. **Loading State**: Gunakan skeleton loader (`Skeleton` dari shadcn) yang meniru bentuk konten asli, bukan sekadar spinner di tengah layar kosong.
5. **Empty State**: Sediakan visual kontekstual, pesan yang jelas, dan tombol aksi (CTA) yang memandu pengguna.
6. **Error / Warning State**: Berikan indikasi yang manusiawi, spesifik, dan actionable (apa yang salah dan apa yang harus dilakukan pengguna).

---

## 6. Micro-Interactions, Feedback Taktil, & Motion Timing

Memberikan sentuhan rasa "hidup" dan premium (*high-taste*) tanpa animasi berlebihan yang mengganggu:

1. **Timing & Easing Standar Agensi**:
   - Transisi mikro wajib berdurasi **150ms s.d. 200ms** dengan kurva `ease-out` (contoh: `transition-all duration-150 ease-out`).
   - Dilarang memakai durasi lambat (>300ms) untuk hover atau klik tombol karena menimbulkan kesan website berat/lamban (*sluggish*).
2. **Feedback Taktil Tombol (Active Press)**:
   - Tambahkan efek membal saat tombol ditekan: `active:scale-[0.98] transition-transform duration-100 ease-out`. Memberikan sensasi taktil seperti tombol fisik aplikasi native.
3. **Elevasi Kartu Halus (Subtle Card Lift)**:
   - Untuk kartu interaktif (kartu temuan indikator, item Kanban): gunakan sedikit angkatan halus `hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200 ease-out`. Hindari pergeseran kasar yang terlalu jauh (`-translate-y-2`).
4. **Kemunculan Konten Mulus (Smooth Reveal)**:
   - Saat hasil analisis skor atau detail modal muncul, gunakan transisi mengalir: `animate-in fade-in-50 slide-in-from-bottom-2 duration-200`. Jangan membiarkan elemen baru muncul "jepret" mendadak.
5. **Morphing State Feedback**:
   - Setiap aksi penyalinan (seperti *Copy Tracking Code*) atau penyimpanan wajib memberikan feedback visual langsung (misal: ikon berganti menjadi centang halus selama 1.5–2 detik).

