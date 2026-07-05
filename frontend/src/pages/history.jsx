import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

function History() {

  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await API.get("/reports");
    setReports(res.data.reports);
  };

  const deleteReport = async (id) => {

    if (!window.confirm("Delete this report?")) return;

    await API.delete(`/report/${id}`);

    fetchReports();
  };

  return (
    <>
      <Sidebar />
      <Navbar />

      <div
        style={{
          marginLeft: "300px",
          padding: "40px",
        }}
      >

        <h1
          style={{
            color: "#2563EB",
            marginBottom: "25px",
          }}
        >
          📄 Report History
        </h1>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)"
          }}
        >

          <thead>

            <tr
              style={{
                background: "#2563EB",
                color: "white"
              }}
            >

              <th style={{padding:"15px"}}>ID</th>
              <th>Filename</th>
              <th>Status</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report)=>(

              <tr
                key={report.id}
                style={{
                  textAlign:"center",
                  borderBottom:"1px solid #eee"
                }}
              >

                <td>{report.id}</td>

                <td>{report.filename}</td>

                <td style={{color:"green"}}>

                  ✅ Analysed

                </td>

                <td>

                  <button
                    onClick={() =>
                      setSelectedReport(report)
                    }
                    style={{
                      background:"#2563EB",
                      color:"white",
                      border:"none",
                      padding:"8px 15px",
                      borderRadius:"8px",
                      marginRight:"10px",
                      cursor:"pointer"
                    }}
                  >
                    View
                  </button>

                  <button
                    onClick={() =>
                      deleteReport(report.id)
                    }
                    style={{
                      background:"#EF4444",
                      color:"white",
                      border:"none",
                      padding:"8px 15px",
                      borderRadius:"8px",
                      cursor:"pointer"
                    }}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {selectedReport && (

        <div
          style={{
            position:"fixed",
            inset:0,
            background:"rgba(0,0,0,.5)",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
          }}
        >

          <div
            style={{
              background:"white",
              width:"700px",
              padding:"30px",
              borderRadius:"15px",
              maxHeight:"80vh",
              overflowY:"auto"
            }}
          >

            <h2>{selectedReport.filename}</h2>

            <hr />

            <p
              style={{
                whiteSpace:"pre-wrap",
                lineHeight:"28px"
              }}
            >
              {selectedReport.analysis}
            </p>

            <button
              onClick={() =>
                setSelectedReport(null)
              }
              style={{
                marginTop:"20px",
                background:"#2563EB",
                color:"white",
                border:"none",
                padding:"10px 20px",
                borderRadius:"8px"
              }}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  );

}

export default History;