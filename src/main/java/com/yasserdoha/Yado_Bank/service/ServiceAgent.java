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

        // Create Utilisateur
        Utilisateur utilisateur = new Utilisateur();
        utilisateur.setNomUtilisateur(requete.getEmail()); // Username is email by default
        utilisateur.setEmail(requete.getEmail());
        String motDePasseBrut = UUID.randomUUID().toString().substring(0, 8);
        utilisateur.setMotDePasse(encodeurMotDePasse.encode(motDePasseBrut));
        utilisateur.setRole(Role.CLIENT);

        // Send Email (RG_7)
        try {
            String subject = "Bienvenue chez Yado Bank - Vos identifiants";
            String body = "<h1>Bienvenue " + requete.getPrenom() + " " + requete.getNom() + ",</h1>"
                    + "<p>Votre compte client a été créé avec succès.</p>"
                    + "<p><strong>Identifiant :</strong> " + requete.getEmail() + "</p>"
                    + "<p><strong>Mot de passe provisoire :</strong> <span style='color: #D4AF37; font-weight: bold;'>"
                    + motDePasseBrut + "</span></p>"
                    + "<p>Veuillez changer votre mot de passe dès votre première connexion.</p>";

            serviceEmail.sendEmail(requete.getEmail(), subject, body);
        } catch (Exception e) {
            System.err.println("Erreur envoi email: " + e.getMessage());
            // We don't block creation if email fails, but in prod we might want to handle
            // differently
        }

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

        // Check if new identity number is conflicting (if changed)
        if (!client.getNumeroIdentite().equals(requete.getNumeroIdentite()) &&
                depotClient.existsByNumeroIdentite(requete.getNumeroIdentite())) {
            throw new RuntimeException("Erreur: Numéro d'identité déjà existant!");
        }

        client.setNumeroIdentite(requete.getNumeroIdentite());
        client.setPrenom(requete.getPrenom());
        client.setNom(requete.getNom());
        client.setDateNaissance(requete.getDateNaissance());
        client.setAdressePostale(requete.getAdressePostale());
        // We do not update email/username here to avoid complex auth sync issues for
        // now

        return depotClient.save(client);
    }

    @Transactional
    public void supprimerClient(Long id) {
        Client client = clientParId(id);
        depotClient.delete(client);
        // Note: JPA Cascade will handle Utilisateur deletion if configured,
        // or we manually delete the user. Our Entity Client has @OneToOne(cascade =
        // CascadeType.ALL)
        // so it should delete the User as well.
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
        // Additional checks could be added here (e.g., check if balance is zero)
        depotCompteBancaire.delete(compte);
    }
}
