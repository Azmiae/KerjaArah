# 🎯 Project Milestones & Progress Tracking

Pelacakan target kemajuan pengerjaan proyek **KerjaArah** berdasarkan jadwal kompetisi **Web In Action (WIA) 2026**.

---

## 📅 Roadmap & Status Pengerjaan

### Fase 1: Perumusan Konsep & Dokumen (19–22 Oktober 2026)
- [x] Riset masalah lowongan kerja fiktif & penipuan rekrutmen di Indonesia
- [x] Perumusan arsitektur client-side rule engine (privacy-first)
- [x] Penyusunan 14 indikator risiko (K1–K3, T1–T4, S1–S7) beserta bobot & override rules
- [x] Penyusunan draf proposal lengkap 24 bab di [proposal_konsep_kerjaarah_wia_2026.md](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/proposal_konsep_kerjaarah_wia_2026.md)
- [x] Setup sistem version control perkembangan internal di [.agent/](file:///c:/Folder%20Tugas%20Azmi/OFAResearch/Lomba/MIA_WEB/.agent/)

### Fase 2: Desain UI/UX & Prototipe Frontend (23–26 Oktober 2026)
- [x] Inisialisasi basis proyek Web Frontend (React + Tailwind CSS + shadcn/ui)
- [x] Perancangan antarmuka visual modern, responsif, dan aksesibel
- [x] Halaman Beranda (Landing Page & Pengenalan Masalah)
- [x] Komponen Job Scam Checker (Input area, tips, auto-redaction warning)
- [x] Komponen Hasil Analisis Risiko (Risk gauge, badge status, breakdown pemicu)
- [x] Komponen Personal Job Tracker (Kanban Board dengan stage-gate checkpoint keselamatan)
- [x] Komponen Safety Checklist interaktif
- [x] Komponen Education Hub & artikel modus penipuan

### Fase 3: Pembangunan Core Engine, Backend FastAPI & Integrasi (27–31 Oktober 2026)
- [x] Pembangunan modul JavaScript Rule Engine di klien (14 indikator K1-K3, T1-T4, S1-S7 + QC K1-K3)
- [x] Setup Backend FastAPI (Python) & database lokal SQLite (lifespan manager, 8 endpoint teruji 100%)
- [x] Integrasi Rule Engine dan Kanban Tracker ke antarmuka pengguna (dengan dialog konfirmasi hapus & toast)
- [x] Integrasi Dashboard Transparansi Publik & ekspor data terbuka (Open Data CSV + filter periode)
- [x] Integrasi Civic Reporting (Lapor Lowongan) dengan redaksi sensor otomatis & alur review -> persetujuan eksplisit
- [x] Integrasi Public Service Tracking (Lacak Laporan) dengan visual Audit Trail Stepper
- [x] Integrasi Direktori Verifikasi Resmi (Kanal Pemerintah & Domain BUMN/Korporasi)
- [x] Publikasi Transparansi Metodologi (Modal 14 Indikator) & Modal Batasan Sistem Resmi (About)
- [x] Integrasi API dinamis Education Hub (6 artikel termasuk Mitigasi Darurat) & Safety Checklist
- [x] Validasi performa respons deteksi (< 5 detik di peramban — tercapai < 1 detik)
- [ ] Penyiapan dataset uji (20 loker normal vs 20 loker mencurigakan)

### Fase 4: First Draft & Evaluasi Mentor (1–7 November 2026)
- [ ] Pengujian internal & demo minimal 3 variasi skenario loker
- [ ] Finalisasi dokumen proposal first draft (Maks. 30 halaman)
- [ ] Pengumpulan First Draft (Target internal: 1 November 2026)
- [ ] Peninjauan evaluasi dan masukan mentor

### Fase 5: Revisi & Final Submission (8–11 November 2026)
- [ ] Perbaikan akurasi rule engine berdasarkan temuan false positive/negative
- [ ] Polishing visual & pengalaman pengguna (UX micro-interactions)
- [ ] Pengujian lintas perangkat (Desktop & Mobile)
- [ ] Final submission (11 November 2026)
