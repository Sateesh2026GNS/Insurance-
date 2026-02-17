"""Customer-facing claims endpoints - list claims, track status."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.claim import ClaimResponse
from app.services.claim_service import ClaimService
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


@router.get("/", response_model=list[ClaimResponse])
def list_my_claims(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List all claims for current user (Health + Life)."""
    service = ClaimService(db)
    return service.list_user_claims(current_user.id)


@router.get("/stats")
def get_claim_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get claim statistics for dashboard (total, pending, approved, rejected)."""
    service = ClaimService(db)
    return service.get_claim_stats(current_user.id)


@router.get("/{claim_id}", response_model=ClaimResponse)
def get_claim(
    claim_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get claim by ID (own claims only)."""
    service = ClaimService(db)
    claim = service.get_claim_by_id(claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    if claim.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Access denied")
    return claim
