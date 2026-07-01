from datetime import datetime
from pydantic import BaseModel,Field

class CNICData(BaseModel):
    name:str
    father_name:str
    cnic_number: str
    date_of_birth: str
    expiry_date:str
    address: str

class CNICRecord(CNICData):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    raw_front_text:str
    raw_back_text: str

class CNICResponse(BaseModel):
    success: bool 
    message: str 
    record_id: str 
    data: CNICData


