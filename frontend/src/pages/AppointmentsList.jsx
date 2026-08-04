import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import "./PatientDashboard.css";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);
  const { user } = useAuth();

  const statusClass = {
    SCHEDULED: "status-scheduled",
    COMPLETED: "status-completed",
    CANCELLED: "status-cancelled",
  };

  useEffect(() => {
    const endpoint =
      user?.role === "PATIENT" ? "/appointments/me" :
      user?.role === "DOCTOR" ? "/appointments/doctor-me" :
      "/appointments";

    api.get(endpoint).then((res) => setAppointments(res.data));
  }, [user]);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Appointments</h1>
          <p>{user?.role === "PATIENT" ? "Your appointments" : "All scheduled appointments"}</p>
        </div>
        <div className="card">
          {appointments.map((a) => (
            <div className="appointment-row" key={a.id}>
              <div>
                <p className="appointment-therapy">{a.patientName}</p>
                <p className="appointment-date">
                  {a.doctorName} — {a.therapyName} — {a.date} at {a.time}
                </p>
              </div>
              <span className={`status-badge ${statusClass[a.status]}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}