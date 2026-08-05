import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [recoveryScore, setRecoveryScore] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/patients/me").then((res) => setProfile(res.data));
    api.get("/appointments/me").then((res) => setAppointments(res.data));
    api.get("/notifications/me").then((res) => setNotifications(res.data));
    api.get("/patients/me/recovery-score").then((res) => setRecoveryScore(res.data));
    api.get("/patients/me/history").then((res) => setHistory(res.data));
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
          <p>Here's an overview of your care journey</p>
        </div>
        {recoveryScore && (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: 24 }}>
    <div style={{
      width: 80, height: 80, borderRadius: "50%",
      background: "conic-gradient(var(--forest) " + (recoveryScore.recoveryScore * 3.6) + "deg, var(--sage) 0deg)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
    }}>
      <div style={{
        width: 62, height: 62, borderRadius: "50%", background: "white",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 800, fontSize: 18, color: "var(--darktext)"
      }}>
        {recoveryScore.recoveryScore}
      </div>
    </div>
    <div>
      <h3 style={{ margin: "0 0 4px" }}>Recovery Score</h3>
      <p style={{ color: "var(--graytext)", fontSize: 13, margin: 0 }}>
        {recoveryScore.completedAppointments} of {recoveryScore.totalAppointments} sessions completed
        {recoveryScore.averageRating > 0 && ` — avg rating ${recoveryScore.averageRating}/5`}
      </p>
    </div>
  </div>
)}
        <div className="patient-grid">
          <div>
            <div className="card">
              <h3>Your Appointments</h3>
              {appointments.length === 0 ? (
                <p className="empty-state">No appointments scheduled yet.</p>
              ) : (
                appointments.map((appt) => (
                  <div className="appointment-row" key={appt.id}>
                    <div>
                      <p className="appointment-therapy">{appt.therapyName}</p>
                      <p className="appointment-date">
                        {appt.date} at {appt.time}
                      </p>
                    </div>
                    <span className={`status-badge ${statusClass[appt.status]}`}>
                      {appt.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            {profile && (
              <div className="card">
                <h3>Your Profile</h3>
                <p><strong>Age:</strong> {profile.age}</p>
                <p><strong>Gender:</strong> {profile.gender}</p>
                <p><strong>Blood Group:</strong> {profile.bloodGroup}</p>
                <p><strong>Allergies:</strong> {profile.allergies}</p>
                <p><strong>Current Medications:</strong> {profile.currentMedications}</p>
              </div>
            )}
            <div className="card">
  <h3>Treatment History</h3>
  {history.length === 0 ? (
    <p className="empty-state">No history yet.</p>
  ) : (
    history.map((h, i) => (
      <div className="timeline-item" key={i}>
        <div className="timeline-dot"></div>
        <div className="timeline-content">
          <h4>{h.title}</h4>
          <p>{h.description}</p>
          <p className="timeline-date">{h.date}</p>
        </div>
      </div>
    ))
  )}
</div>
          </div>

          <div className="card">
            <h3>Notifications</h3>
            {notifications.length === 0 ? (
              <p className="empty-state">No notifications yet.</p>
            ) : (
              notifications.map((n) => (
                <div className="notification-item" key={n.id}>
                  <span className="notification-type">{n.type}</span>
                  <span className="notification-message">{n.message}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}