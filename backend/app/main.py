from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.api import users, claims, health_claims, life_claims, admin, policies, notifications
from app.api import auth as auth
from app.core.config import settings
from app.db.init_db import init_db

app = FastAPI(
    title="Insurance API",
    description="Insurance management system API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")


@app.on_event("startup")
def on_startup():
    """Create database tables on startup if they don't exist."""
    init_db()

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(claims.router, prefix="/api/claims", tags=["claims"])
app.include_router(health_claims.router, prefix="/api/claims/health", tags=["health-claims"])
app.include_router(life_claims.router, prefix="/api/claims/life", tags=["life-claims"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(policies.router, prefix="/api/policies", tags=["policies"])
app.include_router(notifications.router, prefix="/api/notifications", tags=["notifications"])


@app.get("/")
def root():
    return {"message": "Insurance API", "status": "running"}


@app.get("/health")
def health():
    return {"status": "healthy"}
