import { LayoutDashboard, Users, Stethoscope, Calendar, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">InnerPranava</div>

      <nav className="sidebar-nav">
        <div className="sidebar-item active">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </div>
        <div className="sidebar-item">
          <Users size={18} />
          <span>Patients</span>
        </div>
        <div className="sidebar-item">
          <Stethoscope size={18} />
          <span>Doctors</span>
        </div>
        <div className="sidebar-item">
          <Calendar size={18} />
          <span>Appointments</span>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.email?.[0]?.toUpperCase()}</div>
          <div>
            <p className="sidebar-username">{user?.email}</p>
            <p className="sidebar-role">{user?.role}</p>
          </div>
        </div>
        <button className="sidebar-logout" onClick={logout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}