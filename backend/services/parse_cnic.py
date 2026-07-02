from langchain_google_genai import ChatGoogleGenerativeAI
from config.settings import settings
from models.cnic import CNICData

llm=ChatGoogleGenerativeAI(model="gemini-2.5-flash",google_api_key=settings.GEMINI_API_KEY)
structured_llm=llm.with_structured_output(CNICData)

def extract_with_llm(front_text:str,back_text:str)->dict:
    prompt=f""""
    Extract the following fields from this Pakistani CNIC text.
    Return ONLY a JSON object, nothing else.
    Fields: name, father_name, cnic_number, date_of_birth, expiry_date, address

    CNIC Front Text:
    {front_text}

    CNIC Back Text:
    {back_text}
    """
    response=structured_llm.invoke(prompt)
    return response.model_dump()

