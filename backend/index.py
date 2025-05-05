from fastapi import FastAPI
from supabaseClient import supabase
app: FastAPI = FastAPI()


@app.get("/")
def read_root():
    users = supabase.table("test").select("*", count="exact").execute()
    return {"message": users}
