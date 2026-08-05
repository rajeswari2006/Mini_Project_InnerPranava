import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./PatientDashboard.css";

export default function Invoice() {
  const [billings, setBillings] = useState([]);

  useEffect(() => {
    api.get("/billings/me").then((res) => setBillings(res.data));
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="patient-main">
        <div className="patient-header">
          <h1>Your Invoices</h1>
          <p>Billing history for your treatments</p>
        </div>

        {billings.length === 0 ? (
          <div className="card"><p className="empty-state">No invoices yet.</p></div>
        ) : (
          billings.map((b) => (
            <div className="card" key={b.id}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <div>
                  <h3 style={{ margin: 0 }}>Invoice #{b.id}</h3>
                  <p style={{ color: "var(--graytext)", fontSize: 13, margin: "4px 0 0" }}>{b.billDate}</p>
                </div>
                <span className={`status-badge ${b.paymentStatus === "PAID" ? "status-completed" : "status-scheduled"}`}>{b.paymentStatus}</span>
              </div>
              <p style={{ fontSize: 13.5, margin: "4px 0" }}><strong>Doctor:</strong> {b.doctorName}</p>
              <p style={{ fontSize: 13.5, margin: "4px 0" }}><strong>Therapy:</strong> {b.therapyName}</p>
              <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 12, fontSize: 13.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Consultation Fee</span><span>₹{b.consultationFee}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Therapy Fee</span><span>₹{b.therapyFee}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Medicine Charges</span><span>₹{b.medicineCharges}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Discount</span><span>-₹{b.discount}</span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, marginTop: 8, paddingTop: 8, borderTop: "1px dashed var(--border)" }}>
                  <span>Total</span><span>₹{b.amount}</span>
                </div>
              </div>
              <button
                onClick={() => window.print()}
                style={{ marginTop: 16, padding: "8px 16px", fontSize: 13, fontWeight: 600, border: "1px solid var(--forest)", color: "var(--forest)", background: "white", borderRadius: 8, cursor: "pointer" }}
              >
                Print Invoice
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}