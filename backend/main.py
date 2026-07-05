import fitz
import pytesseract
from PIL import Image
import re
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import os
import shutil

from medicines import MEDICINES
from ai_service import client
from pydantic import BaseModel
from database import save_report
from database import delete_report
from database import get_dashboard_stats

from ai_service import extract_text_from_image, analyze_medicine
import json

from database import (
    create_table,
    save_medicine,
    get_medicine_history
)

pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

app = FastAPI(title="MediSense AI API")

create_table()


class ChatRequest(BaseModel):
    message: str

# Store latest uploaded patient name
latest_patient_name = "Unknown Patient"
latest_report_text = ""
latest_medicine_name = "Unknown Medicine"

# -------------------- CORS --------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------- HOME --------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to MediSense AI API",
        "status": "Running"
    }

# -------------------- LOGIN --------------------
@app.post("/login")
def login():
    return {
        "status": "success",
        "message": "Login Successful"
    }

# -------------------- REGISTER --------------------
@app.post("/register")
def register():
    return {
        "status": "success",
        "message": "Registration Successful"
    }

# -------------------- UPLOAD --------------------
@app.post("/upload")
async def upload_report(file: UploadFile = File(...)):

    global latest_patient_name, latest_report_text

    os.makedirs("uploads", exist_ok=True)

    file_path = os.path.join("uploads", file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = ""

    save_report(
    file.filename,
    text,
    "Report Uploaded Successfully"
)

    # PDF
    if file.filename.lower().endswith(".pdf"):
        text = extract_text_from_pdf(file_path)

    # IMAGE
    elif file.filename.lower().endswith((".jpg", ".jpeg", ".png")):
        text = extract_text_from_image(file_path)

    print("OCR TEXT:")
    print(text)

# Extract patient name
    patient_name = extract_patient_name(text)

# Save latest patient name
    latest_patient_name = patient_name
    latest_report_text = text

    print("\n========== REPORT TEXT ==========\n")
    print(text)
    print("\n================================\n")
    print("Extracted Patient Name:", patient_name)

    return {
    "status": "success",
    "message": "File uploaded successfully",
    "filename": file.filename,
    "patient_name": patient_name,
    "report_text": text[:1000]
}

# -------------------- HISTORY --------------------
@app.get("/history")
def history():
    return [
        {
            "report": "Blood Test",
            "status": "Normal"
        },
        {
            "report": "ECG",
            "status": "Review Needed"
        }
    ]

    # -------------------- MEDICINE SCANNER ---------------------------- MEDICINE SCANNER --------------------
# -------------

# -------------------- MEDICINE SCANNER --------------------
@app.post("/scan-medicine")
async def scan_medicine(file: UploadFile = File(...)):
    print("🔥 scan_medicine endpoint called")

    os.makedirs("medicine_uploads", exist_ok=True)

    file_path = os.path.join(
        "medicine_uploads",
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # OCR
    text = extract_text_from_image(file_path)

    print("\n========== OCR TEXT ==========")
    print(text)
    print("==============================")

    try:
        ai_result = analyze_medicine(text)

        print("\n========== GROQ RESPONSE ==========")
        print(ai_result)
        print("===================================")

        medicine = json.loads(ai_result)

        save_medicine(
    medicine.get("name", "Unknown"),
    medicine.get("generic_name", ""),
    medicine.get("dosage", ""),
    medicine.get("summary", ""),
    text
)
        return {
    "name": medicine.get("name", "Unknown Medicine"),
    "generic_name": medicine.get("generic_name", ""),
    "uses": medicine.get("uses", []),
    "dosage": medicine.get("dosage", "Not Available"),
    "side_effects": medicine.get("side_effects", []),
    "food_recommendation": medicine.get("food_recommendation", []),
    "avoid_food": medicine.get("avoid_food", []),
    "warning": medicine.get("warning", "No warning available"),
    "summary": medicine.get("summary", ""),
    "ocr_text": text
}

    except Exception as e:
        print("Groq Error:", e)
    return {
    "name": "Unknown Medicine",
    "generic_name": "",
    "uses": [],
    "dosage": "",
    "side_effects": [],
    "food_recommendation": [],
    "avoid_food": [],
    "warning": "Unable to identify medicine.",
    "summary": "",
    "ocr_text": text
}

@app.get("/medicine-info")
def medicine_info():
    return {
        "name": "Unknown Medicine",
        "uses": [],
        "warning": "This endpoint is no longer used."
    }

# -------------------- ANALYSIS --------------------
@app.get("/analysis")
def analysis():

    global latest_patient_name

    hemoglobin = 13.8

    diet = []
    summary = ""

    if hemoglobin < 12:
        summary = "Hemoglobin level is low."
        diet = [
            "Spinach",
            "Beetroot",
            "Dates",
            "Pomegranate",
            "Iron rich foods"
        ]
    else:
        summary = "Report appears normal."
        diet = [
            "Balanced diet",
            "Fruits",
            "Vegetables",
            "Drink enough water"
        ]

    return {
        "patient": latest_patient_name,
        "health_score": 92,
        "risk": "Low",
        "summary": summary,
        "results": [
            {
                "test": "Hemoglobin",
                "value": f"{hemoglobin} g/dL",
                "status": "Normal" if hemoglobin >= 12 else "Low"
            }
        ],
        "diet": diet,
        "recommendations": [
            "Exercise 30 minutes daily",
            "Sleep 7-8 hours"
        ]
    }

# -------------------- HELPERS --------------------
def extract_text_from_pdf(pdf_path):

    text = ""

    try:
        pdf = fitz.open(pdf_path)

        for page in pdf:
            text += page.get_text()

        pdf.close()

    except Exception as e:
        print("PDF Error:", e)

    return text


def extract_text_from_image(image_path):

    try:
        image = Image.open(image_path)

        image = image.convert("L")

        text = pytesseract.image_to_string(
            image,
            config="--oem 3 --psm 6"
        )

        return text

    except Exception as e:
        print("Image OCR Error:", e)
        return ""

def extract_patient_name(text):

    # Mr.R.KUMAR pattern
    match = re.search(
        r"Mr\.?\s*([A-Z\. ]{3,30})",
        text,
        re.IGNORECASE
    )

    if match:
        return "Mr. " + match.group(1).strip()

    # Patient Name pattern
    match = re.search(
        r"Patient\s*Name\s*[:\-]?\s*([A-Za-z\. ]+)",
        text,
        re.IGNORECASE
    )

    if match:
        return match.group(1).strip()

    return "Unknown Patient"

# -------------------- AI CHAT --------------------

@app.post("/chat")
def chat(request: ChatRequest):

    prompt = f"""
You are MediSense AI, a helpful healthcare assistant.

Answer only health and medicine related questions.

If the user asks something unrelated to health,
politely tell them you only answer healthcare questions.

User Question:
{request.message}
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return {
        "reply": response.choices[0].message.content
    }


@app.get("/medicine-history")
def medicine_history():

    data = get_medicine_history()

    history = []

    for row in data:
        history.append({
            "id": row[0],
            "medicine_name": row[1],
            "generic_name": row[2],
            "dosage": row[3],
            "summary": row[4],
            "scanned_at": row[5]
        })

    return history

from database import get_reports

@app.get("/reports")
def reports():

    data = get_reports()

    report_list = []

    for r in data:
        report_list.append({
            "id": r[0],
            "filename": r[1],
            "analysis": r[2]
        })

    return {
        "reports": report_list
    }

@app.delete("/report/{report_id}")
def remove_report(report_id: int):

    delete_report(report_id)

    return {
        "message": "Deleted Successfully"
    }

@app.get("/dashboard-stats")
def dashboard_stats():
    return get_dashboard_stats()


    from database import get_reports

@app.get("/recent-reports")
def recent_reports():
    reports = get_reports()

    data = []

    for report in reports[:5]:
        data.append({
            "id": report[0],
            "filename": report[1],
            "analysis": report[2][:120] + "..."
        })

    return {"reports": data}