import { useState } from 'react'
import {
  ShieldAlert,
  Briefcase,
  BarChart3,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Scale,
  Info,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

interface LandingPageProps {
  onNavigateToTab: (tab: 'scanner' | 'tracker' | 'dashboard' | 'reporting' | 'education' | 'checklist') => void
  onOpenAbout: () => void
  onOpenMetodologi: () => void
  isLightMode: boolean
  onToggleTheme: () => void
}

export function LandingPage({
  onNavigateToTab,
  onOpenAbout,
  onOpenMetodologi,
  isLightMode,
  onToggleTheme,
}: LandingPageProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* 1. HI-FI NAVBAR */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <img
              src="/logo-kerjaarah.png"
              alt="Logo KerjaArah"
              className="size-9 rounded-full shadow-xs shrink-0"
            />
            <div>
              <span className="font-bold text-base tracking-tight text-foreground block">
                KerjaArah
              </span>
              <p className="text-[11px] text-muted-foreground hidden sm:block">
                Cari Kerja Lebih Aman, Kenali Risiko Sebelum Melamar
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium text-muted-foreground">
            <button
              onClick={() => onNavigateToTab('scanner')}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <ShieldAlert className="size-3.5" />
              Job Scam Checker
            </button>
            <button
              onClick={() => onNavigateToTab('tracker')}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <Briefcase className="size-3.5" />
              Personal Job Tracker
            </button>
            <button
              onClick={() => onNavigateToTab('dashboard')}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <BarChart3 className="size-3.5" />
              Dashboard Transparansi
            </button>
            <button
              onClick={() => onNavigateToTab('education')}
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="size-3.5" />
              Education Hub
            </button>
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] px-2.5 py-1.5 rounded-md border border-border bg-muted/50 text-muted-foreground">
              <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Zero-Cloud Storage</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onToggleTheme}
              className="text-xs h-8 font-medium"
              title="Ganti Mode Tampilan (Gelap / Terang)"
            >
              {isLightMode ? '🌙 Gelap' : '☀️ Terang'}
            </Button>

            <Button
              onClick={() => onNavigateToTab('scanner')}
              size="sm"
              className="text-xs h-8 px-3.5 font-medium shadow-xs hidden sm:inline-flex"
            >
              Periksa Loker
              <ArrowRight className="size-3.5 ml-1.5" />
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden size-8 p-0"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2 text-xs text-muted-foreground pb-2 border-b border-border">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>100% Client-Side Privacy Protection</span>
            </div>
            <nav className="flex flex-col gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('scanner')
                }}
                className="justify-start text-xs font-medium h-9"
              >
                <ShieldAlert className="size-4 mr-2 text-primary" />
                Job Scam Checker
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('tracker')
                }}
                className="justify-start text-xs font-medium h-9"
              >
                <Briefcase className="size-4 mr-2 text-primary" />
                Personal Job Tracker (Kanban)
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('dashboard')
                }}
                className="justify-start text-xs font-medium h-9"
              >
                <BarChart3 className="size-4 mr-2 text-primary" />
                Dashboard Transparansi
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('education')
                }}
                className="justify-start text-xs font-medium h-9"
              >
                <BookOpen className="size-4 mr-2 text-primary" />
                Education Hub
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('checklist')
                }}
                className="justify-start text-xs font-medium h-9"
              >
                <CheckCircle2 className="size-4 mr-2 text-primary" />
                Checklist & Verifikasi
              </Button>
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              <Button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onNavigateToTab('scanner')
                }}
                className="w-full text-xs font-medium h-9"
              >
                Buka Web App (Periksa Loker)
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden py-12 md:py-20 border-b border-border bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Kolom Teks Hero */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Cari Kerja Lebih Aman,{' '}
                <span className="text-primary underline decoration-primary/30 underline-offset-4">
                  Kenali Modus
                </span>{' '}
                Sebelum Melamar.
              </h1>

              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                Pemeriksa indikasi penipuan lowongan kerja otomatis 100% lokal di browser Anda. Lindungi data pribadi
                dan cegah kerugian finansial sebelum mengirim berkas lamaran atau menghadiri seleksi kerja.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <Button
                  onClick={() => onNavigateToTab('scanner')}
                  size="lg"
                  className="text-sm font-semibold h-11 px-6 shadow-sm active:scale-[0.98] hover:shadow-md transition-all duration-200"
                >
                  <ShieldAlert className="size-4 mr-2" />
                  Mulai Periksa Loker Sekarang
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => onNavigateToTab('tracker')}
                  className="text-sm font-medium h-11 px-6"
                >
                  <Briefcase className="size-4 mr-2 text-muted-foreground" />
                  Buka Personal Job Tracker
                </Button>
              </div>
            </div>

            {/* Kolom Pratinjau Mockup Interaktif (Hi-Fi Prototype Showcase) */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-border bg-card shadow-lg overflow-hidden transition-all hover:shadow-xl">
                {/* Mockup Window Header */}
                <div className="px-4 py-2.5 bg-muted/70 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="size-2.5 rounded-full bg-rose-500/80" />
                    <span className="size-2.5 rounded-full bg-amber-500/80" />
                    <span className="size-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-muted-foreground font-medium">
                    Pratinjau Hasil Analisis KerjaArah
                  </span>
                  <div className="size-2.5" />
                </div>

                {/* Mockup Card Content */}
                <div className="p-5 flex flex-col gap-4 text-xs">
                  {/* Status Banner */}
                  <div className="p-3.5 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-bold">
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle className="size-4 text-destructive shrink-0" />
                        <span>Skor Risiko: 85 (Kategori Kritis)</span>
                      </div>
                      <Badge variant="destructive" className="text-[10px] uppercase">
                        Override Kritis
                      </Badge>
                    </div>
                    <p className="text-[11px] text-destructive/90 leading-relaxed">
                      Terdeteksi pemaksaan biaya perjalanan fiktif dan desakan penyerahan kode verifikasi darurat.
                    </p>
                  </div>

                  {/* Bullet Pemicu */}
                  <div className="flex flex-col gap-2">
                    <span className="font-semibold text-foreground text-[11px] uppercase tracking-wider">
                      Indikator Terdeteksi:
                    </span>
                    <div className="p-2.5 rounded-md bg-muted/40 border border-border flex flex-col gap-1.5 text-muted-foreground text-[11px]">
                      <div className="flex items-start gap-1.5 text-foreground font-medium">
                        <span className="text-destructive font-bold">•</span>
                        <span>
                          <strong>Modus K1:</strong> Wajib reservasi tiket pesawat/hotel via biro travel rekanan (Angkasa Tour).
                        </span>
                      </div>
                      <div className="flex items-start gap-1.5 text-foreground font-medium">
                        <span className="text-destructive font-bold">•</span>
                        <span>
                          <strong>Modus K2:</strong> Meminta kode OTP 6 digit dalam batas waktu 10 menit.
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Verification Checklist */}
                  <div className="p-3 rounded-lg border border-border bg-muted/20 flex flex-col gap-1.5">
                    <span className="font-semibold text-foreground text-[11px]">Checklist Tindakan Cepat:</span>
                    <ul className="space-y-1 text-muted-foreground text-[11px]">
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3 shrink-0" />
                        <span>Jangan transfer uang ke nomor rekening apapun</span>
                      </li>
                      <li className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="size-3 shrink-0" />
                        <span>Jangan bagikan kode OTP atau data NIK KTP Anda</span>
                      </li>
                    </ul>
                  </div>

                  {/* CTA inside mockup */}
                  <Button
                    onClick={() => onNavigateToTab('scanner')}
                    size="sm"
                    className="w-full text-xs font-medium h-9"
                  >
                    Coba Pindai Lowongan Anda Sendiri →
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METRICS STRIP */}
      <section className="py-8 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">12</span>
              <span className="text-xs font-semibold text-foreground">Indikator Modus Kritis</span>
              <span className="text-[11px] text-muted-foreground">K1 Travel, K2 OTP, K3 Deposit & I1-I7</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">&lt; 1 Detik</span>
              <span className="text-xs font-semibold text-foreground">Latensi Analisis Lokal</span>
              <span className="text-[11px] text-muted-foreground">Pemindaian instan di JavaScript peramban</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">100%</span>
              <span className="text-xs font-semibold text-foreground">Zero-Cloud Storage</span>
              <span className="text-[11px] text-muted-foreground">Isi loker tidak pernah direkam server</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-foreground font-mono">Rp 0</span>
              <span className="text-xs font-semibold text-foreground">Akses Publik Terbuka</span>
              <span className="text-[11px] text-muted-foreground">Gratis, tanpa akun, tanpa langganan</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TIGA PILAR EKOSISTEM PERLINDUNGAN (Section 1 Prototype) */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <Badge variant="outline" className="w-fit mx-auto text-xs font-mono uppercase tracking-wider">
              Arsitektur Solusi Terintegrasi
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Tiga Pilar Ekosistem Perlindungan Terintegrasi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Mendampingi pencari kerja secara preventif, mulai dari deteksi teks, pengawalan tahapan lamaran,
              hingga transparansi data kejahatan rekrutmen publik.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="group flex flex-col justify-between hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  Job Scam Checker
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Pemeriksa indikasi penipuan berbasis rule engine lokal:
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    <li>• Pemicu Kritis K1 (Tiket biro travel & reimburse palsu)</li>
                    <li>• Pemicu Kritis K2 (Pencurian OTP & kredensial akun)</li>
                    <li>• Pemicu Kritis K3 (Tugas berbayar & setoran deposit)</li>
                    <li>• Penyamaran otomatis nomor telepon & NIK KTP</li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigateToTab('scanner')}
                  className="w-full text-xs font-medium justify-between active:scale-[0.98] transition-transform"
                >
                  <span>Buka Job Scam Checker</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>

            {/* Card 2 */}
            <Card className="group flex flex-col justify-between hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  Personal Job Tracker
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Papan Kanban pelacakan lamaran dengan pengaman stage-gate:
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    <li>• 4 Kolom Status (Wishlist, Applied, Interview, Offering)</li>
                    <li>• Stage-Gate Checkpoint sebelum wawancara & offering</li>
                    <li>• Zero-Knowledge Seed ID Vault untuk sinkronisasi aman</li>
                    <li>• Ekspor dan impor cadangan data lokal terenkripsi</li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigateToTab('tracker')}
                  className="w-full text-xs font-medium justify-between active:scale-[0.98] transition-transform"
                >
                  <span>Buka Personal Job Tracker</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>

            {/* Card 3 */}
            <Card className="group flex flex-col justify-between hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <CardHeader className="space-y-3">
                <CardTitle className="text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  Edukasi & Lapor Terbuka
                </CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  Pusat wawasan komunitas dan transparansi modus kejahatan:
                  <ul className="mt-2 space-y-1.5 text-muted-foreground">
                    <li>• Direktori domain situs resmi BUMN & korporat terverifikasi</li>
                    <li>• Formulir lapor kasus dengan sanitasi & redaksi otomatis</li>
                    <li>• Dashboard statistik tren modus agregat publik</li>
                    <li>• Unduh dataset terbuka (CSV) untuk riset & publik</li>
                  </ul>
                </CardDescription>
              </CardHeader>
              <div className="p-6 pt-0">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNavigateToTab('dashboard')}
                  className="w-full text-xs font-medium justify-between active:scale-[0.98] transition-transform"
                >
                  <span>Buka Dashboard Transparansi</span>
                  <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 5. ALUR PEMERIKSAAN CEPAT: HANYA 3 DETIK (Section 2 Prototype) */}
      <section className="py-16 border-b border-border bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Alur Pemeriksaan Cepat: Hanya 3 Detik
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Didesain khusus untuk kemudahan dan kecepatan saat Anda menerima tawaran mencurigakan di ponsel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-border bg-card flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-2xl font-black text-primary">01</span>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Salin & Tempel Teks
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Salin seluruh isi pesan lowongan kerja atau undangan interview dari WhatsApp, SMS, Telegram, Instagram,
                atau email rekruter ke kolom input teks.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-2xl font-black text-primary">02</span>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Analisis Instan Lokal
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mesin rule engine JavaScript langsung memindai 10 pola indikator penipuan dalam milidetik di perangkat Anda
                tanpa mentransmisikan teks ke server luar.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card flex flex-col gap-3 shadow-xs">
              <span className="font-mono text-2xl font-black text-primary">03</span>
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Hasil Skor & Panduan
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dapatkan skor risiko objektif (0-100), kutipan baris yang mencurigakan, checklist verifikasi mandiri,
                serta opsi menyimpan ke Job Tracker Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BENCHMARK SIMULASI DETEKSI: KASUS NYATA (Section 3 Prototype) */}
      <section className="py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Simulasi Hasil Deteksi: Perbandingan Kasus Nyata
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Bukti akurasi deteksi dual-verification antara pengumuman lowongan resmi dengan modus penipuan berbobot kritis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Loker Resmi Terpercaya */}
            <Card className="border-emerald-500/30 bg-emerald-500/5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-sm font-bold text-foreground">
                    PT Telekomunikasi Indonesia (Telkom)
                  </CardTitle>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                    Skor: 0 / 100
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-md bg-background/80 border border-border space-y-1 font-mono text-[11px] text-muted-foreground leading-relaxed">
                  <p>• Pendaftaran hanya melalui portal resmi: telkom.co.id/career</p>
                  <p>• Proses rekrutmen ini TIDAK dipungut biaya apapun</p>
                  <p>• Tidak bekerjasama dengan biro perjalanan manapun</p>
                </div>
              </CardContent>
            </Card>

            {/* Modus Penipuan Kritis */}
            <Card className="border-destructive/40 bg-destructive/5 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <CardTitle className="text-sm font-bold text-foreground">
                    Panggilan Seleksi Pertamina Palsu (Travel Scam)
                  </CardTitle>
                  <span className="text-xs font-mono font-bold text-destructive shrink-0">
                    Skor: 70 / 100
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <div className="p-3 rounded-md bg-background/80 border border-destructive/20 space-y-1 font-mono text-[11px] text-destructive leading-relaxed">
                  <p>• "Peserta wajib transfer biaya reservasi tiket travel rekanan"</p>
                  <p>• "Uang tiket akan diganti (reimburse) 100% setelah tiba di lokasi tes"</p>
                  <p>• "Segera konfirmasi ke WhatsApp Admin: 081298765432, kuota terbatas!"</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 7. JAMINAN PRIVASI MUTLAK: ZERO-DATA COLLECTION (Section 4 Prototype) */}
      <section className="py-14 border-b border-border bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
            Privasi Anda Bukan Komoditas: Zero-Data Collection
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-2xl">
            Teks lowongan kerja yang Anda tempelkan dianalisis 100% di peramban web Anda. KerjaArah tidak memiliki
            server penyimpan riwayat teks lowongan, tidak mencatat IP address pengguna, dan tidak menjual data pencari kerja.
            Satu-satunya data yang dikirim adalah laporan sukarela masyarakat yang telah disanitasi dari data pribadi.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenMetodologi}
              className="text-xs font-medium"
            >
              <Scale className="size-3.5 mr-1.5 text-muted-foreground" />
              Transparansi Metodologi & Bobot Scoring
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenAbout}
              className="text-xs font-medium"
            >
              <Info className="size-3.5 mr-1.5 text-muted-foreground" />
              Tentang KerjaArah
            </Button>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION (Section 5 Prototype) */}
      <section className="py-16 border-b border-border bg-gradient-to-t from-muted/40 to-background text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-5">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Siap Melamar Pekerjaan dengan Lebih Tenang dan Terlindungi?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Gunakan KerjaArah gratis sekarang juga tanpa registrasi akun atau langganan apa pun.
          </p>
          <Button
            onClick={() => onNavigateToTab('scanner')}
            size="lg"
            className="text-sm font-semibold h-11 px-8 shadow-sm active:scale-[0.98] hover:shadow-md transition-all duration-200"
          >
            Mulai Periksa Loker Sekarang
            <ArrowRight className="size-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* 9. HI-FI FOOTER */}
      <footer className="py-12 bg-card text-muted-foreground text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-border">
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-foreground font-bold text-sm">
                <img src="/logo-kerjaarah.png" alt="Logo KerjaArah" className="size-6 rounded-full" />
                <span>KerjaArah</span>
              </div>
              <p className="text-xs leading-relaxed max-w-sm">
                Platform perlindungan publik dan pemeriksa indikasi penipuan lowongan kerja otomatis berbasis Client-Side Privacy.
                Karya inisiatif inovasi digital masyarakat untuk pencari kerja aman Indonesia.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span>Zero-Cloud Storage Certified • Zero Trackers</span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
              <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Modul Solusi</span>
              <button
                onClick={() => onNavigateToTab('scanner')}
                className="text-left hover:text-foreground transition-colors"
              >
                Job Scam Checker
              </button>
              <button
                onClick={() => onNavigateToTab('tracker')}
                className="text-left hover:text-foreground transition-colors"
              >
                Personal Job Tracker (Kanban)
              </button>
              <button
                onClick={() => onNavigateToTab('dashboard')}
                className="text-left hover:text-foreground transition-colors"
              >
                Dashboard Transparansi Publik
              </button>
              <button
                onClick={() => onNavigateToTab('reporting')}
                className="text-left hover:text-foreground transition-colors"
              >
                Lapor & Lacak Kasus
              </button>
              <button
                onClick={() => onNavigateToTab('education')}
                className="text-left hover:text-foreground transition-colors"
              >
                Education Hub
              </button>
            </div>

            <div className="md:col-span-4 flex flex-col gap-2">
              <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Transparansi & Etika</span>
              <button
                onClick={onOpenMetodologi}
                className="text-left hover:text-foreground transition-colors"
              >
                Transparansi Metodologi & Scoring
              </button>
              <button
                onClick={onOpenAbout}
                className="text-left hover:text-foreground transition-colors"
              >
                Tentang KerjaArah & Hak Cipta
              </button>
              <button
                onClick={() => onNavigateToTab('checklist')}
                className="text-left hover:text-foreground transition-colors"
              >
                Checklist Keselamatan Kerja Mandiri
              </button>
              <p className="text-[11px] pt-2 text-muted-foreground leading-relaxed">
                Platform ini menyediakan bantuan penapisan indikasi risiko awal dan bukan merupakan opini hukum mengikat.
              </p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
            <span>© 2026 KerjaArah. Seluruh hak cipta dilindungi.</span>
            <span>Dirancang untuk Keamanan dan Ketenteraman Karir Pencari Kerja Indonesia.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
