package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.PatientRegisterRequest;
import com.innerpranava.backend.entity.Patient;
import com.innerpranava.backend.entity.Role;
import com.innerpranava.backend.entity.User;
import com.innerpranava.backend.repository.PatientRepository;
import com.innerpranava.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reception")
public class ReceptionController {

    private final UserRepository userRepository;
    private final PatientRepository patientRepository;
    private final PasswordEncoder passwordEncoder;

    public ReceptionController(UserRepository userRepository, PatientRepository patientRepository,
                                PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.patientRepository = patientRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/patients")
    public ResponseEntity<?> registerWalkInPatient(@RequestBody PatientRegisterRequest request,
                                                     Authentication authentication) {
        User requester = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() != Role.RECEPTIONIST && requester.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Only reception or admin staff can register walk-in patients.");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("An account with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(Role.PATIENT);
        userRepository.save(user);

        Patient patient = new Patient();
        patient.setUser(user);
        patient.setAge(request.getAge());
        patient.setGender(request.getGender());
        patient.setBloodGroup(request.getBloodGroup());
        patient.setAllergies(request.getAllergies());
        patient.setCurrentMedications(request.getCurrentMedications());
        patientRepository.save(patient);

        return ResponseEntity.ok("Patient registered successfully.");
    }
}