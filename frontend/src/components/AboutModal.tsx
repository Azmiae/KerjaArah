import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { ShieldCheck, Lock, AlertTriangle, Scale, Heart, Compass } from 'lucide-react'

interface AboutModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AboutModal({ open, onOpenChange }: AboutModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-2 pb-2 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground shadow-xs">
              <ShieldCheck className="size-4" />
            </div>
            <div>
              <DialogTitle className="text-base font-bold text-foreground">
                Tentang KerjaArah
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Misi, Arsitektur Privasi, dan Batasan Sistem Resmi Platform
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-5 text-xs text-muted-foreground leading-relaxed pt-2">
          {/* Visi Proyek */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Compass className="size-4 text-primary" />
              Latar Belakang & Misi Sosial
            </h3>
            <p>
              <strong className="text-foreground">KerjaArah</strong> dirancang sebagai solusi civic tech untuk merespons maraknya kejahatan ketenagakerjaan daring di Indonesia—mulai dari modus tiket travel fiktif, deposit tugas berbayar (Ponzi paruh waktu), pencurian kode OTP/kredensial, hingga penyalahgunaan KTP untuk pinjaman online ilegal.
            </p>
            <p>
              Mengusung tema <strong className="text-foreground">&quot;Designing Digital Futures - Powering Public Transparency&quot;</strong>, KerjaArah mengubah pelaporan publik menjadi aksi nyata dengan transparansi data terbuka dan perlindungan berbasis bukti.
            </p>
          </div>

          {/* Batasan Sistem Resmi (§ 16 Proposal) */}
          <div className="p-4 rounded-xl bg-card border border-border space-y-3">
            <h3 className="text-sm font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <AlertTriangle className="size-4" />
              Batasan Sistem & Kejujuran Teknis (§ 16 Proposal)
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">1.</span>
                <span>
                  <strong className="text-foreground">Alat Bantu Skrining, Bukan Penjamin Mutlak:</strong> KerjaArah berfungsi sebagai lapis pertahanan pertama untuk meningkatkan kewaspadaan. Keputusan akhir melamar tetap berada di tangan pengguna.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">2.</span>
                <span>
                  <strong className="text-foreground">Skor Rendah Bukan Garansi 100% Bebas Penipuan:</strong> Modus penipuan rekrutmen terus berevolusi. Teks yang dirancang sangat halus bisa saja menghasilkan skor rendah meskipun berisiko. Selalu lakukan verifikasi silang di portal karir resmi.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">3.</span>
                <span>
                  <strong className="text-foreground">Cakupan Input Saat Ini:</strong> Mesin deteksi saat ini memproses masukan berbasis teks langsung. Analisis gambar poster/brosur via OCR direncanakan pada peta jalan pengembangan lanjutan.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">4.</span>
                <span>
                  <strong className="text-foreground">Bukan Pengganti Penegak Hukum:</strong> KerjaArah adalah inisiatif civic tech independen, bukan lembaga berwenang yang dapat melakukan penindakan hukum, pembekuan rekening bank, atau pemblokiran nomor secara langsung.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold shrink-0">5.</span>
                <span>
                  <strong className="text-foreground">Transparansi Status Data:</strong> Seluruh data statistik pada tahap demonstrasi prototipe diberi label jelas sebagai <Badge variant="outline" className="border-amber-500/40 text-amber-600 dark:text-amber-400 bg-amber-500/10 text-[10px] py-0 px-1 font-mono">DATA SIMULASI</Badge> sesuai pedoman integritas data.
                </span>
              </li>
            </ul>
          </div>

          {/* Komitmen Privasi Zero-Cloud (§ 12 Proposal) */}
          <div className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Lock className="size-4 text-emerald-600 dark:text-emerald-400" />
              Arsitektur Privasi & Perlindungan Data (§ 12 Proposal)
            </h3>
            <p>
              • <strong className="text-foreground">Zero-Cloud Text Analysis:</strong> Teks lowongan yang diuji pada Job Scam Checker dianalisis 100% secara lokal di browser Anda. Tidak ada teks yang dikirim atau disimpan di server tanpa izin.
            </p>
            <p>
              • <strong className="text-foreground">Redaksi Sensor Ganda:</strong> Pada fitur pelaporan, nomor HP, NIK, dan nomor rekening disamarkan secara otomatis di sisi peramban sebelum dikirim, dan divalidasi ulang di backend.
            </p>
            <p>
              • <strong className="text-foreground">Pelaporan Tanpa Akun:</strong> Anda dapat melapor dan melacak status audit secara anonim dengan kode tiket unik tanpa perlu mendaftarkan akun pribadi.
            </p>
          </div>

          {/* Footer Info & Attribution */}
          <div className="pt-2 text-[11px] text-muted-foreground flex items-center justify-between border-t border-border">
            <span className="flex items-center gap-1">
              <Scale className="size-3.5 text-primary" /> Dibuat dengan integritas transparansi publik
            </span>
            <span className="flex items-center gap-1">
              Made with <Heart className="size-3 text-destructive fill-destructive" /> untuk Pencari Kerja Indonesia
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
