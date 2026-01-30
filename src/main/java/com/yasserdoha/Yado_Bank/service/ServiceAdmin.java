package com.yasserdoha.Yado_Bank.service;

import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.enumerations.Role;
import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import com.yasserdoha.Yado_Bank.depot.DepotOperation;
import com.yasserdoha.Yado_Bank.dto.StatistiquesAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ServiceAdmin {

    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @Autowired
    private DepotOperation depotOperation;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public StatistiquesAdmin getStatistiques() {
        long nbAgents = depotUtilisateur.findAll().stream()
                .filter(u -> u.getRole() == Role.AGENT_GUICHET)
                .count();

        long nbTransactions = depotOperation.count();

        return StatistiquesAdmin.builder()
                .nombreAgentsActifs(nbAgents)
                .volumeTransactions(nbTransactions)
                .santeSysteme("100%") 
                .build();
    }

    public List<Utilisateur> tousLesAgents() {
        return depotUtilisateur.findAll().stream()
                .filter(u -> u.getRole() == Role.AGENT_GUICHET)
                .collect(Collectors.toList());
    }

    public Utilisateur creerAgent(String nomUtilisateur, String motDePasse) {
        if (depotUtilisateur.existsByNomUtilisateur(nomUtilisateur)) {
            throw new RuntimeException("Erreur: Ce nom d'utilisateur existe déjà.");
        }

        Utilisateur agent = new Utilisateur();
        agent.setNomUtilisateur(nomUtilisateur);
        agent.setEmail(nomUtilisateur); 
        agent.setMotDePasse(passwordEncoder.encode(motDePasse));
        agent.setRole(Role.AGENT_GUICHET);

        return depotUtilisateur.save(agent);
    }

    public void supprimerAgent(Long id) {
        Utilisateur agent = depotUtilisateur.findById(id)
                .orElseThrow(() -> new RuntimeException("Erreur: Agent non trouvé."));

        if (agent.getRole() != Role.AGENT_GUICHET) {
            throw new RuntimeException("Erreur: Impossible de supprimer cet utilisateur (Rôle non autorisé).");
        }

        depotUtilisateur.delete(agent);
    }

    public Utilisateur modifierAgent(Long id, String nouveauNom, String nouveauMdp) {
        Utilisateur agent = depotUtilisateur.findById(id)
                .orElseThrow(() -> new RuntimeException("Erreur: Agent non trouvé."));

        if (agent.getRole() != Role.AGENT_GUICHET) {
            throw new RuntimeException("Erreur: Modification non autorisée pour ce rôle.");
        }

        if (nouveauNom != null && !nouveauNom.isEmpty()) {
            if (!agent.getNomUtilisateur().equals(nouveauNom) && depotUtilisateur.existsByNomUtilisateur(nouveauNom)) {
                throw new RuntimeException("Erreur: Ce nom d'utilisateur est déjà pris.");
            }
            agent.setNomUtilisateur(nouveauNom);
            agent.setEmail(nouveauNom);
        }

        if (nouveauMdp != null && !nouveauMdp.isEmpty()) {
            agent.setMotDePasse(passwordEncoder.encode(nouveauMdp));
        }

        return depotUtilisateur.save(agent);
    }
}
