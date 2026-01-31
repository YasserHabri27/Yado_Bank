package com.yasserdoha.Yado_Bank.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class RequeteClientDto {
    @NotBlank(message = "Le numéro d'identité est obligatoire")
    private String numeroIdentite;

    @NotBlank(message = "Le prénom est obligatoire")
    private String prenom;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    @NotNull(message = "La date de naissance est obligatoire")
    private LocalDate dateNaissance;

    @NotBlank(message = "L'adresse postale est obligatoire")
    private String adressePostale;

    public RequeteClientDto() {
    }

    public String getNumeroIdentite() {
        return numeroIdentite;
    }

    public void setNumeroIdentite(String numeroIdentite) {
        this.numeroIdentite = numeroIdentite;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(LocalDate dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public String getAdressePostale() {
        return adressePostale;
    }

    public void setAdressePostale(String adressePostale) {
        this.adressePostale = adressePostale;
    }
}
