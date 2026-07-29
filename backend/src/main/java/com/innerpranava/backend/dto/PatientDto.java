package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class PatientDto {
    private Long id;
    private String name;
    private String email;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String allergies;
    private String currentMedications;
}