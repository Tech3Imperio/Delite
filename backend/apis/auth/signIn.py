import requests
from dotenv import load_dotenv
import os
from supabaseClient import supabase
from fastapi import APIRouter, HTTPException
from dataTypes.auth.SignInFormType import SignInForm
from fastapi.responses import JSONResponse
load_dotenv()

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_KEY = os.environ.get("SUPABASE_KEY")
SERVICE_ROLE_KEY = os.environ.get("SERVICE_ROLE_KEY")

headers = {
    "apikey": SUPABASE_KEY,
    "Authorization": f"Bearer {SERVICE_ROLE_KEY}",
}


router = APIRouter()


@router.post('/signin')
async def signin(form_data: SignInForm):
    response = requests.get(
        f"{SUPABASE_URL}/auth/v1/admin/users", headers=headers)
    if response.status_code == 200:
        supabase_data = response.json()
        users = supabase_data.get("users", supabase_data)
        if isinstance(users, list):
            emails = [user.get("email") for user in users if user.get("email")]
            if form_data.userID in emails:
                auth_response = signInAdmin(form_data)
                if "error" in auth_response:
                    raise HTTPException(
                        status_code=401, detail="Invalid admin credentials")
                print("Sending Response for admin")
                return JSONResponse(content={"message": "Admin login successful", "role": "admin", "status": True}, status_code=200)
            else:
                auth_response = signInDealer(form_data)
                if "error" in auth_response:
                    raise HTTPException(
                        status_code=401, detail="Invalid dealer credentials")
                print("Sending Response")
                return JSONResponse(content={"message": "Dealer login successful", "role": "dealer", "status": True}, status_code=200)
        else:
            print("Unexpected data format:", users)
    else:
        print("Error:", response.status_code, response.text)
        raise HTTPException(status_code=response.status_code,
                            detail="Error fetching users from Supabase")


def signInAdmin(data: SignInForm):
    response = supabase.auth.sign_in_with_password({
        "email": data.userID,
        "password": data.password
    })
    return response


def signInDealer(data: SignInForm):
    response = supabase.table("dealers").select(
        "phone").eq("phone", int(data.userID)).execute()
    return response
