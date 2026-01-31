package com.yasserdoha.Yado_Bank.dto;

public class StatistiquesAdmin {
    private long nombreAgentsActifs;
    private long volumeTransactions;
    private String santeSysteme;

    public StatistiquesAdmin() {
    }

    public StatistiquesAdmin(long nombreAgentsActifs, long volumeTransactions, String santeSysteme) {
        this.nombreAgentsActifs = nombreAgentsActifs;
        this.volumeTransactions = volumeTransactions;
        this.santeSysteme = santeSysteme;
    }

    public long getNombreAgentsActifs() {
        return nombreAgentsActifs;
    }

    public void setNombreAgentsActifs(long nombreAgentsActifs) {
        this.nombreAgentsActifs = nombreAgentsActifs;
    }

    public long getVolumeTransactions() {
        return volumeTransactions;
    }

    public void setVolumeTransactions(long volumeTransactions) {
        this.volumeTransactions = volumeTransactions;
    }

    public String getSanteSysteme() {
        return santeSysteme;
    }

    public void setSanteSysteme(String santeSysteme) {
        this.santeSysteme = santeSysteme;
    }

    public static StatisticsAdminBuilder builder() {
        return new StatisticsAdminBuilder();
    }

    public static class StatisticsAdminBuilder {
        private long nombreAgentsActifs;
        private long volumeTransactions;
        private String santeSysteme;

        public StatisticsAdminBuilder nombreAgentsActifs(long nombreAgentsActifs) {
            this.nombreAgentsActifs = nombreAgentsActifs;
            return this;
        }

        public StatisticsAdminBuilder volumeTransactions(long volumeTransactions) {
            this.volumeTransactions = volumeTransactions;
            return this;
        }

        public StatisticsAdminBuilder santeSysteme(String santeSysteme) {
            this.santeSysteme = santeSysteme;
            return this;
        }

        public StatistiquesAdmin build() {
            return new StatistiquesAdmin(nombreAgentsActifs, volumeTransactions, santeSysteme);
        }
    }
}
