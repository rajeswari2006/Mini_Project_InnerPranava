package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.StaffRegisterRequest;
import com.innerpranava.backend.entity.*;
import com.innerpranava.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final DoctorRepository doctorRepository;
    private final TherapistRepository therapistRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminController(UserRepository userRepository, DoctorRepository doctorRepository,
                            TherapistRepository therapistRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.doctorRepository = doctorRepository;
        this.therapistRepository = therapistRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/staff")
    public ResponseEntity<?> createStaff(@RequestBody StaffRegisterRequest request, Authentication authentication) {
        User requester = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Only admins can create staff accounts.");
        }

        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.status(409).body("An account with this email already exists.");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());
        user.setRole(Role.valueOf(request.getRole()));
        userRepository.save(user);

        if ("DOCTOR".equals(request.getRole())) {
            Doctor doctor = new Doctor();
            doctor.setUser(user);
            doctor.setSpecialization(request.getSpecialization());
            doctor.setAvailability(request.getAvailability());
            doctorRepository.save(doctor);
        } else if ("THERAPIST".equals(request.getRole())) {
            Therapist therapist = new Therapist();
            therapist.setUser(user);
            therapist.setAssignedTherapies(request.getAssignedTherapies());
            therapistRepository.save(therapist);
        }
        // RECEPTIONIST needs no extra profile table — User alone is enough

        return ResponseEntity.ok("Staff account created successfully.");
    }
}
