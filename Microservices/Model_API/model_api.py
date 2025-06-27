from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = r"train37\weights\best.pt"
model = YOLO(MODEL_PATH)
@app.post("/api/detect")
async def detect_food(file: UploadFile = File(...)):
    if file.content_type.split("/")[0] != "image":
        raise HTTPException(400, "File must be an image")

    image = Image.open(io.BytesIO(await file.read()))
    print("Received image, starting inference...")
    results = model(image)
    print("Inference complete.")

    labels = results[0].boxes.cls.tolist()
    names  = results[0].names

    return {"labels": [names[int(i)] for i in labels]}


#python -m uvicorn model_api:app --host 127.0.0.1 --port 8001 --reload