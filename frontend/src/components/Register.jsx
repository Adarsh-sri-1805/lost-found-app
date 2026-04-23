import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/register", form);
    alert("Registered Successfully");
    navigate("/login");
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Name"
          onChange={(e)=>setForm({...form, name:e.target.value})} />

        <input placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})} />

        <button>Register</button>
      </form>
    </div>
  );
}

export default Register;