import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function AddStaff() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", role: "DOCTOR",
    specialization: "", availability: "", assignedTherapies: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await api.post("/admin/staff", form);
      setMessage(res.data);
      setForm({ name: "", email: "", password: "", phone: "", role: "DOCTOR", specialization: "", availability: "", assignedTherapies: "" });
    } catch (err) {
      setMessage(err.response?.data || "Failed to create staff account.");
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Add Staff</h1>
          <p>Create a new Doctor, Therapist, or Receptionist account</p>
        </div>

        <div className="card" style={{ maxWidth: 480 }}>
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
              <label>Temporary Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="login-field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="login-field">
              <label>Role</label>
              <select name="role" value={form.role} onChange={handleChange} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1.5px solid var(--border)" }}>
                <option value="DOCTOR">Doctor</option>
                <option value="THERAPIST">Therapist</option>
                <option value="RECEPTIONIST">Receptionist</option>
              </select>
            </div>

            {form.role === "DOCTOR" && (
              <>
                <div className="login-field">
                  <label>Specialization</label>
                  <input name="specialization" value={form.specialization} onChange={handleChange} />
                </div>
                <div className="login-field">
                  <label>Availability</label>
                  <input name="availability" value={form.availability} onChange={handleChange} />
                </div>
              </>
            )}

            {form.role === "THERAPIST" && (
              <div className="login-field">
                <label>Assigned Therapies</label>
                <input name="assignedTherapies" value={form.assignedTherapies} onChange={handleChange} />
              </div>
            )}

            {message && <p className="login-error" style={{ color: "var(--forest)" }}>{String(message)}</p>}

            <button type="submit" className="login-button">Create Staff Account</button>
          </form>
        </div>
      </main>
    </div>
  );
}