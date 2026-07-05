import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUpload,
  FaHistory,
  FaPills,
  FaRobot,
  FaCamera,
  FaComments,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const dark = document.body.classList.contains("dark");

  const menu = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Upload Report", icon: <FaUpload />, path: "/upload" },
    { name: "Report History", icon: <FaHistory />, path: "/history" },
    { name: "Medicine History", icon: <FaPills />, path: "/medicine-history" },
    { name: "AI Analysis", icon: <FaRobot />, path: "/analysis" },
    { name: "Medicine Scanner", icon: <FaCamera />, path: "/medicine-scanner" },
    { name: "AI Chat", icon: <FaComments />, path: "/chat" },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
  ];

  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: dark
          ? "#111827"
          : "linear-gradient(180deg,#2563EB,#4F46E5)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "5px 0 25px rgba(0,0,0,.15)",
        zIndex: 999,
      }}
    >
      {/* Logo */}

      <div>
        <div
          style={{
            padding: "35px 25px",
            borderBottom: dark
              ? "1px solid #374151"
              : "1px solid rgba(255,255,255,.2)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: "700",
            }}
          >
            🏥 MediSense
          </h1>

          <p
            style={{
              marginTop: 8,
              opacity: 0.8,
              fontSize: 15,
            }}
          >
            AI Healthcare Assistant
          </p>
        </div>

        {/* Menu */}

        <div
          style={{
            padding: "20px",
          }}
        >
          {menu.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  padding: "16px 18px",
                  marginBottom: "10px",
                  borderRadius: "14px",
                  background:
                    location.pathname === item.path
                      ? dark
                        ? "#1E3A8A"
                        : "rgba(255,255,255,.18)"
                      : "transparent",
                  color: "white",
                  transition: ".25s",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {item.icon}
                </div>

                <span
                  style={{
                    fontSize: "20px",
                    fontWeight: 500,
                  }}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Logout */}

      <div
        style={{
          padding: "20px",
        }}
      >
        <button
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "14px",
            background: dark ? "#DC2626" : "#EF4444",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          <FaSignOutAlt /> &nbsp; Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;