from sqlalchemy import Column, Integer, String, Numeric, Date, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.base import Base


class Claim(Base):
    __tablename__ = "claims"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    claim_type = Column(String(20), nullable=False)  # HEALTH / LIFE
    claim_subtype = Column(String(20), nullable=True)  # death / maturity (for LIFE)
    status = Column(String(20), default="PENDING")  # PENDING / APPROVED / REJECTED
    reviewer_comment = Column(Text, nullable=True)

    # Health claim fields
    hospital_name = Column(String(255), nullable=True)
    admission_date = Column(Date, nullable=True)
    discharge_date = Column(Date, nullable=True)
    claim_amount = Column(Numeric(12, 2), default=0)
    description = Column(Text, nullable=True)

    # Life claim fields
    claimant_name = Column(String(255), nullable=True)
    bank_account = Column(String(50), nullable=True)
    bank_ifsc = Column(String(20), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
