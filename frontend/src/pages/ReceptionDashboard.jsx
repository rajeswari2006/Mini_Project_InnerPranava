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
  const [slots, setSlots] = useState([]);

  const [newPatient, setNewPatient] = useState({
    name: "", email: "", password: "", phone: "", age: "", gender: "", bloodGroup: "", allergies: "", currentMedications: "",
  });
  const [patientMessage, setPatientMessage] = useState("");

  const [booking, setBooking] = useState({ patientId: "", doctorId: "", therapyId: "", date: "", time: "" });
  const [bookingMessage, setBookingMessage] = useState("");

  const [billForm, setBillForm] = useState({ appointmentId: "", consultationFee: "", therapyFee: "", medicineCharges: "", discount: "" });
  const [billMessage, setBillMessage] = useState("");

  const statusClass = { SCHEDULED: "status-scheduled", COMPLETED: "status-completed", CANCELLED: "status-cancelled" };

  const loadAll = () => {
    api.get("/appointments").then((res) => setAppointments(res.data));
    api.get("/billings").then((res) => setBillings(res.data));
    api.get("/patients").then((res) => setPatients(res.data));
    api.get("/doctors").then((res) => setDoctors(res.data));
    api.get("/therapies").then((res) => setTherapies(res.data));
  };

  useEffect(loadAll, []);

  useEffect(() => {
    if (booking.doctorId && booking.date) {
      api.get(`/appointments/available-slots?doctorId=${booking.doctorId}&date=${booking.date}`)
        .then((res) => setSlots(res.data));
    } else {
      setSlots([]);
    }
  }, [booking.doctorId, booking.date]);

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

  const submitBill = async (e) => {
    e.preventDefault();
    setBillMessage("");
    try {
      await api.post("/billings", {
        ...billForm,
        consultationFee: Number(billForm.consultationFee) || 0,
        therapyFee: Number(billForm.therapyFee) || 0,
        medicineCharges: Number(billForm.medicineCharges) || 0,
        discount: Number(billForm.discount) || 0,
      });
      setBillMessage("Bill generated successfully.");
      setBillForm({ appointmentId: "", consultationFee: "", therapyFee: "", medicineCharges: "", discount: "" });
      loadAll();
    } catch (err) {
      setBillMessage(err.response?.data || "Failed to generate bill.");
    }
  };

  const markBillPaid = async (id) => {
    await api.put(`/billings/${id}/pay`);
    loadAll();
  };

  const selectStyle = { width: "100%", padding: 12, borderRadius: 10, border: "1.5px solid var(--border)", fontFamily: "inherit" };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Reception Desk</h1>
          <p>Register walk-ins, book appointments, and manage billing</p>
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

                {slots.length > 0 && (
                  <div className="login-field">
                    <label>Available Slots</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                      {slots.map((s) => (
                        <button
                          type="button"
                          key={s.time}
                          disabled={s.booked}
                          onClick={() => setBooking({ ...booking, time: s.time })}
                          style={{
                            padding: "8px 6px",
                            borderRadius: 8,
                            fontSize: 12.5,
                            fontWeight: 600,
                            cursor: s.booked ? "not-allowed" : "pointer",
                            border: booking.time === s.time ? "2px solid var(--forest)" : "1.5px solid var(--border)",
                            background: s.booked ? "#FFEBEE" : (booking.time === s.time ? "var(--sage)" : "white"),
                            color: s.booked ? "#C62828" : "var(--darktext)",
                          }}
                        >
                          {s.time.slice(0, 5)} {s.booked ? "✕" : "✓"}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {bookingMessage && <p className="login-error" style={{ color: String(bookingMessage).includes("success") ? "var(--forest)" : undefined }}>{String(bookingMessage)}</p>}
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

            <div className="card">
              <h3>Generate Bill</h3>
              <form onSubmit={submitBill}>
                <div className="login-field">
                  <label>Appointment (completed only)</label>
                  <select value={billForm.appointmentId} onChange={(e) => setBillForm({ ...billForm, appointmentId: e.target.value })} style={selectStyle} required>
                    <option value="">Select appointment</option>
                    {appointments.filter((a) => a.status === "COMPLETED").map((a) => (
                      <option key={a.id} value={a.id}>{a.patientName} — {a.therapyName} ({a.date})</option>
                    ))}
                  </select>
                </div>
                <div className="login-field"><label>Consultation Fee (₹)</label><input type="number" value={billForm.consultationFee} onChange={(e) => setBillForm({ ...billForm, consultationFee: e.target.value })} required /></div>
                <div className="login-field"><label>Therapy Fee (₹)</label><input type="number" value={billForm.therapyFee} onChange={(e) => setBillForm({ ...billForm, therapyFee: e.target.value })} required /></div>
                <div className="login-field"><label>Medicine Charges (₹)</label><input type="number" value={billForm.medicineCharges} onChange={(e) => setBillForm({ ...billForm, medicineCharges: e.target.value })} /></div>
                <div className="login-field"><label>Discount (₹)</label><input type="number" value={billForm.discount} onChange={(e) => setBillForm({ ...billForm, discount: e.target.value })} /></div>
                {billMessage && <p className="login-error" style={{ color: String(billMessage).includes("success") ? "var(--forest)" : undefined }}>{String(billMessage)}</p>}
                <button type="submit" className="login-button">Generate Bill</button>
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
                  <div className="appointment-row" key={b.id} style={{ flexDirection: "column", alignItems: "stretch" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <p className="appointment-therapy">{b.patientName} — ₹{b.amount}</p>
                        <p className="appointment-date">{b.therapyName} — {b.billDate}</p>
                      </div>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <span className={`status-badge ${b.paymentStatus === "PAID" ? "status-completed" : "status-scheduled"}`}>{b.paymentStatus}</span>
                        {b.paymentStatus === "PENDING" && (
                          <button
                            onClick={() => markBillPaid(b.id)}
                            style={{ padding: "6px 12px", fontSize: 12, fontWeight: 600, border: "1px solid var(--forest)", color: "var(--forest)", background: "white", borderRadius: 8, cursor: "pointer" }}
                          >
                            Mark Paid
                          </button>
                        )}
                      </div>
                    </div>
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