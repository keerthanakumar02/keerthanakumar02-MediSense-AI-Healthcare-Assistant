import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function MedicineHistory() {

  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await API.get("/medicine-history");
      setHistory(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div style={{ marginLeft: "300px", padding: "40px" }}>

        <h1>💊 Medicine Scan History</h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "30px",
          }}
        >
          <thead>
            <tr style={{ background: "#2563EB", color: "white" }}>
              <th>ID</th>
              <th>Medicine</th>
              <th>Generic Name</th>
              <th>Dosage</th>
              <th>Scanned Time</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.medicine_name}</td>
                <td>{item.generic_name}</td>
                <td>{item.dosage}</td>
                <td>{item.scanned_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </>
  );
}

export default MedicineHistory;