package com.yasserdoha.Yado_Bank.service;

import com.yasserdoha.Yado_Bank.dto.RequeteVirementDto;
import com.yasserdoha.Yado_Bank.entite.Operation;
import com.yasserdoha.Yado_Bank.entite.CompteBancaire;
import com.yasserdoha.Yado_Bank.enumerations.StatutCompte;
import com.yasserdoha.Yado_Bank.enumerations.TypeOperation;
import com.yasserdoha.Yado_Bank.depot.DepotOperation;
import com.yasserdoha.Yado_Bank.depot.DepotCompteBancaire;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ServiceClient {

    @Autowired
    private DepotCompteBancaire depotCompteBancaire;

    @Autowired
    private DepotOperation depotOperation;

    public List<CompteBancaire> obtenirComptesClient(Long idClient) {
        List<CompteBancaire> comptes = depotCompteBancaire.findByClient_Id(idClient);

        
        comptes.sort((c1, c2) -> {
            LocalDateTime lastOp1 = depotOperation.findTopByCompte_RibOrderByDateOperationDesc(c1.getRib())
                    .map(Operation::getDateOperation).orElse(LocalDateTime.MIN);
            LocalDateTime lastOp2 = depotOperation.findTopByCompte_RibOrderByDateOperationDesc(c2.getRib())
                    .map(Operation::getDateOperation).orElse(LocalDateTime.MIN);
            return lastOp2.compareTo(lastOp1); 
        });

        return comptes;
    }

    public Page<Operation> obtenirOperationsCompte(String rib, Pageable pageable) {
        return depotOperation.findByCompte_RibOrderByDateOperationDesc(rib, pageable);
    }

    @Transactional
    public void virement(String nomUtilisateur, RequeteVirementDto requete) {
        CompteBancaire compteSource = depotCompteBancaire.findByRib(requete.getRibSource())
                .orElseThrow(() -> new RuntimeException("Erreur: Compte source non trouvé."));

        if (!compteSource.getClient().getUtilisateur().getNomUtilisateur().equals(nomUtilisateur)) {
            throw new RuntimeException("Erreur: Vous n'êtes pas propriétaire de ce compte.");
        }

        if (compteSource.getStatut() == StatutCompte.SUSPENDU
                || compteSource.getStatut() == StatutCompte.BLOQUE) {
            throw new RuntimeException("Erreur: Le compte source n'est pas actif.");
        }

        if (compteSource.getSolde().compareTo(requete.getMontant()) < 0) {
            throw new RuntimeException("Erreur: Solde insuffisant.");
        }

        CompteBancaire compteDest = depotCompteBancaire.findByRib(requete.getRibDestination())
                .orElseThrow(() -> new RuntimeException("Erreur: Compte destinataire non trouvé."));

        compteSource.setSolde(compteSource.getSolde().subtract(requete.getMontant()));
        depotCompteBancaire.save(compteSource);

        Operation opDebit = new Operation();
        opDebit.setCompte(compteSource);
        opDebit.setMontant(requete.getMontant());
        opDebit.setType(TypeOperation.DEBIT);
        opDebit.setDateOperation(LocalDateTime.now());
        opDebit.setDescription("Virement vers " + requete.getRibDestination() + ": " + requete.getDescription());
        depotOperation.save(opDebit);

        compteDest.setSolde(compteDest.getSolde().add(requete.getMontant()));
        depotCompteBancaire.save(compteDest);

        Operation opCredit = new Operation();
        opCredit.setCompte(compteDest);
        opCredit.setMontant(requete.getMontant());
        opCredit.setType(TypeOperation.CREDIT);
        opCredit.setDateOperation(LocalDateTime.now());
        opCredit.setDescription("Virement de " + requete.getRibSource() + ": " + requete.getDescription());
        depotOperation.save(opCredit);
    }
}
