import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function ReceptionDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [billings, setBillings] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [therapies, setTherapies] = useState([]);

  const [newPatient, setNewPatient] = useState({
    name: "", email: "", password: "", phone: "", age: "", gender: "", bloodGroup: "", allergies: "", currentMedications: "",
  });
  const [patientMessage, setPatientMessage] = useState("");

  const [booking, setBooking] = useState({ patientId: "", doctorId: "", therapyId: "", date: "", time: "" });
  const [bookingMessage, setBookingMessage] = useState("");

  const statusClass = { SCHEDULED: "status-scheduled", COMPLETED: "status-completed", CANCELLED: "status-cancelled" };

  const loadAll = () => {
    api.get("/appointments").then((res) => setAppointments(res.data));
    api.get("/billings").then((res) => setBillings(res.data));
    api.get("/patients").then((res) => setPatients(res.data));
    api.get("/doctors").then((res) => setDoctors(res.data));
    api.get("/therapies").then((res) => setTherapies(res.data));
  };

  useEffect(loadAll, []);

  const handlePatientChange = (e) => setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
  const handleBookingChange = (e) => setBooking({ ...booking, [e.target.name]: e.target.value });

  const submitNewPatient = async (e) => {
    e.preventDefault();
    setPatientMessage("");
    try {
      const res = await api.post("/reception/patients", { ...newPatient, age: Number(newPatient.age) });
      setPatientMessage(res.data);
      setNewPatient({ name: "", email: "", password: "", phone: "", age: "", gender: "", bloodGroup: "", allergies: "", currentMedications: "" });
      loadAll();
    } catch (err) {
      setPatientMessage(err.response?.data || "Failed to register patient.");
    }
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    setBookingMessage("");
    try {
      await api.post("/appointments", booking);
      setBookingMessage("Appointment booked successfully.");
      setBooking({ patientId: "", doctorId: "", therapyId: "", date: "", time: "" });
      loadAll();
    } catch (err) {
      setBookingMessage(err.response?.data || "Booking failed — that doctor may already be booked at this time.");
    }
  };

  const selectStyle = { width: "100%", padding: 12, borderRadius: 10, border: "1.5px solid var(--border)", fontFamily: "inherit" };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Reception Desk</h1>
          <p>Register walk-ins, book appointments, and track billing</p>
        </div>

        <div className="patient-grid">
          <div>
            <div className="card">
              <h3>Book an Appointment</h3>
              <form onSubmit={submitBooking}>
                <div className="login-field">
                  <label>Patient</label>
                  <select name="patientId" value={booking.patientId} onChange={handleBookingChange} style={selectStyle} required>
                    <option value="">Select patient</option>
                    {patients.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <div className="login-field">
                  <label>Doctor</label>
                  <select name="doctorId" value={booking.doctorId} onChange={handleBookingChange} style={selectStyle} required>
                    <option value="">Select doctor</option>
                    {doctors.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialization} ({d.availability})</option>)}
                  </select>
                </div>
                <div className="login-field">
                  <label>Therapy</label>
                  <select name="therapyId" value={booking.therapyId} onChange={handleBookingChange} style={selectStyle} required>
                    <option value="">Select therapy</option>
                    {therapies.map((t) => <option key={t.id} value={t.id}>{t.name} ({t.duration} min)</option>)}
                  </select>
                </div>
                <div className="login-field">
                  <label>Date</label>
                  <input type="date" name="date" value={booking.date} onChange={handleBookingChange} required />
                </div>
                <div className="login-field">
                  <label>Time</label>
                  <input type="time" name="time" value={booking.time} onChange={handleBookingChange} required />
                </div>
                {bookingMessage && <p className="login-error" style={{ color: bookingMessage.includes("success") ? "var(--forest)" : undefined }}>{String(bookingMessage)}</p>}
                <button type="submit" className="login-button">Book Appointment</button>
              </form>
            </div>

            <div className="card">
              <h3>Register Walk-in Patient</h3>
              <form onSubmit={submitNewPatient}>
                <div className="login-field"><label>Full Name</label><input name="name" value={newPatient.name} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Email</label><input type="email" name="email" value={newPatient.email} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Temporary Password</label><input type="password" name="password" value={newPatient.password} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Phone</label><input name="phone" value={newPatient.phone} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Age</label><input type="number" name="age" value={newPatient.age} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Gender</label><input name="gender" value={newPatient.gender} onChange={handlePatientChange} required /></div>
                <div className="login-field"><label>Blood Group</label><input name="bloodGroup" value={newPatient.bloodGroup} onChange={handlePatientChange} /></div>
                <div className="login-field"><label>Allergies</label><input name="allergies" value={newPatient.allergies} onChange={handlePatientChange} /></div>
                {patientMessage && <p className="login-error" style={{ color: String(patientMessage).includes("success") ? "var(--forest)" : undefined }}>{String(patientMessage)}</p>}
                <button type="submit" className="login-button">Register Patient</button>
              </form>
            </div>
          </div>

          <div>
            <div className="card">
              <h3>All Appointments</h3>
              {appointments.map((appt) => (
                <div className="appointment-row" key={appt.id}>
                  <div>
                    <p className="appointment-therapy">{appt.patientName}</p>
                    <p className="appointment-date">{appt.doctorName} — {appt.date} at {appt.time}</p>
                  </div>
                  <span className={`status-badge ${statusClass[appt.status]}`}>{appt.status}</span>
                </div>
              ))}
            </div>

            <div className="card">
              <h3>Billing Status</h3>
              {billings.length === 0 ? (
                <p className="empty-state">No billing records yet.</p>
              ) : (
                billings.map((b) => (
                  <div className="appointment-row" key={b.id}>
                    <p className="appointment-therapy">₹{b.amount}</p>
                    <span className={`status-badge ${b.paymentStatus === "PAID" ? "status-completed" : "status-scheduled"}`}>{b.paymentStatus}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}