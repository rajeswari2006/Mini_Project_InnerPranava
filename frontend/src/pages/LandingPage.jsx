import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./LandingPage.css";

export default function LandingPage() {
  const [therapies, setTherapies] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get("/public/therapies").then((res) => setTherapies(res.data));
    api.get("/public/doctors").then((res) => setDoctors(res.data));
  }, []);

  return (
    <div>
      <nav className="landing-nav">
        <div className="landing-logo">InnerPranava</div>
        <div className="landing-nav-actions">
          <Link to="/login" className="nav-login">Staff / Patient Login</Link>
          <Link to="/register" className="nav-register">Book as New Patient</Link>
        </div>
      </nav>

      <section className="hero">
        <h1>Digitizing Panchakarma Healthcare with Intelligent Patient Management</h1>
        <p>
          A modern Ayurvedic hospital platform for patient care, therapy scheduling,
          and recovery tracking — built for real clinical use.
        </p>
        <div className="hero-actions">
          <Link to="/register" className="hero-cta-primary">Get Started</Link>
          <Link to="/login" className="hero-cta-secondary">Sign In</Link>
        </div>
      </section>

      <section className="landing-section">
        <h2>Our Therapies</h2>
        <p>Traditional Panchakarma treatments, delivered by certified specialists.</p>
        <div className="grid-3">
          {therapies.length === 0 ? (
            <p style={{ color: "var(--graytext)" }}>Loading therapies...</p>
          ) : (
            therapies.map((t) => (
              <div className="info-card" key={t.id}>
                <h3>{t.name}</h3>
                <p>{t.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="landing-section">
        <h2>Our Doctors</h2>
        <p>Experienced Ayurvedic physicians dedicated to your recovery.</p>
        <div className="grid-3">
          {doctors.length === 0 ? (
            <p style={{ color: "var(--graytext)" }}>Loading doctors...</p>
          ) : (
            doctors.map((d) => (
              <div className="info-card doctor-card" key={d.id}>
                <div className="doctor-avatar">{d.name?.[0]}</div>
                <div>
                  <h3 style={{ marginBottom: 2 }}>{d.name}</h3>
                  <p>{d.specialization} — {d.availability}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="landing-section">
        <h2>Hospital Hours</h2>
        <div className="grid-3">
          <div className="info-card">
            <h3>Mon – Sat</h3>
            <p>9:00 AM – 5:00 PM</p>
          </div>
          <div className="info-card">
            <h3>Sunday</h3>
            <p>Closed (Emergency line active)</p>
          </div>
          <div className="info-card">
            <h3>Contact</h3>
            <p>reception@innerpranava.com</p>
          </div>
        </div>
      </section>

      <footer className="landing-footer">
        <strong>InnerPranava</strong> — Panchakarma Hospital Management Platform
      </footer>
    </div>
  );
}