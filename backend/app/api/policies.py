from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional
from datetime import date

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()


class LinkPolicyRequest(BaseModel):
    policy_number: str
    policy_type: str  # motor, non-motor, health
    registration: Optional[str] = None
    engine: Optional[str] = None
    chassis: Optional[str] = None
    mobile: Optional[str] = None
    date_of_birth: Optional[date] = None


class LinkPolicyResponse(BaseModel):
    message: str
    policy_number: str
    policy_type: str


@router.post("/link", response_model=LinkPolicyResponse)
def link_policy(
    request: LinkPolicyRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Link an existing policy to the current user.
    For Motor policies: requires registration, engine, or chassis number
    For Non-Motor policies: requires mobile number
    For Health policies: requires date of birth
    """
    try:
        # Validate that at least one identification method is provided
        if request.policy_type.lower() == 'motor':
            if not (request.registration or request.engine or request.chassis):
                raise HTTPException(
                    status_code=422,
                    detail="Motor policy requires registration number, engine number, or chassis number"
                )
        elif request.policy_type.lower() == 'non-motor':
            if not request.mobile:
                raise HTTPException(
                    status_code=422,
                    detail="Non-Motor policy requires mobile number"
                )
        elif request.policy_type.lower() == 'health':
            if not request.date_of_birth:
                raise HTTPException(
                    status_code=422,
                    detail="Health policy requires date of birth"
                )

        # Update user's policy information
        user = db.query(User).filter(User.id == current_user.id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")

        # Map policy_type to backend format (health/life)
        # For now, map motor/non-motor/health to health, or you can extend the model
        backend_policy_type = 'health'  # Default mapping
        
        user.policy_number = request.policy_number
        user.policy_type = backend_policy_type
        
        # Optionally update date_of_birth if provided
        if request.date_of_birth:
            user.date_of_birth = request.date_of_birth

        db.commit()
        db.refresh(user)

        return LinkPolicyResponse(
            message="Policy linked successfully",
            policy_number=request.policy_number,
            policy_type=request.policy_type
        )
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error linking policy: {str(e)}")
