import React, { useState, useEffect } from 'react'
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  Briefcase,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Lock,
  Eye,
  RefreshCw,
  BarChart3,
  FileText,
  Scale,
  Send,
  Info,
  PlayCircle,
  Home,
  KeyRound,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { analyzeJobDescription, type AnalysisResult } from '@/lib/ruleEngine'
import { sendOptInStatEvent, getArticles, getChecklist, type ArticleItem, type ChecklistItem } from '@/lib/api'
import { DashboardTransparansi } from '@/components/DashboardTransparansi'
import { LaporLacak } from '@/components/LaporLacak'
import { PanduanVerifikasi } from '@/components/PanduanVerifikasi'
import { MetodologiModal } from '@/components/MetodologiModal'
import { AboutModal } from '@/components/AboutModal'
import { LandingPage } from '@/components/LandingPage'
import { SeedIdVaultModal } from '@/components/SeedIdVaultModal'

// Skenario Loker Pre-loaded untuk kemudahan pengujian juri/evaluator
const SAMPLE_JOBS = [
  {
    title: 'Loker Normal (PT Telekomunikasi Indonesia)',
    badge: 'Valid',
    text: `Lowongan Kerja: Frontend Developer di PT Telkom Indonesia.
Kualifikasi:
- Lulusan S1 Informatika / Sistem Informasi / Terkait
- Menguasai React, TypeScript, dan Tailwind CSS
- Pengalaman minimal 1 tahun
Proses pendaftaran hanya melalui portal resmi telkom.co.id/career.
Perhatian: Proses rekrutmen ini tidak dipungut biaya apapun dan tidak bekerja sama dengan biro perjalanan manapun.`,
  },
  {
    title: 'Modus K1: Tiket Travel & Akomodasi Palsu',
    badge: 'Penipuan Kritis K1',
    text: `PANGGILAN SELEKSI KERJA PT PERTAMINA (PERSERO).
Selamat, Anda dinyatakan lolos seleksi berkas. Tes wawancara diadakan di Kantor Pusat Jakarta.
Peserta wajib transfer biaya reservasi tiket pesawat dan akomodasi hotel sebesar Rp 1.750.000 kepada pihak biro travel rekanan (Angkasa Tour).
Seluruh uang akomodasi akan diganti (reimburse) 100% setelah tiba di lokasi tes.
Segera konfirmasi ke WhatsApp Admin: 081298765432. Kuota terbatas hanya hari ini!`,
  },
  {
    title: 'Modus K2: Pencurian OTP & Akses Akun',
    badge: 'Penipuan Kritis K2',
    text: `Penerimaan Staf Administrasi Online WFH.
Gaji 5-8 juta per bulan tanpa syarat pengalaman.
Untuk validasi pendaftaran dan pembuatan nomor kepegawaian, admin telah mengirimkan SMS verifikasi ke nomor Anda.
Ketik kode OTP 6 digit yang masuk ke SMS dan berikan ke kami dalam waktu 10 menit agar berkas Anda diproses.`,
  },
  {
    title: 'Modus K3: Tugas Berbayar & Setoran Deposit',
    badge: 'Penipuan Kritis K3',
    text: `Lowongan Freelance Like & Subscribe YouTube / TikTok!
Cukup kerja santai dari rumah, tugas hanya subscribe channel dan screenshot bukti.
Tugas harian dibayar Rp 20.000 per video. Untuk membuka komisi level VIP dan bonus harian hingga Rp 500.000, peserta wajib melakukan top up modal awal sebesar Rp 250.000 ke nomor rekening perusahaan. Pasti cair 100%!`,
  },
]

