"""
Pydantic schemas untuk validasi input dan serialisasi response
sesuai pedoman AGENTS.md.
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict


class ReportCreate(BaseModel):
    category: str = Field(..., min_length=2, max_length=100, description="Kategori modus penipuan")
    channel: str = Field(..., min_length=2, max_length=50, description="Kanal penyebaran (WhatsApp, Telegram, dll)")
    incident_date: Optional[str] = Field(None, max_length=20)
    loss_type: str = Field(..., pattern="^(tidak_ada|data_pribadi|uang)$", description="Jenis kerugian yang dialami")
    reported_company: Optional[str] = Field(None, max_length=100, description="Nama perusahaan yang diduga dicatut (opsional)")
    job_text: str = Field(..., min_length=10, max_length=10000, description="Teks isi lowongan kerja")
    honeypot: Optional[str] = Field(None, max_length=100, description="Kolom jebakan anti-bot")


class StatusHistoryItem(BaseModel):
    status: str
    note: Optional[str] = None
    timestamp: str


class ReportTrackingResponse(BaseModel):
    tracking_code: str
    status: str
    category: str
    channel: str
    loss_type: str
    created_at: str
    updated_at: str
    rejection_reason: Optional[str] = None
    history: List[StatusHistoryItem]


class StatusEventCreate(BaseModel):
    indicator_codes: List[str] = Field(..., min_length=1, max_length=14)
    risk_category: str = Field(..., pattern="^(Rendah|Sedang|Tinggi)$")


class TopIndicatorItem(BaseModel):
    code: str
    count: int


class StatsSummaryResponse(BaseModel):
    is_simulation: bool = True
    simulation_label: str = "DATA SIMULASI"
    total_reports: int
    verified_reports: int
    pending_reports: int
    modus_distribution: Dict[str, int]
    channel_distribution: Dict[str, int]
    loss_distribution: Dict[str, int]
    top_indicators: List[TopIndicatorItem]
    disclaimer: str = (
        "Data dashboard menggambarkan laporan yang masuk ke KerjaArah dan bukan merupakan statistik resmi penegak hukum. "
        "Pada tahap prototipe, data awal berstatus simulasi untuk pengujian visual."
    )


class AdminStatusUpdate(BaseModel):
    status: str = Field(..., pattern="^(Diterima|Dalam Tinjauan|Terverifikasi|Ditolak)$")
    note: Optional[str] = Field(None, max_length=255)
    rejection_reason: Optional[str] = Field(None, max_length=255)


class ArticleResponse(BaseModel):
    id: int
    number: str
    title: str
    risk_level: str
    description: str
    red_flags: List[str]


class ChecklistItemResponse(BaseModel):
    id: int
    question: str
    weight: int


class OfficialDomainResponse(BaseModel):
    id: int
    company_name: str
    category: str
    domain: str
    career_url: str
    verification_source: str


# -------------------------------------------------------------
# ZERO-KNOWLEDGE SEED ID VAULT SCHEMAS (Prototipe Fitur 05)
# -------------------------------------------------------------
class VaultSyncRequest(BaseModel):
    seed_hash: str = Field(..., min_length=16, max_length=128, description="Hash SHA-256 Seed ID untuk partisi penyimpanan tanpa data pengenal")
    encrypted_blob: str = Field(..., min_length=5, max_length=500000, description="Ciphertext data lamaran terenkripsi client-side")


class VaultSyncResponse(BaseModel):
    status: str
    message: str
    updated_at: str


class VaultFetchResponse(BaseModel):
    status: str
    seed_hash: str
    encrypted_blob: str
    updated_at: str
