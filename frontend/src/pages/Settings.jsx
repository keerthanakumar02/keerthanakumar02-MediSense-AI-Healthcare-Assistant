import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import {
  FaUser,
  FaBell,
  FaMoon,
  FaSun,
  FaLock,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

function Settings() {

  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(false);

  const handleClick = (title) => {

    switch (title) {

      case "Profile":
        alert("👤 Profile page coming soon.");
        break;

      case "Notifications":
        alert("🔔 Notification settings coming soon.");
        break;

      case "Privacy":
        alert("🔒 Privacy settings coming soon.");
        break;

      case "About":
        alert(
          "🏥 MediSense AI\n\nVersion : 1.0.0\nDeveloped using React + FastAPI + AI"
        );
        break;

      case "Logout":

        if (window.confirm("Are you sure you want to logout?")) {

          navigate("/login");

        }

        break;

      default:
        break;

    }

  };

  return (
    <div
      style={{
        background: darkMode ? "#111827" : "#F8FAFC",
        minHeight: "100vh",
        transition: ".3s",
      }}
    >
      <Navbar />

      <Sidebar />

      <div
        style={{
          marginLeft: "290px",
          marginTop: "90px",
          padding: "30px",
        }}
      >

        <h1
          style={{
            color: darkMode ? "white" : "#1E3A8A",
          }}
        >
          ⚙️ Settings
        </h1>

        <p
          style={{
            color: darkMode ? "#CBD5E1" : "#64748B",
            marginBottom: "30px",
          }}
        >
          Manage your MediSense AI preferences
        </p>

        {/* Profile */}

        <div
          onClick={() => handleClick("Profile")}
          style={cardStyle(darkMode)}
        >

          <div style={leftStyle}>

            <FaUser color="#2563EB" size={24} />

            <div>

              <h3 style={titleStyle(darkMode)}>Profile</h3>

              <p style={subStyle(darkMode)}>
                Manage your personal information
              </p>

            </div>

          </div>

          <span>›</span>

        </div>

        {/* Notifications */}

        <div
          onClick={() => handleClick("Notifications")}
          style={cardStyle(darkMode)}
        >

          <div style={leftStyle}>

            <FaBell color="#F59E0B" size={24} />

            <div>

              <h3 style={titleStyle(darkMode)}>Notifications</h3>

              <p style={subStyle(darkMode)}>
                Manage notification preferences
              </p>

            </div>

          </div>

          <span>›</span>

        </div>

        {/* Dark Mode */}

        <div
          style={cardStyle(darkMode)}
        >

          <div style={leftStyle}>

            {darkMode ? (
              <FaSun color="#FBBF24" size={24} />
            ) : (
              <FaMoon color="#6366F1" size={24} />
            )}

            <div>

              <h3 style={titleStyle(darkMode)}>Dark Mode</h3>

              <p style={subStyle(darkMode)}>
                Enable / Disable Theme
              </p>

            </div>

          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: darkMode ? "#22C55E" : "#2563EB",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {darkMode ? "ON" : "OFF"}
          </button>

        </div>

        {/* Privacy */}

        <div
          onClick={() => handleClick("Privacy")}
          style={cardStyle(darkMode)}
        >

          <div style={leftStyle}>

            <FaLock color="#10B981" size={24} />

            <div>

              <h3 style={titleStyle(darkMode)}>Privacy & Security</h3>

              <p style={subStyle(darkMode)}>
                Manage your account security
              </p>

            </div>

          </div>

          <span>›</span>

        </div>

        {/* About */}

        <div
          onClick={() => handleClick("About")}
          style={cardStyle(darkMode)}
        >

          <div style={leftStyle}>

            <FaInfoCircle color="#0EA5E9" size={24} />

            <div>

              <h3 style={titleStyle(darkMode)}>About MediSense AI</h3>

              <p style={subStyle(darkMode)}>
                Version 1.0.0
              </p>

            </div>

          </div>

          <span>›</span>

        </div>

        {/* Logout */}

        <div
          onClick={() => handleClick("Logout")}
          style={{
            ...cardStyle(darkMode),
            border: "2px solid #EF4444",
          }}
        >

          <div style={leftStyle}>

            <FaSignOutAlt color="#EF4444" size={24} />

            <div>

              <h3 style={titleStyle(darkMode)}>Logout</h3>

              <p style={subStyle(darkMode)}>
                Sign out from your account
              </p>

            </div>

          </div>

          <span>›</span>

        </div>

      </div>

    </div>
  );
}

const cardStyle = (dark) => ({
  background: dark ? "#1E293B" : "white",
  color: dark ? "white" : "black",
  borderRadius: "18px",
  padding: "22px",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "0 8px 20px rgba(0,0,0,.08)",
  cursor: "pointer",
  transition: ".3s",
});

const leftStyle = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const titleStyle = (dark) => ({
  margin: 0,
  color: dark ? "white" : "#1E293B",
});

const subStyle = (dark) => ({
  marginTop: "6px",
  color: dark ? "#CBD5E1" : "#64748B",
});

export default Settings;