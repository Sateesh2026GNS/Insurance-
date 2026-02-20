from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.db.session import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.models.notification import Notification

router = APIRouter()


class NotificationResponse(BaseModel):
    id: int
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True


class UnreadCountResponse(BaseModel):
    unread_count: int


@router.get("", response_model=List[NotificationResponse])
def get_notifications(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 50
):
    """Get all notifications for the current user."""
    try:
        notifications = (
            db.query(Notification)
            .filter(Notification.user_id == current_user.id)
            .order_by(Notification.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )
        return notifications
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching notifications: {str(e)}")


@router.get("/unread-count", response_model=UnreadCountResponse)
def get_unread_count(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get count of unread notifications for the current user."""
    try:
        count = (
            db.query(func.count(Notification.id))
            .filter(
                Notification.user_id == current_user.id,
                Notification.is_read == False
            )
            .scalar()
        )
        return UnreadCountResponse(unread_count=count or 0)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching unread count: {str(e)}")


@router.patch("/{notification_id}/read", response_model=NotificationResponse)
def mark_notification_as_read(
    notification_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Mark a notification as read."""
    try:
        notification = (
            db.query(Notification)
            .filter(
                Notification.id == notification_id,
                Notification.user_id == current_user.id
            )
            .first()
        )
        
        if not notification:
            raise HTTPException(status_code=404, detail="Notification not found")
        
        from datetime import datetime, timezone
        notification.is_read = True
        notification.read_at = datetime.now(timezone.utc)
        
        db.commit()
        db.refresh(notification)
        
        return notification
    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Error marking notification as read: {str(e)}")
