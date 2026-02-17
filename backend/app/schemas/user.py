from pydantic import BaseModel, EmailStr, field_validator
from datetime import datetime, date
from typing import Optional


class UserBase(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    date_of_birth: Optional[date] = None
    address: Optional[str] = None
    aadhaar: Optional[str] = None
    policy_type: str  # health / life
    policy_number: Optional[str] = None
    policy_start_date: Optional[date] = None
    policy_end_date: Optional[date] = None


class UserRegister(UserBase):
    password: str  # 4–72 chars (bcrypt limit)

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        # Enforce minimum length
        if len(v) < 4:
            raise ValueError("Password must be at least 4 characters")
        # bcrypt has a 72-byte limit; truncate instead of erroring
        encoded = v.encode("utf-8")
        if len(encoded) > 72:
            v = encoded[:72].decode("utf-8", errors="ignore")
        return v


class UserLogin(BaseModel):
    """Login with email OR mobile + password"""
    email_or_mobile: str
    password: str


class UserResponse(UserBase):
    id: int
    is_active: bool
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    expires_in: int
