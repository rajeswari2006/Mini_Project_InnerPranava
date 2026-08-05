import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function DoctorDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    api.get("/appointments/doctor-me").then((res) => setAppointments(res.data));
  };

  useEffect(() => {
    api.get("/doctors/me").then((res) => setProfile(res.data));
    fetchAppointments();
  }, []);

  const markCompleted = async (id) => {
    await api.put(`/appointments/${id}/complete`);
    fetchAppointments();
  };

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
          <h1>{profile ? `Welcome, ${profile.name}` : "Welcome"}</h1>
          <p>{profile?.specialization} — Your patient schedule</p>
        </div>

        <div className="card">
          <h3>Your Appointments</h3>
          {appointments.length === 0 ? (
            <p className="empty-state">No appointments scheduled yet.</p>
          ) : (
            appointments.map((appt) => (
              <div className="appointment-row" key={appt.id} style={{ flexDirection: "column", alignItems: "stretch" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <p className="appointment-therapy">{appt.patientName}</p>
                    <p className="appointment-date">
                      {appt.therapyName} — {appt.date} at {appt.time}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className={`status-badge ${statusClass[appt.status]}`}>{appt.status}</span>
                    {appt.status === "SCHEDULED" && (
                      <button
                        onClick={() => markCompleted(appt.id)}
                        style={{
                          padding: "6px 12px", fontSize: 12, fontWeight: 600,
                          border: "1px solid var(--forest)", color: "var(--forest)",
                          background: "white", borderRadius: 8, cursor: "pointer"
                        }}
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 12.5, color: "var(--graytext)", marginTop: 8, paddingTop: 8, borderTop: "1px dashed var(--border)" }}>
                  {appt.patientAge} yrs, {appt.patientGender}, Blood Group {appt.patientBloodGroup}
                  {appt.patientAllergies && ` — Allergies: ${appt.patientAllergies}`}
                  {appt.patientMedications && ` — Current: ${appt.patientMedications}`}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}