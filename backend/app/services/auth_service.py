from sqlalchemy.orm import Session
from jose import jwt
from datetime import datetime, timedelta

from app.models.user import User
from app.schemas.user import UserRegister, Token
from app.core.config import settings
from app.core.security import get_password_hash, verify_password
from app.constants import ROLE_CUSTOMER


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def authenticate(self, email_or_mobile: str, password: str) -> Token | None:
        """Authenticate user by email or mobile + password."""
        user = (
            self.db.query(User)
            .filter((User.email == email_or_mobile) | (User.mobile == email_or_mobile))
            .first()
        )
        if not user or not verify_password(password, user.hashed_password):
            return None
        if not user.is_active:
            return None
        return self._create_token(user.id)

    def register(self, data: UserRegister) -> User:
        """Register new customer (policy activation)."""
        if self.db.query(User).filter(User.email == data.email).first():
            raise ValueError("Email already registered")
        if self.db.query(User).filter(User.mobile == data.mobile).first():
            raise ValueError("Mobile already registered")

        user = User(
            name=data.name,
            email=data.email,
            mobile=data.mobile,
            hashed_password=get_password_hash(data.password),
            date_of_birth=data.date_of_birth,
            address=data.address,
            aadhaar=data.aadhaar,
            policy_type=data.policy_type,
            policy_number=data.policy_number,
            policy_start_date=data.policy_start_date,
            policy_end_date=data.policy_end_date,
            role=ROLE_CUSTOMER,
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def get_user_by_id(self, user_id: int) -> User | None:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_user_by_email(self, email: str) -> User | None:
        return self.db.query(User).filter(User.email == email).first()

    def _create_token(self, user_id: int) -> Token:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        payload = {"sub": str(user_id), "exp": expire}
        access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return Token(
            access_token=access_token,
            token_type="bearer",
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        )
