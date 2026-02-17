from app.db.base import Base
from app.db.session import engine
from app.models import User, Claim, Document, OTPCode, UserMPIN


def init_db() -> None:
    """Create all database tables."""
    Base.metadata.create_all(bind=engine)


def drop_db() -> None:
    """Drop all database tables (use with caution)."""
    Base.metadata.drop_all(bind=engine)


if __name__ == "__main__":
    init_db()
    print("Database tables created successfully.")
