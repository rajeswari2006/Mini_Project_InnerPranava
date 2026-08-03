package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.FeedbackRequest;
import com.innerpranava.backend.entity.Appointment;
import com.innerpranava.backend.entity.Feedback;
import com.innerpranava.backend.entity.Patient;
import com.innerpranava.backend.repository.AppointmentRepository;
import com.innerpranava.backend.repository.FeedbackRepository;
import com.innerpranava.backend.repository.PatientRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;
    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;

    public FeedbackController(FeedbackRepository feedbackRepository, PatientRepository patientRepository,
                               AppointmentRepository appointmentRepository) {
        this.feedbackRepository = feedbackRepository;
        this.patientRepository = patientRepository;
        this.appointmentRepository = appointmentRepository;
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @PostMapping
    public Feedback submitFeedback(@RequestBody FeedbackRequest request, Authentication authentication) {
        Patient patient = patientRepository.findByUserEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        Feedback feedback = new Feedback();
        feedback.setPatient(patient);
        feedback.setAppointment(appointment);
        feedback.setRating(request.getRating());
        feedback.setComments(request.getComments());

        return feedbackRepository.save(feedback);
    }
}