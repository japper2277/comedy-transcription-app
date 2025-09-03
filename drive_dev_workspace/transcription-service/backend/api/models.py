from pydantic import BaseModel
from typing import Optional
from enum import Enum

class JobStatus(str, Enum):
    QUEUED = "queued"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class TranscriptionModel(str, Enum):
    OPENAI_WHISPER = "openai-whisper"
    GEMINI_ANALYSIS = "gemini-analysis"
    WHISPER_PLUS_GEMINI = "whisper-plus-gemini"

class TranscriptionJobResponse(BaseModel):
    job_id: str
    status: JobStatus
    message: str = ""

class JobStatusResponse(BaseModel):
    job_id: str
    status: JobStatus
    result: Optional[str] = None
    analysis: Optional[dict] = None
    error: Optional[str] = None
    created_at: str
    completed_at: Optional[str] = None

class UsageResponse(BaseModel):
    user_id: str
    minutes_used: int
    minutes_remaining: int
    billing_period_start: str
    billing_period_end: str
 