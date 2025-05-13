from fastapi import FastAPI
from supabaseClient import supabase
from fastapi.middleware.cors import CORSMiddleware
from apis.auth.signIn import router as signInRouter
app: FastAPI = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # You can restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(signInRouter, prefix="/auth")


@app.get("/")
def read_root():
    users = supabase.table("test").select("*", count="exact").execute()
    return {"message": users}
