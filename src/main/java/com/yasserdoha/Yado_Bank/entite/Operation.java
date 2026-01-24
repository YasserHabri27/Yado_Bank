package com.yasserdoha.Yado_Bank.entite;

import com.yasserdoha.Yado_Bank.enumerations.TypeOperation;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Operation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private BigDecimal montant;

    @Column(nullable = false)
    private LocalDateTime dateOperation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeOperation type;

    private String description;

    @ManyToOne
    @JoinColumn(name = "compte_id", nullable = false)
    private CompteBancaire compte;
}
