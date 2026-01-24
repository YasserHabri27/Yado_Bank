package com.yasserdoha.Yado_Bank.service;

import com.yasserdoha.Yado_Bank.dto.RequeteCompteBancaireDto;
import com.yasserdoha.Yado_Bank.dto.RequeteClientDto;
import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.entite.CompteBancaire;
import com.yasserdoha.Yado_Bank.entite.Client;
import com.yasserdoha.Yado_Bank.enumerations.StatutCompte;
import com.yasserdoha.Yado_Bank.enumerations.Role;
import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import com.yasserdoha.Yado_Bank.depot.DepotCompteBancaire;
import com.yasserdoha.Yado_Bank.depot.DepotClient;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ServiceAgent {

    @Autowired
    private DepotClient depotClient;

    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @Autowired
    private DepotCompteBancaire depotCompteBancaire;

    @Autowired
    private PasswordEncoder encodeurMotDePasse;

    @Transactional
    public Client creerClient(RequeteClientDto requete) {
        if (depotUtilisateur.existeParEmail(requete.getEmail())) {
            throw new RuntimeException("Erreur: Email déjà utilisé!");
        }

        if (depotClient.existeParNumeroIdentite(requete.getNumeroIdentite())) {
            throw new RuntimeException("Erreur: Numéro d'identité déjà existant!");
        }

        // Create Utilisateur
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNomUtilisateur(requete.getEmail());
        utilisateur.setEmail(requete.getEmail());
        String motDePasseBrut = UUID.randomUUID().toString().substring(0, 8);
        utilisateur.setMotDePasse(encodeurMotDePasse.encode(motDePasseBrut));
        utilisateur.setRole(Role.CLIENT);

        System.out.println(">>> [SERVICE EMAIL] Envoi email à " + requete.getEmail());
        System.out.println(">>> [SERVICE EMAIL] Votre Identifiant: " + requete.getEmail());
        System.out.println(">>> [SERVICE EMAIL] Votre Mot de passe: " + motDePasseBrut);

        // Create Client
        Client client = new Client();
        client.setNumeroIdentite(requete.getNumeroIdentite());
        client.setPrenom(requete.getPrenom());
        client.setNom(requete.getNom());
        client.setDateNaissance(requete.getDateNaissance());
        client.setAdressePostale(requete.getAdressePostale());
        client.setUtilisateur(utilisateur);

        return depotClient.save(client);
    }

    @Transactional
    public CompteBancaire creerCompte(RequeteCompteBancaireDto requete) {
        Client client = depotClient.trouverParNumeroIdentite(requete.getNumeroIdentiteClient())
                .orElseThrow(() -> new RuntimeException(
                        "Erreur: Client non trouvé avec l'identité: " + requete.getNumeroIdentiteClient()));

        if (requete.getRib() == null || requete.getRib().length() != 24) {
            throw new RuntimeException("Erreur: RIB invalide. Doit contenir 24 caractères.");
        }
        if (depotCompteBancaire.trouverParRib(requete.getRib()).isPresent()) {
            throw new RuntimeException("Erreur: Ce RIB existe déjà.");
        }

        CompteBancaire compte = new CompteBancaire();
        compte.setRib(requete.getRib());
        compte.setSolde(requete.getSoldeInitial());
        compte.setStatut(StatutCompte.CREE);
        compte.setClient(client);

        return depotCompteBancaire.save(compte);
    }
}
