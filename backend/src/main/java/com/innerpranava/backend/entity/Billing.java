package com.innerpranava.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "billings")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Billing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_id", referencedColumnName = "id")
    private Appointment appointment;

    private BigDecimal consultationFee;
    private BigDecimal therapyFee;
    private BigDecimal medicineCharges;
    private BigDecimal discount;
    private BigDecimal amount; // total after discount

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private LocalDate billDate;
}