package com.innerpranava.backend.config;

import com.innerpranava.backend.entity.*;
import com.innerpranava.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TherapistRepository therapistRepository;
    private final AppointmentRepository appointmentRepository;
    private final TherapyRepository therapyRepository;
    private final TherapySessionRepository therapySessionRepository;
    private final BillingRepository billingRepository;
    private final FeedbackRepository feedbackRepository;
    private final NotificationRepository notificationRepository;

    public DataSeeder(UserRepository userRepository, PatientRepository patientRepository, DoctorRepository doctorRepository,
                       TherapistRepository therapistRepository, AppointmentRepository appointmentRepository,
                       TherapyRepository therapyRepository, TherapySessionRepository therapySessionRepository,
                       BillingRepository billingRepository, FeedbackRepository feedbackRepository,
                       NotificationRepository notificationRepository) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.therapistRepository = therapistRepository;
        this.appointmentRepository = appointmentRepository;
        this.therapyRepository = therapyRepository;
        this.therapySessionRepository = therapySessionRepository;
        this.billingRepository = billingRepository;
        this.feedbackRepository = feedbackRepository;
        this.notificationRepository = notificationRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        // --- Users ---
        User admin = new User();
        admin.setName("Dr. Anjali Rao");
        admin.setEmail("admin@innerpranava.com");
        admin.setPassword("admin123");
        admin.setPhone("9876543210");
        admin.setRole(Role.ADMIN);
        admin = userRepository.save(admin);

        User receptionUser = new User();
        receptionUser.setName("Meera Sharma");
        receptionUser.setEmail("reception@innerpranava.com");
        receptionUser.setPassword("reception123");
        receptionUser.setPhone("9876543211");
        receptionUser.setRole(Role.RECEPTIONIST);
        receptionUser = userRepository.save(receptionUser);

        User patientUser = new User();
        patientUser.setName("Arjun Verma");
        patientUser.setEmail("arjun@example.com");
        patientUser.setPassword("patient123");
        patientUser.setPhone("9876543212");
        patientUser.setRole(Role.PATIENT);
        patientUser = userRepository.save(patientUser);

        User doctorUser = new User();
        doctorUser.setName("Dr. Nikhil Bhatia");
        doctorUser.setEmail("nikhil@example.com");
        doctorUser.setPassword("doctor123");
        doctorUser.setPhone("9876543213");
        doctorUser.setRole(Role.DOCTOR);
        doctorUser = userRepository.save(doctorUser);

        User therapistUser = new User();
        therapistUser.setName("Sanjana Kulkarni");
        therapistUser.setEmail("sanjana@example.com");
        therapistUser.setPassword("therapist123");
        therapistUser.setPhone("9876543214");
        therapistUser.setRole(Role.THERAPIST);
        therapistUser = userRepository.save(therapistUser);

        // --- Role profiles ---
        Patient patient = new Patient();
        patient.setUser(patientUser);
        patient.setAge(37);
        patient.setGender("Male");
        patient.setBloodGroup("O+");
        patient.setAllergies("None known");
        patient.setCurrentMedications("Chronic back pain and stress management");
        patient = patientRepository.save(patient);

        Doctor doctor = new Doctor();
        doctor.setUser(doctorUser);
        doctor.setSpecialization("Panchakarma");
        doctor.setAvailability("Mon-Sat, 9 AM - 5 PM");
        doctor = doctorRepository.save(doctor);

        Therapist therapist = new Therapist();
        therapist.setUser(therapistUser);
        therapist.setAssignedTherapies("Abhyanga, Swedana");
        therapist = therapistRepository.save(therapist);

        // --- Therapy catalog entry ---
        Therapy therapy = new Therapy();
        therapy.setName("Abhyanga + Swedana");
        therapy.setDescription("Deep tissue relaxation and detoxification therapy combining oil massage and herbal steam.");
        therapy.setDuration(60);
        therapy.setBenefits("Improves circulation, relieves stress, detoxifies the body.");
        therapy.setPreparation("Avoid heavy meals 2 hours before the session.");
        therapy.setAfterCare("Rest for 30 minutes, drink warm water, avoid cold exposure.");
        therapy = therapyRepository.save(therapy);

        // --- Appointment ---
        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setTherapy(therapy);
        appointment.setDate(LocalDate.now().plusDays(2));
        appointment.setTime(LocalTime.of(10, 0));
        appointment.setStatus(AppointmentStatus.SCHEDULED);
        appointment = appointmentRepository.save(appointment);

        // --- Therapy session ---
        TherapySession session = new TherapySession();
        session.setAppointment(appointment);
        session.setTherapist(therapist);
        session.setStartTime(LocalDateTime.now());
        session.setEndTime(LocalDateTime.now().plusMinutes(60));
        session.setVitals("BP 120/80, Pulse 72");
        session.setNotes("Initial assessment completed.");
        therapySessionRepository.save(session);

        // --- Billing ---
        Billing billing = new Billing();
        billing.setAppointment(appointment);
        billing.setAmount(new BigDecimal("4500.00"));
        billing.setPaymentStatus(PaymentStatus.PAID);
        billingRepository.save(billing);

        // --- Feedback ---
        Feedback feedback = new Feedback();
        feedback.setPatient(patient);
        feedback.setAppointment(appointment);
        feedback.setRating(5);
        feedback.setComments("Excellent care and very soothing therapy experience.");
        feedbackRepository.save(feedback);

        // --- Notifications ---
        Notification n1 = new Notification();
        n1.setUser(patientUser);
        n1.setType("Appointment Confirmed");
        n1.setMessage("Your Panchakarma appointment is confirmed for " + appointment.getDate() + ".");
        n1.setReadStatus(false);
        notificationRepository.save(n1);

        Notification n2 = new Notification();
        n2.setUser(patientUser);
        n2.setType("Therapy Reminder");
        n2.setMessage("Please arrive 15 minutes early for your scheduled Swedana therapy.");
        n2.setReadStatus(false);
        notificationRepository.save(n2);

        Notification n3 = new Notification();
        n3.setUser(admin);
        n3.setType("Welcome");
        n3.setMessage("Welcome to InnerPranava Hospital management portal.");
        n3.setReadStatus(true);
        notificationRepository.save(n3);
    }
}