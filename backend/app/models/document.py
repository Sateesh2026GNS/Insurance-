from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.db.base import Base


class Document(Base):
    """File uploads for claims (hospital bill, medical reports, etc.)"""

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    claim_id = Column(Integer, ForeignKey("claims.id"), nullable=False)
    file_path = Column(String(500), nullable=False)  # /uploads/claims/health/123/bill.pdf
    file_name = Column(String(255), nullable=False)
    file_type = Column(String(50), nullable=True)  # hospital_bill, medical_report, prescription, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now())
