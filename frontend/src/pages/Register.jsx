import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "",
    age: "", gender: "", bloodGroup: "", allergies: "", currentMedications: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/register/patient", { ...form, age: Number(form.age) });
      await login(form.email, form.password);
      navigate("/patient");
    } catch (err) {
      setError(err.response?.data || "Registration failed. Try a different email.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" style={{ maxWidth: 460 }}>
        <h1 className="login-logo">InnerPranava</h1>
        <p className="login-subtitle">Create your patient account</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Age</label>
            <input type="number" name="age" value={form.age} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Gender</label>
            <input name="gender" value={form.gender} onChange={handleChange} required />
          </div>
          <div className="login-field">
            <label>Blood Group</label>
            <input name="bloodGroup" value={form.bloodGroup} onChange={handleChange} />
          </div>
          <div className="login-field">
            <label>Allergies</label>
            <input name="allergies" value={form.allergies} onChange={handleChange} />
          </div>

          {error && <p className="login-error">{String(error)}</p>}

          <button type="submit" className="login-button">Create Account</button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--graytext)" }}>
            New patient? <Link to="/register">Create an account</Link>
        </p>
        
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--graytext)" }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}