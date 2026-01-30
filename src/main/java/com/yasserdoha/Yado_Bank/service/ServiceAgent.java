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

import java.util.List;
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

    @Autowired
    private ServiceEmail serviceEmail;

    @Transactional
    public Client creerClient(RequeteClientDto requete) {
        if (depotUtilisateur.existsByEmail(requete.getEmail())) {
            throw new RuntimeException("Erreur: Email déjà utilisé!");
        }

        if (depotClient.existsByNumeroIdentite(requete.getNumeroIdentite())) {
            throw new RuntimeException("Erreur: Numéro d'identité déjà existant!");
        }

        
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNomUtilisateur(requete.getEmail());
        utilisateur.setEmail(requete.getEmail());
        String motDePasseBrut = UUID.randomUUID().toString().substring(0, 8);
        utilisateur.setMotDePasse(encodeurMotDePasse.encode(motDePasseBrut));
        utilisateur.setRole(Role.CLIENT);
        depotUtilisateur.save(utilisateur);

        try {
            serviceEmail.sendEmail(requete.getEmail(), "Bienvenue chez Yado Bank", "Votre mot de passe provisoire est : " + motDePasseBrut);
        } catch (Exception e) {
            System.err.println("Erreur envoi email: " + e.getMessage());
        }

        Client client = new Client();
        client.setNumeroIdentite(requete.getNumeroIdentite());
        client.setPrenom(requete.getPrenom());
        client.setNom(requete.getNom());
        client.setDateNaissance(requete.getDateNaissance());
        client.setAdressePostale(requete.getAdressePostale());
        client.setUtilisateur(utilisateur);

        return depotClient.save(client);
    }

    public List<Client> tousLesClients() {
        return depotClient.findAll();
    }

    public Client clientParId(Long id) {
        return depotClient.findById(id)
                .orElseThrow(() -> new RuntimeException("Erreur: Client non trouvé avec l'ID: " + id));
    }

    @Transactional
    public Client modifierClient(Long id, RequeteClientDto requete) {
        Client client = clientParId(id);


        if (!client.getNumeroIdentite().equals(requete.getNumeroIdentite()) &&
                depotClient.existsByNumeroIdentite(requete.getNumeroIdentite())) {
            throw new RuntimeException("Erreur: Numéro d'identité déjà existant!");
        }

        client.setNumeroIdentite(requete.getNumeroIdentite());
        client.setPrenom(requete.getPrenom());
        client.setNom(requete.getNom());
        client.setDateNaissance(requete.getDateNaissance());
        client.setAdressePostale(requete.getAdressePostale());
        client.setAdressePostale(requete.getAdressePostale());

        return depotClient.save(client);
    }


    @Transactional
    public void supprimerClient(Long id) {
        Client client = clientParId(id);

        List<CompteBancaire> comptes = depotCompteBancaire.findByClient_Id(id);
        depotCompteBancaire.deleteAll(comptes);

        depotClient.delete(client);
    }

    @Transactional
    public CompteBancaire creerCompte(RequeteCompteBancaireDto requete) {
        Client client = depotClient.findByNumeroIdentite(requete.getNumeroIdentiteClient())
                .orElseThrow(() -> new RuntimeException(
                        "Erreur: Client non trouvé avec l'identité: " + requete.getNumeroIdentiteClient()));

        if (requete.getRib() == null || requete.getRib().length() != 24) {
            throw new RuntimeException("Erreur: RIB invalide. Doit contenir 24 caractères.");
        }
        if (depotCompteBancaire.findByRib(requete.getRib()).isPresent()) {
            throw new RuntimeException("Erreur: Ce RIB existe déjà.");
        }

        CompteBancaire compte = new CompteBancaire();
        compte.setRib(requete.getRib());
        compte.setSolde(requete.getSoldeInitial());
        compte.setStatut(StatutCompte.OUVERT);
        compte.setClient(client);

        return depotCompteBancaire.save(compte);
    }

    public List<CompteBancaire> tousLesComptes() {
        return depotCompteBancaire.findAll();
    }

    public CompteBancaire compteParRib(String rib) {
        return depotCompteBancaire.findByRib(rib)
                .orElseThrow(() -> new RuntimeException("Erreur: Compte non trouvé avec le RIB: " + rib));
    }

    @Transactional
    public CompteBancaire changerStatutCompte(String rib, StatutCompte statut) {
        CompteBancaire compte = compteParRib(rib);
        compte.setStatut(statut);
        return depotCompteBancaire.save(compte);
    }

    @Transactional
    public void supprimerCompte(String rib) {
        CompteBancaire compte = compteParRib(rib);

        depotCompteBancaire.delete(compte);
    }
}
