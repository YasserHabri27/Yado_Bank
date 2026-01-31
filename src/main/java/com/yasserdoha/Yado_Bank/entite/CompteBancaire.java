package com.yasserdoha.Yado_Bank.entite;

import com.yasserdoha.Yado_Bank.enumerations.StatutCompte;
import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
public class CompteBancaire {
    @Id
    @Column(length = 24)
    private String rib;

    @Column(nullable = false)
    private BigDecimal solde;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private StatutCompte statut;

    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    public CompteBancaire() {
    }

    public CompteBancaire(String rib, BigDecimal solde, StatutCompte statut, Client client) {
        this.rib = rib;
        this.solde = solde;
        this.statut = statut;
        this.client = client;
    }

    public String getRib() {
        return rib;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public BigDecimal getSolde() {
        return solde;
    }

    public void setSolde(BigDecimal solde) {
        this.solde = solde;
    }

    public StatutCompte getStatut() {
        return statut;
    }

    public void setStatut(StatutCompte statut) {
        this.statut = statut;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }
}
