package com.yasserdoha.Yado_Bank.entite;

import com.yasserdoha.Yado_Bank.enumerations.TypeOperation;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
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

    public Operation() {
    }

    public Operation(Long id, BigDecimal montant, LocalDateTime dateOperation, TypeOperation type, String description,
            CompteBancaire compte) {
        this.id = id;
        this.montant = montant;
        this.dateOperation = dateOperation;
        this.type = type;
        this.description = description;
        this.compte = compte;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public LocalDateTime getDateOperation() {
        return dateOperation;
    }

    public void setDateOperation(LocalDateTime dateOperation) {
        this.dateOperation = dateOperation;
    }

    public TypeOperation getType() {
        return type;
    }

    public void setType(TypeOperation type) {
        this.type = type;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public CompteBancaire getCompte() {
        return compte;
    }

    public void setCompte(CompteBancaire compte) {
        this.compte = compte;
    }
}
