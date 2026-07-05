from groq import Groq
from dotenv import load_dotenv
import os
import fitz
import pytesseract
from PIL import Image

# Load .env
load_dotenv()

# Tesseract Path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# Groq Client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


# ---------------- PDF OCR ----------------
def extract_text_from_pdf(pdf_path):

    doc = fitz.open(pdf_path)

    text = ""

    for page in doc:
        text += page.get_text()

    doc.close()

    return text


# ---------------- IMAGE OCR ----------------
def extract_text_from_image(image_path):

    image = Image.open(image_path)

    text = pytesseract.image_to_string(image)

    return text


# ---------------- REPORT ANALYSIS ----------------
def analyze_report(text):

    prompt = f"""
Analyze this medical report and provide:

1. Summary
2. Possible Health Issues
3. Risk Level (Low / Medium / High)
4. Recommendations

Medical Report:

{text}
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

    return response.choices[0].message.content


# ---------------- MEDICINE ANALYSIS ----------------
# ---------------- MEDICINE ANALYSIS ----------------
def analyze_medicine(text):

    prompt = f"""
You are an expert pharmacist and medical AI.

OCR Extracted Text:
{text}

Your job:

1. Identify the medicine even if OCR contains spelling mistakes.
2. If unsure, infer the closest possible medicine.
3. Return ONLY valid JSON.
4. Do not return markdown.
5. Do not explain anything.

Return EXACTLY in this format:

{{
  "name": "",
  "generic_name": "",
  "uses": [
    "",
    "",
    ""
  ],
  "dosage": "",
  "side_effects": [
    "",
    "",
    ""
  ],
  "food_recommendation": [
    "",
    "",
    ""
  ],
  "avoid_food": [
    "",
    "",
    ""
  ],
  "warning": "",
  "summary": ""
}}

Rules:

- Medicine name should be proper.
- Generic name if known.
- Mention 3 common uses.
- Mention usual dosage (general information only).
- Mention 3 common side effects.
- Suggest foods that are generally safe while taking this medicine.
- Mention foods/drinks to avoid if applicable.
- Give one important warning.
- Give one short AI summary.
- Return ONLY JSON.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content