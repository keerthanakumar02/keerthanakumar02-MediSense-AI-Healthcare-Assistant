import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {

    try {

      const response = await API.post("/login", {
        email,
        password
      });

      if (response.data.status === "success") {

        alert("Login Successful");

        navigate("/dashboard");

      } else {

        alert(response.data.message);

      }

    } catch {

      alert("Server Error");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f8fb"
      }}
    >

      <div
        style={{
          width: "420px",
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,.08)"
        }}
      >

        <h1
          style={{
            color: "#2563eb",
            textAlign: "center"
          }}
        >
          🏥 MediSense AI
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginTop: "10px",
            marginBottom: "30px"
          }}
        >
          Welcome Back
        </p>

        <input
          placeholder="Email Address"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"20px",
            borderRadius:"10px",
            border:"1px solid #ddd"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          style={{
            width:"100%",
            padding:"14px",
            marginBottom:"25px",
            borderRadius:"10px",
            border:"1px solid #ddd"
          }}
        />

        <button
          onClick={login}
          style={{
            width:"100%",
            padding:"14px",
            background:"#2563eb",
            color:"white",
            border:"none",
            borderRadius:"10px",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Login
        </button>

        <br /><br />

        <button
          onClick={()=>navigate("/register")}
          style={{
            width:"100%",
            padding:"14px",
            background:"#10b981",
            color:"white",
            border:"none",
            borderRadius:"10px",
            fontSize:"16px",
            fontWeight:"bold"
          }}
        >
          Create New Account
        </button>

      </div>

    </div>

  );

}

export default Login;