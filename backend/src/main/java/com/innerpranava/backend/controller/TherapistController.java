package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.TherapySessionDto;
import com.innerpranava.backend.entity.Therapist;
import com.innerpranava.backend.entity.TherapySession;
import com.innerpranava.backend.repository.TherapistRepository;
import com.innerpranava.backend.repository.TherapySessionRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/therapists")
public class TherapistController {

    private final TherapistRepository therapistRepository;
    private final TherapySessionRepository therapySessionRepository;

    public TherapistController(TherapistRepository therapistRepository, TherapySessionRepository therapySessionRepository) {
        this.therapistRepository = therapistRepository;
        this.therapySessionRepository = therapySessionRepository;
    }

    @GetMapping("/me/sessions")
    public List<TherapySessionDto> getMySessions(Authentication authentication) {
        Therapist therapist = therapistRepository.findByUserEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Therapist not found"));

        return therapySessionRepository.findByTherapistId(therapist.getId()).stream()
                .map(this::toDto)
                .toList();
    }

    private TherapySessionDto toDto(TherapySession s) {
        return new TherapySessionDto(
                s.getId(),
                s.getAppointment().getPatient().getUser().getName(),
                s.getAppointment().getTherapy().getName(),
                s.getStartTime(),
                s.getEndTime(),
                s.getVitals(),
                s.getNotes()
        );
    }
}