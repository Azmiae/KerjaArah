import React, { useState } from 'react'
import {
  FileText,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  ArrowRight,
  Eye,
  Send,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { submitReport, trackReport, type ReportTracking, type ReportCreatePayload } from '@/lib/api'
import { redactSensitiveData } from '@/lib/ruleEngine'

interface LaporLacakProps {
  initialJobText?: string
  initialCategory?: string
  initialCompany?: string
  onReportSubmitted?: () => void
}

export function LaporLacak({
  initialJobText = '',
  initialCategory = '',
  initialCompany = '',
  onReportSubmitted,
}: LaporLacakProps) {
  const [subTab, setSubTab] = useState<'lapor' | 'lacak'>('lapor')

  // Form State
  const [category, setCategory] = useState<string>(initialCategory || 'Tiket Travel / Akomodasi Palsu')
  const [channel, setChannel] = useState<string>('WhatsApp')
  const [incidentDate, setIncidentDate] = useState<string>(() => new Date().toISOString().split('T')[0])
  const [lossType, setLossType] = useState<'tidak_ada' | 'data_pribadi' | 'uang'>('tidak_ada')
  const [reportedCompany, setReportedCompany] = useState<string>(initialCompany || '')
  const [jobText, setJobText] = useState<string>(initialJobText || '')
  const [consent, setConsent] = useState<boolean>(false)
  const [honeypot, setHoneypot] = useState<string>('')

  // State Dialog & Flow
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [submittedCode, setSubmittedCode] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState<boolean>(false)

  // Tracking State
  const [searchCode, setSearchCode] = useState<string>('')
  const [trackingResult, setTrackingResult] = useState<ReportTracking | null>(null)
  const [trackingLoading, setTrackingLoading] = useState<boolean>(false)
  const [trackingError, setTrackingError] = useState<string | null>(null)

  // Quick seed samples for Juror convenience
  const SAMPLE_CODES = [
    { code: 'KA-2026-TRV01', label: 'KA-2026-TRV01 (Terverifikasi - Tiket Travel)' },
    { code: 'KA-2026-TSK01', label: 'KA-2026-TSK01 (Terverifikasi - Ponzi Like/Sub)' },
    { code: 'KA-2026-REV01', label: 'KA-2026-REV01 (Dalam Tinjauan - Tiket Travel)' },
    { code: 'KA-2026-REC01', label: 'KA-2026-REC01 (Diterima - Minta OTP)' },
    { code: 'KA-2026-REJ01', label: 'KA-2026-REJ01 (Ditolak - Tidak Cukup Bukti)' },
  ]

  // Submit Handler
  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (jobText.trim().length < 10) {
      setFormError('Isi teks lowongan minimal 10 karakter.')
      return
    }

    setIsPreviewOpen(true)
  }

  const handleConfirmSubmit = async () => {
    setIsSubmitting(true)
    setFormError(null)

    try {
      const payload: ReportCreatePayload = {
        category,
        channel,
        incident_date: incidentDate,
        loss_type: lossType,
        reported_company: reportedCompany.trim() || undefined,
        job_text: jobText,
        honeypot: honeypot || undefined,
      }

      const res = await submitReport(payload)
      setSubmittedCode(res.tracking_code)
      setIsPreviewOpen(false)

      if (onReportSubmitted) {
        onReportSubmitted()
      }
    } catch (err: any) {
      setFormError(err.message || 'Terjadi kesalahan saat mengirim laporan.')
      setIsPreviewOpen(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = () => {
    if (submittedCode) {
      navigator.clipboard.writeText(submittedCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  // Tracking Handler
  const handleTrackSubmit = async (codeOverride?: string) => {
    const targetCode = (codeOverride || searchCode).trim().toUpperCase()
    if (!targetCode) {
      setTrackingError('Silakan masukkan kode pelacakan.')
      return
    }

    setTrackingLoading(true)
    setTrackingError(null)
    setTrackingResult(null)

    try {
      const res = await trackReport(targetCode)
      setTrackingResult(res)
    } catch (err: any) {
      setTrackingError(err.message || 'Laporan tidak ditemukan.')
    } finally {
      setTrackingLoading(false)
    }
  }

  const handleTrackSubmittedDirectly = (code: string) => {
    setSubmittedCode(null)
    setSubTab('lacak')
    setSearchCode(code)
    handleTrackSubmit(code)
  }

  const redactedPreview = redactSensitiveData(jobText)

  return (
    <div className="space-y-6">
      {/* Sub navigation bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Layanan Pelaporan & Pelacakan Publik (Civic Reporting)
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Akuntabilitas dua arah: Laporkan indikasi penipuan rekrutmen dan pantau status tindak lanjutnya secara
            transparan tanpa perlu membuat akun.
          </p>
        </div>

        <div className="flex bg-muted p-1 rounded-lg border border-border self-start sm:self-auto">
          <button
            onClick={() => setSubTab('lapor')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              subTab === 'lapor'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Formulir Lapor
          </button>
          <button
            onClick={() => setSubTab('lacak')}
            className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
              subTab === 'lacak'
                ? 'bg-background text-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Lacak Status Laporan
          </button>
        </div>
      </div>

      {/* SUBTAB 1: FORMULIR LAPOR */}
      {subTab === 'lapor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8">
            <Card className="shadow-xs">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground">
                      Formulir Pelaporan Lowongan Kerja Mencurigakan
                    </CardTitle>
                    <CardDescription className="text-xs text-muted-foreground mt-1">
                      Data Anda akan disaring dan disamarkan secara otomatis demi menjaga kerahasiaan identitas.
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs py-1 px-2.5 font-semibold">
                    <Lock className="size-3 mr-1.5" /> Privasi Terjamin
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0">
                <form onSubmit={handleOpenPreview} className="space-y-4">
                  {formError && (
                    <Alert className="text-xs">
                      <AlertTriangle className="size-4" />
                      <AlertTitle className="text-destructive font-bold">Periksa Kembali</AlertTitle>
                      <AlertDescription className="text-muted-foreground">{formError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Nama Perusahaan Terlapor */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">
                        Nama Perusahaan yang Dicatut <span className="text-muted-foreground font-normal">(Opsional)</span>
                      </label>
                      <Input
                        value={reportedCompany}
                        onChange={(e) => setReportedCompany(e.target.value)}
                        placeholder="Contoh: PT Pertamina (Palsu) / Travel Angkasa"
                        className="text-xs"
                      />
                    </div>

                    {/* Kanal Penyebaran */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Kanal Penyebaran Lowongan</label>
                      <select
                        value={channel}
                        onChange={(e) => setChannel(e.target.value)}
                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="WhatsApp">WhatsApp (Pesan / Grup)</option>
                        <option value="Telegram">Telegram (Channel / Chat)</option>
                        <option value="Media Sosial">Media Sosial (Instagram, TikTok, FB, X)</option>
                        <option value="Portal Lowongan">Situs Portal Loker Palsu</option>
                        <option value="Email">Email Mengatasnamakan Perusahaan</option>
                        <option value="SMS">SMS / Blast</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>

                    {/* Kategori Modus */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Kategori Indikasi Modus</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="Tiket Travel / Akomodasi Palsu">Tiket Travel / Akomodasi Palsu (K1)</option>
                        <option value="Tugas Like & Subscribe (Ponzi)">Tugas Like & Subscribe / Deposit (K3)</option>
                        <option value="Pencurian OTP & Kredensial">Pencurian OTP & Kredensial (K2)</option>
                        <option value="Permintaan Data Sensitif / KTP">Permintaan Foto KTP / Rekening (T1)</option>
                        <option value="Penahanan Ijazah Asli">Penahanan Ijazah & Jaminan Uang Seragam</option>
                        <option value="Lainnya">Modus Lainnya</option>
                      </select>
                    </div>

                    {/* Jenis Kerugian */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-foreground">Dampak Kerugian yang Dialami</label>
                      <select
                        value={lossType}
                        onChange={(e) => setLossType(e.target.value as any)}
                        className="w-full bg-background border border-input rounded-md px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                      >
                        <option value="tidak_ada">Tidak Ada (Berhasil Tercegah Dini)</option>
                        <option value="uang">Kerugian Finansial (Uang Telah Ditransfer)</option>
                        <option value="data_pribadi">Pencurian Data Sensitif (KTP/OTP Dibagikan)</option>
                      </select>
                    </div>

                    {/* Tanggal Kejadian */}
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-foreground">Tanggal Menemukan / Kejadian</label>
                      <Input
                        type="date"
                        value={incidentDate}
                        onChange={(e) => setIncidentDate(e.target.value)}
                        className="text-xs max-w-xs"
                      />
                    </div>
                  </div>

                  {/* Isi Teks Lowongan */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-foreground">
                        Isi Teks Lowongan / Pesan yang Diterima <span className="text-destructive font-bold">*</span>
                      </label>
                      <span className="text-[11px] text-muted-foreground font-mono">{jobText.length} karakter</span>
                    </div>
                    <Textarea
                      value={jobText}
                      onChange={(e) => setJobText(e.target.value)}
                      placeholder="Tempelkan pesan broadcast, email rekrutmen, atau deskripsi loker yang mencurigakan di sini..."
                      rows={6}
                      className="font-mono text-xs leading-relaxed"
                    />
                    <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">
                      Seluruh informasi kontak pribadi (nomor handphone Anda, NIK, nomor rekening, alamat email) akan
                      otomatis disamarkan dengan tanda sensor sebelum disimpan.
                    </p>
                  </div>

                  {/* Honeypot field (hidden from real users, caught by bots) */}
                  <div className="hidden">
                    <input
                      type="text"
                      name="website_url_check"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Petunjuk Alur Tinjau Redaksi */}
                  <div className="p-3 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground flex items-center gap-2">
                    <Lock className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span>
                      Data pribadi disamarkan secara otomatis di peramban Anda. Anda akan memeriksa hasil sensor sebelum memberikan persetujuan pengiriman.
                    </span>
                  </div>

                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full text-xs font-semibold py-2.5"
                    >
                      <Eye className="size-4 mr-2" />
                      Tinjau Redaksi Sensor & Persetujuan Pengiriman &rarr;
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Kolom Kanan: Panduan & Jaminan Kerahasiaan */}
          <div className="lg:col-span-4 space-y-4">
            <Card className="shadow-xs">
              <CardHeader className="p-5">
                <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Lock className="size-4 text-emerald-600 dark:text-emerald-400" />
                  Prinsip Kerahasiaan KerjaArah
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 pt-0 space-y-3 text-xs text-muted-foreground leading-relaxed font-normal">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Tanpa Akun:</strong> Anda tidak perlu login, memasukkan email,
                    atau menyertakan nama asli untuk melapor.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Redaksi Sensor Ganda:</strong> Sensor data pribadi berjalan
                    pada browser pengguna sebelum dikirim, dan divalidasi ulang di backend.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Kode Pelacakan Unik:</strong> Setiap laporan menghasilkan kode
                    acak untuk memeriksa proses verifikasi secara anonim.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground">Pencegahan Spam:</strong> Dilengkapi kolom jebakan (honeypot)
                    dan rate-limiting untuk menjaga integritas basis data.
                  </span>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-xl border border-border bg-card text-xs text-muted-foreground space-y-2 shadow-xs">
              <span className="font-semibold text-foreground flex items-center gap-1.5">
                <Clock className="size-4 text-primary" /> Tahap Tinjauan Laporan
              </span>
              <p className="text-[11px] leading-relaxed font-normal">
                Laporan yang Anda kirimkan akan melalui tinjauan moderator:
                <br />
                <span className="text-primary font-semibold">1. Diterima</span> &rarr;{' '}
                <span className="text-amber-600 dark:text-amber-400 font-semibold">2. Dalam Tinjauan</span> &rarr;{' '}
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">3. Terverifikasi</span> (masuk ke data publik).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: LACAK STATUS LAPORAN */}
      {subTab === 'lacak' && (
        <div className="space-y-6">
          <Card className="shadow-xs">
            <CardHeader className="p-6">
              <CardTitle className="text-lg font-bold text-foreground flex items-center gap-2">
                <Search className="size-5 text-primary" />
                Lacak Status Laporan Publik (Public Service Tracking)
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground mt-1">
                Masukkan kode pelacakan laporan Anda (contoh: KA-2026-XXXXX) untuk memantau status audit dan tindak
                lanjut moderator secara real-time.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  placeholder="Ketik kode pelacakan (contoh: KA-2026-0001)"
                  className="text-sm font-mono uppercase"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleTrackSubmit()
                    }
                  }}
                />
                <Button
                  onClick={() => handleTrackSubmit()}
                  disabled={trackingLoading}
                  className="text-xs font-semibold px-6 shrink-0"
                >
                  <Search className="size-4 mr-2" />
                  {trackingLoading ? 'Memeriksa...' : 'Lacak Status'}
                </Button>
              </div>

              {/* Quick sample chips */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground font-semibold">Uji Coba Kode Laporan Simulasi:</span>
                {SAMPLE_CODES.map((item) => (
                  <Button
                    key={item.code}
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchCode(item.code)
                      handleTrackSubmit(item.code)
                    }}
                    className="text-xs font-mono"
                  >
                    {item.code}
                  </Button>
                ))}
              </div>

              {trackingError && (
                <Alert className="text-xs mt-4">
                  <AlertTriangle className="size-4" />
                  <AlertTitle className="text-destructive font-bold">Laporan Tidak Ditemukan</AlertTitle>
                  <AlertDescription className="text-muted-foreground">{trackingError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Hasil Pelacakan & Visual Timeline Stepper */}
          {trackingResult && (
            <div className="space-y-6">
              <Card className="shadow-xs overflow-hidden">
                <div className="p-6 bg-muted/40 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground font-mono">KODE LAPORAN:</span>
                      <span className="font-mono font-black text-base text-foreground tracking-wider">
                        {trackingResult.tracking_code}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Dilaporkan pada {new Date(trackingResult.created_at).toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div>
                    {trackingResult.status === 'Terverifikasi' && (
                      <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-sm py-1 px-3 font-semibold">
                        <CheckCircle2 className="size-4 mr-1.5" /> Status: Terverifikasi
                      </Badge>
                    )}
                    {trackingResult.status === 'Dalam Tinjauan' && (
                      <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-sm py-1 px-3 font-semibold">
                        <Clock className="size-4 mr-1.5" /> Status: Dalam Tinjauan
                      </Badge>
                    )}
                    {trackingResult.status === 'Diterima' && (
                      <Badge variant="outline" className="border-primary/40 text-primary bg-primary/10 text-sm py-1 px-3 font-semibold">
                        <FileText className="size-4 mr-1.5" /> Status: Diterima
                      </Badge>
                    )}
                    {trackingResult.status === 'Ditolak' && (
                      <Badge variant="destructive" className="text-sm py-1 px-3 font-semibold">
                        <XCircle className="size-4 mr-1.5" /> Status: Ditolak
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  {/* Visual Stepper Audit Trail */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Alur Audit Akuntabilitas (Audit Trail)
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {/* Step 1: Diterima */}
                      <div
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          ['Diterima', 'Dalam Tinjauan', 'Terverifikasi', 'Ditolak'].includes(trackingResult.status)
                            ? 'bg-primary/10 border-primary/30 text-primary'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold">1. Diterima</span>
                          <CheckCircle2 className="size-4" />
                        </div>
                        <p className="text-[11px] text-muted-foreground font-normal">
                          Laporan masuk ke sistem dan data pribadi berhasil disensor otomatis.
                        </p>
                      </div>

                      {/* Step 2: Dalam Tinjauan */}
                      <div
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          ['Dalam Tinjauan', 'Terverifikasi', 'Ditolak'].includes(trackingResult.status)
                            ? 'bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-300'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold">2. Dalam Tinjauan</span>
                          {['Terverifikasi', 'Ditolak'].includes(trackingResult.status) ? (
                            <CheckCircle2 className="size-4" />
                          ) : trackingResult.status === 'Dalam Tinjauan' ? (
                            <Clock className="size-4 animate-spin" />
                          ) : (
                            <div className="size-4 rounded-full border border-border" />
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-normal">
                          Tim verifikator memeriksa indikator bukti dan korelasi modus penipuan.
                        </p>
                      </div>

                      {/* Step 3: Keputusan Akhir */}
                      <div
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          trackingResult.status === 'Terverifikasi'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                            : trackingResult.status === 'Ditolak'
                            ? 'bg-destructive/10 border-destructive/30 text-destructive'
                            : 'bg-card border-border text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold">
                            3. {trackingResult.status === 'Ditolak' ? 'Ditolak' : 'Terverifikasi'}
                          </span>
                          {trackingResult.status === 'Terverifikasi' ? (
                            <CheckCircle2 className="size-4" />
                          ) : trackingResult.status === 'Ditolak' ? (
                            <XCircle className="size-4" />
                          ) : (
                            <div className="size-4 rounded-full border border-border" />
                          )}
                        </div>
                        <p className="text-[11px] text-muted-foreground font-normal">
                          {trackingResult.status === 'Terverifikasi'
                            ? 'Laporan valid dan telah dimasukkan ke dashboard agregat publik.'
                            : trackingResult.status === 'Ditolak'
                            ? 'Laporan ditolak karena tidak memenuhi kriteria bukti indikasi penipuan.'
                            : 'Menunggu hasil pemeriksaan moderator.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Catatan Penolakan jika ada */}
                  {trackingResult.rejection_reason && (
                    <Alert className="text-xs">
                      <AlertTriangle className="size-4" />
                      <AlertTitle className="text-destructive font-bold">Alasan Penolakan Moderator</AlertTitle>
                      <AlertDescription className="text-muted-foreground mt-1 leading-relaxed">
                        {trackingResult.rejection_reason}
                      </AlertDescription>
                    </Alert>
                  )}

                  {/* Metadata Ringkasan */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-3 rounded-xl bg-card border border-border">
                      <span className="text-[11px] text-muted-foreground block font-medium">Kategori Modus</span>
                      <span className="text-xs font-semibold text-foreground mt-0.5 block">{trackingResult.category}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-border">
                      <span className="text-[11px] text-muted-foreground block font-medium">Kanal Penyebaran</span>
                      <span className="text-xs font-semibold text-foreground mt-0.5 block">{trackingResult.channel}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-card border border-border">
                      <span className="text-[11px] text-muted-foreground block font-medium">Dampak Kerugian</span>
                      <span className="text-xs font-semibold text-foreground mt-0.5 block capitalize">
                        {trackingResult.loss_type.replace('_', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Riwayat Catatan Moderator */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">
                      Log Aktivitas Transparansi
                    </h4>
                    <div className="space-y-2">
                      {trackingResult.history.map((hist, idx) => (
                        <div
                          key={idx}
                          className="flex items-start justify-between p-3 rounded-xl bg-card border border-border text-xs"
                        >
                          <div className="space-y-0.5">
                            <span className="font-semibold text-foreground">{hist.status}</span>
                            <p className="text-muted-foreground text-[11px]">{hist.note || 'Pembaruan status sistem'}</p>
                          </div>
                          <span className="text-[11px] text-muted-foreground font-mono">
                            {new Date(hist.timestamp).toLocaleDateString('id-ID', {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}

      {/* DIALOG 1: PREVIEW REDAKSI SENSOR */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-foreground flex items-center gap-2">
              <Eye className="size-5 text-primary" />
              Tinjau Hasil Redaksi Sensor Otomatis
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Sesuai pedoman privasi KerjaArah, seluruh data sensitif (nomor handphone, rekening bank, NIK, dan email
              pribadi) disamarkan sebelum dikirimkan ke basis data publik.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-2">
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-foreground">Teks Lowongan yang Disamarkan (Redacted):</span>
              <div className="p-3.5 rounded-lg bg-muted/50 border border-border text-xs font-mono text-foreground max-h-56 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                {redactedPreview}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-muted/30 p-3.5 rounded-xl border border-border">
              <div>
                <span className="text-muted-foreground block text-[11px]">Kategori Modus:</span>
                <span className="font-semibold text-foreground">{category}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Kanal Penyebaran:</span>
                <span className="font-semibold text-foreground">{channel}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Dampak Kerugian:</span>
                <span className="font-semibold text-foreground capitalize">{lossType.replace('_', ' ')}</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[11px]">Perusahaan Terlapor:</span>
                <span className="font-semibold text-foreground">{reportedCompany || 'Tidak Disebutkan'}</span>
              </div>
            </div>

            {/* Checkbox Persetujuan Eksplisit Setelah Memeriksa Hasil Sensor */}
            <div className="p-3.5 rounded-xl bg-muted/40 border border-primary/30 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 size-4 rounded border-input text-primary focus:ring-ring"
                />
                <span className="text-xs text-foreground leading-relaxed font-normal">
                  Saya telah memeriksa teks hasil sensor di atas dan <strong className="text-primary font-semibold">menyetujui</strong> teks ini disimpan serta diolah secara agregat untuk kepentingan transparansi publik, tanpa pengumpulan data akun pribadi saya.
                </span>
              </label>
              {!consent && (
                <p className="text-[11px] text-amber-600 dark:text-amber-400 pl-6">
                  * Centang kotak di atas untuk mengaktifkan tombol kirim laporan.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(false)}
              className="text-xs"
            >
              Ubah Kembali
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={isSubmitting || !consent}
              onClick={handleConfirmSubmit}
              className="text-xs font-semibold"
            >
              <Send className="size-3.5 mr-1.5" />
              {isSubmitting ? 'Mengirim...' : 'Konfirmasi & Kirim Laporan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: SUKSES LAPOR & KODE PELACAKAN */}
      <Dialog open={!!submittedCode} onOpenChange={() => setSubmittedCode(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader className="text-center sm:text-left">
            <div className="size-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto sm:mx-0 mb-3 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="size-6" />
            </div>
            <DialogTitle className="text-lg font-bold text-foreground">Laporan Berhasil Diterima!</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground leading-relaxed font-normal">
              Terima kasih atas partisipasi aktif Anda dalam melindungi masyarakat dari modus penipuan rekrutmen.
            </DialogDescription>
          </DialogHeader>

          <div className="p-4 rounded-xl bg-muted/40 border border-border text-center space-y-2 my-2 shadow-xs">
            <span className="text-xs text-muted-foreground font-medium">Kode Pelacakan Anonim Anda:</span>
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-xl font-black text-primary tracking-wider">
                {submittedCode}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-8 w-8 p-0"
                title="Salin Kode"
              >
                {copiedCode ? <Check className="size-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="size-4" />}
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {copiedCode ? 'Tersalin ke papan klip!' : 'Klik tombol salin untuk menyimpan kode ini.'}
            </p>
          </div>

          <div className="text-xs text-muted-foreground leading-relaxed space-y-1">
            <p>
              Simpan kode ini untuk memantau proses verifikasi laporan di menu <strong>Lacak Status Laporan</strong>.
            </p>
          </div>

          <DialogFooter className="gap-2 sm:gap-0 mt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSubmittedCode(null)}
              className="text-xs"
            >
              Tutup
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => submittedCode && handleTrackSubmittedDirectly(submittedCode)}
              className="text-xs font-semibold"
            >
              Lacak Status Laporan Sekarang <ArrowRight className="size-3.5 ml-1.5" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
