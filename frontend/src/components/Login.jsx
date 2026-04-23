import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await API.post("/login", form);
    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input placeholder="Email"
          onChange={(e)=>setForm({...form, email:e.target.value})} />

        <input type="password" placeholder="Password"
          onChange={(e)=>setForm({...form, password:e.target.value})} />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;