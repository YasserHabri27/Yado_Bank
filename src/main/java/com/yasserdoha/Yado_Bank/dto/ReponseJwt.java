package com.yasserdoha.Yado_Bank.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReponseJwt {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String nomUtilisateur;
    private String email;
    private String role;

    public ReponseJwt(String token, Long id, String nomUtilisateur, String email, String role) {
        this.token = token;
        this.id = id;
        this.nomUtilisateur = nomUtilisateur;
        this.email = email;
        this.role = role;
    }
}
