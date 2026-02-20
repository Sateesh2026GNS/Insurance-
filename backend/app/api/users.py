from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import traceback
import logging

from app.db.session import get_db
from app.schemas.user import UserResponse, UserUpdate
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter()
logger = logging.getLogger(__name__)


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current authenticated user profile."""
    try:
        # Refetch the user in the current session to avoid detached instance issues
        user = db.query(User).filter(User.id == current_user.id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except HTTPException:
        raise
    except Exception as e:
        # Log the full traceback for debugging
        error_detail = f"Error retrieving user profile: {str(e)}\n{traceback.format_exc()}"
        logger.error(error_detail)
        print(error_detail)  # Print to console for debugging
        raise HTTPException(status_code=500, detail=f"Error retrieving user profile: {str(e)}")


@router.patch("/me", response_model=UserResponse)
def update_current_user_profile(
    user_update: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update current authenticated user profile."""
    try:
        # Refetch the user in the current session
        user = db.query(User).filter(User.id == current_user.id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Update only provided fields
        update_data = user_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        return user
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        error_detail = f"Error updating user profile: {str(e)}\n{traceback.format_exc()}"
        logger.error(error_detail)
        print(error_detail)
        raise HTTPException(status_code=500, detail=f"Error updating user profile: {str(e)}")
