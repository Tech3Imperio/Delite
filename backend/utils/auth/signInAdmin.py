from supabaseClient import supabase
from fastapi import HTTPException
from dataTypes.auth.authTypes import SignInForm
from fastapi.responses import JSONResponse
from utils.auth.session import create_access_token


def signInAdmin(data: SignInForm):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": data.userID,
            "password": data.password
        })
        if response.user:
            access_token = create_access_token(
                {"userID": data.userID, "role": "admin"})
            return JSONResponse(content={"success": True, "access_token": access_token, "role": 'admin'}, status_code=200)
    except Exception as e:
        print("Login error:", e)
        raise HTTPException(
            status_code=401,
            detail="Invalid admin credentials"
        )
