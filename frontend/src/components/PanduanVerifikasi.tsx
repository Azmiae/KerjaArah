import { useState, useEffect } from 'react'
import {
  ExternalLink,
  Building2,
  FileCheck2,
  Globe2,
  Lock,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { getOfficialDomains, type OfficialDomain } from '@/lib/api'

export function PanduanVerifikasi() {
  const [domains, setDomains] = useState<OfficialDomain[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    async function loadDomains() {
      try {
        const data = await getOfficialDomains()
        setDomains(data)
      } catch (err) {
        console.error('Failed to load official domains:', err)
      } finally {
        setLoading(false)
      }
    }
    loadDomains()
  }, [])

  const filteredDomains = domains.filter(
    (d) =>
      d.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.domain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const OFFICIAL_CHANNELS = [
    {
      name: 'Ditjen Administrasi Hukum Umum (AHU)',
      agency: 'Kementerian Hukum dan HAM RI',
      url: 'https://ahu.go.id',
      badge: 'Badan Hukum Sah',
      desc: 'Pengecekan profil legalitas badan hukum perseroan (PT, CV, Yayasan) di database resmi negara.',
    },
    {
      name: 'Penyelenggara Sistem Elektronik (PSE)',
      agency: 'Kementerian Komunikasi dan Digital RI',
      url: 'https://pse.komdigi.go.id',
      badge: 'Sistem Terdaftar',
      desc: 'Pemeriksaan apakah platform web atau aplikasi rekrutmen terdaftar secara sah di sistem kominfo/komdigi.',
    },
    {
      name: 'KarirHub / SIAPkerja',
      agency: 'Kementerian Ketenagakerjaan RI',
      url: 'https://karirhub.kemnaker.go.id',
      badge: 'Ketenagakerjaan',
      desc: 'Portal resmi rekrutmen pemerintah dan verifikasi legalitas izin lembaga penempatan tenaga kerja (LPTKS/P3MI).',
    },
    {
      name: 'Satgas Pemberantasan Aktivitas Keuangan Ilegal',
      agency: 'Otoritas Jasa Keuangan (OJK)',
      url: 'https://ojk.go.id',
      badge: 'Anti Finansial Bodong',
      desc: 'Daftar entitas ilegal yang menyalahgunakan izin usaha untuk skema deposit uang atau investasi bodong.',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 text-xs font-semibold py-0.5">
                Portal Verifikasi Resmi
              </Badge>
              <Badge variant="outline" className="text-xs font-semibold">
                Sumber Data Terbuka Publik
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
              Panduan & Direktori Verifikasi Perusahaan
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-normal">
              Sebelum membagikan berkas lamaran atau menghadiri panggilan seleksi, selalu lakukan verifikasi silang
              melalui sumber kanal publik resmi Republik Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-xl bg-muted/50 border border-border text-xs text-foreground flex items-center gap-2 shadow-xs">
              <Lock className="size-4 text-emerald-600 dark:text-emerald-400" />
              <span className="font-semibold">Cek Mandiri & Independen</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Langkah Verifikasi Bertahap */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          <FileCheck2 className="size-4 text-primary" />
          4 Langkah Taktis Memverifikasi Perusahaan
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/50 transition-colors">
            <div className="size-7 rounded-lg bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
              1
            </div>
            <h4 className="text-xs font-semibold text-foreground">Cek Nama Domain & Email</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">
              Perusahaan korporasi resmi menggunakan email domain perusahaan (contoh: <code className="text-foreground font-semibold">@telkom.co.id</code>), bukan
              alamat gratisan (<code className="text-foreground">@gmail.com</code> atau <code className="text-foreground">@yahoo.com</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/50 transition-colors">
            <div className="size-7 rounded-lg bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
              2
            </div>
            <h4 className="text-xs font-semibold text-foreground">Bandingkan dengan Portal Karir</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">
              Buka situs web resmi perusahaan secara mandiri melalui mesin pencari, lalu periksa menu Karir/Rekrutmen
              apakah posisi tersebut memang sedang dibuka.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/50 transition-colors">
            <div className="size-7 rounded-lg bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
              3
            </div>
            <h4 className="text-xs font-semibold text-foreground">Cek Legalitas di AHU & PSE</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">
              Pastikan badan usaha berstatus PT/CV yang sah melalui database Ditjen AHU Kemenkumham dan sistem elektronik
              terdaftar di PSE Komdigi.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border space-y-2 shadow-xs hover:border-primary/50 transition-colors">
            <div className="size-7 rounded-lg bg-primary/10 border border-primary/30 text-primary font-bold text-xs flex items-center justify-center">
              4
            </div>
            <h4 className="text-xs font-semibold text-foreground">Konfirmasi ke Call Center</h4>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-normal">
              Jika menerima surat panggilan seleksi dengan syarat biro travel, telepon nomor resmi kantor pusat yang
              tercantum di situs resmi untuk konfirmasi.
            </p>
          </div>
        </div>
      </div>

      {/* Kanal Publik Resmi Republik Indonesia */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
          <Globe2 className="size-4 text-emerald-600 dark:text-emerald-400" />
          Kanal Resmi Verifikasi Data Publik Indonesia
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFICIAL_CHANNELS.map((ch, idx) => (
            <Card key={idx} className="flex flex-col justify-between shadow-xs hover:border-primary/50 transition-colors">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 font-semibold py-0.5">
                    {ch.badge}
                  </Badge>
                  <ExternalLink className="size-3 text-muted-foreground" />
                </div>
                <CardTitle className="text-sm font-semibold text-foreground">{ch.name}</CardTitle>
                <CardDescription className="text-[11px] text-muted-foreground">{ch.agency}</CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-1 pb-3 text-[11px] text-muted-foreground leading-relaxed font-normal">
                {ch.desc}
              </CardContent>
              <div className="p-4 pt-0">
                <a href={ch.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    Kunjungi Portal <ExternalLink className="size-3 ml-1" />
                  </Button>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Direktori Domain Resmi Perusahaan & BUMN */}
      <div className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border pt-6">
          <div>
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Building2 className="size-4 text-primary" />
              Direktori Domain & Kanal Karir Resmi
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5 font-normal">
              Daftar terkurasi domain asli perusahaan terkemuka untuk menghindari jebakan situs tiruan (typosquatting).
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari perusahaan atau domain..."
              className="text-xs"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-xs text-muted-foreground py-6 text-center italic">
            Memuat data direktori kanal dan domain resmi...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDomains.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors flex flex-col justify-between gap-3 shadow-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="text-[10px] font-semibold py-0">
                      {item.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.verification_source}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-foreground mt-1">{item.company_name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <Globe2 className="size-3 text-primary" />
                    <span>{item.domain}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground">Portal Karir Resmi:</span>
                  <a href={item.career_url} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-primary hover:text-primary/80 px-2 font-semibold">
                      Buka Karir <ExternalLink className="size-3 ml-1" />
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
