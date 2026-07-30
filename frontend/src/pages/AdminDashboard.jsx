import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import "./AdminDashboard.css";

const COLORS = ["#2E7D32", "#FFB300", "#66BB6A", "#FFD54F", "#81C784"];

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [topTherapies, setTopTherapies] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    api.get("/analytics/summary").then((res) => setSummary(res.data));

    api.get("/analytics/top-therapies").then((res) => {
      const formatted = Object.entries(res.data).map(([name, value]) => ({ name, value }));
      setTopTherapies(formatted);
    });

    api.get("/analytics/appointments-by-month").then((res) => {
      const formatted = Object.entries(res.data).map(([month, count]) => ({
        month: `Month ${month}`,
        count,
      }));
      setMonthlyData(formatted);
    });
  }, []);

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <div className="dashboard-header">
          <h1>Admin Dashboard</h1>
          <p>Overview of hospital operations and performance</p>
        </div>

        {summary && (
          <div className="stat-grid">
            <StatCard label="Total Patients" value={summary.totalPatients} />
            <StatCard label="Total Doctors" value={summary.totalDoctors} />
            <StatCard label="Appointments" value={summary.totalAppointments} />
            <StatCard label="Revenue" value={`₹${summary.totalRevenue}`} />
            <StatCard label="Satisfaction" value={`${summary.averageSatisfaction} / 5`} />
          </div>
        )}

        <div className="chart-grid">
          <div className="chart-card">
            <h3>Appointments by Therapy</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={topTherapies} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                  {topTherapies.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-card">
            <h3>Appointments by Month</h3>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Bar dataKey="count" fill="#2E7D32" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
    </div>
  );
}