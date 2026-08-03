package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter @AllArgsConstructor
public class TherapyDto {
    private Long id;
    private String name;
    private String description;
    private Integer duration;
    private String benefits;
    private String preparation;
    private String afterCare;
}