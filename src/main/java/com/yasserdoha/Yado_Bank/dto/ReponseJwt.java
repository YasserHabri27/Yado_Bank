package com.yasserdoha.Yado_Bank.dto;

public class ReponseJwt {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String nomUtilisateur;
    private String email;
    private String role;

    public ReponseJwt() {
    }

    public ReponseJwt(String token, Long id, String nomUtilisateur, String email, String role) {
        this.token = token;
        this.id = id;
        this.nomUtilisateur = nomUtilisateur;
        this.email = email;
        this.role = role;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomUtilisateur() {
        return nomUtilisateur;
    }

    public void setNomUtilisateur(String nomUtilisateur) {
        this.nomUtilisateur = nomUtilisateur;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
