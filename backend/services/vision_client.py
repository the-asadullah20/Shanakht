from google.cloud import vision

def extract_text(image:bytes)->str:
    client=vision.ImageAnnotatorClient()
    image=vision.Image(content=image)
    response=client.document_text_detection(image=image)
    
    if response.error.message:
        raise RuntimeError(f"Vision APU Error :{response.error.message}")
    
    return (response.full_text_annotation.text or "").strip()