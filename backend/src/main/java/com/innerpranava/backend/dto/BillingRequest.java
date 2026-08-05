package com.innerpranava.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter @Setter
public class BillingRequest {
    private Long appointmentId;
    private BigDecimal consultationFee;
    private BigDecimal therapyFee;
    private BigDecimal medicineCharges;
    private BigDecimal discount;
}