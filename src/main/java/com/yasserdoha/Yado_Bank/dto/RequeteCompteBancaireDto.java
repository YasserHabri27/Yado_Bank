package com.yasserdoha.Yado_Bank.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class RequeteCompteBancaireDto {
    private String rib;
    private BigDecimal soldeInitial;
    private String numeroIdentiteClient;
}
