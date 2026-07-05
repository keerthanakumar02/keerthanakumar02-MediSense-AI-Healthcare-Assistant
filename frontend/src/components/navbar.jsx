import { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
  FiUser,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

function Navbar() {
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const closeMenus = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", closeMenus);

    return () => document.removeEventListener("mousedown", closeMenus);
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);

    window.dispatchEvent(
      new CustomEvent("searchReports", {
        detail: e.target.value,
      })
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        left: "280px",
        right: 0,
        top: 0,
        height: "85px",
        background: darkMode ? "#111827" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        boxShadow: "0 5px 25px rgba(0,0,0,.08)",
        zIndex: 999,
      }}
    >
      {/* SEARCH */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: darkMode ? "#1F2937" : "#EEF4FF",
          borderRadius: "30px",
          padding: "12px 20px",
          width: "420px",
        }}
      >
        <FiSearch
          size={20}
          color={darkMode ? "#ddd" : "#666"}
        />

        <input
          value={search}
          onChange={handleSearch}
          placeholder="Search reports, medicines..."
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            marginLeft: "12px",
            width: "100%",
            color: darkMode ? "white" : "black",
            fontSize: "16px",
          }}
        />
      </div>

      {/* RIGHT */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        {/* DARK MODE */}

        <div
          onClick={() => setDarkMode(!darkMode)}
          style={{
            cursor: "pointer",
          }}
        >
          {darkMode ? (
            <FiSun size={28} color="orange" />
          ) : (
            <FiMoon size={28} color="#2563EB" />
          )}
        </div>

        {/* NOTIFICATION */}

        <div
          ref={notificationRef}
          style={{
            position: "relative",
          }}
        >
          <FiBell
  size={28}
  style={{
    cursor: "pointer",
    color: darkMode ? "#FFFFFF" : "#2563EB",
  }}
  onClick={() => {
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  }}
/>
        

          <div
            style={{
              position: "absolute",
              top: -6,
              right: -6,
              background: "red",
              color: "white",
              width: 18,
              height: 18,
              borderRadius: "50%",
              fontSize: 11,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </div>

          {showNotifications && (
            <div
              style={{
                position: "absolute",
                top: 45,
                right: 0,
                width: 320,
                background: darkMode ? "#1E293B" : "#fff",
                border: darkMode ? "1px solid #334155" : "1px solid #E5E7EB",
                borderRadius: 15,
                boxShadow: "0 15px 35px rgba(0,0,0,.15)",
                padding: 20,
              }}
            >
              <h3
  style={{
    margin: 0,
    color: darkMode ? "white" : "#111827",
  }}
>
  🔔 Notifications
</h3>

              <hr
  style={{
    borderColor: darkMode ? "#334155" : "#E5E7EB",
  }}
/>

             <p style={{ color: darkMode ? "#E5E7EB" : "#334155" }}>
📄 Report Uploaded Successfully
</p>

<p style={{ color: darkMode ? "#E5E7EB" : "#334155" }}>
💊 Medicine Scan Completed
</p>

<p style={{ color: darkMode ? "#E5E7EB" : "#334155" }}>
🤖 AI Analysis Finished
</p>

<div
  style={{
    textAlign: "center",
    paddingTop: "12px",
    color: "#2563EB",
    fontWeight: "bold",
    cursor: "pointer",
  }}
>
View All Notifications
</div>
            </div>
          )}
        </div>

        {/* PROFILE */}

        <div
          ref={profileRef}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
          }}
          onClick={() => {
  setShowProfile(!showProfile);
  setShowNotifications(false);
}}
        >
          <FiUser
  size={45}
  color={darkMode ? "#FFFFFF" : "#2563EB"}
/>

          <div>
           <h3
  style={{
    margin: 0,
    color: darkMode ? "#FFFFFF" : "#111827",
  }}
>
  User
</h3>
<span
  style={{
    color: darkMode ? "#CBD5E1" : "#777",
  }}
>
  Patient
</span>
          </div>

          {showProfile && (
            <div
              style={{
                position: "absolute",
                top: 60,
                right: 0,
                width: 220,
                background: darkMode ? "#1E293B" : "#FFFFFF",
                border: darkMode
                ? "1px solid #334155"
                : "1px solid #E5E7EB",
                borderRadius: 15,
                boxShadow: "0 15px 35px rgba(0,0,0,.15)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  color: darkMode ? "#FFFFFF" : "#111827",
}}
              >
                <FiUser />
                Profile
              </div>

              <div
               style={{
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  color: darkMode ? "#FFFFFF" : "#111827",
}}
              >
                <FiSettings />
                Settings
              </div>

              <div
              style={{
  padding: "16px 18px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  color: "#EF4444",
  cursor: "pointer",
  fontWeight: "bold",
}}
              >
                <FiLogOut />
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;