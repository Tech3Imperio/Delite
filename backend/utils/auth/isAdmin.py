import requests
from dotenv import load_dotenv
import os
from fastapi import HTTPException
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
}


def isAdmin(userID: str):
    response = requests.get(
        f"{SUPABASE_URL}/auth/v1/admin/users", headers=headers)
    if response.status_code == 200:
        supabase_data = response.json()
        users = supabase_data.get("users", supabase_data)
        if isinstance(users, list):
            emails = [user.get("email") for user in users if user.get("email")]
            if userID in emails:
                return True
            else:
                return False
        else:
            print("Unexpected data format:", users)
    else:
        print("Error:", response.status_code, response.text)
        raise HTTPException(status_code=response.status_code,
                            detail="Error fetching users from Supabase")
