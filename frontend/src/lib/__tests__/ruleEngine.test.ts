/**
 * Pengujian Rule Engine KerjaArah.
 *
 * Berisi dua lapis:
 *   1. Kontrak QC K1-K3 (AGENTS.md § 7.2) — dual-verification true positive dan
 *      pencegahan false positive. Lapis ini WAJIB lolos.
 *   2. Pengukuran metrik terhadap dataset 20 asli vs 20 penipuan. Lapis ini
 *      MELAPORKAN apa adanya dan sengaja tidak meng-assert ambang tertentu,
 *      supaya angka yang keluar jujur dan bisa dipakai sebagai dasar perbaikan.
 */

import { describe, it, expect } from 'vitest'
import { analyzeJobDescription, redactSensitiveData } from '../ruleEngine'
import { DATASET_LOKER, LOKER_ASLI, LOKER_PENIPUAN, type ContohLoker } from './datasetLoker'

describe('Kontrak QC K1-K3 (dual-verification)', () => {
  it('K1 terpicu pada permintaan biaya di awal', () => {
    const r = analyzeJobDescription('Mohon transfer biaya seragam sebesar 250rb untuk administrasi.')
    expect(r.triggers.some((t) => t.code === 'K1')).toBe(true)
    expect(r.category).toBe('Tinggi')
  })

  it('K1 TIDAK terpicu pada kalimat penegasan resmi', () => {
    const r = analyzeJobDescription('PT Maju Bersama mengumumkan bahwa proses rekrutmen tidak dipungut biaya apapun.')
    expect(r.triggers.some((t) => t.code === 'K1')).toBe(false)
    expect(r.category).not.toBe('Tinggi')
  })

  it('K2 terpicu pada permintaan kode OTP', () => {
    const r = analyzeJobDescription('Ketik kode OTP yang dikirimkan ke nomor WhatsApp Anda untuk validasi akun.')
    expect(r.triggers.some((t) => t.code === 'K2')).toBe(true)
    expect(r.category).toBe('Tinggi')
  })

  it('K2 TIDAK terpicu pada imbauan waspada penipuan OTP', () => {
    const r = analyzeJobDescription('Waspada penipuan: Jangan pernah memberikan kode OTP atau password kepada siapapun.')
    expect(r.triggers.some((t) => t.code === 'K2')).toBe(false)
  })

  it('redaksi menyamarkan nomor HP, email pribadi, rekening, dan NIK', () => {
    expect(redactSensitiveData('Hubungi 081234567890 atau kirim ke hrd@gmail.com'))
      .toContain('[NO. HP DISAMARKAN]')
    expect(redactSensitiveData('Hubungi 081234567890 atau kirim ke hrd@gmail.com'))
      .toContain('[EMAIL PRIBADI DISAMARKAN]')
    expect(redactSensitiveData('Transfer ke rekening 1234567890123 a.n. Budi'))
      .toContain('[NO. REK DISAMARKAN]')
    expect(redactSensitiveData('Kirim foto KTP NIK 3201081234567890 sekarang'))
      .toContain('[NIK DISAMARKAN]')
  })

  it('redaksi menangkap nomor HP yang ditulis dengan pemisah', () => {
    // Orang lazim menulis nomor dengan tanda hubung, titik, atau spasi. Varian ini
    // sebelumnya lolos utuh dan ikut tersimpan di server lewat fitur Lapor Lowongan.
    for (const nomor of ['0812-9876-5432', '0812 9876 5432', '0812.9876.5432', '+62 812-9876-5432']) {
      expect(redactSensitiveData(`Hubungi admin di ${nomor} ya`)).toContain('[NO. HP DISAMARKAN]')
    }
  })

  it('redaksi TIDAK menyentuh angka yang bukan data pribadi', () => {
    const aman = [
      'Jam kerja 08.00 sampai 17.00 setiap hari',
      'Telepon kantor 021-5551234 pada jam kerja',
      'Gaji Rp 4.500.000 per bulan dan tunjangan Rp 750.000',
      'Lamaran dikirim ke hrd@perusahaan.co.id',
    ]
    for (const teks of aman) {
      expect(redactSensitiveData(teks)).toBe(teks)
    }
  })

  it('NIK tetap utuh tersamarkan meski mengandung pola mirip nomor HP', () => {
    // NIK 3201081234567890 memuat substring 081234567890. Bila urutan pola tertukar,
    // NIK akan terpotong menjadi "3201[NO. HP DISAMARKAN]".
    const hasil = redactSensitiveData('NIK saya 3201081234567890 dan HP 0812-9876-5432')
    expect(hasil).toContain('[NIK DISAMARKAN]')
    expect(hasil).toContain('[NO. HP DISAMARKAN]')
    expect(hasil).not.toContain('3201[')
  })
})

describe('Integritas dataset uji', () => {
  it('berisi 20 loker asli dan 20 loker penipuan', () => {
    expect(LOKER_ASLI).toHaveLength(20)
    expect(LOKER_PENIPUAN).toHaveLength(20)
    expect(DATASET_LOKER).toHaveLength(40)
  })

  it('setiap id unik dan label konsisten', () => {
    const ids = DATASET_LOKER.map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
    expect(LOKER_ASLI.every((d) => d.label === 'asli')).toBe(true)
    expect(LOKER_PENIPUAN.every((d) => d.label === 'penipuan')).toBe(true)
  })
})

