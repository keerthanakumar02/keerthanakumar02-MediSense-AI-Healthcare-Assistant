import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

function Analysis() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const response = await API.get("/analysis");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!data) {
    return (
      <div style={{ padding: "50px", fontSize: "22px" }}>
        Loading AI Analysis...
      </div>
    );
  }

  return (
    <div style={{ background: "#F8FAFC", minHeight: "100vh" }}>
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          marginTop: "90px",
          padding: "30px",
        }}
      >
        <h1 style={{ color: "#2563EB" }}>
          🤖 AI Medical Analysis
        </h1>

        {/* Patient Summary */}
        <div
          style={{
            background: "white",
            marginTop: "25px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h2>👤 Patient : {data.patient}</h2>

          <h2 style={{ color: "#10B981" }}>
            ❤️ Health Score : {data.health_score}%
          </h2>

          <h3>
            Risk Level :
            <span style={{ color: "#2563EB" }}>
              {" "}
              {data.risk}
            </span>
          </h3>

          <p
            style={{
              color: "#475569",
              fontSize: "17px",
              lineHeight: "30px",
            }}
          >
            {data.summary}
          </p>
        </div>

        {/* Test Results */}
        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h2>🧪 Test Results</h2>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ background: "#EFF6FF" }}>
                <th style={{ padding: "15px" }}>Test</th>
                <th>Value</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {data.results.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    borderBottom: "1px solid #E5E7EB",
                  }}
                >
                  <td style={{ padding: "15px" }}>
                    {item.test}
                  </td>

                  <td>{item.value}</td>

                  <td
                    style={{
                      color:
                        item.status === "Normal"
                          ? "#10B981"
                          : "#EF4444",
                      fontWeight: "bold",
                    }}
                  >
                    {item.status === "Normal"
                      ? "✅ Normal"
                      : "⚠️ Abnormal"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendations */}
        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h2>💡 AI Recommendations</h2>

          <ul>
            {data.recommendations.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "15px",
                  fontSize: "17px",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Diet */}
        <div
          style={{
            background: "white",
            marginTop: "30px",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(0,0,0,.08)",
          }}
        >
          <h2>🥗 Recommended Diet</h2>

          <ul>
            {data.diet?.map((item, index) => (
              <li
                key={index}
                style={{
                  marginBottom: "12px",
                  fontSize: "17px",
                }}
              >
                ✅ {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Analysis;