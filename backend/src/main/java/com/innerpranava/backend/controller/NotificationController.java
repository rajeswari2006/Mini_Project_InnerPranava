package com.innerpranava.backend.controller;

import com.innerpranava.backend.entity.Notification;
import com.innerpranava.backend.entity.User;
import com.innerpranava.backend.repository.NotificationRepository;
import com.innerpranava.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public NotificationController(NotificationRepository notificationRepository, UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public List<Notification> getMyNotifications(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new RuntimeException("User not found"));
        return notificationRepository.findAll().stream()
                .filter(n -> n.getUser().getId().equals(user.getId()))
                .toList();
    }
}