from bson import ObjectId
from bson.errors import InvalidId
from app.database import get_cnic_collection
from models.cnic import  CNICRecord,CNICData

async def save_record(record:CNICRecord)->str:
    collection=get_cnic_collection()
    result=await collection.insert_one(record.model_dump())
    return str(result.inserted_id)

async def get_record(record_id:str)->dict |None:
    try:
        obj_id=ObjectId(record_id)
    except InvalidId:
        return None
    collection=get_cnic_collection()
    return await collection.find_one({"_id":obj_id})

def doc_to_cnic_data(doc:dict)->CNICData:
    return CNICData(name=doc.get("name"),father_name=doc.get("father_name"),cnic_number=doc.get("cnic_number"),date_of_birth=doc.get("date_of_birth"),expiry_date=doc.get("expiry_date"),address=doc.get("address"))

async def list_records(limit:int=20,skip:int=0)->list[dict]:
    collection=get_cnic_collection()
    cursor_pointer=collection.find().sort("created_at",-1).skip(skip).limit(limit)
    return [doc async for doc in cursor_pointer]

    