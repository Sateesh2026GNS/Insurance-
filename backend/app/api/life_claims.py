from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import os
import uuid

from app.db.session import get_db
from app.schemas.claim import LifeClaimCreate, ClaimResponse
from app.services.claim_service import ClaimService
from app.core.dependencies import get_current_user
from app.core.config import settings
from app.models.user import User

router = APIRouter()


def _save_file(file: UploadFile, claim_id: int) -> str:
    ext = os.path.splitext(file.filename)[1] or ".pdf"
    filename = f"{uuid.uuid4().hex}{ext}"
    rel_dir = f"claims/life/{claim_id}"
    upload_dir = os.path.join(settings.UPLOAD_DIR, rel_dir)
    os.makedirs(upload_dir, exist_ok=True)
    path = os.path.join(upload_dir, filename)
    with open(path, "wb") as f:
        f.write(file.file.read())
    return f"/{settings.UPLOAD_DIR}/{rel_dir}/{filename}"


@router.post("/", response_model=ClaimResponse)
def create_life_claim(
    claim_subtype: str = Form(...),
    claimant_name: str = Form(...),
    bank_account: Optional[str] = Form(None),
    bank_ifsc: Optional[str] = Form(None),
    files: list[UploadFile] | None = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Create life claim (death/maturity) with optional file uploads."""
    data = LifeClaimCreate(
        claim_subtype=claim_subtype,
        claimant_name=claimant_name,
        bank_account=bank_account,
        bank_ifsc=bank_ifsc,
    )
    service = ClaimService(db)
    claim = service.create_life_claim(current_user.id, data)

    if files and len(files) > 0:
        for f in files:
            path = _save_file(f, claim.id)
            service.add_document(claim.id, path, f.filename or "file", f.content_type)

    return claim


@router.get("/", response_model=list[ClaimResponse])
def list_my_life_claims(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List current user's life claims."""
    service = ClaimService(db)
    claims = [c for c in service.list_user_claims(current_user.id) if c.claim_type == "LIFE"]
    return claims
