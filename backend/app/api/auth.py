from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import Token
from app.core.config import settings
from app.services.otp_service import OTPService
from app.services.auth_service import AuthService
from app.core.security import get_password_hash
from app.core.dependencies import get_current_user
from app.models.mpin import UserMPIN

router = APIRouter()


@router.post("/login/start")
def login_start(payload: dict, db: Session = Depends(get_db)):
    try:
        mobile = str(payload.get("mobile", "")).strip()
        consent_whatsapp = bool(payload.get("consent_whatsapp", False))
        if not mobile.isdigit() or len(mobile) != 10:
            raise HTTPException(status_code=422, detail="Enter a valid 10-digit mobile number")
        service = OTPService(db)
        code = service.start_login(mobile)
        # For development, return the code. In production, do not expose.
        return {"message": "OTP sent", "otp": code, "consent_whatsapp": consent_whatsapp}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"login_start error: {e}")


@router.post("/login/verify", response_model=Token)
def login_verify(payload: dict, db: Session = Depends(get_db)):
    mobile = str(payload.get("mobile", "")).strip()
    code = str(payload.get("otp", "")).strip()
    if not mobile.isdigit() or len(mobile) != 10:
        raise HTTPException(status_code=422, detail="Enter a valid 10-digit mobile number")
    if not code.isdigit() or len(code) != 4:
        raise HTTPException(status_code=422, detail="Enter the 4-digit OTP")

    service = OTPService(db)
    if not service.verify_login(mobile, code):
        raise HTTPException(status_code=401, detail="Invalid or expired OTP")

    # Issue token for the mobile user
    auth = AuthService(db)
    user = auth.get_user_by_email(f"{mobile}@placeholder.local") or auth.get_user_by_email(mobile)
    if not user:
        # Fallback: look by mobile
        user = auth.get_user_by_email(f"{mobile}@placeholder.local")
    if not user:
        raise HTTPException(status_code=500, detail="User not found after OTP verify")
    token = auth._create_token(user.id)
    return token


@router.post("/mpin/set")
def set_mpin(payload: dict, db: Session = Depends(get_db), user=Depends(get_current_user)):
    code = str(payload.get("mpin", "")).strip()
    confirm = str(payload.get("confirm_mpin", "")).strip()
    if not code.isdigit() or len(code) != 4:
        raise HTTPException(status_code=422, detail="Enter a valid 4-digit MPIN")
    if code != confirm:
        raise HTTPException(status_code=422, detail="MPIN and confirm must match")

    existing = db.query(UserMPIN).filter(UserMPIN.user_id == user.id).first()
    if existing:
        existing.mpin_hash = get_password_hash(code)
    else:
        db.add(UserMPIN(user_id=user.id, mpin_hash=get_password_hash(code)))
    db.commit()
    return {"message": "MPIN set successfully"}
