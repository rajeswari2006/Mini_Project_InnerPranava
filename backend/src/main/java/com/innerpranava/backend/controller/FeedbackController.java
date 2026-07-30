package com.innerpranava.backend.controller;

import com.innerpranava.backend.entity.Feedback;
import com.innerpranava.backend.repository.FeedbackRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/feedbacks")
public class FeedbackController {

    private final FeedbackRepository feedbackRepository;

    public FeedbackController(FeedbackRepository feedbackRepository) {
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepository.findAll();
    }

    @PostMapping
    public Feedback createFeedback(@RequestBody Feedback feedback) {
        return feedbackRepository.save(feedback);
    }
}