import bcrypt

# bcrypt has a 72-byte password limit
MAX_PASSWORD_BYTES = 72


def _truncate_password(password: str) -> str:
    """Truncate password to bcrypt's 72-byte limit."""
    encoded = password.encode("utf-8")
    if len(encoded) <= MAX_PASSWORD_BYTES:
        return password
    return encoded[:MAX_PASSWORD_BYTES].decode("utf-8", errors="ignore")


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash."""
    plain = _truncate_password(plain_password)
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed_password.encode("utf-8"))
    except Exception:
        return False


def get_password_hash(password: str) -> str:
    """Hash password (bcrypt max 72 bytes)."""
    plain = _truncate_password(password)
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(plain.encode("utf-8"), salt).decode("utf-8")
