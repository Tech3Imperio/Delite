from fastapi import FastAPI
from supabaseClient import supabase
from fastapi.middleware.cors import CORSMiddleware
from apis.auth.auth import router as authRouter
app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authRouter, prefix="/auth")


@app.get("/")
def read_root():
    users = supabase.table("test").select("*", count="exact").execute()
    return {"message": users}
