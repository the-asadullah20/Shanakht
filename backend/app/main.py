from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.cnic_router import router
from app.database import ping_database,close_database

app=FastAPI(title="CNIC OCR Backend",version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("shutdown")
async def on_shutdown():
    await close_database()

@app.get("/")
async def root():
    return {"status": "ok", "service": "CNIC OCR Backend"}

@app.get("/health")
async def health():
    db_ok = await ping_database()
    return {"status": "ok" if db_ok else "degraded", "mongodb_connected": db_ok}