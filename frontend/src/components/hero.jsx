import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaHeartbeat } from "react-icons/fa";

function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        background:
          "linear-gradient(135deg,#2563EB 0%,#4F46E5 50%,#7C3AED 100%)",
        borderRadius: "28px",
        padding: "45px",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
        boxShadow:document.body.classList.contains("dark")
?"0 25px 60px rgba(0,0,0,.6)"
:"0 20px 50px rgba(37,99,235,.3)",
      }}
    >
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          width: "320px",
          height: "320px",
          background: "rgba(255,255,255,.08)",
          borderRadius: "50%",
          right: "-80px",
          top: "-60px",
        }}
      />

      <div style={{ zIndex: 2 }}>
        <p
          style={{
            opacity: 0.9,
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Welcome Back 👋
        </p>

        <h1
          style={{
            fontSize: "52px",
            margin: "0 0 20px",
          }}
        >
          AI Powered Healthcare
        </h1>

        <p
          style={{
            maxWidth: "620px",
            lineHeight: "32px",
            opacity: 0.9,
            fontSize: "18px",
          }}
        >
          Upload medical reports, receive AI-powered insights, monitor
          health trends, and manage everything from one smart dashboard.
        </p>

        <button
          style={{
            marginTop: "30px",
            background: "white",
            color: "#2563EB",
            border: "none",
            padding: "16px 28px",
            borderRadius: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontSize: "16px",
          }}
        >
          <FaCloudUploadAlt />
          Upload New Report
        </button>
      </div>

      <motion.div
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
        }}
        style={{
          zIndex: 2,
          fontSize: "130px",
          opacity: 0.9,
        }}
      >
        <FaHeartbeat />
      </motion.div>
    </motion.div>
  );
}

export default Hero;