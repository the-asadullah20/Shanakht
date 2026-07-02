import os
import json
import tempfile
from dotenv import load_dotenv

load_dotenv()

# If GOOGLE_APPLICATION_CREDENTIALS is a JSON string, write it to a temp file
# and point the env var to that file path for the Google Cloud Vision SDK.
creds_json = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
if creds_json and creds_json.strip().startswith("{"):
    try:
        # Verify it's valid JSON
        json.loads(creds_json)
        # Write to a temporary file
        temp_creds_file = tempfile.NamedTemporaryFile(delete=False, suffix=".json")
        temp_creds_file.write(creds_json.encode('utf-8'))
        temp_creds_file.close()
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = temp_creds_file.name
    except Exception as e:
        print("Warning: Failed to setup Google credentials from JSON string:", e)

class Settings:
    MONGO_URI: str = os.getenv("MONGO_URI", "")
    MONGO_DB_NAME: str = os.getenv("MONGO_DB_NAME", "cnic_db")
    MONGO_COLLECTION_NAME: str = os.getenv("MONGO_COLLECTION_NAME", "cnic_records")
    GOOGLE_APPLICATION_CREDENTIALS: str = os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "")
    MAX_IMAGE_SIZE_MB: int = int(os.getenv("MAX_IMAGE_SIZE_MB", "10"))
    ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/jpg", "image/png", "image/webp"}
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

settings = Settings()