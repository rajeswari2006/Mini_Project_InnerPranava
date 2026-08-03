package com.innerpranava.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class FeedbackRequest {
    private Long appointmentId;
    private Integer rating;
    private String comments;
}