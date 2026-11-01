/**
 * KerjaArah API Client
 * Mengintegrasikan Frontend dengan Backend FastAPI (http://127.0.0.1:8000)
 * Dilengkapi dengan fallback offline dan penanganan error yang andal.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'

export interface StatsSummary {
  is_simulation: boolean
  simulation_label: string
  total_reports: number
  verified_reports: number
  pending_reports: number
  modus_distribution: Record<string, number>
  channel_distribution: Record<string, number>
  loss_distribution: Record<string, number>
  top_indicators: Array<{ code: string; count: number }>
  disclaimer: string
}

export interface StatusHistoryItem {
  status: string
  note?: string
  timestamp: string
}

export interface ReportTracking {
  tracking_code: string
  status: 'Diterima' | 'Dalam Tinjauan' | 'Terverifikasi' | 'Ditolak' | string
  category: string
  channel: string
  loss_type: string
  created_at: string
  updated_at: string
  rejection_reason?: string | null
  history: StatusHistoryItem[]
}

export interface ReportCreatePayload {
  category: string
  channel: string
  incident_date?: string
  loss_type: 'tidak_ada' | 'data_pribadi' | 'uang'
  reported_company?: string
  job_text: string
  honeypot?: string
}

export interface ReportSubmitResponse {
  tracking_code: string
  status: string
  message: string
}

export interface OfficialDomain {
  id: number
  company_name: string
  category: string
  domain: string
  career_url: string
  verification_source: string
}

export interface ArticleItem {
  id: number
  number: string
  title: string
  risk_level: string
  description: string
  red_flags: string[]
}

export interface ChecklistItem {
  id: number
  question: string
  weight: number
}

// ==========================================
// API CALLS
// ==========================================

export async function getStatsSummary(): Promise<StatsSummary> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stats`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend unavailable, using fallback simulated stats', err)
    return {
      is_simulation: true,
      simulation_label: 'DATA SIMULASI',
      total_reports: 12,
      verified_reports: 7,
      pending_reports: 4,
      modus_distribution: {
        'Tugas Like & Subscribe (Ponzi)': 2,
        'Tiket Travel / Akomodasi Palsu': 2,
        'Permintaan Data Sensitif / KTP': 1,
        'Pencurian OTP & Kredensial': 1,
        'Penahanan Ijazah Asli': 1,
      },
      channel_distribution: {
        WhatsApp: 3,
        Telegram: 1,
        'Portal Lowongan': 1,
        'Media Sosial': 1,
        Email: 1,
      },
      loss_distribution: {
        uang: 4,
        data_pribadi: 2,
        tidak_ada: 1,
      },
      top_indicators: [
        { code: 'K3', count: 4 },
        { code: 'K1', count: 3 },
        { code: 'T1', count: 2 },
        { code: 'K2', count: 2 },
        { code: 'T3', count: 1 },
      ],
      disclaimer:
        'Data dashboard menggambarkan laporan yang masuk ke KerjaArah dan bukan merupakan statistik resmi penegak hukum. Pada tahap prototipe, data awal berstatus simulasi untuk pengujian visual.',
    }
  }
}

export async function submitReport(payload: ReportCreatePayload): Promise<ReportSubmitResponse> {
  const res = await fetch(`${API_BASE_URL}/api/reports`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || `Gagal mengirim laporan (HTTP ${res.status})`)
  }
  return await res.json()
}

export async function trackReport(trackingCode: string): Promise<ReportTracking> {
  const code = trackingCode.trim().toUpperCase()
  const res = await fetch(`${API_BASE_URL}/api/reports/${encodeURIComponent(code)}`)
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || 'Kode pelacakan tidak ditemukan.')
  }
  return await res.json()
}

export async function getOfficialDomains(): Promise<OfficialDomain[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/domains`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.warn('Backend unavailable, using fallback domains', err)
    return [
      {
        id: 1,
        company_name: 'PT Telkom Indonesia (Persero) Tbk',
        category: 'BUMN Telekomunikasi',
        domain: 'telkom.co.id',
        career_url: 'https://careers.telkom.co.id',
        verification_source: 'Kementerian BUMN',
      },
      {
        id: 2,
        company_name: 'PT Pertamina (Persero)',
        category: 'BUMN Energi',
        domain: 'pertamina.com',
        career_url: 'https://recruitment.pertamina.com',
        verification_source: 'Kementerian BUMN',
      },
      {
        id: 3,
        company_name: 'PT Bank Mandiri (Persero) Tbk',
        category: 'Perbankan BUMN',
        domain: 'bankmandiri.co.id',
        career_url: 'https://mandirikarier.net',
        verification_source: 'OJK & BUMN',
      },
      {
        id: 4,
        company_name: 'PT Bank Central Asia Tbk',
        category: 'Perbankan Swasta',
        domain: 'bca.co.id',
        career_url: 'https://karir.bca.co.id',
        verification_source: 'Otoritas Jasa Keuangan',
      },
      {
        id: 5,
        company_name: 'PT Perusahaan Listrik Negara (Persero)',
        category: 'BUMN Ketenagalistrikan',
        domain: 'pln.co.id',
        career_url: 'https://rekrutmen.pln.co.id',
        verification_source: 'Kementerian BUMN',
      },
      {
        id: 6,
        company_name: 'PT Kereta Api Indonesia (Persero)',
        category: 'BUMN Transportasi',
        domain: 'kai.id',
        career_url: 'https://recruitment.kai.id',
        verification_source: 'Kementerian BUMN',
      },
    ]
  }
}

export async function sendOptInStatEvent(indicatorCodes: string[], riskCategory: 'Rendah' | 'Sedang' | 'Tinggi') {
  try {
    await fetch(`${API_BASE_URL}/api/stats/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        indicator_codes: indicatorCodes,
        risk_category: riskCategory,
      }),
    })
  } catch (err) {
    // Silent fail for opt-in analytics
    console.debug('Opt-in event not sent:', err)
  }
}

export async function getArticles(): Promise<ArticleItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/articles`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) return data
  } catch (err) {
    console.warn('Backend unavailable, using fallback articles', err)
  }
  return [
    {
      id: 1,
      number: '01',
      title: 'Trik Biro Travel & Tiket Fiktif',
      risk_level: 'Kritis K1',
      description: 'Korban menerima surat panggilan wawancara mengatasnamakan korporasi besar di luar kota, namun diharuskan memesan tiket pesawat/akomodasi via agen travel tertentu dengan iming-iming penggantian uang (reimbursement).',
      red_flags: [
        'Pengirim memakai email publik (@gmail, @yahoo) atau domain palsu',
        'Hanya diperbolehkan menghubungi biro travel yang ditunjuk',
        'Jadwal seleksi sangat mendesak (hanya 1-2 hari)',
      ],
    },
    {
      id: 2,
      number: '02',
      title: 'Pekerjaan Paruh Waktu Like & Subscribe (Ponzi)',
      risk_level: 'Kritis K3',
      description: 'Diberi misi harian ringan seperti like video TikTok/YouTube dengan imbalan puluhan ribu rupiah. Setelah beberapa misi, korban diarahkan masuk ke grup Telegram dan diminta deposit modal jutaan untuk membuka bonus VIP.',
      red_flags: [
        'Tawaran masuk melalui WhatsApp/Telegram nomor tidak dikenal',
        'Ada skema deposit bertingkat sebelum penarikan uang',
        'Bukti transfer anggota grup biasanya rekayasa',
      ],
    },
    {
      id: 3,
      number: '03',
      title: 'Pencurian OTP & Pengambilalihan Akun',
      risk_level: 'Kritis K2',
      description: 'Pemberi kerja fiktif meminta kode OTP SMS atau PIN akun perbankan/e-wallet dengan alasan verifikasi nomor pegawai baru atau sinkronisasi kartu absensi daring.',
      red_flags: [
        'Meminta 6 digit kode rahasia dari SMS operator',
        'Menanyakan nama gadis ibu kandung atau nomor kartu debit',
        'Mendesak dalam hitungan menit agar korban panik',
      ],
    },
    {
      id: 4,
      number: '04',
      title: 'Penyalahgunaan NIK KTP untuk Pinjol Ilegal',
      risk_level: 'Tinggi T1',
      description: 'Pelamar diwajibkan mengunggah foto KTP dan selfie bersama KTP di tahap seleksi berkas awal sebelum ada kejelasan profil dan lokasi fisik kantor perusahaan.',
      red_flags: [
        'Permintaan selfie KTP di awal pendaftaran',
        'Perusahaan tidak memiliki alamat kantor fisik yang jelas',
        'Identitas pelamar dipakai membuka pinjaman online tanpa izin',
      ],
    },
    {
      id: 5,
      number: '05',
      title: 'Penahanan Ijazah Asli & Uang Jaminan Kerja',
      risk_level: 'Sedang S1',
      description: 'Perusahaan menahan ijazah asli pekerja dan menuntut penalti puluhan juta jika mengundurkan diri, atau mewajibkan uang tebusan seragam di hari pertama kerja.',
      red_flags: [
        'Ijazah asli ditahan tanpa dasar perjanjian kerja bersama',
        'Denda penalti yang tidak sebanding dengan upah',
        'Ketiadaan tanda terima dan jaminan fisik dokumen',
      ],
    },
    {
      id: 6,
      number: '06',
      title: 'Prosedur Tanggap Darurat Jika Menjadi Korban',
      risk_level: 'Prosedur Mitigasi',
      description: 'Langkah taktis yang wajib segera dilakukan jika Anda terlanjur mentransfer uang, menyerahkan foto KTP, atau membagikan kode OTP ke pihak penipu.',
      red_flags: [
        'Segera hubungi call center bank untuk blokir rekening/kartu tujuan transfer',
        'Ganti kata sandi & revoke active session akun email/aplikasi perbankan',
        'Laporkan rekening pelaku ke CekRekening.id dan buat aduan siber ke PatroliSiber.id',
      ],
    },
  ]
}

export async function getChecklist(): Promise<ChecklistItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/checklist`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) return data
  } catch (err) {
    console.warn('Backend unavailable, using fallback checklist', err)
  }
  return [
    { id: 1, question: 'Apakah nama perusahaan dan situs resminya dapat ditemukan di Google secara independen?', weight: 1 },
    { id: 2, question: 'Apakah alamat email perekrut menggunakan domain resmi korporat (@perusahaan.com), bukan email publik (@gmail)?', weight: 1 },
    { id: 3, question: 'Apakah proses rekrutmen BEBAS dari segala bentuk permintaan uang, deposit, atau pembelian tiket travel?', weight: 2 },
    { id: 4, question: 'Apakah proses seleksi (tes tertulis, wawancara) dilakukan melalui kanal resmi atau kantor fisik yang jelas?', weight: 1 },
    { id: 5, question: 'Apakah pihak perekrut TIDAK meminta foto KTP atau nomor rekening pada tahap awal pendaftaran?', weight: 1 },
    { id: 6, question: 'Apakah tawaran gaji dan deskripsi pekerjaan sesuai dengan standar kewajaran industri?', weight: 1 },
    { id: 7, question: 'Apakah lowongan ini juga tercantum di situs karir resmi atau akun LinkedIn resmi perusahaan?', weight: 1 },
  ]
}

export function getExportCsvUrl(): string {
  return `${API_BASE_URL}/api/stats/export.csv`
}

// ==========================================
// ZERO-KNOWLEDGE SEED ID VAULT SYNC (Fitur 05)
// ==========================================

export interface VaultSyncResponse {
  status: string
  message: string
  updated_at: string
}

export interface VaultFetchResponse {
  status: string
  seed_hash: string
  encrypted_blob: string
  updated_at: string
}

/**
 * Menghasilkan hash SHA-256 dari Kunci Seed ID secara lokal di browser.
 * Server hanya menerima hash ini, bukan Seed ID asli.
 */
export async function hashSeedId(seedId: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(seedId.trim().toUpperCase())
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Menyinkronkan cadangan data lamaran terenkripsi (Zero-Knowledge) ke server backend.
 */
export async function syncVaultToCloud(seedHash: string, encryptedBlob: string): Promise<VaultSyncResponse> {
  const res = await fetch(`${API_BASE_URL}/api/vault/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      seed_hash: seedHash,
      encrypted_blob: encryptedBlob,
    }),
  })
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || `HTTP ${res.status}: Gagal menyinkronkan ke brankas`)
  }
  return await res.json()
}

/**
 * Mengambil data terenkripsi dari server berdasarkan hash Kunci Seed ID.
 */
export async function fetchVaultFromCloud(seedHash: string): Promise<VaultFetchResponse> {
  const res = await fetch(`${API_BASE_URL}/api/vault/${encodeURIComponent(seedHash)}`)
  if (!res.ok) {
    if (res.status === 404) {
      throw new Error('Data cadangan tidak ditemukan di server untuk Seed ID ini.')
    }
    throw new Error(`HTTP ${res.status}: Gagal mengambil data brankas`)
  }
  return await res.json()
}
