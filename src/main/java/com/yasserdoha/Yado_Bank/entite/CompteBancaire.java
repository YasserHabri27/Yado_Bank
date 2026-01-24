package com.yasserdoha.Yado_Bank.entite;

import com.yasserdoha.Yado_Bank.enumerations.StatutCompte;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CompteBancaire {
    @Id
    @Column(length = 24)
    private String rib;

    @Column(nullable = false)
    private BigDecimal solde;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StatutCompte statut;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;
}
