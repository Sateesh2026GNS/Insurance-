from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from pydantic import BaseModel

from app.db.session import get_db
from app.schemas.claim import ClaimResponse
from app.services.claim_service import ClaimService
from app.core.dependencies import get_current_user
from app.models.user import User
from app.constants import ROLE_ADMIN, ROLE_REVIEWER

router = APIRouter()


def require_reviewer(user: User) -> None:
    if user.role not in (ROLE_ADMIN, ROLE_REVIEWER):
        raise HTTPException(status_code=403, detail="Reviewer access required")


class ApproveRequest(BaseModel):
    comment: str | None = None


class RejectRequest(BaseModel):
    comment: str


@router.get("/claims/pending", response_model=list[ClaimResponse])
def list_pending_claims(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Get all pending claims (reviewer only)."""
    require_reviewer(current_user)
    service = ClaimService(db)
    return service.list_pending_claims()


@router.post("/claims/approve/{claim_id}", response_model=ClaimResponse)
def approve_claim(
    claim_id: int,
    body: ApproveRequest | None = Body(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Approve a claim (reviewer only)."""
    require_reviewer(current_user)
    service = ClaimService(db)
    claim = service.approve_claim(claim_id, current_user.id, body and body.comment)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim


@router.post("/claims/reject/{claim_id}", response_model=ClaimResponse)
def reject_claim(
    claim_id: int,
    body: RejectRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Reject a claim with comment (reviewer only)."""
    require_reviewer(current_user)
    service = ClaimService(db)
    claim = service.reject_claim(claim_id, current_user.id, body.comment)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    return claim
