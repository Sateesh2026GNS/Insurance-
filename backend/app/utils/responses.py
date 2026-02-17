from typing import Any, Optional


def success_response(data: Any = None, message: str = "Success") -> dict:
    """Standard success response format."""
    return {
        "success": True,
        "message": message,
        "data": data,
    }


def error_response(message: str, errors: Optional[list] = None) -> dict:
    """Standard error response format."""
    return {
        "success": False,
        "message": message,
        "errors": errors or [],
    }
