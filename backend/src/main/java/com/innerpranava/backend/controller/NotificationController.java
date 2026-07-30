package com.innerpranava.backend.controller;

import com.innerpranava.backend.entity.Notification;
import com.innerpranava.backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping("/user/{userId}")
    public List<Notification> getByUser(@PathVariable Long userId) {
        return notificationRepository.findAll().stream()
                .filter(n -> n.getUser().getId().equals(userId))
                .toList();
    }
}