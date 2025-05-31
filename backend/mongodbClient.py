# mongodbClient.py
import os
from mongoengine import connect, get_connection
from dotenv import load_dotenv

load_dotenv()

uri = os.getenv("MONGODB_URL")
name = os.getenv("MONGODB_NAME")


def dbConnect():
    try:
        conn = get_connection(alias="default")
        print("✅ MongoDB connected successfully from cache")
        return conn
    except Exception:
        try:
            conn = connect(
                db=name,
                host=uri,
                alias="default"
            )
            print("✅ MongoDB connected successfully.")
            return conn
        except Exception as e:
            print(f"❌ Failed to connect to MongoDB: {e}")
            raise ConnectionError("MongoDB connection failed.") from e
