# InnerPranava - Panchakarma Hospital Management Platform

A full-stack hospital management system for Ayurvedic Panchakarma clinics, built with
Spring Boot (Java) and React. Supports role-based access for Admin, Doctor, Therapist,
Receptionist, and Patient, with real JWT authentication, appointment conflict detection,
live analytics, and a computed Patient Recovery Score.

## Tech Stack

**Backend:** Java 17, Spring Boot 3, Spring Data JPA (Hibernate), Spring Security + JWT, MySQL 8, Maven
**Frontend:** React 18 (Vite), React Router, Axios, Recharts, plain CSS

## Prerequisites

- Java 17 (JDK, not just JRE)
- Maven (or use the included wrapper if present)
- Node.js 18+ and npm
- MySQL 8 Server running locally

## Backend Setup

1. Create the database:
   ```sql
   CREATE DATABASE innerpranava;
   ```

2. Configure `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/innerpranava
   spring.datasource.username=root
   spring.datasource.password=YOUR_MYSQL_PASSWORD

   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true

   server.port=8080
   ```

3. Run it:
   ```powershell
   cd backend
   mvn spring-boot:run
   ```

   On first run, Hibernate creates all tables automatically, and a data seeder populates
   sample users, patients, doctors, a therapist, a therapy, and appointments.

## Frontend Setup

```powershell
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173/` - this is the public landing page. Staff and existing
patients sign in via `/login`; new patients can self-register via `/register`.

## Seeded Accounts (for testing)

| Role | Email | Password |
|---|---|---|
| Admin | admin@innerpranava.com | admin123 |
| Doctor | nikhil@example.com | doctor123 |
| Therapist | sanjana@example.com | therapist123 |
| Receptionist | reception@innerpranava.com | reception123 |
| Patient | arjun@example.com | patient123 |

New patient accounts can be created via the "Book as New Patient" flow on the landing
page. New staff accounts (Doctor/Therapist/Receptionist) can only be created by an
Admin, via the "Add Staff" page — this mirrors real hospital security practice, where
staff credentials are provisioned internally rather than self-registered.

## Key Features

- **Role-based dashboards**: each of the 5 roles sees a distinct sidebar and dashboard,
  scoped to their own data (e.g. a patient only ever sees their own appointments).
- **Appointment conflict detection**: prevents double-booking a doctor at the same
  date and time, enforced server-side (not just in the UI).
- **Available slot picker**: Reception sees a doctor's real open/booked time slots
  for a given date before booking, computed from existing appointments.
- **Live analytics**: Admin dashboard charts are computed from real database
  aggregation queries, not static numbers.
- **Recovery Score**: a computed metric (not stored) combining a patient's appointment
  adherence and average feedback rating into a single 0–100 score.
- **Billing & Invoicing**: Reception generates itemized bills (consultation, therapy,
  medicine charges, discount) against completed appointments; patients view and
  print their own invoices.
- **Treatment History timeline**: a chronological view per patient combining
  appointments, billing events, and feedback into a single history — built from
  existing data via aggregation, not a separate audit log.
- **Patient self-registration vs. admin/reception-provisioned accounts**: patients
  can register themselves publicly; staff accounts (Doctor/Therapist/Receptionist)
  can only be created by an Admin, and walk-in patients can be registered directly
  by Reception — mirroring real hospital account provisioning.
- **Public landing page**: therapies and doctors are pulled from the same live
  database via unauthenticated public endpoints.

## Project Structure

```
InnerPranava/
├── backend/    Spring Boot REST API
│   └── src/main/java/com/innerpranava/backend/
│       ├── entity/       JPA entities
│       ├── repository/   Spring Data repositories
│       ├── service/      (business logic, where applicable)
│       ├── controller/   REST controllers
│       ├── dto/          Request/response DTOs
│       └── config/       Security, JWT, and seed data config
├── frontend/   React application
│   └── src/
│       ├── components/   Shared UI (Sidebar, ProtectedRoute)
│       ├── pages/        Route-level pages per role
│       ├── services/     Axios API client
│       └── context/      Auth context (JWT + user state)
```

## Known Limitations / Future Improvements

- Passwords are stored with BCrypt hashing, but the JWT secret key is currently
  hardcoded rather than sourced from an environment variable - a production
  deployment would externalize this.
- `/patients`, `/doctors`, and `/appointments` list views are viewable by any
  authenticated role; finer-grained permissions would restrict these further.
- No PDF export library used for invoices  "Print Invoice" uses the browser's
  native print dialog (`window.print()`), which is sufficient for this scope but
  a production version might generate a formatted PDF server-side instead.
- No email/SMS notification delivery yet  the Notification entity exists but only
  surfaces in-app.
- Billing is currently entered manually by Reception rather than auto-calculated
  from a fixed therapy/consultation fee table  a natural next step would be
  storing standard fees on the Therapy/Doctor entities and pre-filling the bill form.
