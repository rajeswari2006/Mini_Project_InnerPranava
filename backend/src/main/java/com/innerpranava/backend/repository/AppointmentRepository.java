package com.innerpranava.backend.repository;

import com.innerpranava.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    List<Appointment> findByDoctorIdAndDate(Long doctorId, LocalDate date);

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    @Query("SELECT a.therapy.name, COUNT(a) FROM Appointment a GROUP BY a.therapy.name ORDER BY COUNT(a) DESC")
    List<Object[]> countAppointmentsByTherapy();

    @Query("SELECT FUNCTION('MONTH', a.date), COUNT(a) FROM Appointment a GROUP BY FUNCTION('MONTH', a.date)")
    List<Object[]> countAppointmentsByMonth();



}