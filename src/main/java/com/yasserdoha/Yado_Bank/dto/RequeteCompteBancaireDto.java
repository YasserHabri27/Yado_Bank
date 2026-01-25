package com.yasserdoha.Yado_Bank.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class RequeteCompteBancaireDto {
    @NotBlank(message = "Le RIB est obligatoire")
    @Size(min = 24, max = 24, message = "Le RIB doit contenir exactement 24 caractères")
    private String rib;

    @NotNull(message = "Le solde initial est obligatoire")
    private BigDecimal soldeInitial;

    @NotBlank(message = "L'identité du client est obligatoire")
    private String numeroIdentiteClient;
}
