import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function PatientDashboard() {
  const [profile, setProfile] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    api.get("/patients/me").then((res) => setProfile(res.data));
    api.get("/appointments/me").then((res) => setAppointments(res.data));
    api.get("/notifications/me").then((res) => setNotifications(res.data));
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