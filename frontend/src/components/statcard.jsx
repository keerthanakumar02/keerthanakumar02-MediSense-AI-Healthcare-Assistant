import { useEffect, useState } from "react";

function StatCard({ title, value, icon }) {
  const [dark, setDark] = useState(
    document.body.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.body.classList.contains("dark"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        background: dark ? "#1E293B" : "#FFFFFF",
        borderRadius: "22px",
        padding: "28px",
        boxShadow: dark
          ? "0 10px 35px rgba(0,0,0,.45)"
          : "0 12px 30px rgba(15,23,42,.08)",
        transition: "0.3s",
        border: dark
          ? "1px solid #334155"
          : "1px solid #E5E7EB",
      }}
    >
      {/* Icon */}

      <div
        style={{
          width: "65px",
          height: "65px",
          borderRadius: "18px",
          background: dark ? "#334155" : "#DBEAFE",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "32px",
          marginBottom: "18px",
        }}
      >
        {icon}
      </div>

      {/* Title */}

      <div
        style={{
          fontSize: "18px",
          color: dark ? "#CBD5E1" : "#64748B",
        }}
      >
        {title}
      </div>

      {/* Value */}

      <div
        style={{
          fontSize: "50px",
          fontWeight: "700",
          marginTop: "10px",
          color: dark ? "#FFFFFF" : "#0F172A",
        }}
      >
        {value}
      </div>

      {/* Footer */}

      <div
        style={{
          marginTop: "16px",
          color: "#10B981",
          fontWeight: "600",
          fontSize: "17px",
        }}
      >
        ↑ Updated Today
      </div>
    </div>
  );
}

export default StatCard;