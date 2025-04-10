from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def home():
    return {"message": "API para procesar archivos TXT"}

@app.post('/process')
async def process_text(data: dict):
    try:
        text = data.get('text', '')
        if not text:
            raise HTTPException(status_code=400, detail="No se recibió texto para procesar")
        processed_text = text.upper()
        
        return {"result": processed_text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))