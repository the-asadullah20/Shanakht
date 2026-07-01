from datetime import datetime
from pydantic import BaseModel,Field
from typing import Optional

class CNICData(BaseModel):
    name:Optional[str]=None
    father_name:Optional[str]=None
    cnic_number:str
    date_of_birth:Optional[str]=None
    expiry_date:Optional[str]=None
    address:Optional[str]=None

class CNICRecord(CNICData):
    created_at: datetime = Field(default_factory=datetime.utcnow)
    raw_front_text:Optional[str]=None
    raw_back_text:Optional[str]=None

class CNICResponse(BaseModel):
    success: bool 
    message: str 
    record_id:Optional[str]=None
    data:Optional[CNICData]=None
