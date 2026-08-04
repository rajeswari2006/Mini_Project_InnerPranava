package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.DoctorDto;
import com.innerpranava.backend.dto.TherapyDto;
import com.innerpranava.backend.repository.DoctorRepository;
import com.innerpranava.backend.repository.TherapyRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/public")
public class PublicController {

    private final TherapyRepository therapyRepository;
    private final DoctorRepository doctorRepository;

    public PublicController(TherapyRepository therapyRepository, DoctorRepository doctorRepository) {
        this.therapyRepository = therapyRepository;
        this.doctorRepository = doctorRepository;
    }

    @GetMapping("/therapies")
    public List<TherapyDto> getPublicTherapies() {
        return therapyRepository.findAll().stream()
                .map(t -> new TherapyDto(t.getId(), t.getName(), t.getDescription(), t.getDuration(),
                        t.getBenefits(), t.getPreparation(), t.getAfterCare()))
                .toList();
    }

    @GetMapping("/doctors")
    public List<DoctorDto> getPublicDoctors() {
        return doctorRepository.findAll().stream()
                .map(d -> new DoctorDto(d.getId(), d.getUser().getName(), null,
                        d.getSpecialization(), d.getAvailability()))
                .toList();
    }
}