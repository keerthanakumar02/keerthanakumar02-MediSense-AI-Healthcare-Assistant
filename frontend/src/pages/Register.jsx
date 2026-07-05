import { useNavigate } from "react-router-dom";

function Register(){

    const navigate=useNavigate();

    return(

        <div style={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            height:"100vh",
            background:"#eef2f7"
        }}>

        <div style={{
            width:"400px",
            background:"white",
            padding:"30px",
            borderRadius:"10px"
        }}>

        <h2>Patient Registration</h2>

        <input placeholder="Name" style={{width:"100%",padding:"10px",marginTop:"10px"}}/>

        <input placeholder="Email" style={{width:"100%",padding:"10px",marginTop:"10px"}}/>

        <input placeholder="Password" type="password" style={{width:"100%",padding:"10px",marginTop:"10px"}}/>

        <input placeholder="Age" style={{width:"100%",padding:"10px",marginTop:"10px"}}/>

        <input placeholder="Gender" style={{width:"100%",padding:"10px",marginTop:"10px"}}/>

        <button
        style={{
            width:"100%",
            padding:"10px",
            marginTop:"20px",
            background:"green",
            color:"white"
        }}
        onClick={()=>navigate("/login")}
        >
        Register
        </button>

        </div>

        </div>

    )

}

export default Register;