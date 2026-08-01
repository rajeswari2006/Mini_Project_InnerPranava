package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.PatientDto;
import com.innerpranava.backend.entity.Patient;
import com.innerpranava.backend.repository.PatientRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientRepository patientRepository;
    
    public PatientController(PatientRepository patientRepository) {
        this.patientRepository = patientRepository;
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