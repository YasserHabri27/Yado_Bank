package com.yasserdoha.Yado_Bank.dto;

public class RequeteConnexion {
    private String nomUtilisateur;
    private String motDePasse;

    public RequeteConnexion() {
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public String getMotDePasse() {
        return motDePasse;
    }

    public void setMotDePasse(String motDePasse) {
        this.motDePasse = motDePasse;
    }
}
