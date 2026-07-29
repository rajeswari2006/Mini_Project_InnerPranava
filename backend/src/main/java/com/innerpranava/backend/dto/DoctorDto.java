package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class DoctorDto {
    private Long id;
    private String name;
    private String email;
    private String specialization;
    private String availability;
}