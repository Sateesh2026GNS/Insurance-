<<<<<<< HEAD
# Insurance-
=======
# Insurance

Insurance management system with FastAPI backend and React frontend.

## User Types

1. **Customer** (Policy Holder)
2. **Insurance Agent**
3. **Admin / Reviewer** (Company side)

## Project Structure

```
backend/
├── app/
│   ├── main.py
│   ├── api/
│   │   ├── auth.py
│   │   ├── health_claims.py
│   │   ├── life_claims.py
│   │   ├── admin.py
│   │   ├── claims.py
│   │   └── users.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── claim.py
│   │   └── document.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── claim.py
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py
│   │   └── claim_service.py
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   │   └── dependencies.py
│   ├── db/
│   │   ├── __init__.py
│   │   ├── session.py
│   │   ├── base.py
│   │   └── init_db.py
│   ├── utils/
│   │   ├── __init__.py
│   │   └── responses.py
│   └── constants.py
├── requirements.txt
└── .env

frontend/
├── src/
│   ├── pages/
│   │   ├── Register.jsx
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── HealthClaim.jsx
│   │   └── LifeClaim.jsx
│   ├── components/
│   ├── api/
│   │   ├── client.js
│   │   ├── auth.js
│   │   ├── claims.js
│   │   └── index.js
│   └── routes/
│       └── index.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Backend (FastAPI)

```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
pip install -r requirements.txt
# Uses SQLite by default (see .env)
uvicorn app.main:app --reload --port 8000
```

## Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on http://localhost:5173 and proxies `/api` to the backend at http://localhost:8000.

## Database (SQLite)

Initialize tables:

```bash
cd backend
python -m app.db.init_db
```

Creates `insurance.db`. Open with **DB Browser for SQLite** to inspect.

## API Overview

### Authentication & MPIN

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| POST /api/auth/login/start | POST | Start login - send OTP to mobile | No |
| POST /api/auth/login/verify | POST | Verify OTP and get access token | No |
| GET /api/auth/mpin/check | GET | Check if MPIN is set for current user | Yes |
| POST /api/auth/mpin/set | POST | Set or update MPIN | Yes |
| POST /api/auth/mpin/verify | POST | Verify MPIN | Yes |
| POST /api/auth/mpin/update | POST | Update MPIN (requires old MPIN) | Yes |

### User Management

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| GET /api/users/me | GET | Current user profile | Yes |

### Claims

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| GET /api/claims/ | GET | List user's claims | Yes |
| GET /api/claims/stats | GET | Claim statistics | Yes |
| GET /api/claims/{id} | GET | Get claim by ID | Yes |
| POST /api/claims/health/ | POST | Create health claim + file uploads | Yes |
| POST /api/claims/life/ | POST | Create life claim + file uploads | Yes |

### Admin/Reviewer

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| GET /api/admin/claims/pending | GET | Pending claims (reviewer only) | Yes (Reviewer) |
| POST /api/admin/claims/approve/{id} | POST | Approve claim | Yes (Reviewer) |
| POST /api/admin/claims/reject/{id} | POST | Reject claim with comment | Yes (Reviewer) |

### Notifications

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| GET /api/notifications/ | GET | List all notifications for current user | Yes |
| GET /api/notifications/unread-count | GET | Get count of unread notifications | Yes |
| POST /api/notifications/{id}/read | POST | Mark notification as read | Yes |

### Policies

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| GET /api/policies/categories | GET | Get all policy categories and types | No |
| POST /api/policies/{policy_type_id}/initiate | POST | Initiate policy purchase | Yes |
| GET /api/policies/{policy_type_id}/form-schema | GET | Get form schema for policy type | No |

### MPIN API Details

**Set MPIN** (`POST /api/auth/mpin/set`):
```json
{
  "mpin": "1234",
  "confirm_mpin": "1234"
}
```

**Verify MPIN** (`POST /api/auth/mpin/verify`):
```json
{
  "mpin": "1234"
}
```

**Update MPIN** (`POST /api/auth/mpin/update`):
```json
{
  "old_mpin": "1234",
  "new_mpin": "5678",
  "confirm_mpin": "5678"
}
```

**Check MPIN Status** (`GET /api/auth/mpin/check`):
```json
{
  "mpin_set": true
}
```
