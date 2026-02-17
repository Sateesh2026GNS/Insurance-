from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    # App
    DEBUG: bool = False
    APP_NAME: str = "Insurance API"

    # Database (SQLite)
    DATABASE_URL: str = "sqlite:///./insurance.db"

    # File uploads (local storage)
    UPLOAD_DIR: str = "uploads"

    # Security
    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
