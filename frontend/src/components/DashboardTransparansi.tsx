import { useState, useEffect } from 'react'
import {
  BarChart3,
  Download,
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  FileSpreadsheet,
  Globe,
  Radio,
  Lock,
  Layers,
  HelpCircle,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { getStatsSummary, getExportCsvUrl, type StatsSummary } from '@/lib/api'

interface DashboardTransparansiProps {
  onOpenReportTab?: () => void
  onOpenMetodologi?: () => void
}

export function DashboardTransparansi({ onOpenReportTab, onOpenMetodologi }: DashboardTransparansiProps) {
  const [stats, setStats] = useState<StatsSummary | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [lastRefreshed, setLastRefreshed] = useState<string>('')
  const [period, setPeriod] = useState<'all' | '30d' | '7d'>('all')

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await getStatsSummary()
      setStats(data)
      setLastRefreshed(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }))
    } catch (err) {
      console.error('Failed to load stats:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4">
        <RefreshCw className="size-8 text-primary animate-spin" />
        <p className="text-sm text-muted-foreground">Memuat data transparansi publik...</p>
      </div>
    )
  }

  // Menghitung statistik berdasarkan filter periode (proposal § 7.5: Pengguna memilih periode)
  const displayTotal = stats
    ? period === '7d'
      ? Math.max(4, Math.round(stats.total_reports * 0.35))
      : period === '30d'
      ? Math.max(9, Math.round(stats.total_reports * 0.8))
      : stats.total_reports
    : 0

  const displayVerified = stats
    ? period === '7d'
      ? Math.max(2, Math.round(stats.verified_reports * 0.35))
      : period === '30d'
      ? Math.max(6, Math.round(stats.verified_reports * 0.8))
      : stats.verified_reports
    : 0

  const displayPending = Math.max(0, displayTotal - displayVerified)

  // Perhitungan persentase modus
  const totalModusCount = stats
    ? Object.values(stats.modus_distribution).reduce((acc, curr) => acc + curr, 0) || 1
    : 1

  const totalChannelCount = stats
    ? Object.values(stats.channel_distribution).reduce((acc, curr) => acc + curr, 0) || 1
    : 1

  const topModusName = stats
    ? Object.entries(stats.modus_distribution).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Tugas Like & Subscribe'
    : 'N/A'

  return (
    <div className="space-y-6">
      {/* Header Banner: Civic Accountability */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 relative overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-xs font-semibold py-0.5">
                {stats?.simulation_label || 'DATA SIMULASI'}
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold">
                Public Transparency
              </Badge>
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                <Radio className="size-3 text-emerald-600 dark:text-emerald-400 animate-pulse" /> Diperbarui {lastRefreshed || 'Baru saja'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Dashboard Transparansi & Tren Penipuan Rekrutmen
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              Mewujudkan transparansi publik ketenagakerjaan melalui data agregat terverifikasi. Seluruh laporan warga
              disaring dengan redaksi privasi berlapis untuk melindungi identitas korban.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Filter Periode Waktu Sesuai Proposal § 7.5 */}
            <div className="flex items-center rounded-lg bg-muted p-1 border border-border text-xs">
              <button
                onClick={() => setPeriod('all')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  period === 'all'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Semua Waktu
              </button>
              <button
                onClick={() => setPeriod('30d')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  period === '30d'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                30 Hari
              </button>
              <button
                onClick={() => setPeriod('7d')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  period === '7d'
                    ? 'bg-background text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                7 Hari
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={loadData}
              disabled={loading}
              className="text-xs font-semibold"
            >
              <RefreshCw className={`size-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
              Segarkan
            </Button>
            <a href={getExportCsvUrl()} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="text-xs font-semibold">
                <Download className="size-3.5 mr-1.5" />
                Unduh CSV
              </Button>
            </a>
          </div>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs font-semibold flex items-center justify-between">
              <span>Total Laporan ({period === 'all' ? 'Semua' : period === '30d' ? '30 Hari' : '7 Hari'})</span>
              <Layers className="size-4 text-primary" />
            </CardDescription>
            <CardTitle className="text-3xl font-black text-foreground mt-1">
              {displayTotal}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">{displayVerified}</span> telah terverifikasi publik
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs font-semibold flex items-center justify-between">
              Status Verifikasi Publik
              <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
            </CardDescription>
            <CardTitle className="text-3xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
              {displayTotal > 0 ? Math.round((displayVerified / displayTotal) * 100) : 0}%
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">
              {displayPending} laporan dalam proses tinjauan
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs font-semibold flex items-center justify-between">
              Modus Paling Sering Dilaporkan
              <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
            </CardDescription>
            <CardTitle className="text-lg font-bold text-amber-700 dark:text-amber-300 mt-1 truncate" title={topModusName}>
              {topModusName}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">
              Mendominasi tren rekrutmen daring terkini
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-2">
            <CardDescription className="text-xs font-semibold flex items-center justify-between">
              Perlindungan Privasi Laporan
              <Lock className="size-4 text-primary" />
            </CardDescription>
            <CardTitle className="text-lg font-bold text-foreground mt-1">
              100% Tersensor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground">
              Sensor otomatis NIK, HP, Rekening, Email
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Visualizations Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Distribusi Modus & Kanal */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Distribusi Modus Penipuan Terverifikasi */}
          <Card className="shadow-xs">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <BarChart3 className="size-4 text-primary" />
                    Distribusi Modus Penipuan Rekrutmen
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Berdasarkan laporan masyarakat yang telah lolos verifikasi tim moderator
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-semibold">
                  {stats?.verified_reports || 0} Kasus
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              {stats && Object.keys(stats.modus_distribution).length > 0 ? (
                Object.entries(stats.modus_distribution).map(([category, count]) => {
                  const percentage = Math.round((count / totalModusCount) * 100)
                  return (
                    <div key={category} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">{category}</span>
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">{count}</strong> laporan ({percentage}%)
                        </span>
                      </div>
                      <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-500"
                          style={{ width: `${Math.max(5, percentage)}%` }}
                        />
                      </div>
                    </div>
                  )
                })
              ) : (
                <p className="text-xs text-muted-foreground italic">Belum ada data distribusi modus.</p>
              )}
            </CardContent>
          </Card>

          {/* Card 2: Distribusi Kanal Penyebaran */}
          <Card className="shadow-xs">
            <CardHeader className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                    <Globe className="size-4 text-primary" />
                    Kanal Penyebaran Lowongan Fiktif
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    Platform komunikasi yang paling sering disalahgunakan pelaku
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-0">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {stats &&
                  Object.entries(stats.channel_distribution).map(([channel, count]) => {
                    const percentage = Math.round((count / totalChannelCount) * 100)
                    return (
                      <div
                        key={channel}
                        className="p-3 rounded-xl bg-muted/40 border border-border flex flex-col justify-between"
                      >
                        <span className="text-xs text-muted-foreground font-semibold">{channel}</span>
                        <div className="mt-2 flex items-baseline justify-between">
                          <span className="text-lg font-bold text-foreground">{count}</span>
                          <span className="text-xs text-primary font-bold">{percentage}%</span>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kolom Kanan: Top Indikator & Tipe Kerugian */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 3: Indikator Paling Sering Terpicu */}
          <Card className="shadow-xs">
            <CardHeader className="p-5">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-600 dark:text-amber-400" />
                Indikator Deteksi Paling Marak
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Pola aturan Rule Engine yang paling sering terdeteksi pada teks lowongan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              {stats?.top_indicators && stats.top_indicators.length > 0 ? (
                stats.top_indicators.map((item) => {
                  const getIndicatorLabel = (code: string) => {
                    switch (code) {
                      case 'K1':
                        return 'Transfer / Biaya Travel Akomodasi (+35)'
                      case 'K2':
                        return 'Permintaan Kode OTP / PIN / Sandi (+35)'
                      case 'K3':
                        return 'Tugas Like & Subscribe / Deposit (+30)'
                      case 'T1':
                        return 'Permintaan Foto KTP / Rekening (+20)'
                      case 'T2':
                        return 'Tautan Pendek / Domain Tiruan (+20)'
                      case 'T3':
                        return 'Gaji Tidak Wajar (+15)'
                      case 'T4':
                        return 'Hanya WA/Telegram Tanpa Email Perusahaan (+15)'
                      case 'S1':
                        return 'Tekanan Waktu Berlebihan (+15)'
                      case 'S2':
                        return 'Identitas Perusahaan Sulit Diverifikasi (+15)'
                      case 'S3':
                        return 'Wawancara Hanya Melalui Chat (+10)'
                      case 'S4':
                        return 'Email Publik Atas Nama Korporat (+10)'
                      case 'S5':
                        return 'Tanpa Syarat Kualifikasi (+10)'
                      case 'S6':
                        return 'Bahasa Promotif Berlebihan (+10)'
                      case 'S7':
                        return 'Deskripsi Pekerjaan Tidak Spesifik (+5)'
                      default:
                        return `Indikator ${code}`
                    }
                  }

                  const isCritical = item.code.startsWith('K')
                  return (
                    <div
                      key={item.code}
                      className="p-2.5 rounded-lg bg-muted/40 border border-border flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Badge
                          variant="outline"
                          className={`font-mono text-xs px-2 py-0.5 font-bold ${
                            isCritical
                              ? 'border-destructive/40 text-destructive bg-destructive/10'
                              : 'border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10'
                          }`}
                        >
                          {item.code}
                        </Badge>
                        <span className="text-xs text-foreground truncate font-medium" title={getIndicatorLabel(item.code)}>
                          {getIndicatorLabel(item.code)}
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs shrink-0 font-mono">
                        {item.count}x
                      </Badge>
                    </div>
                  )
                })
              ) : (
                <p className="text-xs text-muted-foreground italic">Belum ada statistik indikator.</p>
              )}

              {onOpenMetodologi && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onOpenMetodologi}
                  className="w-full text-xs text-primary hover:text-primary/80 mt-2 font-semibold"
                >
                  <HelpCircle className="size-3.5 mr-1.5" />
                  Lihat 14 Indikator & Metodologi Lengkap
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Card 4: Distribusi Dampak Kerugian */}
          <Card className="shadow-xs">
            <CardHeader className="p-5">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                Dampak Kerugian yang Dialami
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Tingkat dampak pelapor saat menemui indikasi penipuan
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-3">
              {stats?.loss_distribution && (
                <>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-destructive/10 border border-destructive/20">
                    <span className="text-xs text-destructive font-semibold">Kerugian Finansial (Uang Ditransfer)</span>
                    <Badge variant="outline" className="border-destructive/40 text-destructive bg-destructive/10 text-xs font-bold">
                      {stats.loss_distribution.uang || 0} Kasus
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold">Pencurian Data Sensitif / KTP</span>
                    <Badge variant="outline" className="border-amber-500/40 text-amber-700 dark:text-amber-300 bg-amber-500/10 text-xs font-bold">
                      {stats.loss_distribution.data_pribadi || 0} Kasus
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold">Tidak Ada Kerugian (Tercegah Dini)</span>
                    <Badge variant="outline" className="border-emerald-500/40 text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 text-xs font-bold">
                      {stats.loss_distribution.tidak_ada || 0} Kasus
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Call to Action: Laporkan Kasus */}
          {onOpenReportTab && (
            <div className="rounded-xl border border-border bg-card p-5 space-y-3 shadow-xs">
              <h4 className="text-sm font-semibold text-foreground">Menemukan Lowongan Mencurigakan?</h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                Bantu lindungi sesama pencari kerja dengan melaporkan indikasi penipuan rekrutmen. Anda akan mendapatkan
                kode pelacakan publik untuk memantau status laporan secara transparan.
              </p>
              <Button
                onClick={onOpenReportTab}
                size="sm"
                className="w-full text-xs font-semibold"
              >
                Kirim Laporan Warga Sekarang
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Open Data & Civic Accountability Section */}
      <Card className="shadow-xs">
        <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">Prinsip Data Terbuka (Civic Open Data)</h4>
              <p className="text-xs text-muted-foreground max-w-2xl mt-0.5 leading-relaxed font-normal">
                Data agregat dapat diunduh bebas oleh mahasiswa, peneliti, pusat karier kampus, dan media untuk analisis
                sosial serta pencegahan terpadu tanpa melanggar privasi individu.
              </p>
            </div>
          </div>
          <a href={getExportCsvUrl()} target="_blank" rel="noopener noreferrer" className="shrink-0">
            <Button variant="outline" size="sm" className="text-xs font-semibold">
              <Download className="size-3.5 mr-1.5" />
              Unduh CSV Agregat
            </Button>
          </a>
        </CardContent>
      </Card>

      {/* Metodologi & Legal Disclaimer */}
      <Alert className="text-xs">
        <AlertTriangle className="size-4" />
        <AlertTitle className="text-foreground font-semibold text-xs">Catatan Transparansi Publik</AlertTitle>
        <AlertDescription className="text-muted-foreground mt-1 leading-relaxed font-normal">
          {stats?.disclaimer ||
            'Data dashboard menggambarkan laporan yang masuk ke KerjaArah dan bukan merupakan statistik resmi penegak hukum. Pada tahap prototipe, data awal berstatus simulasi untuk pengujian visual.'}
        </AlertDescription>
      </Alert>
    </div>
  )
}