// Data Pelacak Lamaran (Job Tracker)
interface JobApplication {
  id: string
  company: string
  position: string
  status: 'wishlist' | 'applied' | 'interview' | 'offering'
  riskCategory: 'Rendah' | 'Sedang' | 'Tinggi' | 'Belum Dicek'
  riskScore?: number
  notes: string
  dateAdded: string
}

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing')
  const [activeTab, setActiveTab] = useState<'scanner' | 'tracker' | 'dashboard' | 'reporting' | 'education' | 'checklist'>('scanner')
  const [jobText, setJobText] = useState(SAMPLE_JOBS[1].text)
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null)
  const [isSeedVaultOpen, setIsSeedVaultOpen] = useState(false)

  const handleNavigateToTab = (tab: 'scanner' | 'tracker' | 'dashboard' | 'reporting' | 'education' | 'checklist') => {
    setActiveTab(tab)
    setCurrentView('app')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // State Job Tracker
  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem('kerjaarah_applications')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        // fallback
      }
    }
    return [
      {
        id: '1',
        company: 'PT Pertamina Rekrutmen (Palsu)',
        position: 'Staff Administrasi',
        status: 'applied',
        riskCategory: 'Tinggi',
        riskScore: 70,
        notes: 'Dapat undangan interview via WA dengan permintaan travel.',
        dateAdded: '2026-10-25',
      },
      {
        id: '2',
        company: 'PT Telkom Indonesia',
        position: 'Frontend Engineer',
        status: 'wishlist',
        riskCategory: 'Rendah',
        riskScore: 0,
        notes: 'Loker dari situs resmi karir.telkom.co.id',
        dateAdded: '2026-10-26',
      },
    ]
  })

  // State Modal Dialog Baru & Stage-Gate
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCompany, setNewCompany] = useState('')
  const [newPosition, setNewPosition] = useState('')
  const [newNotes, setNewNotes] = useState('')

  // State Modal Transparansi Metodologi & About
  const [isMetodologiOpen, setIsMetodologiOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  // State Konfirmasi Hapus Tracker & Feedback Toast
  const [deletingJob, setDeletingJob] = useState<JobApplication | null>(null)
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null)

  // State Articles dari Backend API (single source of truth)
  const [articles, setArticles] = useState<ArticleItem[]>([])
  useEffect(() => {
    getArticles().then(setArticles).catch(() => { })
  }, [])

  // State Data Prefill untuk Lapor Lowongan
  const [reportPrefill, setReportPrefill] = useState({
    text: '',
    category: 'Tiket Travel / Akomodasi Palsu',
    company: '',
  })

  // State Stage Gate Checkpoint Modal
  const [stageGateJob, setStageGateJob] = useState<JobApplication | null>(null)
  const [targetStage, setTargetStage] = useState<'interview' | 'offering' | null>(null)

  // Simpan ke LocalStorage jika applications berubah
  useEffect(() => {
    localStorage.setItem('kerjaarah_applications', JSON.stringify(applications))
  }, [applications])

  // Jalankan analisis awal
  useEffect(() => {
    if (jobText) {
      const res = analyzeJobDescription(jobText)
      setAnalysis(res)
    }
  }, [jobText])

  const resultRef = React.useRef<HTMLDivElement>(null)

  const handleScan = () => {
    const res = analyzeJobDescription(jobText)
    setAnalysis(res)
    if (res.triggers.length > 0) {
      // Kirim event indikator opt-in secara anonim untuk statistik dashboard
      sendOptInStatEvent(
        res.triggers.map((t) => t.code),
        res.category
      )
    }
    // Auto-scroll halus ke hasil analisis (terutama sangat membantu di layar mobile)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
  }

  const handlePassToReporting = () => {
    const firstLine = jobText.trim().split('\n')[0] || ''
    let detectedCategory = 'Tiket Travel / Akomodasi Palsu'
    if (analysis?.triggers && analysis.triggers.length > 0) {
      const topTrig = analysis.triggers[0]
      if (topTrig.code === 'K1') detectedCategory = 'Tiket Travel / Akomodasi Palsu'
      else if (topTrig.code === 'K2') detectedCategory = 'Pencurian OTP & Kredensial'
      else if (topTrig.code === 'K3') detectedCategory = 'Tugas Like & Subscribe (Ponzi)'
      else if (topTrig.code === 'T1') detectedCategory = 'Permintaan Data Sensitif / KTP'
    }
    setReportPrefill({
      text: jobText,
      category: detectedCategory,
      company: firstLine.slice(0, 40),
    })
    setActiveTab('reporting')
  }

  const handleSaveToTracker = () => {
    const firstLine = jobText.trim().split('\n')[0] || 'Perusahaan'
    const newApp: JobApplication = {
      id: Date.now().toString(),
      company: firstLine.slice(0, 30),
      position: 'Posisi Tertera',
      status: 'wishlist',
      riskCategory: analysis?.category || 'Belum Dicek',
      riskScore: analysis?.score || 0,
      notes: `Hasil scan: Risiko ${analysis?.category || 'N/A'} (Skor ${analysis?.score || 0}). Indikator terpicu: ${analysis?.triggers.map((t) => t.code).join(', ') || 'Nihil'}`,
      dateAdded: new Date().toISOString().split('T')[0],
    }
    setApplications([newApp, ...applications])
    setFeedbackToast('✅ Lowongan berhasil disimpan ke Personal Job Tracker!')
    setTimeout(() => setFeedbackToast(null), 3500)
    setActiveTab('tracker')
  }

  // Stage gate handler
  const requestMoveStage = (job: JobApplication, nextStage: 'wishlist' | 'applied' | 'interview' | 'offering') => {
    if (nextStage === 'interview' || nextStage === 'offering') {
      setStageGateJob(job)
      setTargetStage(nextStage)
    } else {
      updateStageDirectly(job.id, nextStage)
    }
  }

  const updateStageDirectly = (id: string, nextStage: 'wishlist' | 'applied' | 'interview' | 'offering') => {
    setApplications(applications.map((app) => (app.id === id ? { ...app, status: nextStage } : app)))
    setStageGateJob(null)
    setTargetStage(null)
  }

  const confirmDeleteJob = () => {
    if (deletingJob) {
      setApplications(applications.filter((a) => a.id !== deletingJob.id))
      setDeletingJob(null)
      setFeedbackToast('Lamaran berhasil dihapus dari Job Tracker.')
      setTimeout(() => setFeedbackToast(null), 3000)
    }
  }

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCompany) return
    const newApp: JobApplication = {
      id: Date.now().toString(),
      company: newCompany,
      position: newPosition || 'Pendaftar',
      status: 'wishlist',
      riskCategory: 'Belum Dicek',
      notes: newNotes,
      dateAdded: new Date().toISOString().split('T')[0],
    }
    setApplications([newApp, ...applications])
    setNewCompany('')
    setNewPosition('')
    setNewNotes('')
    setIsAddModalOpen(false)
  }

  const [isLightMode, setIsLightMode] = useState<boolean>(false)

  const toggleTheme = () => {
    const next = !isLightMode
    setIsLightMode(next)
    if (next) {
      document.documentElement.classList.remove('dark')
      document.documentElement.classList.add('light')
    } else {
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }
  }

  if (currentView === 'landing') {
    return (
      <>
        <LandingPage
          onNavigateToTab={handleNavigateToTab}
          onOpenAbout={() => setIsAboutOpen(true)}
          onOpenMetodologi={() => setIsMetodologiOpen(true)}
          isLightMode={isLightMode}
          onToggleTheme={toggleTheme}
        />
        <MetodologiModal open={isMetodologiOpen} onOpenChange={setIsMetodologiOpen} />
        <AboutModal open={isAboutOpen} onOpenChange={setIsAboutOpen} />
      </>
    )
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground transition-colors duration-150 flex flex-col">
      {/* Top Banner: Privacy-First & Competition Context */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="size-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="size-4.5" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-sm sm:text-base tracking-tight text-foreground block truncate">
                KerjaArah
              </span>
              <p className="text-[11px] text-muted-foreground hidden sm:block truncate">
                Cari Kerja Lebih Aman, Kenali Risiko Sebelum Melamar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentView('landing')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-xs h-9 px-2.5 sm:px-3 font-medium min-w-[36px] flex items-center gap-1.5"
              title="Kembali ke Landing Page Utama"
            >
              <Home className="size-3.5 text-primary" />
              <span className="hidden sm:inline">Landing Page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAboutOpen(true)}
              className="text-xs h-9 min-h-[36px] hidden sm:flex items-center font-medium"
            >
              <Info className="size-3.5 mr-1.5 text-muted-foreground" />
              Tentang KerjaArah
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsMetodologiOpen(true)}
              className="text-xs h-9 min-h-[36px] hidden md:flex items-center font-medium"
            >
              <Scale className="size-3.5 mr-1.5 text-muted-foreground" />
              Transparansi Metodologi
            </Button>
            <div className="hidden lg:flex items-center gap-2 text-[11px] px-2.5 py-1.5 rounded-md border border-border bg-muted/50 text-muted-foreground">
              <div className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Zero-Cloud Storage</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="text-xs h-9 px-2.5 sm:px-3 font-medium min-w-[36px]"
              title="Ganti Mode Tampilan (Gelap / Terang)"
            >
              <span className="sm:hidden">{isLightMode ? '🌙' : '☀️'}</span>
              <span className="hidden sm:inline">{isLightMode ? '🌙 Mode Gelap' : '☀️ Mode Terang'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setJobText('')
                setAnalysis(null)
              }}
              className="text-xs h-9 px-2.5 sm:px-3 font-medium min-w-[36px]"
              title="Reset Input Teks"
            >
              <RefreshCw className="size-3.5 sm:mr-1" />
              <span className="hidden sm:inline">Reset Input</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Toast Feedback Notifikasi */}
      {feedbackToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200 max-w-[calc(100vw-2rem)]">
          <div className="bg-card text-card-foreground border border-border px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 text-xs font-medium">
            <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
            <span>{feedbackToast}</span>
            <button onClick={() => setFeedbackToast(null)} className="ml-2 hover:opacity-75 text-sm font-bold">×</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-8 flex-1 w-full pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as typeof activeTab)} className="flex flex-col gap-5 sm:gap-6">
          <div className="overflow-x-auto no-scrollbar -mx-3.5 px-3.5 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex w-max min-w-full justify-start p-1.5 rounded-xl border border-border bg-muted/60 gap-1.5">
              <TabsTrigger value="scanner" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <ShieldAlert className="size-3.5 mr-1.5" />
                Job Scam Checker
              </TabsTrigger>
              <TabsTrigger value="tracker" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <Briefcase className="size-3.5 mr-1.5" />
                Personal Job Tracker
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <BarChart3 className="size-3.5 mr-1.5" />
                Dashboard Transparansi
              </TabsTrigger>
              <TabsTrigger value="reporting" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <FileText className="size-3.5 mr-1.5" />
                Lapor & Lacak
              </TabsTrigger>
              <TabsTrigger value="education" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <BookOpen className="size-3.5 mr-1.5" />
                Education Hub
              </TabsTrigger>
              <TabsTrigger value="checklist" className="text-xs px-3 py-2 min-h-[38px] whitespace-nowrap">
                <CheckCircle2 className="size-3.5 mr-1.5" />
                Checklist & Verifikasi
              </TabsTrigger>
            </TabsList>
          </div>

          {/* TAB 1: SCANNER */}
          <TabsContent value="scanner" className="flex flex-col gap-5 sm:gap-6">
            {/* Quick Skenario Bar */}
            <div className="rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 border border-border bg-card shadow-xs">
              <div className="flex items-center gap-2 shrink-0">
                <PlayCircle className="size-4 text-primary shrink-0" />
                <span className="text-xs font-semibold text-foreground whitespace-nowrap">Contoh Kasus Uji:</span>
              </div>
              <div className="flex overflow-x-auto no-scrollbar pb-1 gap-2 w-full sm:w-auto -mx-1 px-1">
                {SAMPLE_JOBS.map((sample, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => setJobText(sample.text)}
                    className="text-xs font-medium shrink-0 min-h-[36px] active:scale-[0.98] transition-transform"
                  >
                    {sample.badge}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              {/* Kolom Kiri: Input Area */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <Card>
                  <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm sm:text-base font-bold flex items-center gap-2 text-foreground">
                        <span>Tempelkan Teks Lowongan Kerja</span>
                      </CardTitle>
                      <Badge variant="secondary" className="text-[11px] font-mono">
                        {jobText.length} Karakter
                      </Badge>
                    </div>
                    <CardDescription className="text-xs">
                      Teks diproses 100% lokal di browser Anda. Tidak ada data yang dikirim atau disimpan di server luar.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4 p-4 sm:p-6 pt-2 sm:pt-3">
                    <Textarea
                      rows={7}
                      value={jobText}
                      onChange={(e) => setJobText(e.target.value)}
                      placeholder="Tempel teks lowongan dari WhatsApp, Telegram, LinkedIn, atau Instagram di sini..."
                      className="font-mono text-xs leading-relaxed sm:min-h-[180px] lg:min-h-[220px]"
                    />

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Lock className="size-3.5 text-emerald-500 shrink-0" />
                        <span className="text-[11px] sm:text-xs">Nomor telepon & NIK otomatis disamarkan di tampilan hasil.</span>
                      </div>
                      <Button
                        onClick={handleScan}
                        className="w-full sm:w-auto min-h-[44px] sm:min-h-[38px] text-xs sm:text-sm px-5 py-2.5 font-semibold active:scale-[0.98] transition-transform shadow-xs"
                      >
                        <Shield className="size-4 mr-2" />
                        Analisis Risiko
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Info Redaksi Privasi */}
                {analysis && (
                  <Card className="bg-muted/30 border-border">
                    <CardHeader className="py-3">
                      <CardTitle className="text-xs text-muted-foreground flex items-center gap-2">
                        <Eye className="size-3.5 text-primary" />
                        Teks Setelah Redaksi Data Pribadi
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 text-xs font-mono bg-card p-3 rounded-lg border border-border max-h-36 overflow-y-auto">
                      {analysis.redactedText}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Kolom Kanan: Hasil Analisis */}
              <div ref={resultRef} className="lg:col-span-5 flex flex-col gap-4 scroll-mt-20">
                {analysis ? (
                  <>
                    <Card
                      className={`border-2 ${analysis.category === 'Tinggi'
                          ? 'border-destructive/60 bg-destructive/5'
                          : analysis.category === 'Sedang'
                            ? 'border-amber-500/60 bg-amber-500/5'
                            : 'border-emerald-500/60 bg-emerald-500/5'
                        }`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                            Tingkat Risiko
                          </CardTitle>
                          <Badge
                            className={`text-xs font-bold px-3 py-1 ${analysis.category === 'Tinggi'
                                ? 'bg-destructive/20 text-destructive border border-destructive/30'
                                : analysis.category === 'Sedang'
                                  ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30'
                                  : 'bg-emerald-500/20 text-emerald-600 border border-emerald-500/30'
                              }`}
                          >
                            Risiko {analysis.category}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-4">
                        <div className="flex items-baseline justify-between">
                          <span className="text-4xl font-black text-foreground tracking-tight">
                            {analysis.score}
                            <span className="text-base text-muted-foreground font-normal"> / 100</span>
                          </span>
                          <span className="text-xs text-muted-foreground font-medium">
                            {analysis.triggers.length} Indikator Terdeteksi
                          </span>
                        </div>

                        <Progress
                          value={analysis.score}
                          className={`h-2.5 bg-muted ${analysis.category === 'Tinggi'
                              ? '[&>div]:bg-destructive'
                              : analysis.category === 'Sedang'
                                ? '[&>div]:bg-amber-500'
                                : '[&>div]:bg-emerald-500'
                            }`}
                        />

                        {analysis.hasCriticalOverride && (
                          <Alert variant="destructive" className="py-2">
                            <AlertTriangle className="size-4" />
                            <AlertTitle className="text-xs font-bold">Aturan Override Kritis Aktif</AlertTitle>
                            <AlertDescription className="text-xs">
                              Meskipun total skor di bawah 60, terdeteksi indikator Kritis (permintaan uang/OTP). Kategori otomatis dinaikkan ke TINGGI.
                            </AlertDescription>
                          </Alert>
                        )}

                        <p className="text-xs text-foreground leading-relaxed font-normal">
                          {analysis.category === 'Tinggi'
                            ? 'Sangat berbahaya! Ditemukan tanda penipuan rekrutmen yang jelas. JANGAN mentransfer dana, membagikan OTP, atau mengirim foto KTP.'
                            : analysis.category === 'Sedang'
                              ? 'Waspada! Ditemukan indikasi yang tidak lazim pada proses rekrutmen. Lakukan verifikasi ke kanal resmi perusahaan sebelum membagikan data.'
                              : 'Belum ditemukan indikator bahaya yang kuat. Tetap pastikan email dan situs yang digunakan sesuai dengan domain resmi korporat.'}
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 sm:p-6 pt-3 border-t border-border flex flex-col sm:flex-row gap-2.5">
                        <Button
                          variant="secondary"
                          onClick={handleSaveToTracker}
                          className="w-full min-h-[44px] sm:min-h-[38px] text-xs font-semibold active:scale-[0.98] transition-transform"
                        >
                          <Briefcase className="size-3.5 mr-2 text-primary shrink-0" />
                          Simpan ke Job Tracker
                        </Button>
                        <Button
                          variant="default"
                          onClick={handlePassToReporting}
                          className="w-full min-h-[44px] sm:min-h-[38px] text-xs font-semibold active:scale-[0.98] transition-transform"
                        >
                          <Send className="size-3.5 mr-2 shrink-0" />
                          Laporkan ke Publik
                        </Button>
                      </CardFooter>
                    </Card>

                    {/* Rincian Indikator Terpicu */}
                    <Card>
                      <CardHeader className="py-3">
                        <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-bold">
                          Rincian Indikator yang Terpicu ({analysis.triggers.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col gap-3 max-h-[380px] overflow-y-auto">
                        {analysis.triggers.length === 0 ? (
                          <div className="py-8 text-center text-muted-foreground text-xs">
                            Tidak ada indikator mencurigakan yang terpicu.
                          </div>
                        ) : (
                          analysis.triggers.map((trig, idx) => (
                            <div
                              key={idx}
                              className="p-3.5 rounded-xl border border-border bg-muted/40 flex flex-col gap-2"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-foreground">
                                  [{trig.code}] {trig.name}
                                </span>
                                <Badge
                                  variant="outline"
                                  className={`text-[10px] px-1.5 py-0 font-bold ${trig.severity === 'Kritis'
                                      ? 'border-destructive/40 text-destructive bg-destructive/10'
                                      : trig.severity === 'Tinggi'
                                        ? 'border-amber-500/40 text-amber-500 bg-amber-500/10'
                                        : 'border-yellow-500/40 text-yellow-600 bg-yellow-500/10'
                                    }`}
                                >
                                  +{trig.weight} Poin
                                </Badge>
                              </div>
                              <div className="text-xs text-foreground italic bg-card px-2.5 py-1.5 rounded border-l-2 border-primary font-mono">
                                "{trig.matchedText}"
                              </div>
                              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                                {trig.explanation}
                              </p>
                            </div>
                          ))
                        )}
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <div className="h-full flex items-center justify-center p-8 border border-dashed border-border rounded-xl text-muted-foreground text-sm text-center">
                    Klik "Analisis Risiko" untuk melihat hasil evaluasi loker di sini.
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* TAB 2: PERSONAL JOB TRACKER (KANBAN) */}
          <TabsContent value="tracker" className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border p-4 rounded-xl">
              <div>
                <h2 className="text-base font-bold text-foreground flex items-center gap-2">
                  <Briefcase className="size-5 text-primary" />
                  Brankas Lamaran Pribadi (Job Tracker)
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Pantau alur lamaran dengan <span className="text-primary font-semibold">Stage-Gate Safety Checkpoints</span> di setiap fase kritis (Interview & Offering).
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSeedVaultOpen(true)}
                  className="text-xs font-medium h-9"
                  title="Buka Brankas Kunci Pemulihan Zero-Knowledge (Seed ID)"
                >
                  <KeyRound className="size-4 mr-1.5 text-primary" />
                  Kunci Seed ID (Vault)
                </Button>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-xs font-medium h-9"
                >
                  <Plus className="size-4 mr-1.5" />
                  Tambah Lamaran Baru
                </Button>
              </div>
            </div>

            {/* Kanban Columns (4 Kolom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Kolom 1: Wishlist */}
              <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-3 min-h-[140px] sm:min-h-[450px]">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Wishlist / Disimpan
                  </span>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {applications.filter((a) => a.status === 'wishlist').length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {applications
                    .filter((a) => a.status === 'wishlist')
                    .map((job) => (
                      <JobCard key={job.id} job={job} onRequestMove={requestMoveStage} onDelete={() => setDeletingJob(job)} />
                    ))}
                </div>
              </div>

              {/* Kolom 2: Applied */}
              <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-3 min-h-[140px] sm:min-h-[450px]">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                    Dilamar (Applied)
                  </span>
                  <Badge variant="secondary" className="text-xs font-mono">
                    {applications.filter((a) => a.status === 'applied').length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {applications
                    .filter((a) => a.status === 'applied')
                    .map((job) => (
                      <JobCard key={job.id} job={job} onRequestMove={requestMoveStage} onDelete={() => setDeletingJob(job)} />
                    ))}
                </div>
              </div>

              {/* Kolom 3: Interview (Stage-Gate Alert) */}
              <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-3 min-h-[140px] sm:min-h-[450px]">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldAlert className="size-3.5" />
                    Wawancara (Interview)
                  </span>
                  <Badge variant="secondary" className="text-xs font-mono text-amber-500 bg-amber-500/10 border border-amber-500/20">
                    {applications.filter((a) => a.status === 'interview').length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {applications
                    .filter((a) => a.status === 'interview')
                    .map((job) => (
                      <JobCard key={job.id} job={job} onRequestMove={requestMoveStage} onDelete={() => setDeletingJob(job)} />
                    ))}
                </div>
              </div>

              {/* Kolom 4: Offering */}
              <div className="bg-card border border-border rounded-xl p-3 flex flex-col gap-3 min-h-[140px] sm:min-h-[450px]">
                <div className="flex items-center justify-between pb-2 border-b border-border">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5" />
                    Penawaran (Offering)
                  </span>
                  <Badge variant="secondary" className="text-xs font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20">
                    {applications.filter((a) => a.status === 'offering').length}
                  </Badge>
                </div>
                <div className="flex flex-col gap-3 flex-1">
                  {applications
                    .filter((a) => a.status === 'offering')
                    .map((job) => (
                      <JobCard key={job.id} job={job} onRequestMove={requestMoveStage} onDelete={() => setDeletingJob(job)} />
                    ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: EDUCATION HUB */}
          <TabsContent value="education" className="space-y-6">
            <div className="rounded-xl border border-border bg-card p-6 shadow-xs">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="size-5 text-primary" />
                Education Hub & Ensiklopedia Modus Penipuan
              </h2>
              <p className="text-xs text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                Pelajari ragam skema kejahatan rekrutmen daring paling marak di Indonesia serta prosedur tanggap darurat, dan uji insting Anda dengan kuis keselamatan mandiri di bawah ini.
              </p>
            </div>

            {/* Grid Artikel Modus (Single Source of Truth via API / Fallback 6 Artikel) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {articles.map((item) => (
                <EducationCard
                  key={item.id || item.number}
                  number={item.number}
                  title={item.title}
                  riskLevel={item.risk_level}
                  description={item.description}
                  redFlags={item.red_flags}
                />
              ))}
            </div>

            {/* Interactive Safety Quiz */}
            <Card className="shadow-xs">
              <CardHeader>
                <CardTitle className="text-base text-foreground flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                  Kuis Interaktif Mandiri: Tes Ketajaman Deteksi Loker
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Uji insting Anda menghadapi skenario rekrutmen nyata. Nilai langsung dihitung di peramban Anda.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <InteractiveQuiz />
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 3: DASHBOARD TRANSPARANSI */}
          <TabsContent value="dashboard" className="space-y-6">
            <DashboardTransparansi
              onOpenReportTab={() => setActiveTab('reporting')}
              onOpenMetodologi={() => setIsMetodologiOpen(true)}
            />
          </TabsContent>

          {/* TAB 4: LAPOR & LACAK (CIVIC REPORTING & TRACKING) */}
          <TabsContent value="reporting" className="space-y-6">
            <LaporLacak
              initialJobText={reportPrefill.text}
              initialCategory={reportPrefill.category}
              initialCompany={reportPrefill.company}
              onReportSubmitted={() => {
                // Berhasil melapor
              }}
            />
          </TabsContent>

          {/* TAB 5: SAFETY CHECKLIST & VERIFIKASI */}
          <TabsContent value="checklist" className="space-y-8">
            <Card className="shadow-xs">
              <CardHeader>
                <CardTitle className="text-base text-foreground flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-primary" />
                  Checklist Keselamatan Mandiri Sebelum Melamar
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Jawab pertanyaan berikut secara jujur untuk mengukur kelayakan lowongan kerja sebelum Anda mengirimkan berkas atau data pribadi.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SafetyChecklistInteractive />
              </CardContent>
            </Card>

            {/* Panduan & Direktori Verifikasi Perusahaan Resmi */}
            <PanduanVerifikasi />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modal Dialog Transparansi Metodologi & About */}
      <MetodologiModal open={isMetodologiOpen} onOpenChange={setIsMetodologiOpen} />
      <AboutModal open={isAboutOpen} onOpenChange={setIsAboutOpen} />

      {/* Modal Dialog Seed ID Vault (Zero-Knowledge) */}
      <SeedIdVaultModal
        isOpen={isSeedVaultOpen}
        onClose={() => setIsSeedVaultOpen(false)}
        applications={applications}
        onRestoreApplications={(apps) => {
          setApplications(apps)
          setFeedbackToast('✅ Berhasil memulihkan riwayat lamaran dari Brankas!')
          setTimeout(() => setFeedbackToast(null), 3500)
        }}
      />

      {/* Modal Dialog Konfirmasi Hapus Lamaran */}
      <Dialog open={!!deletingJob} onOpenChange={() => setDeletingJob(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <Trash2 className="size-5" />
              <DialogTitle className="text-destructive font-bold">Hapus Lamaran?</DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Apakah Anda yakin ingin menghapus data lamaran <span className="text-foreground font-semibold">{deletingJob?.company}</span> ({deletingJob?.position}) dari tracker lokal? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0 mt-3">
            <Button variant="outline" size="sm" onClick={() => setDeletingJob(null)} className="text-xs">
              Batal
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={confirmDeleteJob}
              className="text-xs font-semibold"
            >
              Ya, Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Dialog Tambah Lamaran */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold">Tambah Lamaran ke Job Tracker</DialogTitle>
            <DialogDescription className="text-xs">
              Simpan informasi lamaran untuk dipantau dengan Stage-Gate Checkpoint keselamatan.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateApplication} className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Nama Perusahaan *</label>
              <Input
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="mis. PT Bank Mandiri (Persero)"
                required
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Posisi / Jabatan</label>
              <Input
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                placeholder="mis. Data Analyst"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground block mb-1">Catatan Tambahan</label>
              <Textarea
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                placeholder="mis. Dapat info dari JobStreet, kontak HR Pak Budi"
                rows={3}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Batal
              </Button>
              <Button type="submit">
                Simpan Lamaran
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal Dialog STAGE-GATE SAFETY CHECKPOINT */}
      <Dialog open={!!stageGateJob} onOpenChange={() => setStageGateJob(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="size-5" />
              <DialogTitle className="text-amber-600 dark:text-amber-400 font-bold">
                {targetStage === 'interview'
                  ? 'Stage-Gate: Peringatan Undangan Wawancara'
                  : 'Stage-Gate: Verifikasi Penawaran Kerja (Offering)'}
              </DialogTitle>
            </div>
            <DialogDescription className="text-xs">
              Untuk perusahaan: <span className="text-foreground font-semibold">{stageGateJob?.company}</span>
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 text-xs space-y-3">
            {targetStage === 'interview' ? (
              <div className="space-y-2 bg-amber-500/10 border border-amber-500/30 p-3.5 rounded-lg text-amber-900 dark:text-amber-200">
                <p className="font-semibold text-xs text-amber-700 dark:text-amber-300">Waspada Modus Undangan Fiktif:</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  <li>Apakah Anda diminta mentransfer uang reservasi tiket/hotel ke biro travel tertentu?</li>
                  <li>Apakah lokasi wawancara berada di luar kota dan berbeda dengan lokasi penempatan loker?</li>
                  <li>Apakah surat panggilan menggunakan format kop surat resmi dan alamat email perusahaan?</li>
                </ul>
              </div>
            ) : (
              <div className="space-y-2 bg-emerald-500/10 border border-emerald-500/30 p-3.5 rounded-lg text-emerald-900 dark:text-emerald-200">
                <p className="font-semibold text-xs text-emerald-700 dark:text-emerald-300">Checklist Final Sebelum Tanda Tangan:</p>
                <ul className="list-disc list-inside space-y-1.5 text-xs text-muted-foreground leading-relaxed">
                  <li>Pastikan TIDAK ADA klausul penahanan ijazah asli tanpa perlindungan hukum yang jelas.</li>
                  <li>Pastikan TIDAK ADA pungutan biaya peralatan, seragam, atau deposit awal.</li>
                  <li>Pastikan hak gaji, lembur, dan BPJS Ketenagakerjaan tertuang tertulis dalam kontrak.</li>
                </ul>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setStageGateJob(null)}>
              Batalkan Perpindahan
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (stageGateJob && targetStage) {
                  updateStageDirectly(stageGateJob.id, targetStage)
                }
              }}
            >
              Saya Paham & Lanjutkan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="border-t border-border bg-card/60 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kolom 1: Branding */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
                  <ShieldCheck className="size-4" />
                </div>
                <span className="font-bold text-lg text-foreground">
                  KerjaArah
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Platform Transparansi dan Pemeriksaan Indikasi Penipuan Lowongan Kerja.
              </p>
              <Badge variant="outline" className="text-xs font-semibold">
                Versi Prototipe
              </Badge>
            </div>

            {/* Kolom 2: Navigasi Cepat */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Fitur Utama
              </h4>
              <ul className="text-xs space-y-2 text-muted-foreground">
                <li><button onClick={() => setActiveTab('scanner')} className="hover:text-foreground transition-colors">→ Job Scam Checker</button></li>
                <li><button onClick={() => setActiveTab('tracker')} className="hover:text-foreground transition-colors">→ Personal Job Tracker</button></li>
                <li><button onClick={() => setActiveTab('dashboard')} className="hover:text-foreground transition-colors">→ Dashboard Transparansi</button></li>
                <li><button onClick={() => setActiveTab('reporting')} className="hover:text-foreground transition-colors">→ Lapor & Lacak Laporan</button></li>
                <li><button onClick={() => setActiveTab('education')} className="hover:text-foreground transition-colors">→ Education Hub</button></li>
                <li><button onClick={() => setActiveTab('checklist')} className="hover:text-foreground transition-colors">→ Checklist & Verifikasi</button></li>
              </ul>
            </div>

            {/* Kolom 3: Batasan Sistem & Disclaimer */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                Batasan Sistem & Disclaimer
              </h4>
              <ul className="text-xs space-y-1.5 leading-relaxed text-muted-foreground">
                <li>• KerjaArah adalah alat bantu penilaian awal, bukan penjamin keaslian lowongan.</li>
                <li>• Skor rendah bukan jaminan keamanan.</li>
                <li>• Hanya membaca teks (gambar/poster belum didukung).</li>
                <li>• Bukan lembaga penegak hukum.</li>
                <li>• Data dashboard berstatus simulasi pada tahap prototipe.</li>
              </ul>
              <div className="flex flex-col gap-1 pt-1">
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="text-left text-xs text-primary hover:underline font-semibold"
                >
                  Tentang KerjaArah, Batasan & Privasi →
                </button>
                <button
                  onClick={() => setIsMetodologiOpen(true)}
                  className="text-left text-xs text-primary hover:underline font-semibold"
                >
                  Lihat Transparansi Metodologi Lengkap →
                </button>
              </div>
            </div>
          </div>

          {/* Divider & Copyright */}
          <div className="border-t border-border mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              © 2026 KerjaArah — Multimedia In Action (MIA) 2026. Seluruh data prototipe berstatus simulasi.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs flex items-center gap-1.5 text-muted-foreground">
                <Lock className="size-3 text-emerald-600 dark:text-emerald-400" />
                Privacy-First • Zero Cloud Storage
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// -------------------------------------------------------------
// SUB-KOMPONEN KANBAN CARD
// -------------------------------------------------------------
function JobCard({
  job,
  onRequestMove,
  onDelete,
}: {
  job: JobApplication
  onRequestMove: (job: JobApplication, next: 'wishlist' | 'applied' | 'interview' | 'offering') => void
  onDelete: (id: string) => void
}) {
  return (
    <div className="p-3.5 bg-card border border-border rounded-xl shadow-xs hover:border-primary/50 transition-colors flex flex-col gap-2">
      <div className="flex items-start justify-between gap-1">
        <div>
          <h4 className="text-xs font-semibold text-foreground line-clamp-1">{job.company}</h4>
          <p className="text-[11px] text-muted-foreground line-clamp-1">{job.position}</p>
        </div>
        <button
          onClick={() => onDelete(job.id)}
          className="text-muted-foreground hover:text-destructive transition-colors p-1"
          title="Hapus"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <Badge
          variant={job.riskCategory === 'Tinggi' ? 'destructive' : 'outline'}
          className="text-[10px] px-1.5 py-0 font-semibold"
        >
          {job.riskCategory} {job.riskScore !== undefined ? `(${job.riskScore})` : ''}
        </Badge>
        <span className="text-[10px] text-muted-foreground">{job.dateAdded}</span>
      </div>

      {job.notes && (
        <p className="text-[11px] text-muted-foreground line-clamp-2 italic bg-muted/50 p-1.5 rounded border border-border">
          {job.notes}
        </p>
      )}

      {/* Tombol Pindah Tahap */}
      <div className="pt-2 border-t border-border flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground text-[10px]">Pindah ke:</span>
        <div className="flex gap-1">
          {job.status !== 'applied' && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => onRequestMove(job, 'applied')}
              className="text-[10px]"
            >
              Dilamar
            </Button>
          )}
          {job.status !== 'interview' && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => onRequestMove(job, 'interview')}
              className="text-[10px] text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
            >
              Interview
            </Button>
          )}
          {job.status !== 'offering' && (
            <Button
              variant="outline"
              size="xs"
              onClick={() => onRequestMove(job, 'offering')}
              className="text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10"
            >
              Offering
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// SUB-KOMPONEN ARTIKEL EDUCATION HUB
// -------------------------------------------------------------
function EducationCard({
  number,
  title,
  riskLevel,
  description,
  redFlags,
}: {
  number: string
  title: string
  riskLevel: string
  description: string
  redFlags: string[]
}) {
  return (
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-colors shadow-xs">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-mono text-primary font-bold">{number}</span>
          <Badge variant="outline" className="text-[10px] font-semibold border-destructive/40 text-destructive bg-destructive/10">
            {riskLevel}
          </Badge>
        </div>
        <CardTitle className="text-sm font-semibold leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-xs text-muted-foreground">
        <p className="leading-relaxed">{description}</p>
        <div className="bg-muted/50 p-2.5 rounded-lg border border-border">
          <span className="text-[11px] font-semibold text-foreground block mb-1">Tanda Bahaya:</span>
          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-muted-foreground">
            {redFlags.map((flag, i) => (
              <li key={i}>{flag}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

// -------------------------------------------------------------
// SUB-KOMPONEN INTERACTIVE SAFETY QUIZ
// -------------------------------------------------------------
const QUIZ_QUESTIONS = [
  {
    q: '1. Anda menerima email panggilan wawancara di Surabaya, namun diminta membeli tiket pesawat melalui biro travel "Garuda Abadi Travel" yang ditunjuk dengan janji diganti saat tiba. Apa yang harus Anda lakukan?',
    options: [
      { text: 'Segera transfer uang tiket sebelum kuota wawancara hangus.', correct: false },
      { text: 'Abaikan dan tolak, karena rekrutmen resmi tidak pernah mewajibkan reservasi tiket via biro tertentu.', correct: true },
      { text: 'Tawar harga tiket kepada admin biro travel.', correct: false },
    ],
    explanation: 'Ini adalah modus penipuan biro travel fiktif (Indikator K1). Korban akan kehilangan seluruh uang yang ditransfer.',
  },
  {
    q: '2. Lowongan part-time freelance menawarkan upah Rp 50.000 per subscribe YouTube, namun sebelum komisi cair Anda harus setor deposit awal Rp 200.000. Ini mengindikasikan:',
    options: [
      { text: 'Peluang investasi digital yang menjanjikan.', correct: false },
      { text: 'Skema penipuan ponzi berkedok tugas berbayar (Indikator K3).', correct: true },
      { text: 'Prosedur legal pemotongan pajak penghasilan.', correct: false },
    ],
    explanation: 'Skema tugas like/subscribe dengan syarat deposit adalah modus penipuan berantai yang sangat marak.',
  },
  {
    q: '3. Pada saat baru mengisi Google Forms pendaftaran awal, Anda diminta mengunggah foto selfie memegang KTP asli. Sikap Anda:',
    options: [
      { text: 'Waspada dan jangan unggah, karena foto KTP rentan disalahgunakan untuk pinjaman online ilegal.', correct: true },
      { text: 'Langsung unggah agar profil terlihat terpercaya.', correct: false },
      { text: 'Kirimkan bersama foto kartu keluarga.', correct: false },
    ],
    explanation: 'Data identitas sensitif (KTP/rekening) hanya boleh diserahkan setelah Anda menandatangani kontrak kerja resmi di kantor perusahaan.',
  },
  {
    q: '4. Admin HR menghubungi via WhatsApp dan meminta Anda mengirimkan kode 6 digit yang masuk di SMS untuk "aktivasi nomor pegawai baru". Langkah Anda:',
    options: [
      { text: 'Kirimkan kode karena ini permintaan resmi dari HRD perusahaan.', correct: false },
      { text: 'Tolak tegas — kode OTP SMS bersifat rahasia dan tidak boleh dibagikan ke siapapun.', correct: true },
      { text: 'Minta mereka menelepon langsung sebagai ganti.', correct: false },
    ],
    explanation: 'Kode OTP adalah kredensial keamanan pribadi (Indikator K2). Perusahaan resmi tidak pernah meminta kode OTP pelamar untuk proses rekrutmen.',
  },
  {
    q: '5. Sebuah lowongan menyatakan "Kuota hanya hari ini, segera konfirmasi sebelum hangus! Penempatan langsung tanpa proses seleksi!" — ini menunjukkan:',
    options: [
      { text: 'Perusahaan sangat membutuhkan karyawan, kesempatan baik.', correct: false },
      { text: 'Taktik tekanan waktu berlebihan yang umum dipakai penipu agar korban tidak sempat berpikir.', correct: true },
      { text: 'Proses rekrutmen yang efisien dan modern.', correct: false },
    ],
    explanation: 'Tekanan waktu artifisial (Indikator S1) dirancang agar pelamar panik dan mengambil keputusan tanpa sempat memverifikasi keaslian lowongan.',
  },
  {
    q: '6. Anda terlanjur mentransfer uang Rp 1.500.000 ke biro travel yang ditunjuk. Apa langkah paling tepat yang harus dilakukan sekarang?',
    options: [
      { text: 'Hubungi bank/e-wallet Anda segera untuk memblokir transaksi, lalu laporkan ke kepolisian dan OJK.', correct: true },
      { text: 'Tunggu beberapa hari karena uang mungkin dikembalikan otomatis.', correct: false },
      { text: 'Kirim pesan marah ke pelaku agar uang dikembalikan.', correct: false },
    ],
    explanation: 'Prosedur Tanggap Darurat: segera hubungi bank untuk pemblokiran, laporkan ke polisi (laporan polisi.go.id), dan adukan ke OJK jika melibatkan layanan keuangan.',
  },
]

function InteractiveQuiz() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({})
  const [submitted, setSubmitted] = useState(false)

  const handleSelect = (qIdx: number, optIdx: number) => {
    if (submitted) return
    setSelectedAnswers({ ...selectedAnswers, [qIdx]: optIdx })
  }

  const score = Object.entries(selectedAnswers).reduce((acc, [qIdx, optIdx]) => {
    return acc + (QUIZ_QUESTIONS[Number(qIdx)].options[optIdx].correct ? 1 : 0)
  }, 0)

  return (
    <div className="space-y-6">
      {QUIZ_QUESTIONS.map((item, qIdx) => (
        <div key={qIdx} className="p-4 rounded-xl border border-border bg-card space-y-3 shadow-xs">
          <p className="text-xs font-semibold text-foreground leading-relaxed">{item.q}</p>
          <div className="space-y-2">
            {item.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[qIdx] === optIdx
              let optionClass = 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50'
              if (isSelected) optionClass = 'border-primary bg-primary/10 text-primary font-semibold'
              if (submitted) {
                if (opt.correct) optionClass = 'border-emerald-600 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-semibold'
                else if (isSelected) optionClass = 'border-destructive bg-destructive/10 text-destructive font-semibold'
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(qIdx, optIdx)}
                  className={`w-full text-left p-3 rounded-lg border text-xs transition-all ${optionClass}`}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>

          {submitted && (
            <div className="text-[11px] text-foreground bg-muted/60 p-3 rounded-lg border-l-2 border-primary">
              💡 {item.explanation}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center justify-between pt-2">
        {submitted ? (
          <div className="flex items-center gap-3">
            <Badge className="text-xs px-3 py-1 font-semibold">
              Skor Pemahaman: {score} / {QUIZ_QUESTIONS.length}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedAnswers({})
                setSubmitted(false)
              }}
              className="text-xs"
            >
              Ulangi Kuis
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(selectedAnswers).length < QUIZ_QUESTIONS.length}
            size="sm"
            className="text-xs font-semibold"
          >
            Periksa Jawaban Kuis
          </Button>
        )}
      </div>
    </div>
  )
}

// -------------------------------------------------------------
// SUB-KOMPONEN SAFETY CHECKLIST
// -------------------------------------------------------------
const CHECKLIST_ITEMS = [
  'Apakah nama perusahaan dan situs resminya dapat ditemukan di Google secara independen?',
  'Apakah alamat email perekrut menggunakan domain resmi (@perusahaan.com), bukan email publik (@gmail)?',
  'Apakah proses rekrutmen BEBAS dari segala bentuk permintaan uang, deposit, atau pembelian tiket travel?',
  'Apakah proses seleksi (tes tertulis, wawancara) dilakukan melalui kanal resmi atau kantor fisik yang jelas?',
  'Apakah pihak perekrut TIDAK meminta foto KTP atau nomor rekening pada tahap awal pendaftaran?',
  'Apakah tawaran gaji dan deskripsi pekerjaan sesuai dengan standar kewajaran industri?',
  'Apakah lowongan ini juga tercantum di situs karir resmi atau akun LinkedIn resmi perusahaan?',
]

function SafetyChecklistInteractive() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [answers, setAnswers] = useState<{ [key: number]: boolean }>({})

  useEffect(() => {
    getChecklist().then((res) => {
      if (res && res.length > 0) setItems(res)
    }).catch(() => { })
  }, [])

  const checklistList = items.length > 0
    ? items
    : CHECKLIST_ITEMS.map((q, i) => ({ id: i + 1, question: q, weight: 1 }))

  const toggle = (id: number) => {
    setAnswers({ ...answers, [id]: !answers[id] })
  }

  const completedCount = checklistList.filter((item) => answers[item.id]).length
  const total = checklistList.length
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-muted/40 p-4 rounded-xl border border-border">
        <div>
          <span className="text-xs font-medium text-muted-foreground block">Indeks Keamanan Lamaran:</span>
          <span className="text-2xl font-black text-foreground">{percent}% Aman</span>
        </div>
        <Badge
          variant={percent === 100 ? 'default' : percent >= 70 ? 'secondary' : 'destructive'}
          className="text-xs font-semibold"
        >
          {percent === 100 ? 'Sangat Layak Dilamar' : percent >= 70 ? 'Perlu Verifikasi Lanjutan' : 'Risiko Sangat Tinggi'}
        </Badge>
      </div>

      <div className="space-y-2.5">
        {checklistList.map((item) => {
          const checked = !!answers[item.id]
          return (
            <div
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`p-3.5 rounded-lg border text-xs cursor-pointer transition-all flex items-start gap-3 ${checked
                  ? 'border-primary bg-primary/5 text-foreground'
                  : 'border-border bg-card text-muted-foreground hover:border-border/80 hover:text-foreground'
                }`}
            >
              <div
                className={`size-4 rounded border mt-0.5 flex items-center justify-center shrink-0 ${checked ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 bg-muted/50'
                  }`}
              >
                {checked && <CheckCircle2 className="size-3" />}
              </div>
              <span className="leading-relaxed font-normal">{item.question}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
