package com.innerpranava.backend.config;

import com.innerpranava.backend.entity.*;
import com.innerpranava.backend.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.security.crypto.password.PasswordEncoder;

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
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, PatientRepository patientRepository, DoctorRepository doctorRepository,
                       TherapistRepository therapistRepository, AppointmentRepository appointmentRepository,
                       TherapyRepository therapyRepository, TherapySessionRepository therapySessionRepository,
                       BillingRepository billingRepository, FeedbackRepository feedbackRepository,
                       NotificationRepository notificationRepository, PasswordEncoder passwordEncoder) {
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
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return;

        // --- Core users ---
        User admin = new User();
        admin.setName("Dr. Anjali Rao");
        admin.setEmail("admin@innerpranava.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setPhone("9876543210");
        admin.setRole(Role.ADMIN);
        admin = userRepository.save(admin);

        User receptionUser = new User();
        receptionUser.setName("Meera Sharma");
        receptionUser.setEmail("reception@innerpranava.com");
        receptionUser.setPassword(passwordEncoder.encode("reception123"));
        receptionUser.setPhone("9876543211");
        receptionUser.setRole(Role.RECEPTIONIST);
        receptionUser = userRepository.save(receptionUser);

        User patientUser = new User();
        patientUser.setName("Arjun Verma");
        patientUser.setEmail("arjun@example.com");
        patientUser.setPassword(passwordEncoder.encode("patient123"));
        patientUser.setPhone("9876543212");
        patientUser.setRole(Role.PATIENT);
        patientUser = userRepository.save(patientUser);

        // --- Doctors (main seeded doctor + 3 more) ---
        User doctorUser = new User();
        doctorUser.setName("Dr. Nikhil Bhatia");
        doctorUser.setEmail("nikhil@example.com");
        doctorUser.setPassword(passwordEncoder.encode("doctor123"));
        doctorUser.setPhone("9876543213");
        doctorUser.setRole(Role.DOCTOR);
        doctorUser = userRepository.save(doctorUser);

        User doctorUser2 = new User();
        doctorUser2.setName("Dr. Priya Menon");
        doctorUser2.setEmail("priya.menon@innerpranava.com");
        doctorUser2.setPassword(passwordEncoder.encode("doctor123"));
        doctorUser2.setPhone("9876543220");
        doctorUser2.setRole(Role.DOCTOR);
        doctorUser2 = userRepository.save(doctorUser2);

        User doctorUser3 = new User();
        doctorUser3.setName("Dr. Rajesh Iyer");
        doctorUser3.setEmail("rajesh.iyer@innerpranava.com");
        doctorUser3.setPassword(passwordEncoder.encode("doctor123"));
        doctorUser3.setPhone("9876543221");
        doctorUser3.setRole(Role.DOCTOR);
        doctorUser3 = userRepository.save(doctorUser3);

        User doctorUser4 = new User();
        doctorUser4.setName("Dr. Kavitha Reddy");
        doctorUser4.setEmail("kavitha.reddy@innerpranava.com");
        doctorUser4.setPassword(passwordEncoder.encode("doctor123"));
        doctorUser4.setPhone("9876543222");
        doctorUser4.setRole(Role.DOCTOR);
        doctorUser4 = userRepository.save(doctorUser4);

        // --- Therapists (main seeded therapist + 2 more) ---
        User therapistUser = new User();
        therapistUser.setName("Sanjana Kulkarni");
        therapistUser.setEmail("sanjana@example.com");
        therapistUser.setPassword(passwordEncoder.encode("therapist123"));
        therapistUser.setPhone("9876543214");
        therapistUser.setRole(Role.THERAPIST);
        therapistUser = userRepository.save(therapistUser);

        User therapistUser2 = new User();
        therapistUser2.setName("Ravi Shankar");
        therapistUser2.setEmail("ravi.shankar@innerpranava.com");
        therapistUser2.setPassword(passwordEncoder.encode("therapist123"));
        therapistUser2.setPhone("9876543223");
        therapistUser2.setRole(Role.THERAPIST);
        therapistUser2 = userRepository.save(therapistUser2);

        User therapistUser3 = new User();
        therapistUser3.setName("Lakshmi Pillai");
        therapistUser3.setEmail("lakshmi.pillai@innerpranava.com");
        therapistUser3.setPassword(passwordEncoder.encode("therapist123"));
        therapistUser3.setPhone("9876543224");
        therapistUser3.setRole(Role.THERAPIST);
        therapistUser3 = userRepository.save(therapistUser3);

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

        Doctor doctor2 = new Doctor();
        doctor2.setUser(doctorUser2);
        doctor2.setSpecialization("Ayurvedic Internal Medicine");
        doctor2.setAvailability("Mon-Fri, 10 AM - 6 PM");
        doctorRepository.save(doctor2);

        Doctor doctor3 = new Doctor();
        doctor3.setUser(doctorUser3);
        doctor3.setSpecialization("Panchakarma & Detoxification");
        doctor3.setAvailability("Tue-Sun, 9 AM - 4 PM");
        doctorRepository.save(doctor3);

        Doctor doctor4 = new Doctor();
        doctor4.setUser(doctorUser4);
        doctor4.setSpecialization("Women's Ayurvedic Health");
        doctor4.setAvailability("Mon-Sat, 11 AM - 7 PM");
        doctorRepository.save(doctor4);

        Therapist therapist = new Therapist();
        therapist.setUser(therapistUser);
        therapist.setAssignedTherapies("Abhyanga, Swedana");
        therapist = therapistRepository.save(therapist);

        Therapist therapist2 = new Therapist();
        therapist2.setUser(therapistUser2);
        therapist2.setAssignedTherapies("Shirodhara, Nasya");
        therapistRepository.save(therapist2);

        Therapist therapist3 = new Therapist();
        therapist3.setUser(therapistUser3);
        therapist3.setAssignedTherapies("Basti, Virechana");
        therapistRepository.save(therapist3);

        // --- Therapy catalog (6 classic Panchakarma therapies) ---
        Therapy therapy = new Therapy();
        therapy.setName("Abhyanga + Swedana");
        therapy.setDescription("Deep tissue relaxation and detoxification therapy combining oil massage and herbal steam.");
        therapy.setDuration(60);
        therapy.setBenefits("Improves circulation, relieves stress, detoxifies the body.");
        therapy.setPreparation("Avoid heavy meals 2 hours before the session.");
        therapy.setAfterCare("Rest for 30 minutes, drink warm water, avoid cold exposure.");
        therapy = therapyRepository.save(therapy);

        Therapy shirodhara = new Therapy();
        shirodhara.setName("Shirodhara");
        shirodhara.setDescription("A continuous stream of warm medicated oil poured gently over the forehead to calm the nervous system.");
        shirodhara.setDuration(45);
        shirodhara.setBenefits("Reduces anxiety and insomnia, improves mental clarity, balances Vata dosha.");
        shirodhara.setPreparation("Avoid caffeine on the day of treatment.");
        shirodhara.setAfterCare("Avoid washing hair with cold water for a few hours; rest in a quiet space.");
        therapyRepository.save(shirodhara);

        Therapy nasya = new Therapy();
        nasya.setName("Nasya");
        nasya.setDescription("Administration of herbal oils through the nasal passage to cleanse the head and neck region.");
        nasya.setDuration(30);
        nasya.setBenefits("Relieves sinus congestion, headaches, and improves respiratory health.");
        nasya.setPreparation("Avoid heavy meals immediately before the session.");
        nasya.setAfterCare("Avoid cold beverages and direct wind exposure for the rest of the day.");
        therapyRepository.save(nasya);

        Therapy basti = new Therapy();
        basti.setName("Basti");
        basti.setDescription("Herbal enema therapy considered one of the most important Panchakarma treatments for balancing Vata dosha.");
        basti.setDuration(50);
        basti.setBenefits("Supports digestive health, relieves joint pain, and detoxifies the colon.");
        basti.setPreparation("Light, easily digestible meals recommended the day before.");
        basti.setAfterCare("Rest and warm fluids recommended; avoid strenuous activity for the day.");
        therapyRepository.save(basti);

        Therapy vamana = new Therapy();
        vamana.setName("Vamana");
        vamana.setDescription("A supervised therapeutic emesis procedure used to eliminate excess Kapha dosha from the body.");
        vamana.setDuration(90);
        vamana.setBenefits("Effective for respiratory conditions, skin disorders, and metabolic balance.");
        vamana.setPreparation("Requires several days of preparatory internal oleation under medical supervision.");
        vamana.setAfterCare("Strict dietary regimen and rest for 24-48 hours following the procedure.");
        therapyRepository.save(vamana);

        Therapy virechana = new Therapy();
        virechana.setName("Virechana");
        virechana.setDescription("A controlled purgation therapy that cleanses the digestive tract and eliminates excess Pitta dosha.");
        virechana.setDuration(75);
        virechana.setBenefits("Improves liver function, skin health, and digestive balance.");
        virechana.setPreparation("Preceded by a short course of internal oleation therapy.");
        virechana.setAfterCare("Light diet for 3-5 days following the procedure; avoid heavy or oily foods.");
        therapyRepository.save(virechana);

        // --- Appointment (kept as original demo data) ---
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
        billing.setConsultationFee(new BigDecimal("500.00"));
        billing.setTherapyFee(new BigDecimal("4000.00"));
        billing.setMedicineCharges(new BigDecimal("0.00"));
        billing.setDiscount(new BigDecimal("0.00"));
        billing.setAmount(new BigDecimal("4500.00"));
        billing.setPaymentStatus(PaymentStatus.PAID);
        billing.setBillDate(LocalDate.now());
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