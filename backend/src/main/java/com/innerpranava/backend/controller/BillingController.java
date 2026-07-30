package com.innerpranava.backend.controller;

import com.innerpranava.backend.entity.Billing;
import com.innerpranava.backend.repository.BillingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billings")
public class BillingController {

    private final BillingRepository billingRepository;

    public BillingController(BillingRepository billingRepository) {
        this.billingRepository = billingRepository;
    }

    @GetMapping
    public List<Billing> getAllBillings() {
        return billingRepository.findAll();
    }
}