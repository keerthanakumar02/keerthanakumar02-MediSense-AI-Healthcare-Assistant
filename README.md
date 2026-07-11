# 🏥 MediSense AI - Healthcare Assistant

A web-based AI-powered healthcare application for **Medical Report Analysis, Medicine Recognition, AI Chat Assistance, and Health Recommendations** using React, FastAPI, Python, SQLite, and OCR.

---

# 🌟 Live Demo

🔗 Coming Soon — Deployment in Progress

---

# 📌 About the Project

MediSense AI is an intelligent healthcare assistant developed to simplify medical report analysis and medicine information for patients.

The application allows users to:

- 📄 Upload medical reports (PDF/Image)
- 🤖 Receive AI-powered medical report analysis
- 💊 Scan medicines using OCR
- 📚 Store medicine and report history
- 💬 Chat with an AI Healthcare Assistant
- ❤️ Receive health score and recommendations

This project combines Artificial Intelligence, OCR, and Medical Data Analysis into one easy-to-use healthcare platform.

---

# 🚀 Features

| Feature | Description |
|----------|-------------|
| 👤 User Authentication | Secure Login & Registration |
| 📄 Medical Report Upload | Upload PDF or Image Reports |
| 🧠 AI Report Analysis | AI-generated medical insights |
| ❤️ Health Score | Calculates patient health score |
| 💊 Medicine Scanner | Scan medicine labels using OCR |
| 📚 Report History | View uploaded medical reports |
| 💊 Medicine History | Stores scanned medicine details |
| 🤖 AI Chat Assistant | Ask health-related questions |
| 🥗 Diet Recommendation | Personalized health advice |
| ⚠ Medicine Warnings | Side effects and precautions |

---

# 🛠 Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React.js, Vite, HTML5, CSS3, JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite |
| AI | Groq API |
| OCR | Pytesseract |
| PDF Processing | PyMuPDF |

---

# 📂 Project Structure

```text
MediSense-AI-Healthcare-Assistant/
│
├── backend/
│   ├── uploads/
│   ├── medicine_uploads/
│   ├── main.py
│   ├── database.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

---

# ⚙️ How to Run Locally

## 1️⃣ Clone Repository

```bash
git clone https://github.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant.git

cd keerthanakumar02-MediSense-AI-Healthcare-Assistant
```

---

## 2️⃣ Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn main:app --reload
```

Backend runs at

```
http://localhost:8000
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# 🔑 Environment Variables

Create a **.env** file inside the backend folder.

```env
GROQ_API_KEY=your_groq_api_key
```

---

# 📸 Screenshots

## 🏠 Dashboard
https://github.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/blob/main/Screenshot%202026-07-06%20185449.png


---

## 📄 Upload Medical Report



---

## 📑 Report History

![Report History](Screenshot%202026-07-06%20185902.png)

---

## 💊 Medicine Scanner

![Medicine Scanner](Screenshot%202026-07-06%20190122.png)

---

## 💬 AI Healthcare Chat



---

## ❤️ AI Medical Analysis



---

## 📚 Medicine History



---

## 👤 Login Page



---

## 📝 Registration Page



---

# 🔮 Future Enhancements

- 🩺 Doctor Appointment Booking
- 📱 Mobile Application
- ☁ Cloud Database Integration
- 🌍 Multi-language Support
- 📊 Health Trend Analytics
- 🔔 Email & SMS Notifications
- 🧬 Disease Prediction using AI
- 📈 Patient Progress Dashboard

---

# 🎯 Use Cases

- Hospitals
- Clinics
- Healthcare Centers
- Medical Students
- Patients
- Personal Health Record Management

---

# 👩‍💻 Developer

### **Keerthana Kumar**

GitHub:

https://github.com/keerthanakumar02

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ If you found this project useful, please give it a Star on GitHub!
