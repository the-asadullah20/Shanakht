from motor.motor_asyncio import AsyncIOMotorClient
from config.settings import settings

client: AsyncIOMotorClient | None = None

def get_client()->AsyncIOMotorClient:
    global client
    if client is None:
        client=AsyncIOMotorClient(settings.MONGO_URI)
    return client

def get_database():
    return get_client()[settings.MONGO_DB_NAME]

def get_cnic_collection():
    return get_database()[settings.MONGO_COLLECTION_NAME]

async def ping_database()->bool:
    try:
        await get_client().admin.command("ping")
        return True
    except Exception:
        return False
    
async def close_database():
    global client
    if client is not None:
        client.close()
        client = None
