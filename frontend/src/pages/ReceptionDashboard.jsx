import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function ReceptionDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    api.get("/appointments").then((res) => setAppointments(res.data));
    api.get("/billings").then((res) => setBillings(res.data));
  }, []);

  const statusClass = {
    SCHEDULED: "status-scheduled",
    COMPLETED: "status-completed",
    CANCELLED: "status-cancelled",
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Reception Desk</h1>
          <p>All appointments and payment status</p>
        </div>

        <div className="patient-grid">
          <div className="card">
            <h3>All Appointments</h3>
            {appointments.map((appt) => (
              <div className="appointment-row" key={appt.id}>
                <div>
                  <p className="appointment-therapy">{appt.patientName}</p>
                  <p className="appointment-date">
                    Dr. {appt.doctorName} — {appt.date} at {appt.time}
                  </p>
                </div>
                <span className={`status-badge ${statusClass[appt.status]}`}>
                  {appt.status}
                </span>
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
                  <span className={`status-badge ${b.paymentStatus === "PAID" ? "status-completed" : "status-scheduled"}`}>
                    {b.paymentStatus}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}