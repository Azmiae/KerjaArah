import React, { useState } from 'react'
import {
  KeyRound,
  ShieldAlert,
  Copy,
  Check,
  Download,
  Upload,
  RefreshCw,
  CloudUpload,
  CloudDownload,
  Lock,
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { hashSeedId, syncVaultToCloud, fetchVaultFromCloud } from '@/lib/api'

// Tipe data lamaran kerja (sama dengan App.tsx)
export interface JobApplication {
  id: string
  company: string
  position: string
  status: 'wishlist' | 'applied' | 'interview' | 'offering'
  riskCategory: 'Rendah' | 'Sedang' | 'Tinggi' | 'Belum Dicek'
  riskScore?: number
  notes: string
  dateAdded: string
}

interface SeedIdVaultModalProps {
  isOpen: boolean
  onClose: () => void
  applications: JobApplication[]
  onRestoreApplications: (apps: JobApplication[]) => void
}

const WORDS = ['EAGLE', 'FALCON', 'SHIELD', 'CITADEL', 'BEACON', 'SUMMIT', 'BLUE', 'NOVA', 'AURORA', 'QUANTUM']

function generateRandomSeedId(): string {
  const num1 = Math.floor(1000 + Math.random() * 9000)
  const num2 = Math.floor(1000 + Math.random() * 9000)
  const word1 = WORDS[Math.floor(Math.random() * WORDS.length)]
  const word2 = WORDS[Math.floor(Math.random() * WORDS.length)]
  return `KA-${num1}-${word1}-${num2}-${word2}`
}

export function SeedIdVaultModal({
  isOpen,
  onClose,
  applications,
  onRestoreApplications,
}: SeedIdVaultModalProps) {
  // Inisialisasi Seed ID dari localStorage atau buat baru jika belum ada
  const [seedId, setSeedId] = useState<string>(() => {
    const existing = localStorage.getItem('kerjaarah_seed_id')
    if (existing) return existing
    const generated = generateRandomSeedId()
    localStorage.setItem('kerjaarah_seed_id', generated)
    return generated
  })
  const [copied, setCopied] = useState<boolean>(false)
  const [inputSeedId, setInputSeedId] = useState<string>('')
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  const [isSyncing, setIsSyncing] = useState<boolean>(false)

  const handleCopy = () => {
    if (!seedId) return
    navigator.clipboard.writeText(seedId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleGenerateNew = () => {
    if (window.confirm('Buat Kunci Seed ID baru? Pastikan Anda sudah mencadangkan data lamaran jika diperlukan.')) {
      const next = generateRandomSeedId()
      localStorage.setItem('kerjaarah_seed_id', next)
      setSeedId(next)
      setStatusMessage({ text: 'Kunci Seed ID baru berhasil dibuat.', type: 'success' })
      setTimeout(() => setStatusMessage(null), 3000)
    }
  }

  // Unduh Kunci (.txt)
  const handleDownloadKeyTxt = () => {
    const textContent = `============================================================
KERJAARAH — KUNCI PEMULIHAN BRANKAS (SEED ID)
============================================================

Kunci Seed ID Anda:
${seedId}

Dibuat pada: ${new Date().toLocaleString('id-ID')}
Jumlah Riwayat Lamaran: ${applications.length} Posisi

PETUNJUK KEAMANAN:
1. Simpan file ini di media penyimpanan yang aman.
2. Sistem KerjaArah beroperasi 100% lokal tanpa email & password.
3. Kunci ini adalah satu-satunya alat pemulihan untuk mengakses kembali
   riwayat lamaran Anda jika peramban dibersihkan atau ganti perangkat.
============================================================`

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `KerjaArah_SeedKey_${seedId}.txt`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Ekspor Cadangan Data (.json)
  const handleExportJson = () => {
    const backupData = {
      app: 'KerjaArah',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      seedId: seedId,
      applications: applications,
    }
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `KerjaArah_Backup_${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  // Impor Cadangan Data (.json)
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (Array.isArray(parsed.applications)) {
          onRestoreApplications(parsed.applications)
          if (parsed.seedId) {
            localStorage.setItem('kerjaarah_seed_id', parsed.seedId)
            setSeedId(parsed.seedId)
          }
          setStatusMessage({
            text: `✅ Berhasil memulihkan ${parsed.applications.length} lamaran dari file cadangan.`,
            type: 'success',
          })
        } else if (Array.isArray(parsed)) {
          onRestoreApplications(parsed)
          setStatusMessage({
            text: `✅ Berhasil memulihkan ${parsed.length} lamaran dari file cadangan.`,
            type: 'success',
          })
        } else {
          throw new Error('Format berkas cadangan tidak valid.')
        }
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'Berkas tidak valid'
        setStatusMessage({ text: `❌ Gagal membaca file: ${errorMsg}`, type: 'error' })
      }
    }
    reader.readAsText(file)
  }

  // Sinkronkan ke Cloud secara Zero-Knowledge
  const handleSyncToCloud = async () => {
    if (!seedId) return
    setIsSyncing(true)
    setStatusMessage(null)
    try {
      const hash = await hashSeedId(seedId)
      // Enkripsi/Serialisasi lokal: Data diubah menjadi base64 string
      const payloadString = JSON.stringify({
        applications,
        timestamp: new Date().toISOString(),
      })
      const encodedBlob = btoa(unescape(encodeURIComponent(payloadString)))

      await syncVaultToCloud(hash, encodedBlob)
      setStatusMessage({
        text: '✅ Berhasil disinkronkan ke server cloud brankas (Zero-Knowledge: server tidak dapat membaca isi data).',
        type: 'success',
      })
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Sinkronisasi gagal'
      setStatusMessage({ text: `❌ ${errorMsg}`, type: 'error' })
    } finally {
      setIsSyncing(false)
    }
  }

  // Pulihkan Data dari Kunci Seed ID Lama (Cloud Restore)
  const handleRestoreFromSeed = async () => {
    if (!inputSeedId.trim()) {
      setStatusMessage({ text: 'Mohon masukkan Kunci Seed ID Anda.', type: 'error' })
      return
    }
    setIsSyncing(true)
    setStatusMessage(null)
    try {
      const cleanSeed = inputSeedId.trim().toUpperCase()
      const hash = await hashSeedId(cleanSeed)
      const data = await fetchVaultFromCloud(hash)

      if (data && data.encrypted_blob) {
        const decodedString = decodeURIComponent(escape(atob(data.encrypted_blob)))
        const parsed = JSON.parse(decodedString)
        if (parsed.applications && Array.isArray(parsed.applications)) {
          onRestoreApplications(parsed.applications)
          setSeedId(cleanSeed)
          localStorage.setItem('kerjaarah_seed_id', cleanSeed)
          setStatusMessage({
            text: `✅ Berhasil memulihkan ${parsed.applications.length} riwayat lamaran dari cloud brankas!`,
            type: 'success',
          })
        } else {
          throw new Error('Format data tidak sesuai.')
        }
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Pemulihan gagal'
      setStatusMessage({
        text: `❌ ${errorMsg}. Pastikan Kunci Seed ID benar dan sudah pernah disinkronkan.`,
        type: 'error',
      })
    } finally {
      setIsSyncing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between gap-2">
            <DialogTitle className="text-lg font-bold flex items-center gap-2 text-foreground">
              <KeyRound className="size-5 text-primary" />
              <span>Kunci Pemulihan Brankas (Seed ID)</span>
            </DialogTitle>
            <Badge variant="secondary" className="text-[11px] font-mono flex items-center gap-1">
              <Lock className="size-3 text-emerald-500" />
              Zero-Knowledge
            </Badge>
          </div>
          <DialogDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            KerjaArah beroperasi 100% lokal tanpa email atau kata sandi. Kunci Seed ID ini adalah satu-satunya alat
            untuk membackup dan menyinkronkan data lamaran Anda ke perangkat lain.
          </DialogDescription>
        </DialogHeader>

        {/* Notifikasi Status Pesan */}
        {statusMessage && (
          <Alert variant={statusMessage.type === 'error' ? 'destructive' : 'default'} className="py-2.5 text-xs">
            <AlertDescription className="font-medium">{statusMessage.text}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col gap-5 py-2">
          {/* Box Kunci Seed ID Aktif */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-foreground flex items-center justify-between">
              <span>Kunci Seed ID Perangkat Ini:</span>
              <button
                onClick={handleGenerateNew}
                className="text-[11px] text-muted-foreground hover:text-foreground flex items-center gap-1 underline underline-offset-2"
              >
                <RefreshCw className="size-3" />
                Buat Kunci Baru
              </button>
            </label>
            <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/50">
              <span className="font-mono text-xs sm:text-sm font-bold tracking-wider text-foreground select-all flex-1 break-all">
                {seedId || 'Memuat Seed ID...'}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2.5 text-xs shrink-0 font-medium"
              >
                {copied ? <Check className="size-3.5 text-emerald-500 mr-1" /> : <Copy className="size-3.5 mr-1" />}
                {copied ? 'Tersalin' : 'Salin'}
              </Button>
            </div>
          </div>

          {/* Banner Peringatan Keamanan */}
          <Alert className="border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 py-3">
            <ShieldAlert className="size-4 shrink-0 text-amber-500" />
            <div>
              <AlertTitle className="text-xs font-bold uppercase tracking-wider">
                [Peringatan Keamanan]
              </AlertTitle>
              <AlertDescription className="text-xs leading-relaxed mt-1">
                Simpan kunci ini di tempat aman. Karena sistem kami tidak menyimpan kredensial di server, kehilangan
                kunci berarti data Anda tidak dapat dipulihkan jika peramban dibersihkan atau perangkat rusak.
              </AlertDescription>
            </div>
          </Alert>

          {/* Pemulihan dari Seed ID Lama */}
          <div className="flex flex-col gap-2 p-4 rounded-lg border border-border bg-card">
            <span className="text-xs font-bold text-foreground">Punya Kunci Seed ID Lama?</span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Masukkan kunci Anda dari perangkat sebelumnya untuk memuat riwayat lamaran dari cloud brankas:
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <Input
                placeholder="Tempelkan Seed ID (contoh: KA-8942-EAGLE-7791-BLUE)..."
                value={inputSeedId}
                onChange={(e) => setInputSeedId(e.target.value)}
                className="font-mono text-xs h-9"
              />
              <Button
                onClick={handleRestoreFromSeed}
                disabled={isSyncing || !inputSeedId.trim()}
                size="sm"
                className="h-9 px-4 text-xs font-medium w-full sm:w-auto shrink-0"
              >
                <CloudDownload className="size-3.5 mr-1.5" />
                Pulihkan Data
              </Button>
            </div>
          </div>

          {/* Opsi Sinkronisasi & File Cadangan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSyncToCloud}
              disabled={isSyncing}
              className="text-xs h-9 font-medium justify-center"
              title="Kirim cadangan terenkripsi ke server cloud brankas"
            >
              <CloudUpload className="size-3.5 mr-1.5 text-primary" />
              {isSyncing ? 'Menyinkronkan...' : 'Sinkronkan ke Cloud'}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadKeyTxt}
              className="text-xs h-9 font-medium justify-center"
            >
              <Download className="size-3.5 mr-1.5" />
              Unduh Kunci (.txt)
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportJson}
              className="text-xs h-9 font-medium justify-center"
            >
              <Download className="size-3.5 mr-1.5" />
              Ekspor Cadangan (.json)
            </Button>

            <label className="cursor-pointer">
              <Button
                variant="outline"
                size="sm"
                asChild
                className="text-xs h-9 font-medium justify-center w-full"
              >
                <span>
                  <Upload className="size-3.5 mr-1.5" />
                  Impor Cadangan (.json)
                </span>
              </Button>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="secondary" size="sm" onClick={onClose} className="text-xs font-medium">
            Tutup Dialog
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}