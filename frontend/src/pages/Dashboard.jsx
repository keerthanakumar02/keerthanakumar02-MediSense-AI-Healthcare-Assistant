import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Hero from "../components/Hero";
import StatCard from "../components/StatCard";
import Charts from "../components/Charts";

function Dashboard() {
  const [stats, setStats] = useState({
    reports: 0,
    medicines: 0,
    users: 0,
  });

  const [reports, setReports] = useState([]);

  const darkMode = document.body.classList.contains("dark");

  useEffect(() => {
    loadStats();
    loadReports();
  }, []);

  const loadStats = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/dashboard-stats"
      );

      setStats(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const loadReports = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/recent-reports"
      );

      setReports(res.data.reports);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      style={{
        background: darkMode ? "#0F172A" : "#F8FAFC",
        minHeight: "100vh",
        transition: ".3s",
      }}
    >
      <Navbar />

      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          marginTop: "90px",
          padding: "30px",
        }}
      >
        <Hero />

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
            marginTop: "30px",
          }}
        >
          <StatCard
            title="Reports"
            value={stats.reports}
            icon="📄"
          />

          <StatCard
            title="Medicines"
            value={stats.medicines}
            icon="💊"
          />

          <StatCard
            title="Users"
            value={stats.users}
            icon="👤"
          />

          <StatCard
            title="AI Status"
            value="Online"
            icon="🤖"
          />
        </div>

        <div
  style={{
    background: darkMode ? "#1E293B" : "#FFFFFF",
    marginTop: "35px",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: darkMode
      ? "0 12px 35px rgba(0,0,0,.45)"
      : "0 12px 30px rgba(15,23,42,.08)",
    transition: ".3s",
  }}
>
  <Charts />

  </div>

<div
  style={{
    background: darkMode ? "#1E293B" : "#FFFFFF",
    marginTop: "35px",
    padding: "30px",
    borderRadius: "22px",
    boxShadow: darkMode
      ? "0 12px 35px rgba(0,0,0,.45)"
      : "0 12px 30px rgba(15,23,42,.08)",
    transition: ".3s",
  }}
>
  <h2
    style={{
      marginBottom: "25px",
      color: darkMode ? "#FFFFFF" : "#2563EB",
    }}
  >
    📄 Recent Reports
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr
        style={{
          background: darkMode ? "#334155" : "#EFF6FF",
        }}
      >
        <th style={{ padding: "15px", textAlign: "left" }}>ID</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Filename</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Analysis</th>
        <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
      </tr>
    </thead>

    <tbody>
      {reports.length === 0 ? (
        <tr>
          <td
            colSpan="4"
            style={{
              padding: "30px",
              textAlign: "center",
              color: darkMode ? "#CBD5E1" : "#64748B",
            }}
          >
            No Reports Available
          </td>
        </tr>
      ) : (
        reports.map((report) => (
          <tr
            key={report.id}
            style={{
              borderBottom: darkMode
                ? "1px solid #334155"
                : "1px solid #E5E7EB",
            }}
          >
            <td
              style={{
                padding: "18px",
                color: darkMode ? "#FFFFFF" : "#111827",
              }}
            >
              {report.id}
            </td>

            <td
              style={{
                padding: "18px",
                color: darkMode ? "#FFFFFF" : "#111827",
              }}
            >
              {report.filename}
            </td>

            <td
              style={{
                padding: "18px",
                color: darkMode ? "#CBD5E1" : "#475569",
              }}
            >
              {report.analysis}
            </td>

            <td
              style={{
                padding: "18px",
                color: "#10B981",
                fontWeight: "bold",
              }}
            >
              ✅ Completed
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
}

export default Dashboard;
