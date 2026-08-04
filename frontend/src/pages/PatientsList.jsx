import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    api.get("/patients").then((res) => setPatients(res.data));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Patients</h1>
          <p>All registered patients</p>
        </div>
        <div className="card">
          {patients.map((p) => (
            <div className="appointment-row" key={p.id}>
              <div>
                <p className="appointment-therapy">{p.name}</p>
                <p className="appointment-date">
                  {p.age} yrs — {p.gender} — Blood Group {p.bloodGroup}
                </p>
              </div>
              <span className="status-badge status-scheduled">{p.email}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}