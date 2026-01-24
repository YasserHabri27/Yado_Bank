package com.yasserdoha.Yado_Bank.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class RequeteVirementDto {
    private String ribSource;
    private String ribDestination;
    private BigDecimal montant;
    private String description;
}
