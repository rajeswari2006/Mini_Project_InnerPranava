package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.TherapyDto;
import com.innerpranava.backend.entity.Therapy;
import com.innerpranava.backend.repository.TherapyRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/therapies")
public class TherapyController {

    private final TherapyRepository therapyRepository;

    public TherapyController(TherapyRepository therapyRepository) {
        this.therapyRepository = therapyRepository;
    }

    @GetMapping
    public List<TherapyDto> getAllTherapies() {
        return therapyRepository.findAll().stream().map(this::toDto).toList();
    }

    @PostMapping
    public Therapy createTherapy(@RequestBody Therapy therapy) {
        return therapyRepository.save(therapy);
    }

    private TherapyDto toDto(Therapy t) {
        return new TherapyDto(t.getId(), t.getName(), t.getDescription(), t.getDuration(),
                t.getBenefits(), t.getPreparation(), t.getAfterCare());
    }
}