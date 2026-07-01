import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI:str=os.getenv("MONGO_URI")
    MONGO_DB_NAME:str=os.getenv("MONGO_DB_NAME","cnic_db")
    MONGO_COLLECTION_NAME:str=os.getenv("MONG_COLLECTION_NAME",'cnic_records')
    GOOGLE_APPLICATION_CREDENTIALS:str=os.getenv("GOOGLE_APPLICATION_CREDENTIALS","")
    MAX_IMAGE_SIZE_MB:int=int(os.getenv("MAX_IMAGE_SIZE_MB","10"))
    ALLOWED_CONTENT_TYPES={"image/jpeg", "image/jpg", "image/png", "image/webp"}

settings = Settings()

import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI", "")
    MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "cnic_db")
    MONGO_COLLECTION_NAME: str = os.getenv("MONGO_COLLECTION_NAME", "cnic_records")

settings = Settings()