package com.yasserdoha.Yado_Bank.dto;

import lombok.Data;
import java.time.LocalDate;

@Data
public class RequeteClientDto {
    private String numeroIdentite;
    private String prenom;
    private String nom;
    private String email;
    private LocalDate dateNaissance;
    private String adressePostale;
}
