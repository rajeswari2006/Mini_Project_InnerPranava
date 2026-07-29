package com.innerpranava.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
public class AppointmentRequest {
    private Long patientId;
    private Long doctorId;
    private Long therapyId;
    private LocalDate date;
    private LocalTime time;
}