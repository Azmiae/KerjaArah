---
name: frontend-mobile-development
description: Playbook pengembangan frontend mobile-first dan responsif. Mengatur adaptasi tata letak dari viewport mobile (<640px) ke desktop, area sentuh ramah jempol (minimum 44x44px), drawer/sheet pengganti modal di mobile, penanganan safe-area, navigasi responsif, dan performa interaksi sentuh. Gunakan skill ini saat membangun atau mengoptimalkan antarmuka untuk pengalaman mobile dan lintas perangkat.
user-invocable: false
---

# Frontend Mobile Development Playbook

Playbook ini memandu pembuatan antarmuka pengguna yang responsif, adaptif, dan ramah sentuhan (touch-friendly) dengan pendekatan **Mobile-First**.

---

## 1. Filosofi Mobile-First & Hierarki Breakpoint

Desain antarmuka dimulai dari layar terkecil (mobile viewport ~360px s.d. 390px), kemudian diperluas secara bertahap untuk tablet dan desktop menggunakan modifier breakpoint Tailwind:

- **Base (tanpa prefix)**: Gaya default untuk layar ponsel (<640px). Layout satu kolom, full width, padding kompak.
- **`sm:` (>= 640px)**: Tablet kecil / ponsel orientasi landscape.
- **`md:` (>= 768px)**: Tablet portrait / laptop kecil. Mulai bisa menggunakan layout 2 kolom.
- **`lg:` (>= 1024px)**: Desktop monitor standar. Sidebar penuh, layout multi-kolom, dialog terpusat.
- **`xl:` (>= 1280px)**: Desktop lebar. Batasi lebar maksimal konten dengan container (`max-w-7xl mx-auto`).

---

## 2. Area Sentuh (Touch Targets) & Ergonomi Jempol

Jari manusia membutuhkan area sentuh yang cukup agar interaksi tidak meleset (*fat-finger errors*):

- **Ukuran Target Minimum**: Elemen interaktif (tombol, ikon tombol, link, tab, item menu) wajib memiliki target sentuh minimal **44 × 44 piksel** (gunakan utility `min-h-11 min-w-11` atau padding yang proporsional).
- **Thumb Zone**: Tempatkan aksi utama (tombol CTA, floating submit, navigasi primer) di area yang mudah dijangkau oleh satu jempol (bagian bawah hingga tengah layar ponsel).
- **Jarak Antar Aksi**: Berikan jarak minimal `gap-3` (12px) antar tombol aksi berdampingan untuk mencegah salah tekan.

---

## 3. Pola Adaptif: Mobile vs Desktop

Jangan hanya mengecilkan tampilan desktop secara paksa ke layar kecil. Terapkan pola adaptif yang sesuai:

### A. Modal Dialog → Bottom Sheet / Drawer
- **Desktop (`md:` ke atas)**: Gunakan modal di tengah layar (`Dialog` dari shadcn).
- **Mobile (<768px)**: Tampilkan sebagai panel yang muncul dari bawah (`Sheet side="bottom"` atau `Drawer` shadcn) agar lebih ergonomis digeser atau ditutup dengan satu jempol.

### B. Data Table → Card Stack
- Tabel multi-kolom sering rusak atau terpotong di layar kecil.
- Di layar mobile, ubah baris tabel menjadi kartu terpisah (`Card`) yang merangkum poin data utama secara vertikal.

### C. Navigasi & Tab
- Hindari tab horizontal yang terpotong. Gunakan tab dengan horizontal scroll halus (`overflow-x-auto no-scrollbar flex gap-2`) atau ubah menjadi dropdown `Select` di layar mobile sempit.

---

## 4. Penanganan Viewport, Safe Area, & Overflow

- **Dynamic Viewport Height (`dvh`)**:
  - Gunakan `min-h-dvh` atau `h-dvh` alih-alih `100vh` standar agar layout tidak terpotong atau tertutup saat URL bar browser mobile (Safari/Chrome) muncul dan menghilang.
- **Mencegah Scroll Horizontal Liar**:
  - Pasang `overflow-x-hidden` pada wrapper halaman utama untuk mencegah gesture horizontal tak sengaja yang merusak posisi layar.
- **Safe Area Inset (Ponsel Berponi / Home Indicator)**:
  - Berikan padding bawah yang cukup pada elemen fixed bottom bar: `pb-[calc(1rem+env(safe-area-inset-bottom))]`.

---

## 5. Ergonomi Form & Keyboard Mobile

- **Tipe Input yang Sesuai**:
  - Selalu sertakan atribut input semantic:
    - Angka/Kode: `inputMode="numeric"` atau `type="tel"` agar mobile keyboard langsung membuka keypad angka.
    - Email: `type="email"` dengan `autoCapitalize="none"`.
- **Label & Error Placement**:
  - Letakkan label selalu di atas input (bukan di samping kiri) pada mode mobile untuk mempertahankan ruang ketik yang lega.
  - Pesan error validasi harus tetap berada dalam viewport saat virtual keyboard aktif.

---

## 6. Kepatuhan Aturan Proyek KerjaArah

Sesuai `AGENTS.md` (Poin 9):
- **Flexbox `gap-*`**: Gunakan `flex flex-col gap-4`, dilarang keras memakai `space-y-*` atau `space-x-*`.
- **Gunakan Varian Bawaan shadcn**: Gunakan komponen resmi (`Sheet`, `Dialog`, `Button`, `Card`, `ToggleGroup`) dan variannya.
- **Wajib Semantic Tokens**: Seluruh warna background, border, dan teks wajib memakai semantic tokens (`bg-background`, `border-border`, dll.) agar tema gelap/terang otomatis responsif di mobile.

