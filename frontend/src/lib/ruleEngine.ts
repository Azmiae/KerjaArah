/**
 * KerjaArah Client-Side Rule Engine
 * Mengimplementasikan 14 indikator risiko (K1-K3, T1-T4, S1-S7)
 * dengan context window, negation handling, auto-redaction, dan override rule.
 */

export interface IndicatorTrigger {
  code: string
  name: string
  severity: 'Kritis' | 'Tinggi' | 'Sedang'
  weight: number
  matchedText: string
  explanation: string
}

export interface AnalysisResult {
  score: number
  category: 'Rendah' | 'Sedang' | 'Tinggi'
  color: 'green' | 'yellow' | 'red'
  triggers: IndicatorTrigger[]
  hasCriticalOverride: boolean
  redactedText: string
}

// Negation patterns: kata-kata yang membatalkan deteksi jika muncul dalam konteks dekat
const NEGATION_PATTERNS = [
  /tidak\s+(?:pernah\s+)?(?:ada\s+)?(?:meminta|dipungut|membayar|dikenakan|memungut)/i,
  /tanpa\s+(?:biaya|pungutan|deposit|potongan)/i,
  /bebas\s+biaya/i,
  /gratis/i,
  /waspada\s+(?:terhadap\s+)?penipuan/i,
  /hati-hati\s+(?:terhadap\s+)?(?:penipuan|permintaan)/i,
  /jangan\s+(?:pernah\s+)?(?:memberikan|mentransfer|kirimkan|bocorkan)/i,
  /bukan\s+penipuan/i,
]

function isNegated(text: string, matchIndex: number, windowSize = 60): boolean {
  const start = Math.max(0, matchIndex - windowSize)
  const end = Math.min(text.length, matchIndex + windowSize)
  const snippet = text.slice(start, end)
  return NEGATION_PATTERNS.some((pattern) => pattern.test(snippet))
}

export function redactSensitiveData(text: string): string {
  let result = text
  // Redact NIK (16 digits)
  result = result.replace(/\b[1-9]\d{15}\b/g, '[NIK DISAMARKAN]')
  // Redact Nomor Rekening (10-16 digits)
  result = result.replace(/\b\d{10,16}\b/g, (match) => {
    // Abaikan jika tampaknya nomor tahun atau kode pos biasa
    if (match.length <= 5) return match
    return '[NO. REK DISAMARKAN]'
  })
  // Redact Phone Numbers (Indonesia: 08xx or +628xx)
  result = result.replace(/(?:\+62|62|0)8[1-9][0-9]{7,10}\b/g, '[NO. HP DISAMARKAN]')
  // Redact Personal Emails
  result = result.replace(/[a-zA-Z0-9_.+-]+@(gmail|yahoo|hotmail|outlook)\.[a-zA-Z0-9-.]+/gi, '[EMAIL PRIBADI DISAMARKAN]')
  return result
}

