package com.yasserdoha.Yado_Bank.dto;

public class RequeteChangementMotDePasse {
    private String ancienMotDePasse;
    private String nouveauMotDePasse;

    public RequeteChangementMotDePasse() {
    }

    public String getAncienMotDePasse() {
        return ancienMotDePasse;
    }

    public void setAncienMotDePasse(String ancienMotDePasse) {
        this.ancienMotDePasse = ancienMotDePasse;
    }

    public String getNouveauMotDePasse() {
        return nouveauMotDePasse;
    }

    public void setNouveauMotDePasse(String nouveauMotDePasse) {
        this.nouveauMotDePasse = nouveauMotDePasse;
    }
}
