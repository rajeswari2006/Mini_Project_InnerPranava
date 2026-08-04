import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, Stethoscope, Calendar, LogOut, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";

const NAV_BY_ROLE = {
  ADMIN: [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Doctors", path: "/doctors", icon: Stethoscope },
    { label: "Appointments", path: "/appointments", icon: Calendar },
    { label: "Add Staff", path: "/add-staff", icon: UserPlus },
  ],
  DOCTOR: [
    { label: "Dashboard", path: "/doctor", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Appointments", path: "/appointments", icon: Calendar },
  ],
  THERAPIST: [
    { label: "Dashboard", path: "/therapist", icon: LayoutDashboard },
    { label: "Appointments", path: "/appointments", icon: Calendar },
  ],
  RECEPTIONIST: [
    { label: "Dashboard", path: "/reception", icon: LayoutDashboard },
    { label: "Patients", path: "/patients", icon: Users },
    { label: "Doctors", path: "/doctors", icon: Stethoscope },
    { label: "Appointments", path: "/appointments", icon: Calendar },
  ],
  PATIENT: [
    { label: "Dashboard", path: "/patient", icon: LayoutDashboard },
    { label: "Appointments", path: "/appointments", icon: Calendar },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = NAV_BY_ROLE[user?.role] || [];

  const handleLogout = () => {
  logout();
    window.location.href = "/";
  };
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">InnerPranava</div>

      <nav className="sidebar-nav">
        {navItems.map(({ label, path, icon: Icon }) => (
          <Link
            to={path}
            key={path}
            className={`sidebar-item ${location.pathname === path ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">{user?.email?.[0]?.toUpperCase()}</div>
          <div>
            <p className="sidebar-username">{user?.email}</p>
            <p className="sidebar-role">{user?.role}</p>
          </div>
        </div>
        <button className="sidebar-logout" onClick={handleLogout}>
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}