export function analyzeJobDescription(rawText: string): AnalysisResult {
  const triggers: IndicatorTrigger[] = []
  const text = rawText.toLowerCase()

  // -------------------------------------------------------------
  // K1: Permintaan transfer / biaya sebelum rekrutmen (+35, Kritis)
  // -------------------------------------------------------------
  const k1Pattern = /(?:transfer|biaya|bayar|pungutan|setor|uang|ongkos|membayar)\s+(?:sebesar|administrasi|pelatihan|seragam|materai|member|pendaftaran|tiket|travel|akomodasi)/i
  const k1Match = text.match(k1Pattern)
  if (k1Match && k1Match.index !== undefined && !isNegated(text, k1Match.index)) {
    triggers.push({
      code: 'K1',
      name: 'Permintaan Transfer atau Biaya di Awal',
      severity: 'Kritis',
      weight: 35,
      matchedText: rawText.substr(k1Match.index, Math.min(60, k1Match[0].length + 20)),
      explanation: 'Proses rekrutmen resmi TIDAK PERNAH memungut biaya apapun (seragam, administrasi, pelatihan, atau tiket perjalanan biro tertentu).',
    })
  }

  // -------------------------------------------------------------
  // K2: Permintaan OTP, PIN, atau Kata Sandi (+35, Kritis)
  // -------------------------------------------------------------
  const k2Pattern = /(?:kirimkan|masukkan|minta|berikan|share|ketik)\s+(?:kode\s+)?(?:otp|pin|password|kata\s+sandi|verifikasi\s+sms)/i
  const k2Match = text.match(k2Pattern)
  if (k2Match && k2Match.index !== undefined && !isNegated(text, k2Match.index)) {
    triggers.push({
      code: 'K2',
      name: 'Permintaan Kode OTP, PIN, atau Kata Sandi',
      severity: 'Kritis',
      weight: 35,
      matchedText: rawText.substr(k2Match.index, Math.min(60, k2Match[0].length + 20)),
      explanation: 'Kode OTP dan PIN bersifat rahasia pribadi. Perusahaan resmi tidak pernah meminta kode OTP calon pelamar.',
    })
  }

  // -------------------------------------------------------------
  // K3: Pekerjaan Berbasis Tugas dengan Setoran/Top-Up (+30, Kritis)
  // -------------------------------------------------------------
  const k3Pattern = /(?:like|subscribe|follow|nonton|review|tugas)\s+(?:dapat\s+komisi|dibayar|top\s*up|deposit|modal\s+awal)/i
  const k3Match = text.match(k3Pattern)
  if (k3Match && k3Match.index !== undefined && !isNegated(text, k3Match.index)) {
    triggers.push({
      code: 'K3',
      name: 'Skema Tugas Berbayar & Setoran Deposit',
      severity: 'Kritis',
      weight: 30,
      matchedText: rawText.substr(k3Match.index, Math.min(60, k3Match[0].length + 20)),
      explanation: 'Modus klasik penipuan paruh waktu berbasis misi/tugas yang meminta deposit modal sebelum komisi dapat ditarik.',
    })
  }

  // -------------------------------------------------------------
  // T1: Permintaan Data Sensitif di Awal (+20, Tinggi)
  // -------------------------------------------------------------
  const t1Pattern = /(?:foto\s+ktp|selfie\s+ktp|foto\s+kk|kartu\s+keluarga|buku\s+tabungan|no(?:mor)?\s+rekening)\s+(?:wajib|kirim|unggah|upload)/i
  const t1Match = text.match(t1Pattern)
  if (t1Match && t1Match.index !== undefined && !isNegated(text, t1Match.index)) {
    triggers.push({
      code: 'T1',
      name: 'Permintaan Data Pribadi Sensitif di Tahap Awal',
      severity: 'Tinggi',
      weight: 20,
      matchedText: rawText.substr(t1Match.index, Math.min(60, t1Match[0].length + 20)),
      explanation: 'Tahap lamaran awal biasanya hanya membutuhkan CV/resume. Permintaan foto KTP/rekening berisiko disalahgunakan untuk pinjol ilegal.',
    })
  }

  // -------------------------------------------------------------
  // T2: Tautan Mencurigakan / Typosquatting (+20, Tinggi)
  // -------------------------------------------------------------
  const t2Pattern = /(?:https?:\/\/)?(?:bit\.ly|tinyurl\.com|s\.id|t\.me\/|wa\.me\/|forms\.gle\/[a-zA-Z0-9_-]+)/i
  const t2Match = text.match(t2Pattern)
  if (t2Match && t2Match.index !== undefined) {
    triggers.push({
      code: 'T2',
      name: 'Tautan Pendaftaran Pendek atau Tidak Resmi',
      severity: 'Tinggi',
      weight: 20,
      matchedText: t2Match[0],
      explanation: 'Perusahaan profesional menggunakan portal karier dengan domain resmi perusahaan, bukan tautan pemendek atau formulir gratisan.',
    })
  }

  // -------------------------------------------------------------
  // T3: Gaji Tidak Wajar untuk Syarat Minimal (+15, Tinggi)
  // -------------------------------------------------------------
  const t3Pattern = /(?:gaji|penghasilan|upah)\s+(?:10|15|20|25|30|50)\s*(?:juta|jt)\s*(?:per\s*hari|per\s*minggu|tanpa\s*pengalaman)/i
  const t3Match = text.match(t3Pattern)
  if (t3Match && t3Match.index !== undefined) {
    triggers.push({
      code: 'T3',
      name: 'Tawaran Gaji Tidak Wajar (Unrealistic Compensation)',
      severity: 'Tinggi',
      weight: 15,
      matchedText: rawText.substr(t3Match.index, Math.min(60, t3Match[0].length + 20)),
      explanation: 'Penghasilan sangat fantastis tanpa syarat kualifikasi adalah umpan psikologis untuk memancing korban tergiur.',
    })
  }

  // -------------------------------------------------------------
  // T4: Kontak Hanya via Jalur Pribadi (+15, Tinggi)
  // -------------------------------------------------------------
  const t4Pattern = /(?:hanya\s+hubungi|kontak\s+hanya\s+via|chat\s+ke)\s+(?:wa|whatsapp|telegram)\s+(?:pribadi|admin)/i
  const t4Match = text.match(t4Pattern)
  if (t4Match && t4Match.index !== undefined) {
    triggers.push({
      code: 'T4',
      name: 'Kanal Komunikasi Eksklusif Jalur Pribadi',
      severity: 'Tinggi',
      weight: 15,
      matchedText: rawText.substr(t4Match.index, Math.min(60, t4Match[0].length + 20)),
      explanation: 'Proses seleksi resmi memiliki jejak audit transparan melalui email korporat atau sistem pelacakan pelamar (ATS).',
    })
  }

  // -------------------------------------------------------------
  // S1: Tekanan Waktu Berlebihan (+15, Sedang)
  // -------------------------------------------------------------
  const s1Pattern = /(?:kuota\s+terbatas|hanya\s+hari\s+ini|butuh\s+mendesak|segera\s+konfirmasi\s+sebelum\s+hangus|butuh\s+cepat\s+hari\s+ini)/i
  const s1Match = text.match(s1Pattern)
  if (s1Match && s1Match.index !== undefined) {
    triggers.push({
      code: 'S1',
      name: 'Tekanan Waktu Berlebih (Artificial Urgency)',
      severity: 'Sedang',
      weight: 15,
      matchedText: rawText.substr(s1Match.index, Math.min(60, s1Match[0].length + 20)),
      explanation: 'Menciptakan kepanikan agar pelamar segera mengambil keputusan tanpa sempat memeriksa keaslian informasi.',
    })
  }

  // -------------------------------------------------------------
  // S4: Email Publik/Gratisan Atas Nama Korporat (+10, Sedang)
  // -------------------------------------------------------------
  const s4Pattern = /[a-zA-Z0-9_.+-]+@(gmail|yahoo|hotmail|ymail)\.com/i
  const s4Match = text.match(s4Pattern)
  if (s4Match && s4Match.index !== undefined) {
    triggers.push({
      code: 'S4',
      name: 'Penggunaan Alamat Email Publik untuk Rekrutmen Korporat',
      severity: 'Sedang',
      weight: 10,
      matchedText: s4Match[0],
      explanation: 'Perusahaan skala menengah hingga besar menggunakan domain email resmi (@namaperusahaan.co.id/com), bukan akun email gratisan.',
    })
  }

  // -------------------------------------------------------------
  // S6: Bahasa Terlalu Persuasif (+10, Sedang)
  // -------------------------------------------------------------
  const s6Pattern = /(?:kerja\s+santai|cukup\s+rebahan|sambil\s+tiduran|pasti\s+cair|jaminan\s+sukses)/i
  const s6Match = text.match(s6Pattern)
  if (s6Match && s6Match.index !== undefined) {
    triggers.push({
      code: 'S6',
      name: 'Bahasa Promotif Berlebihan (Over-promising Language)',
      severity: 'Sedang',
      weight: 10,
      matchedText: rawText.substr(s6Match.index, Math.min(60, s6Match[0].length + 20)),
      explanation: 'Janji kerja tanpa usaha dengan imbalan instan adalah ciri khas penipuan ketenagakerjaan daring.',
    })
  }

  // -------------------------------------------------------------
  // S2: Identitas Perusahaan Sulit Diverifikasi (+15, Sedang)
  // -------------------------------------------------------------
  const s2Pattern = /(?:perusahaan\s+(?:baru\s+)?(?:belum|tidak)\s+(?:terdaftar|punya\s+(?:website|situs|kantor))|tanpa\s+(?:alamat|kantor)\s+(?:fisik|jelas)|(?:lokasi|alamat)\s+(?:kantor\s+)?(?:tidak\s+)?(?:jelas|diketahui)|(?:tidak\s+ada|tanpa)\s+(?:informasi|profil)\s+perusahaan)/i
  const s2Match = text.match(s2Pattern)
  if (s2Match && s2Match.index !== undefined) {
    triggers.push({
      code: 'S2',
      name: 'Identitas Perusahaan Sulit Diverifikasi',
      severity: 'Sedang',
      weight: 15,
      matchedText: rawText.substr(s2Match.index, Math.min(60, s2Match[0].length + 20)),
      explanation: 'Perusahaan yang sah memiliki alamat kantor, situs web, dan profil publik yang dapat diverifikasi secara independen.',
    })
  }

  // -------------------------------------------------------------
  // S3: Wawancara/Penerimaan Hanya Melalui Chat (+10, Sedang)
  // -------------------------------------------------------------
  const s3Pattern = /(?:wawancara|interview|seleksi|tes)\s+(?:hanya\s+)?(?:via|melalui|lewat)\s+(?:chat|whatsapp|telegram|wa|dm|pesan)/i
  const s3Match = text.match(s3Pattern)
  if (s3Match && s3Match.index !== undefined) {
    triggers.push({
      code: 'S3',
      name: 'Wawancara atau Penerimaan Hanya Melalui Chat',
      severity: 'Sedang',
      weight: 10,
      matchedText: rawText.substr(s3Match.index, Math.min(60, s3Match[0].length + 20)),
      explanation: 'Perusahaan profesional melakukan seleksi melalui kanal yang lebih formal (email, video call, atau tatap muka), bukan hanya chat pribadi.',
    })
  }

  // -------------------------------------------------------------
  // S5: Tanpa Syarat Kualifikasi atau Pengalaman (+10, Sedang)
  // -------------------------------------------------------------
  const s5Pattern = /(?:tanpa\s+(?:syarat|kualifikasi|pengalaman|ijazah|pendidikan)|tidak\s+(?:perlu|butuh)\s+(?:pengalaman|ijazah|cv|kualifikasi)|(?:semua\s+(?:orang|umur)\s+bisa|siapapun\s+bisa|bebas\s+usia))/i
  const s5Match = text.match(s5Pattern)
  if (s5Match && s5Match.index !== undefined) {
    triggers.push({
      code: 'S5',
      name: 'Tanpa Syarat Kualifikasi atau Pengalaman',
      severity: 'Sedang',
      weight: 10,
      matchedText: rawText.substr(s5Match.index, Math.min(60, s5Match[0].length + 20)),
      explanation: 'Lowongan kerja profesional selalu mencantumkan syarat kualifikasi minimum. Ketiadaan syarat sama sekali sering menjadi umpan bagi korban.',
    })
  }

  // -------------------------------------------------------------
  // S7: Deskripsi Pekerjaan Tidak Spesifik (+5, Sedang)
  // -------------------------------------------------------------
  const s7Pattern = /(?:tugas\s+(?:akan\s+)?(?:dijelaskan|diinfo|dibahas)\s+(?:nanti|kemudian|setelah)|detail\s+(?:pekerjaan|tugas)\s+(?:menyusul|nanti|setelah\s+bergabung)|job\s*desc\s+(?:belum|akan)\s+(?:ada|dikirim|diinfo))/i
  const s7Match = text.match(s7Pattern)
  if (s7Match && s7Match.index !== undefined) {
    triggers.push({
      code: 'S7',
      name: 'Deskripsi Pekerjaan Tidak Spesifik',
      severity: 'Sedang',
      weight: 5,
      matchedText: rawText.substr(s7Match.index, Math.min(60, s7Match[0].length + 20)),
      explanation: 'Lowongan yang sah selalu mencantumkan deskripsi tugas dan tanggung jawab yang jelas sebelum pelamar melamar.',
    })
  }

  // Hitung Skor
  const rawScore = triggers.reduce((acc, curr) => acc + curr.weight, 0)
  const score = Math.min(100, rawScore)

  // Evaluasi Override Rule Kritis (K1-K3)
  const hasCritical = triggers.some((t) => t.severity === 'Kritis')

  let category: 'Rendah' | 'Sedang' | 'Tinggi' = 'Rendah'
  let color: 'green' | 'yellow' | 'red' = 'green'

  if (hasCritical || score >= 60) {
    category = 'Tinggi'
    color = 'red'
  } else if (score >= 30) {
    category = 'Sedang'
    color = 'yellow'
  } else {
    category = 'Rendah'
    color = 'green'
  }

  return {
    score,
    category,
    color,
    triggers,
    hasCriticalOverride: hasCritical && score < 60,
    redactedText: redactSensitiveData(rawText),
  }
}

