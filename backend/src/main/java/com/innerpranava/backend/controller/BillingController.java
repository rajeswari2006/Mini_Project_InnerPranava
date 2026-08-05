package com.innerpranava.backend.controller;

import com.innerpranava.backend.dto.BillingDto;
import com.innerpranava.backend.dto.BillingRequest;
import com.innerpranava.backend.entity.*;
import com.innerpranava.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/billings")
public class BillingController {

    private final BillingRepository billingRepository;
    private final AppointmentRepository appointmentRepository;
    private final PatientRepository patientRepository;
    private final UserRepository userRepository;

    public BillingController(BillingRepository billingRepository, AppointmentRepository appointmentRepository,
                              PatientRepository patientRepository, UserRepository userRepository) {
        this.billingRepository = billingRepository;
        this.appointmentRepository = appointmentRepository;
        this.patientRepository = patientRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<BillingDto> getAllBillings() {
        return billingRepository.findAll().stream().map(this::toDto).toList();
    }

    @GetMapping("/me")
    public List<BillingDto> getMyBillings(Authentication authentication) {
        Patient patient = patientRepository.findByUserEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("Patient not found"));
        return billingRepository.findByAppointmentPatientId(patient.getId()).stream().map(this::toDto).toList();
    }

    @PostMapping
    public ResponseEntity<?> generateBill(@RequestBody BillingRequest request, Authentication authentication) {
        User requester = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (requester.getRole() != Role.RECEPTIONIST && requester.getRole() != Role.ADMIN) {
            return ResponseEntity.status(403).body("Only reception or admin staff can generate bills.");
        }

        Appointment appointment = appointmentRepository.findById(request.getAppointmentId())
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        BigDecimal consultationFee = request.getConsultationFee() != null ? request.getConsultationFee() : BigDecimal.ZERO;
        BigDecimal therapyFee = request.getTherapyFee() != null ? request.getTherapyFee() : BigDecimal.ZERO;
        BigDecimal medicineCharges = request.getMedicineCharges() != null ? request.getMedicineCharges() : BigDecimal.ZERO;
        BigDecimal discount = request.getDiscount() != null ? request.getDiscount() : BigDecimal.ZERO;

        BigDecimal total = consultationFee.add(therapyFee).add(medicineCharges).subtract(discount);

        Billing billing = new Billing();
        billing.setAppointment(appointment);
        billing.setConsultationFee(consultationFee);
        billing.setTherapyFee(therapyFee);
        billing.setMedicineCharges(medicineCharges);
        billing.setDiscount(discount);
        billing.setAmount(total);
        billing.setPaymentStatus(PaymentStatus.PENDING);
        billing.setBillDate(LocalDate.now());

        Billing saved = billingRepository.save(billing);
        return ResponseEntity.ok(toDto(saved));
    }

    @PutMapping("/{id}/pay")
    public ResponseEntity<?> markPaid(@PathVariable Long id) {
        Billing billing = billingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found"));
        billing.setPaymentStatus(PaymentStatus.PAID);
        billingRepository.save(billing);
        return ResponseEntity.ok(toDto(billing));
    }

    private BillingDto toDto(Billing b) {
        return new BillingDto(
                b.getId(),
                b.getAppointment().getPatient().getUser().getName(),
                b.getAppointment().getDoctor().getUser().getName(),
                b.getAppointment().getTherapy().getName(),
                b.getConsultationFee(),
                b.getTherapyFee(),
                b.getMedicineCharges(),
                b.getDiscount(),
                b.getAmount(),
                b.getPaymentStatus().name(),
                b.getBillDate()
        );
    }
}