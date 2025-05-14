
from supabaseClient import supabase
from fastapi import HTTPException
from dataTypes.auth.authTypes import SignUpForm
from fastapi.responses import JSONResponse
from utils.auth.hash import gen_password
from utils.auth.hash import hash_password


def registerDealer(data: SignUpForm):
    try:
        response = supabase.table("dealers").select(
            "*").eq("phone", int(data.phone)).execute()
        if response.data:  # If a dealer is found
            raise HTTPException(
                status_code=400,
                detail="Dealer already exists with this phone number"
            )
        else:
            password = gen_password(16)
            print("The Password", password)
            hashed_password = hash_password(password)
            data.password = hashed_password
            newDealer = supabase.table(
                "dealers").insert(data.model_dump()).execute()
            if newDealer.data:
                return {"message": "Dealer registered successfully", "success": True}
            else:
                raise HTTPException(
                    status_code=400,
                    detail="Failed to register new Dealer"
                )
    except Exception as e:
        print("Login error:", e)
        raise HTTPException(
            status_code=401,
            detail="Registration Failed"
        )
