import hashlib
import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session

from app.models.otp import OTPCode
from app.models.user import User
from app.core.security import get_password_hash
from app.constants import ROLE_CUSTOMER


def _hash_code(mobile: str, code: str) -> str:
    return hashlib.sha256(f"{mobile}:{code}".encode("utf-8")).hexdigest()


class OTPService:
    def __init__(self, db: Session):
        self.db = db

    def start_login(self, mobile: str) -> str:
        # Generate 4-digit OTP to match UI
        code = f"{random.randint(0, 9999):04d}"
        expires = datetime.utcnow() + timedelta(minutes=5)
        code_hash = _hash_code(mobile, code)

        # Remove existing OTPs for mobile
        self.db.query(OTPCode).filter(OTPCode.mobile == mobile).delete()
        self.db.add(OTPCode(mobile=mobile, code_hash=code_hash, expires_at=expires))
        self.db.commit()

        # Ensure a minimal user exists (email/password placeholders)
        user = self.db.query(User).filter(User.mobile == mobile).first()
        if not user:
            placeholder_email = f"{mobile}@placeholder.local"
            user = User(
                name=f"User {mobile}",
                email=placeholder_email,
                mobile=mobile,
                hashed_password=get_password_hash(mobile),
                policy_type="health",
                policy_number=f"PN-{mobile}",
                role=ROLE_CUSTOMER,
                is_active=True,
            )
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)

        # NOTE: In production, send 'code' via SMS/WhatsApp instead of returning it
        return code

    def verify_login(self, mobile: str, code: str) -> bool:
        entry = self.db.query(OTPCode).filter(OTPCode.mobile == mobile).first()
        if not entry:
            return False
        if entry.expires_at < datetime.utcnow():
            self.db.delete(entry)
            self.db.commit()
            return False
        entry.attempts = (entry.attempts or 0) + 1
        ok = entry.code_hash == _hash_code(mobile, code)
        if ok:
            self.db.delete(entry)
        self.db.commit()
        return ok
