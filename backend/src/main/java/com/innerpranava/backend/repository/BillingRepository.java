package com.innerpranava.backend.repository;

import com.innerpranava.backend.entity.Billing;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillingRepository extends JpaRepository<Billing, Long> {
    @Query("SELECT SUM(b.amount) FROM Billing b WHERE b.paymentStatus = com.innerpranava.backend.entity.PaymentStatus.PAID")
BigDecimal getTotalRevenue();
List<Billing> findByAppointmentPatientId(Long patientId);
}
