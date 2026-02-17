from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.claim import Claim
from app.models.document import Document
from app.schemas.claim import HealthClaimCreate, LifeClaimCreate
from app.constants import CLAIM_TYPE_HEALTH, CLAIM_TYPE_LIFE, CLAIM_STATUS_PENDING


class ClaimService:
    def __init__(self, db: Session):
        self.db = db

    def create_health_claim(self, user_id: int, data: HealthClaimCreate) -> Claim:
        claim = Claim(
            user_id=user_id,
            claim_type=CLAIM_TYPE_HEALTH,
            hospital_name=data.hospital_name,
            admission_date=data.admission_date,
            discharge_date=data.discharge_date,
            claim_amount=data.claim_amount,
            description=data.description,
            status=CLAIM_STATUS_PENDING,
        )
        self.db.add(claim)
        self.db.commit()
        self.db.refresh(claim)
        return claim

    def create_life_claim(self, user_id: int, data: LifeClaimCreate) -> Claim:
        claim = Claim(
            user_id=user_id,
            claim_type=CLAIM_TYPE_LIFE,
            claim_subtype=data.claim_subtype,
            claimant_name=data.claimant_name,
            bank_account=data.bank_account,
            bank_ifsc=data.bank_ifsc,
            status=CLAIM_STATUS_PENDING,
        )
        self.db.add(claim)
        self.db.commit()
        self.db.refresh(claim)
        return claim

    def get_claim_by_id(self, claim_id: int) -> Claim | None:
        return self.db.query(Claim).filter(Claim.id == claim_id).first()

    def list_user_claims(self, user_id: int) -> list[Claim]:
        return self.db.query(Claim).filter(Claim.user_id == user_id).order_by(Claim.created_at.desc()).all()

    def list_pending_claims(self) -> list[Claim]:
        return self.db.query(Claim).filter(Claim.status == CLAIM_STATUS_PENDING).order_by(Claim.created_at.desc()).all()

    def approve_claim(self, claim_id: int, reviewer_id: int, comment: str | None = None) -> Claim | None:
        claim = self.get_claim_by_id(claim_id)
        if not claim:
            return None
        claim.status = "APPROVED"
        claim.reviewer_comment = comment
        self.db.commit()
        self.db.refresh(claim)
        return claim

    def reject_claim(self, claim_id: int, reviewer_id: int, comment: str) -> Claim | None:
        claim = self.get_claim_by_id(claim_id)
        if not claim:
            return None
        claim.status = "REJECTED"
        claim.reviewer_comment = comment
        self.db.commit()
        self.db.refresh(claim)
        return claim

    def get_claim_stats(self, user_id: int) -> dict:
        q = self.db.query(Claim.status, func.count(Claim.id)).filter(Claim.user_id == user_id).group_by(Claim.status)
        stats = {"total": 0, "PENDING": 0, "APPROVED": 0, "REJECTED": 0}
        for status, count in q:
            stats["total"] += count
            stats[status] = count
        return stats

    def add_document(self, claim_id: int, file_path: str, file_name: str, file_type: str | None = None) -> Document:
        doc = Document(claim_id=claim_id, file_path=file_path, file_name=file_name, file_type=file_type)
        self.db.add(doc)
        self.db.commit()
        self.db.refresh(doc)
        return doc
