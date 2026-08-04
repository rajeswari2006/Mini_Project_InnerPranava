package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter @AllArgsConstructor
public class AppointmentDto {
    private Long id;
    private String patientName;
    private String doctorName;
    private String therapyName;
    private LocalDate date;
    private LocalTime time;
    private String status;
}