from fastapi import APIRouter, UploadFile, File, HTTPException
from services.vision_client import extract_text
from services.parse_cnic import extract_with_llm
from services.storage import save_record, get_record, list_records, doc_to_cnic_data
from models.cnic import CNICRecord, CNICResponse

router = APIRouter()

@router.post("/upload", response_model=CNICResponse)
async def upload_cnic(
    front: UploadFile = File(...),
    back: UploadFile = File(...),
):
    front_bytes = await front.read()
    back_bytes = await back.read()

    try:
        front_text = extract_text(front_bytes)
        back_text = extract_text(back_bytes)
    except RuntimeError as e:
        raise HTTPException(status_code=502, detail=str(e))

    fields = extract_with_llm(front_text, back_text)

    record = CNICRecord(
        **fields,
        raw_front_text=front_text,
        raw_back_text=back_text,
    )

    record_id = await save_record(record)

    return CNICResponse(
        success=True,
        message="CNIC processed and saved",
        record_id=record_id,
        data=fields,
    )


@router.get("/records/{record_id}", response_model = CNICResponse)
async def fetch_record(record_id:str):
    doc = await get_record(record_id)
    if not doc:
        raise HTTPException(status_code=404, detail ="Record not found")
    return CNICResponse(
        success = True, message = "Record found",
        record_id= record_id,
        data = doc_to_cnic_data(doc),
    )


@router.get("/records")
async def fetch_all_records(limit: int = 20, skip: int = 0):
    docs = await list_records(limit = limit, skip = skip)
    return{
        "success": True,
        "count": len(docs),
        "records": [
            {"record_id": str(d["_id"]), "data": doc_to_cnic_data(d)}
            for d in docs
        ],
    }