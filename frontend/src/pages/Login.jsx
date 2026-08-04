import { useState } from "react";
import { useNavigate , Link} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { role } = await login(email, password);
      if (role === "ADMIN") navigate("/admin");
      else if (role === "DOCTOR") navigate("/doctor");
      else if (role === "THERAPIST") navigate("/therapist");
      else if (role === "RECEPTIONIST") navigate("/reception");
      else if (role === "PATIENT") navigate("/patient");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-logo">InnerPranava</h1>
        <p className="login-subtitle">Panchakarma Hospital Management</p>

        <form onSubmit={handleSubmit}>
          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@innerpranava.com"
              required
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--graytext)" }}>
          New patient? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}