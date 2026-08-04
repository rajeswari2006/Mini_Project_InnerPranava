import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Doctors</h1>
          <p>All doctors on staff</p>
        </div>
        <div className="card">
          {doctors.map((d) => (
            <div className="appointment-row" key={d.id}>
              <div>
                <p className="appointment-therapy">{d.name}</p>
                <p className="appointment-date">{d.specialization} — {d.availability}</p>
              </div>
              <span className="status-badge status-scheduled">{d.email}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}