// -------------------------------------------------------------
// SELF-CHECK & DUAL-VERIFICATION ASSERTIONS (QC K1-K3 Karpathy Protocol)
// -------------------------------------------------------------
export function runSelfTest(): boolean {
  console.log('[RuleEngine] Menjalankan self-test QC K1-K3...')

  // Test 1: True Positive K1 (Permintaan Biaya)
  const t1 = analyzeJobDescription('Mohon transfer biaya seragam sebesar 250rb untuk administrasi.')
  if (!t1.triggers.some((t) => t.code === 'K1') || t1.category !== 'Tinggi') {
    throw new Error('FAILED QC: K1 True Positive tidak terdeteksi!')
  }

  // Test 2: False Positive Guard K1 (Pengecualian Negasi)
  const t2 = analyzeJobDescription('PT Maju Bersama mengumumkan bahwa proses rekrutmen tidak dipungut biaya apapun.')
  if (t2.triggers.some((t) => t.code === 'K1') || t2.category === 'Tinggi') {
    throw new Error('FAILED QC: K1 False Positive terpicu pada kalimat negasi!')
  }

  // Test 3: True Positive K2 (Permintaan OTP)
  const t3 = analyzeJobDescription('Ketik kode OTP yang dikirimkan ke nomor WhatsApp Anda untuk validasi akun.')
  if (!t3.triggers.some((t) => t.code === 'K2') || t3.category !== 'Tinggi') {
    throw new Error('FAILED QC: K2 True Positive tidak terdeteksi!')
  }

  // Test 4: False Positive Guard K2 (Peringatan Waspada OTP)
  const t4 = analyzeJobDescription('Waspada penipuan: Jangan pernah memberikan kode OTP atau password kepada siapapun.')
  if (t4.triggers.some((t) => t.code === 'K2')) {
    throw new Error('FAILED QC: K2 False Positive terpicu pada kalimat peringatan penipuan!')
  }

  // Test 5: Redaksi Data Sensitif
  const redacted = redactSensitiveData('Hubungi 081234567890 atau kirim ke hrd@gmail.com')
  if (!redacted.includes('[NO. HP DISAMARKAN]') || !redacted.includes('[EMAIL PRIBADI DISAMARKAN]')) {
    throw new Error('FAILED QC: Redaksi data pribadi gagal!')
  }

  console.log('[RuleEngine] ✅ Semua test QC K1-K3 lolos dengan sukses.')
  return true
}

// Auto-run self test in dev environment
if (typeof window !== 'undefined') {
  try {
    runSelfTest()
  } catch (err) {
    console.error(err)
  }
}
