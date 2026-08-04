package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.PatientDto;
import com.innerpranava.backend.entity.Appointment;
import com.innerpranava.backend.entity.AppointmentStatus;
import com.innerpranava.backend.entity.Feedback;
import com.innerpranava.backend.entity.Patient;
import com.innerpranava.backend.repository.AppointmentRepository;
import com.innerpranava.backend.repository.FeedbackRepository;
import com.innerpranava.backend.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final FeedbackRepository feedbackRepository;

    public PatientController(PatientRepository patientRepository, AppointmentRepository appointmentRepository,
                              FeedbackRepository feedbackRepository) {
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping
    public List<PatientDto> getAllPatients() {
        return patientRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDto> getPatientById(@PathVariable Long id) {
        return patientRepository.findById(id)
                .map(patient -> ResponseEntity.ok(toDto(patient)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me")
    public ResponseEntity<PatientDto> getMyProfile(Authentication authentication) {
        return patientRepository.findByUserEmail(authentication.getName())
                .map(patient -> ResponseEntity.ok(toDto(patient)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/me/recovery-score")
    public ResponseEntity<?> getMyRecoveryScore(Authentication authentication) {
        Patient patient = patientRepository.findByUserEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        List<Appointment> appointments = appointmentRepository.findByPatientId(patient.getId());
        List<Feedback> feedbacks = feedbackRepository.findByPatientId(patient.getId());

        long total = appointments.size();
        long completed = appointments.stream().filter(a -> a.getStatus() == AppointmentStatus.COMPLETED).count();
        double adherenceRatio = total == 0 ? 0 : (double) completed / total;

        double avgRating = feedbacks.stream().mapToInt(Feedback::getRating).average().orElse(0);
        double satisfactionRatio = avgRating / 5.0;

        int score = (int) Math.round((adherenceRatio * 60) + (satisfactionRatio * 40));

        Map<String, Object> result = new HashMap<>();
        result.put("recoveryScore", score);
        result.put("totalAppointments", total);
        result.put("completedAppointments", completed);
        result.put("averageRating", Math.round(avgRating * 10.0) / 10.0);

        return ResponseEntity.ok(result);
    }

    private PatientDto toDto(Patient patient) {
        return new PatientDto(
                patient.getId(),
                patient.getUser().getName(),
                patient.getUser().getEmail(),
                patient.getAge(),
                patient.getGender(),
                patient.getBloodGroup(),
                patient.getAllergies(),
                patient.getCurrentMedications()
        );
    }
}