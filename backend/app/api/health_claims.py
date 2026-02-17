from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import uuid

from app.db.session import get_db
from app.schemas.claim import HealthClaimCreate, ClaimResponse
from app.services.claim_service import ClaimService
from app.core.dependencies import get_current_user
from app.core.config import settings
from app.models.user import User

router = APIRouter()


def _save_file(file: UploadFile, claim_id: int) -> str:
    """Save uploaded file. Returns relative path."""
    ext = os.path.splitext(file.filename)[1] or ".pdf"
    filename = f"{uuid.uuid4().hex}{ext}"
    rel_dir = f"claims/health/{claim_id}"
    upload_dir = os.path.join(settings.UPLOAD_DIR, rel_dir)
    os.makedirs(upload_dir, exist_ok=True)
    path = os.path.join(upload_dir, filename)
    with open(path, "wb") as f:
        f.write(file.file.read())
    return f"/{settings.UPLOAD_DIR}/{rel_dir}/{filename}"


@router.post("/", response_model=ClaimResponse)
def create_health_claim(
    hospital_name: str = Form(...),
    admission_date: str = Form(...),
    discharge_date: str = Form(...),
    claim_amount: float = Form(...),
    description: Optional[str] = Form(None),
    files: list[UploadFile] | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create health claim with optional file uploads."""
    from datetime import datetime

    data = HealthClaimCreate(
        hospital_name=hospital_name,
        admission_date=datetime.fromisoformat(admission_date).date(),
        discharge_date=datetime.fromisoformat(discharge_date).date(),
        claim_amount=claim_amount,
        description=description,
    )
    service = ClaimService(db)
    claim = service.create_health_claim(current_user.id, data)

    if files and len(files) > 0:
        for f in files:
            path = _save_file(f, claim.id)
            service.add_document(claim.id, path, f.filename or "file", f.content_type)

    return claim


@router.get("/", response_model=list[ClaimResponse])
def list_my_health_claims(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List current user's health claims."""
    service = ClaimService(db)
    claims = [c for c in service.list_user_claims(current_user.id) if c.claim_type == "HEALTH"]
    return claims
