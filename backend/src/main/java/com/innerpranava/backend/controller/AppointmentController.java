package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.AppointmentDto;
import com.innerpranava.backend.dto.AppointmentRequest;
import com.innerpranava.backend.entity.*;
import com.innerpranava.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final TherapyRepository therapyRepository;

    public AppointmentController(AppointmentRepository appointmentRepository, PatientRepository patientRepository,
                                  DoctorRepository doctorRepository, TherapyRepository therapyRepository) {
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.therapyRepository = therapyRepository;
    }

    @GetMapping
    public List<AppointmentDto> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/doctor-me")
    public List<AppointmentDto> getMyDoctorAppointments(Authentication authentication) {
    Doctor doctor = doctorRepository.findByUserEmail(authentication.getName())
            .orElseThrow(() -> new RuntimeException("Doctor not found"));
    return appointmentRepository.findByDoctorId(doctor.getId()).stream().map(this::toDto).toList();
    }

    @GetMapping("/me")
    public List<AppointmentDto> getMyAppointments(Authentication authentication) {
        Patient patient = patientRepository.findByUserEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return appointmentRepository.findByPatientId(patient.getId()).stream().map(this::toDto).toList();
    }

    @PostMapping
    public ResponseEntity<?> createAppointment(@RequestBody AppointmentRequest request) {
        List<Appointment> existing = appointmentRepository.findByDoctorIdAndDate(request.getDoctorId(), request.getDate());
        boolean conflict = existing.stream()
                .anyMatch(a -> a.getTime().equals(request.getTime()) && a.getStatus() != AppointmentStatus.CANCELLED);

        if (conflict) {
            return ResponseEntity.status(409).body("This doctor already has an appointment at that date and time.");
        }

        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));
        Therapy therapy = therapyRepository.findById(request.getTherapyId())
                .orElseThrow(() -> new RuntimeException("Therapy not found"));

        Appointment appointment = new Appointment();
        appointment.setPatient(patient);
        appointment.setDoctor(doctor);
        appointment.setTherapy(therapy);
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setStatus(AppointmentStatus.SCHEDULED);

        Appointment saved = appointmentRepository.save(appointment);
        return ResponseEntity.ok(toDto(saved));
    }

    private AppointmentDto toDto(Appointment a) {
        return new AppointmentDto(
                a.getId(),
                a.getPatient().getUser().getName(),
                a.getDoctor().getUser().getName(),
                a.getTherapy().getName(),
                a.getDate(),
                a.getTime(),
                a.getStatus().name()
        );
    }
}