# 🏥 MediSense AI - Healthcare Assistant

An AI-powered web application for **Medical Report Analysis, Medicine Recognition, AI Chat Assistance, and Health Recommendations** built with React, FastAPI, Python, SQLite, and OCR.

---

## 🌟 Live Demo

🔗 Coming Soon — Deployment in Progress

---

## 📌 About the Project

MediSense AI is an intelligent healthcare assistant that simplifies medical report analysis and medicine information for patients.

Users can:
- 📄 Upload medical reports (PDF/Image)
- 🤖 Receive AI-powered medical report analysis
- 💊 Scan medicines using OCR
- 📚 Store medicine and report history
- 💬 Chat with an AI Healthcare Assistant
- ❤️ Receive health score and recommendations

---

## 🚀 Features

| Feature | Description |
|---|---|
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

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, HTML5, CSS3, JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite |
| AI | Groq API |
| OCR | Pytesseract |
| PDF Processing | PyMuPDF |

---

## 📸 Screenshots

### 🏠 Dashboard
![Dashboard](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20185449.png)

---

### 📄 Upload Medical Report
![Upload Report](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20185535.png)

---

### 🧠 AI Medical Analysis
![AI Analysis](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20185740.png)

---

### 📑 Report History
![Report History](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20185902.png)

---

### 💊 Medicine Scanner
![Medicine Scanner](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20190011.png)

---

### 💬 AI Healthcare Chat
![AI Chat](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20190122.png)

---

### 📚 Medicine History
![Medicine History](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20190238.png)

---

### 👤 Login Page
![Login](https://raw.githubusercontent.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant/main/Screenshot%202026-07-06%20190521.png)

---

## 📂 Project Structure

```
MediSense-AI-Healthcare-Assistant/
│
├── backend/
│   ├── uploads/
│   ├── main.py
│   ├── database.py
│   ├── ai_service.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ How to Run Locally

### 1️⃣ Clone Repository

```bash
git clone https://github.com/keerthanakumar02/keerthanakumar02-MediSense-AI-Healthcare-Assistant.git
cd keerthanakumar02-MediSense-AI-Healthcare-Assistant
```

### 2️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs at: `http://localhost:8000`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder:

```
GROQ_API_KEY=your_groq_api_key
```

---

## 🔮 Future Enhancements

- 🩺 Doctor Appointment Booking
- 📱 Mobile Application
- ☁ Cloud Database Integration
- 🌍 Multi-language Support
- 📊 Health Trend Analytics
- 🔔 Email & SMS Notifications
- 🧬 Disease Prediction using AI

---

## 🎯 Use Cases

- Hospitals & Clinics
- Healthcare Centers
- Medical Students
- Personal Health Record Management

---

## 👩‍💻 Developer

**Keerthana Kumar**

GitHub: [keerthanakumar02](https://github.com/keerthanakumar02)

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you found this project useful, please give it a Star on GitHub!
