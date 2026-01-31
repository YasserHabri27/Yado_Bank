package com.yasserdoha.Yado_Bank.dto;

import java.math.BigDecimal;

public class RequeteVirementDto {
    private String ribSource;
    private String ribDestination;
    private BigDecimal montant;
    private String description;

    public RequeteVirementDto() {
    }

    public String getRibSource() {
        return ribSource;
    }

    public void setRibSource(String ribSource) {
        this.ribSource = ribSource;
    }

    public String getRibDestination() {
        return ribDestination;
    }

    public void setRibDestination(String ribDestination) {
        this.ribDestination = ribDestination;
    }

    public BigDecimal getMontant() {
        return montant;
    }

    public void setMontant(BigDecimal montant) {
        this.montant = montant;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
