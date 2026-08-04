package com.innerpranava.backend.repository;

import com.innerpranava.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    @Query("SELECT AVG(f.rating) FROM Feedback f")
    Double getAverageRating();
    List<Feedback> findByPatientId(Long patientId);
}
