from fastapi import FastAPI
from supabaseClient import supabase
from fastapi.middleware.cors import CORSMiddleware
from apis.auth.auth import router as authRouter
from mongodbClient import dbConnect
from dataTypes.schema.test import testfun
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    dbConnect()
    yield

app: FastAPI = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authRouter, prefix="/auth")


@app.get("/")
def read_root():
    users = supabase.table("test").select("*", count="exact").execute()
    return {"message": users}


@app.get("/test")
def tester():
    testfun()
    return {"message": "users"}


@app.get("/accessories")
def getAccessories():
    accessories = supabase.table("accessories").select("*").execute()
    return accessories


@app.get("/baseProfiles")
def getAccessories():
    baseProfiles = supabase.table("base_profiles").select(
        "created_at, image, name, code, keyName").execute()
    return baseProfiles
