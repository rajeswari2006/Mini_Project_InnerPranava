package com.innerpranava.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PatientRegisterRequest {
    private String name;
    private String email;
    private String password;
    private String phone;
    private Integer age;
    private String gender;
    private String bloodGroup;
    private String allergies;
    private String currentMedications;
}