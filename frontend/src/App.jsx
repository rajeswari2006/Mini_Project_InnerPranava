import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import TherapistDashboard from "./pages/TherapistDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import PatientsList from "./pages/PatientsList";
import DoctorsList from "./pages/DoctorsList";
import AppointmentsList from "./pages/AppointmentsList";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import AddStaff from "./pages/AddStaff";
import LandingPage from "./pages/LandingPage";
import Invoice from "./pages/Invoice";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/patient" element={<ProtectedRoute allowedRoles={["PATIENT"]}><PatientDashboard /></ProtectedRoute>} />
      <Route path="/doctor" element={<ProtectedRoute allowedRoles={["DOCTOR"]}><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/therapist" element={<ProtectedRoute allowedRoles={["THERAPIST"]}><TherapistDashboard /></ProtectedRoute>} />
      <Route path="/reception" element={<ProtectedRoute allowedRoles={["RECEPTIONIST"]}><ReceptionDashboard /></ProtectedRoute>} />
      <Route path="/patients" element={<ProtectedRoute><PatientsList /></ProtectedRoute>} />
      <Route path="/doctors" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
      <Route path="/appointments" element={<ProtectedRoute><AppointmentsList /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/register" element={<Register />} />
      <Route path="/add-staff" element={<ProtectedRoute allowedRoles={["ADMIN"]}><AddStaff /></ProtectedRoute>} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/invoices" element={<ProtectedRoute allowedRoles={["PATIENT"]}><Invoice /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;