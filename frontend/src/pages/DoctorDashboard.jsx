import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function DoctorDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/doctors/me").then((res) => setProfile(res.data));
    api.get("/appointments/doctor-me").then((res) => setAppointments(res.data));
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
          <h1>{profile ? `Welcome, ${profile.name}` : "Welcome"}</h1>
          <p>{profile?.specialization} — Your patient schedule</p>
        </div>

        <div className="card">
          <h3>Your Appointments</h3>
          {appointments.length === 0 ? (
            <p className="empty-state">No appointments scheduled yet.</p>
          ) : (
            appointments.map((appt) => (
              <div className="appointment-row" key={appt.id}>
                <div>
                  <p className="appointment-therapy">{appt.patientName}</p>
                  <p className="appointment-date">
                    {appt.therapyName} — {appt.date} at {appt.time}
                  </p>
                </div>
                <span className={`status-badge ${statusClass[appt.status]}`}>
                  {appt.status}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}