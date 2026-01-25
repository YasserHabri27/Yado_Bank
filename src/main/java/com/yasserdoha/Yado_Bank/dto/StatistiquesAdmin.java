package com.yasserdoha.Yado_Bank.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StatistiquesAdmin {
    private long nombreAgentsActifs;
    private long volumeTransactions;
    private String santeSysteme;
}
