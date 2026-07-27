package com.innerpranava.backend.repository;

import com.innerpranava.backend.entity.TherapySession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TherapySessionRepository extends JpaRepository<TherapySession, Long> {
}
