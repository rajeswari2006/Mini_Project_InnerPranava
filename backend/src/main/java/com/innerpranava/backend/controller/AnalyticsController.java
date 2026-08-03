package com.innerpranava.backend.controller;

import com.innerpranava.backend.repository.*;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepository;
    private final BillingRepository billingRepository;
    private final FeedbackRepository feedbackRepository;

    public AnalyticsController(PatientRepository patientRepository, DoctorRepository doctorRepository,
                                AppointmentRepository appointmentRepository, BillingRepository billingRepository,
                                FeedbackRepository feedbackRepository) {
        this.patientRepository = patientRepository;
        this.doctorRepository = doctorRepository;
        this.appointmentRepository = appointmentRepository;
        this.billingRepository = billingRepository;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping("/summary")
    public Map<String, Object> getSummary() {
        Map<String, Object> summary = new HashMap<>();
        summary.put("totalPatients", patientRepository.count());
        summary.put("totalDoctors", doctorRepository.count());
        summary.put("totalAppointments", appointmentRepository.count());

        BigDecimal revenue = billingRepository.getTotalRevenue();
        summary.put("totalRevenue", revenue != null ? revenue : BigDecimal.ZERO);

        Double avgRating = feedbackRepository.getAverageRating();
        summary.put("averageSatisfaction", avgRating != null ? avgRating : 0.0);

        return summary;
    }

    @GetMapping("/top-therapies")
    public Map<String, Long> getTopTherapies() {
        Map<String, Long> result = new HashMap<>();
        for (Object[] row : appointmentRepository.countAppointmentsByTherapy()) {
            result.put((String) row[0], (Long) row[1]);
        }
        return result;
    }

    @GetMapping("/appointments-by-month")
    public Map<Integer, Long> getAppointmentsByMonth() {
        Map<Integer, Long> result = new HashMap<>();
        for (Object[] row : appointmentRepository.countAppointmentsByMonth()) {
            result.put((Integer) row[0], (Long) row[1]);
        }
        return result;
    }
}