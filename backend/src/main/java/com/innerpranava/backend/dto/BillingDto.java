package com.innerpranava.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter @Setter @AllArgsConstructor
public class BillingDto {
    private Long id;
    private String patientName;
    private String doctorName;
    private String therapyName;
    private BigDecimal consultationFee;
    private BigDecimal therapyFee;
    private BigDecimal medicineCharges;
    private BigDecimal discount;
    private BigDecimal amount;
    private String paymentStatus;
    private LocalDate billDate;
}