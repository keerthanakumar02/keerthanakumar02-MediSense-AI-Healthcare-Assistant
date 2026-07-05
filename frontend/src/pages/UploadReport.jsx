import { useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaImage,
} from "react-icons/fa";

function UploadReport() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [patientName, setPatientName] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
  });

  // -------------------- UPLOAD --------------------
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await API.post("/upload", formData);

console.log("FULL RESPONSE:", response);
console.log("RESPONSE DATA:", response?.data);

if (response?.data) {
  setPatientName(response.data.patient_name || "Unknown Patient");

  alert(
    `✅ Uploaded for: ${
      response.data.patient_name || "Unknown Patient"
    }`
  );
} else {
  alert("❌ Backend returned empty response");
}

      setFile(null);
    } catch (error) {
      console.log(error);
      alert("❌ Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#F5F7FB", minHeight: "100vh" }}>
      <Navbar />
      <Sidebar />

      <div style={{ marginLeft: "280px", marginTop: "90px", padding: "35px" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 20px 50px rgba(0,0,0,.08)",
          }}
        >
          <h1 style={{ color: "#2563EB", marginBottom: "10px" }}>
            📄 Upload Medical Report
          </h1>

          <p style={{ color: "#64748B", marginBottom: "35px" }}>
            Upload PDF or Image reports for AI powered medical analysis.
          </p>

          {/* DROPZONE */}
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              border: isDragActive ? "3px dashed #2563EB" : "3px dashed #CBD5E1",
              borderRadius: "20px",
              padding: "50px",
              textAlign: "center",
              background: isDragActive ? "#EFF6FF" : "#F8FAFC",
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />

            <FaCloudUploadAlt size={70} color="#2563EB" />

            <h2 style={{ marginTop: "20px" }}>Drag & Drop Report</h2>

            <p style={{ color: "#64748B" }}>
              or click here to browse files
            </p>

            <p style={{ color: "#94A3B8", fontSize: "14px" }}>
              PDF, JPG, PNG Supported
            </p>
          </motion.div>

          {/* FILE PREVIEW */}
          {file && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                marginTop: "30px",
                padding: "20px",
                borderRadius: "16px",
                background: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                {file.type.includes("pdf") ? (
                  <FaFilePdf color="red" size={45} />
                ) : (
                  <FaImage color="#2563EB" size={45} />
                )}

                <div>
                  <h3 style={{ margin: 0 }}>{file.name}</h3>
                  <p style={{ color: "#64748B", margin: 0 }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              <button
                onClick={() => setFile(null)}
                style={{
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </motion.div>
          )}

          {/* UPLOAD BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            onClick={uploadFile}
            disabled={loading}
            style={{
              marginTop: "35px",
              width: "100%",
              padding: "18px",
              border: "none",
              borderRadius: "14px",
              background: loading
                ? "#94A3B8"
                : "linear-gradient(90deg,#2563EB,#4F46E5)",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {loading ? "Uploading..." : "🚀 Upload Report"}
          </motion.button>

          {/* SHOW PATIENT NAME */}
          {patientName && (
            <div style={{ marginTop: "20px", color: "#16A34A", fontWeight: "bold" }}>
              👤 Patient: {patientName}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default UploadReport;