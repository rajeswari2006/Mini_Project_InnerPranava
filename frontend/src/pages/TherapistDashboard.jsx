import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function TherapistDashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    api.get("/therapists/me/sessions").then((res) => setSessions(res.data));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Therapy Sessions</h1>
          <p>Your assigned sessions and patient vitals</p>
        </div>

        <div className="card">
          <h3>Your Sessions</h3>
          {sessions.length === 0 ? (
            <p className="empty-state">No sessions recorded yet.</p>
          ) : (
            sessions.map((s) => (
              <div className="appointment-row" key={s.id}>
                <div>
                  <p className="appointment-therapy">{s.patientName}</p>
                  <p className="appointment-date">
                    {s.therapyName} — Vitals: {s.vitals}
                  </p>
                </div>
                <span className="status-badge status-completed">
                  {new Date(s.startTime).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}