import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import { useState, useEffect } from "react";

function Charts() {
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

  const data = [
    { name: "Hemoglobin", value: 14 },
    { name: "WBC", value: 8 },
    { name: "Platelets", value: 15 },
    { name: "Sugar", value: 10 },
  ];

  return (
    <div
      style={{
        background: dark ? "#1E293B" : "#FFFFFF",
        marginTop: "35px",
        borderRadius: "22px",
        padding: "30px",
        boxShadow: dark
          ? "0 15px 35px rgba(0,0,0,.45)"
          : "0 15px 35px rgba(15,23,42,.08)",
        transition: ".3s",
      }}
    >
      <h2
        style={{
          marginBottom: "30px",
          color: dark ? "#FFFFFF" : "#2563EB",
        }}
      >
        📊 MediSense AI Health Analytics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))",
          gap: "18px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#2563EB",
            color: "white",
            borderRadius: "15px",
            padding: "18px",
          }}
        >
          <h3>🩸 Blood Reports</h3>
          <h1>12</h1>
        </div>

        <div
          style={{
            background: "#10B981",
            color: "white",
            borderRadius: "15px",
            padding: "18px",
          }}
        >
          <h3>💊 Medicines</h3>
          <h1>18</h1>
        </div>

        <div
          style={{
            background: "#F59E0B",
            color: "white",
            borderRadius: "15px",
            padding: "18px",
          }}
        >
          <h3>⚠ High Risk</h3>
          <h1>2</h1>
        </div>

        <div
          style={{
            background: "#EF4444",
            color: "white",
            borderRadius: "15px",
            padding: "18px",
          }}
        >
          <h3>🤖 AI Accuracy</h3>
          <h1>98%</h1>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={dark ? "#334155" : "#E5E7EB"}
          />

          <XAxis
            dataKey="name"
            tick={{
              fill: dark ? "#FFFFFF" : "#475569",
            }}
          />

          <YAxis
            tick={{
              fill: dark ? "#FFFFFF" : "#475569",
            }}
          />

          <Tooltip
            contentStyle={{
              background: dark ? "#111827" : "#FFFFFF",
              color: dark ? "#FFFFFF" : "#000000",
              borderRadius: "10px",
              border: "none",
            }}
          />

          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[10, 10, 0, 0]}
            animationDuration={1200}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Charts;