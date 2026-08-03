package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter @Setter @AllArgsConstructor
public class TherapySessionDto {
    private Long id;
    private String patientName;
    private String therapyName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String vitals;
    private String notes;
}