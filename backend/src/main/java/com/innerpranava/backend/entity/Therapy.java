package com.innerpranava.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "therapies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Therapy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    private Integer duration;

    @Column(length = 1000)
    private String benefits;

    @Column(length = 1000)
    private String preparation;

    @Column(length = 1000)
    private String afterCare;
}
