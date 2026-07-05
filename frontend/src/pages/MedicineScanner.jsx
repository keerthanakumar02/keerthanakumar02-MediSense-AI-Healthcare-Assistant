import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaCloudUploadAlt,
  FaPills,
  FaExclamationTriangle,
  FaFileAlt,
  FaCapsules,
  FaAppleAlt,
  FaBan,
  FaHeartbeat,
} from "react-icons/fa";

function MedicineScanner() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [medicine, setMedicine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Select File
  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setMedicine(null);
  };

  // Upload to Backend
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a medicine image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://127.0.0.1:8000/scan-medicine",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      setMedicine(response.data);
    } catch (err) {
      console.error(err);
      alert("Medicine Scan Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: "#F8FAFC",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          marginTop: "90px",
          padding: "35px",
        }}
      >
        <h1
          style={{
            color: "#1E3A8A",
            fontSize: "34px",
            fontWeight: "700",
          }}
        >
          💊 Medicine Scanner
        </h1>

        <p
          style={{
            color: "#64748B",
            marginBottom: "30px",
          }}
        >
          Upload your medicine strip and let MediSense AI identify it.
        </p>

        {/* Upload Card */}

<div
  onDragOver={(e) => {
    e.preventDefault();
    setDragging(true);
  }}
  onDragLeave={() => setDragging(false)}
  onDrop={(e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }}
  style={{
    background: "#fff",
    border: dragging
      ? "3px solid #2563EB"
      : "2px dashed #2563EB",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,.08)",
    transition: ".3s",
  }}
>
  <FaCloudUploadAlt
    size={70}
    color="#2563EB"
  />

  <h2
    style={{
      marginTop: "15px",
    }}
  >
    Upload Medicine Image
  </h2>

  <p
    style={{
      color: "#64748B",
      marginBottom: "15px",
    }}
  >
    Drag & Drop or Click Below
  </p>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => handleFile(e.target.files[0])}
  />

  {file && (
    <p
      style={{
        marginTop: "15px",
        color: "#10B981",
        fontWeight: "bold",
      }}
    >
      ✅ {file.name}
    </p>
  )}
</div>

{/* Image Preview */}

{preview && (
  <div
    style={{
      marginTop: "35px",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginBottom: "15px",
        }}
      >
        📷 Selected Image
      </h3>

      <img
        src={preview}
        alt="Preview"
        style={{
          width: "320px",
          borderRadius: "15px",
        }}
      />
    </div>
  </div>
)}

<div
  style={{
    textAlign: "center",
  }}
>
  <button
    onClick={handleUpload}
    disabled={loading}
    style={{
      marginTop: "30px",
      background: "#2563EB",
      color: "white",
      border: "none",
      padding: "15px 45px",
      borderRadius: "12px",
      cursor: "pointer",
      fontSize: "17px",
      fontWeight: "bold",
    }}
  >
    {loading ? "🤖 AI Scanning..." : "💊 Scan Medicine"}
  </button>
</div>

{/* AI Result */}

{medicine && (
  <div
    style={{
      marginTop: "40px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
      gap: "20px",
    }}
  >

    {/* Medicine Info */}

    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#2563EB" }}>
        <FaCapsules /> {medicine.name}
      </h2>

      <hr />

      <p>
        <b>🧬 Generic Name :</b><br />
        {medicine.generic_name || "Not Available"}
      </p>

      <p>
        <b>💊 Dosage :</b><br />
        {medicine.dosage || "Consult Doctor"}
      </p>

      <p>
        <b>❤️ AI Summary :</b><br />
        {medicine.summary}
      </p>
    </div>

    {/* Uses */}

    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#16A34A" }}>
        <FaPills /> Uses
      </h2>

      <ul>
        {(medicine.uses || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Side Effects */}

    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#F97316" }}>
        <FaHeartbeat /> Side Effects
      </h2>

      <ul>
        {(medicine.side_effects || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Food Recommendation */}

    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#22C55E" }}>
        <FaAppleAlt /> Food Recommendation
      </h2>

      <ul>
        {(medicine.food_recommendation || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Foods To Avoid */}

    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#DC2626" }}>
        <FaBan /> Foods To Avoid
      </h2>

      <ul>
        {(medicine.avoid_food || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>

    {/* Warning */}

    <div
      style={{
        background: "#FEF2F2",
        border: "2px solid #EF4444",
        borderRadius: "20px",
        padding: "25px",
      }}
    >
      <h2 style={{ color: "#DC2626" }}>
        <FaExclamationTriangle /> Warning
      </h2>

      <p>{medicine.warning}</p>
    </div>

    {/* OCR */}

    <div
      style={{
        gridColumn: "1/-1",
        background: "#fff",
        borderRadius: "20px",
        padding: "25px",
        boxShadow: "0 10px 25px rgba(0,0,0,.08)",
      }}
    >
      <h2 style={{ color: "#2563EB" }}>
        <FaFileAlt /> OCR Extracted Text
      </h2>

      <div
        style={{
          background: "#F1F5F9",
          padding: "15px",
          borderRadius: "10px",
          whiteSpace: "pre-wrap",
        }}
      >
        {medicine.ocr_text}
      </div>
    </div>

  </div>
)}

      </div>
    </div>
  );
}

export default MedicineScanner;