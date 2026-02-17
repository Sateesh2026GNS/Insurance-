from pydantic import BaseModel
from datetime import datetime, date
from typing import Optional
from decimal import Decimal


class HealthClaimCreate(BaseModel):
    hospital_name: str
    admission_date: date
    discharge_date: date
    claim_amount: Decimal
    description: Optional[str] = None


class LifeClaimCreate(BaseModel):
    claim_subtype: str  # death / maturity
    claimant_name: str
    bank_account: Optional[str] = None
    bank_ifsc: Optional[str] = None


class ClaimResponse(BaseModel):
    id: int
    user_id: int
    claim_type: str
    claim_subtype: Optional[str] = None
    status: str
    reviewer_comment: Optional[str] = None
    hospital_name: Optional[str] = None
    admission_date: Optional[date] = None
    discharge_date: Optional[date] = None
    claim_amount: Optional[Decimal] = None
    description: Optional[str] = None
    claimant_name: Optional[str] = None
    bank_account: Optional[str] = None
    bank_ifsc: Optional[str] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class DocumentResponse(BaseModel):
    id: int
    claim_id: int
    file_name: str
    file_path: str
    file_type: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
