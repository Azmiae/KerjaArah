import {
  ShieldAlert,
  Scale,
  Info,
  CheckCircle2,
  AlertTriangle,
  Code2,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'

interface MetodologiModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MetodologiModal({ open, onOpenChange }: MetodologiModalProps) {
  const INDICATORS = [
    {
      code: 'K1',
      name: 'Permintaan Transfer / Biaya di Awal',
      severity: 'Kritis',
      weight: 35,
      desc: 'Meminta uang tiket pesawat biro travel, seragam, tes medis, biaya administrasi, atau pelatihan sebelum mulai bekerja.',
    },
    {
      code: 'K2',
      name: 'Permintaan Kode OTP, PIN, atau Kata Sandi',
      severity: 'Kritis',
      weight: 35,
      desc: 'Meminta calon pekerja mengetikkan atau membagikan kode OTP SMS verifikasi perbankan/aplikasi.',
    },
    {
      code: 'K3',
      name: 'Tugas Like & Subscribe / Skema Deposit',
      severity: 'Kritis',
      weight: 30,
      desc: 'Pekerjaan paruh waktu menonton video/like media sosial dengan syarat top up modal deposit uang di awal.',
    },
    {
      code: 'T1',
      name: 'Permintaan Data Pribadi Sensitif di Tahap Awal',
      severity: 'Tinggi',
      weight: 20,
      desc: 'Meminta foto KTP, selfie KTP, kartu keluarga, atau buku tabungan pada tahap pendaftaran awal yang rentan disalahgunakan untuk pinjol ilegal.',
    },
    {
      code: 'T2',
      name: 'Tautan Pendek atau Domain Tiruan (Typosquatting)',
      severity: 'Tinggi',
      weight: 20,
      desc: 'Penggunaan tautan pemendek URL (bit.ly, s.id, forms.gle) atau domain menyerupai korporasi besar namun berbeda ekstensi (.xyz, .site).',
    },
    {
      code: 'T3',
      name: 'Gaji Tidak Wajar untuk Level Posisi',
      severity: 'Tinggi',
      weight: 15,
      desc: 'Menawarkan penghasilan harian fantastis tanpa kualifikasi yang sepadan.',
    },
    {
      code: 'T4',
      name: 'Kontak Hanya Via WhatsApp / Telegram Pribadi',
      severity: 'Tinggi',
      weight: 15,
      desc: 'Tidak mencantumkan alamat email domain korporasi atau situs web resmi perusahaan.',
    },
    {
      code: 'S1',
      name: 'Tekanan Waktu Cepat (Urgency Tactic)',
      severity: 'Sedang',
      weight: 15,
      desc: 'Memaksa calon pelamar untuk segera mentransfer dana atau mengonfirmasi dalam hitungan jam (misal: "Hanya berlaku hari ini").',
    },
    {
      code: 'S2',
      name: 'Identitas Perusahaan Tidak Jelas',
      severity: 'Sedang',
      weight: 15,
      desc: 'Tidak mencantumkan alamat kantor fisik atau legalitas badan usaha yang dapat diverifikasi di Ditjen AHU.',
    },
    {
      code: 'S3',
      name: 'Wawancara Hanya Melalui Chat Online',
      severity: 'Sedang',
      weight: 10,
      desc: 'Proses seleksi langsung dinyatakan lolos tanpa interaksi wawancara tatap muka atau video call resmi.',
    },
    {
      code: 'S4',
      name: 'Email Gratisan Mengatasnamakan Perusahaan',
      severity: 'Sedang',
      weight: 10,
      desc: 'Penggunaan domain umum publik (@gmail.com, @yahoo.com) untuk korespondensi resmi rekrutmen institusi besar.',
    },
    {
      code: 'S5',
      name: 'Tanpa Syarat Kualifikasi atau Pengalaman',
      severity: 'Sedang',
      weight: 10,
      desc: 'Kriteria pelamar terbuka bebas tanpa batas usia, keahlian, atau rekam jejak untuk memikat banyak korban.',
    },
    {
      code: 'S6',
      name: 'Bahasa Terlalu Persuasif & Janji Manis',
      severity: 'Sedang',
      weight: 10,
      desc: 'Kalimat seperti "Kerja santai dari rumah dapat puluhan juta", "Pasti cair 100%".',
    },
    {
      code: 'S7',
      name: 'Deskripsi Pekerjaan Tidak Spesifik',
      severity: 'Sedang',
      weight: 5,
      desc: 'Tugas harian tidak dijelaskan secara profesional.',
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="outline" className="text-[11px] font-semibold">
              Transparansi Metodologi Publik
            </Badge>
            <Badge variant="secondary" className="text-[11px] font-mono font-medium">
              Rule Engine v0.3.1
            </Badge>
          </div>
          <DialogTitle className="text-lg font-bold text-foreground flex items-center gap-2">
            <Scale className="size-5 text-primary" />
            Metodologi Pemeriksaan & Logika Penilaian Risiko KerjaArah
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed font-normal">
            Sebagai wujud komitmen atas asas keterbukaan (Public Transparency), seluruh formula penilaian, daftar 14
            indikator, aturan penanganan negasi, dan batasan operasional dipublikasikan secara terbuka bagi masyarakat.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-4 text-xs">
          {/* Prinsip Evaluasi & Override */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3 shadow-xs">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <Code2 className="size-4 text-primary" />
              Formula Penilaian Skor (0 - 100)
            </h4>
            <div className="font-mono bg-muted/60 p-3 rounded-lg border border-border text-foreground text-xs font-semibold">
              Skor Akhir = min(100, ∑ Bobot Indikator Terpicu)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block">Rendah (0 - 29)</span>
                <span className="text-muted-foreground text-[11px]">Indikasi mencurigakan minim / nihil.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="font-bold text-amber-700 dark:text-amber-300 block">Sedang (30 - 59)</span>
                <span className="text-muted-foreground text-[11px]">Terdapat kejanggalan, perlu verifikasi mandiri.</span>
              </div>
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30">
                <span className="font-bold text-destructive block">Tinggi (60 - 100)</span>
                <span className="text-muted-foreground text-[11px]">Indikasi kuat penipuan rekrutmen.</span>
              </div>
            </div>

            {/* Aturan Override Kritis */}
            <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/30 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-xs text-destructive">
                <AlertTriangle className="size-3.5" />
                Aturan Override Kritis (Critical Fallback Rule)
              </span>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                Jika terdapat salah satu indikator berderajat <strong className="text-foreground">Kritis (K1, K2, atau K3)</strong> yang terpicu,
                kategori lowongan secara otomatis ditetapkan menjadi <strong className="text-foreground">Tinggi</strong> terlepas dari apakah skor
                kumulatif di bawah 60. Hal ini memastikan peringatan bahaya tetap menyala pada kasus rekrutmen fiktif
                yang berkedok profesional.
              </p>
            </div>
          </div>

          {/* Negation Handling */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400" />
              Pencegahan Alarm Palsu (Negation Handling Context Window)
            </h4>
            <p className="text-foreground leading-relaxed font-normal">
              Banyak perusahaan resmi mencantumkan peringatan resmi seperti:
              <br />
              <em className="text-muted-foreground">
                &quot;Proses seleksi di PT Telkom tidak dipungut biaya apapun dan tidak bekerjasama dengan agen travel.&quot;
              </em>
            </p>
            <p className="text-muted-foreground leading-relaxed text-[11px] font-normal">
              Mesin analisis KerjaArah memindai jendela konteks sepanjang 60 karakter di sekitar kata kunci. Jika
              ditemukan pola negasi (seperti <em>&quot;tidak pernah meminta&quot;</em>, <em>&quot;tanpa biaya&quot;</em>,{' '}
              <em>&quot;waspada terhadap penipuan&quot;</em>), pemicu indikator dibatalkan sehingga tidak menghasilkan alarm palsu
              (false positive).
            </p>
          </div>

          {/* Daftar 14 Indikator */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
              <ShieldAlert className="size-4 text-amber-600 dark:text-amber-400" />
              Daftar 14 Indikator Risiko Prototipe KerjaArah
            </h4>

            <div className="space-y-2">
              {INDICATORS.map((ind) => (
                <div
                  key={ind.code}
                  className="p-3.5 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-xs"
                >
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[10px] font-mono px-1.5 py-0 font-bold ${
                          ind.severity === 'Kritis'
                            ? 'border-destructive/40 text-destructive bg-destructive/10'
                            : ind.severity === 'Tinggi'
                            ? 'border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10'
                            : 'border-border text-muted-foreground'
                        }`}
                      >
                        {ind.code} (+{ind.weight})
                      </Badge>
                      <span className="font-semibold text-foreground">{ind.name}</span>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-normal leading-relaxed">{ind.desc}</p>
                  </div>
                  <Badge variant="outline" className="text-[10px] self-start sm:self-center shrink-0 font-semibold">
                    {ind.severity}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Batasan Sistem & Legal Civic Disclaimer */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2 text-muted-foreground leading-relaxed text-[11px] font-normal">
            <span className="font-semibold text-xs text-foreground flex items-center gap-1.5">
              <Info className="size-3.5 text-muted-foreground" />
              Batasan Sistem & Pernyataan Hukum (Civic Disclaimer)
            </span>
            <p>
              KerjaArah dirancang sebagai instrumen asistensi mandiri pencari kerja untuk meningkatkan kewaspadaan dini
              terhadap tanda bahaya rekrutmen fiktif. Hasil evaluasi sistem didasarkan pada pencocokan pola linguistik dan
              aturan terstruktur, <strong className="text-foreground">bukan merupakan vonis hukum definitif</strong> mengenai keabsahan suatu entitas.
              Pengguna disarankan untuk selalu memverifikasi silang ke kanal resmi perusahaan terkait sebelum mengambil
              keputusan finansial atau membagikan dokumen identitas sensitif.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
