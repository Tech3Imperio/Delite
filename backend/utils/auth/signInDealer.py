
from utils.auth.hash import verify_password
from supabaseClient import supabase
from fastapi import HTTPException
from dataTypes.auth.authTypes import SignInForm
from fastapi.responses import JSONResponse
from utils.auth.session import create_access_token


def signInDealer(data: SignInForm):
    try:
        response = supabase.table("dealers").select(
            "*").eq("phone", int(data.userID)).single().execute()
        if response.data:
            if verify_password(data.password, response.data["password"]):
                access_token = create_access_token(
                    {"userID": data.userID, "role": "dealer"})
                return JSONResponse(content={"success": True, "access_token": access_token, 'role': 'dealer'}, status_code=200)
            else:
                raise HTTPException(
                    status_code=401,
                    detail="Password is Incorrect"
                )
    except Exception as e:
        print("Login error:", e)
        raise HTTPException(
            status_code=401,
            detail="Invalid Credentials"
        )