describe('Metrik rule engine terhadap dataset 20 vs 20', () => {
  it('melaporkan confusion matrix dan daftar kesalahan klasifikasi', () => {
    const salahKlasifikasi: Array<{ contoh: ContohLoker; kategori: string; skor: number; kode: string }> = []
    let tp = 0
    let fp = 0
    let tn = 0
    let fn = 0
    let asliKategoriSedang = 0

    for (const contoh of DATASET_LOKER) {
      const hasil = analyzeJobDescription(contoh.teks)
      const ditandai = hasil.category === 'Tinggi'
      const kode = hasil.triggers.map((t) => t.code).join(',') || '-'

      if (contoh.label === 'penipuan') {
        if (ditandai) tp++
        else {
          fn++
          salahKlasifikasi.push({ contoh, kategori: hasil.category, skor: hasil.score, kode })
        }
      } else {
        if (ditandai) {
          fp++
          salahKlasifikasi.push({ contoh, kategori: hasil.category, skor: hasil.score, kode })
        } else {
          tn++
          if (hasil.category === 'Sedang') asliKategoriSedang++
        }
      }
    }

    // Metrik longgar: "Sedang" ikut dihitung sebagai peringatan kepada pengguna.
    // Dibutuhkan karena sejak ambang diperbaiki, kategori Sedang bukan lagi sinyal
    // netral melainkan ajakan waspada, sehingga mengabaikannya memberi gambaran
    // yang terlalu pesimistis terhadap kemampuan engine.
    let tpL = 0
    let fpL = 0
    for (const contoh of DATASET_LOKER) {
      const k = analyzeJobDescription(contoh.teks).category
      const diperingatkan = k === 'Tinggi' || k === 'Sedang'
      if (contoh.label === 'penipuan' && diperingatkan) tpL++
      if (contoh.label === 'asli' && diperingatkan) fpL++
    }
    const fnL = 20 - tpL
    const tnL = 20 - fpL

    const hitung = (tp_: number, fp_: number, fn_: number, tn_: number) => {
      const p = tp_ + fp_ === 0 ? 0 : tp_ / (tp_ + fp_)
      const r = tp_ + fn_ === 0 ? 0 : tp_ / (tp_ + fn_)
      return {
        presisi: p,
        recall: r,
        f1: p + r === 0 ? 0 : (2 * p * r) / (p + r),
        akurasi: (tp_ + tn_) / DATASET_LOKER.length,
      }
    }
    const ketat = hitung(tp, fp, fn, tn)
    const longgar = hitung(tpL, fpL, fnL, tnL)
    const pct = (n: number) => (n * 100).toFixed(1) + '%'

    console.log('\n================ METRIK RULE ENGINE ================')
    console.log('KETAT   — positif hanya bila kategori "Tinggi"\n')
    console.log(`  True Positive  (penipuan, tertangkap)   : ${tp} / 20`)
    console.log(`  False Negative (penipuan, LOLOS)        : ${fn} / 20`)
    console.log(`  True Negative  (asli, aman)             : ${tn} / 20`)
    console.log(`  False Positive (asli, SALAH DITUDUH)    : ${fp} / 20`)
    console.log('')
    console.log(`  Presisi ${pct(ketat.presisi)} | Recall ${pct(ketat.recall)} | F1 ${pct(ketat.f1)} | Akurasi ${pct(ketat.akurasi)}`)
    console.log('')
    console.log('LONGGAR — positif bila "Tinggi" ATAU "Sedang" (pengguna tetap diperingatkan)\n')
    console.log(`  True Positive  : ${tpL} / 20     False Negative : ${fnL} / 20`)
    console.log(`  True Negative  : ${tnL} / 20     False Positive : ${fpL} / 20`)
    console.log('')
    console.log(`  Presisi ${pct(longgar.presisi)} | Recall ${pct(longgar.recall)} | F1 ${pct(longgar.f1)} | Akurasi ${pct(longgar.akurasi)}`)
    console.log('')
    console.log(`  Catatan: ${asliKategoriSedang} loker asli berkategori "Sedang"`)

    if (salahKlasifikasi.length > 0) {
      console.log('\n---------------- KESALAHAN KLASIFIKASI ----------------')
      for (const s of salahKlasifikasi) {
        const jenis = s.contoh.label === 'penipuan' ? 'FALSE NEGATIVE' : 'FALSE POSITIVE'
        console.log(`\n  [${s.contoh.id}] ${jenis} — kategori ${s.kategori}, skor ${s.skor}`)
        console.log(`     indikator terpicu : ${s.kode}`)
        console.log(`     jebakan           : ${s.contoh.jebakan}`)
      }
    }
    console.log('\n=====================================================\n')

    // Dataset harus terevaluasi seluruhnya; ambang mutu sengaja belum dikunci.
    expect(tp + fn + tn + fp).toBe(40)
  })
})
