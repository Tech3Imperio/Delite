# utils/auth/jwt_handler.py
from dotenv import load_dotenv
import os
import jwt
from datetime import datetime, timedelta, timezone
load_dotenv()

secret_key = os.environ.get("SECRET_KEY")  # Use env var in real app
algorithm = os.environ.get("ALGORITHM")
expiry = int(os.environ.get("EXPIRES_IN_MINUTES"))


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=expiry)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, secret_key, algorithm=algorithm)


def decode_access_token(token: str):
    return jwt.decode(token, secret_key, algorithms=[algorithm])
