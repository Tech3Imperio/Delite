# utils/auth/jwt_handler.py

import jwt
from datetime import datetime, timedelta, timezone

SECRET_KEY = "your-secret-key"  # Use env var in real app
ALGORITHM = "HS256"
EXPIRES_IN_MINUTES = 60 * 24  # 24 hours


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=EXPIRES_IN_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def decode_access_token(token: str):
    return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
