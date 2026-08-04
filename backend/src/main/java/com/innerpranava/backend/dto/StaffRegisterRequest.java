package com.innerpranava.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class StaffRegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private String role; // "DOCTOR", "THERAPIST", or "RECEPTIONIST"
    private String specialization;   // doctor only
    private String availability;     // doctor only
    private String assignedTherapies; // therapist only
}