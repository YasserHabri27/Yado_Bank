package com.yasserdoha.Yado_Bank.controleur;

import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.service.ServiceAdmin;
import com.yasserdoha.Yado_Bank.dto.RequeteConnexion; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class ControleurAdmin {

    @Autowired
    private ServiceAdmin serviceAdmin;

    @GetMapping("/agents")
    public ResponseEntity<?> tousLesAgents() {
        return ResponseEntity.ok(serviceAdmin.tousLesAgents());
    }

    @GetMapping("/statistiques")
    public ResponseEntity<?> getStatistiques() {
        return ResponseEntity.ok(serviceAdmin.getStatistiques());
    }

    @PostMapping("/agents")
    public ResponseEntity<?> creerAgent(@RequestBody RequeteConnexion requete) {
        try {

            Utilisateur agent = serviceAdmin.creerAgent(requete.getNomUtilisateur(), requete.getMotDePasse());
            return ResponseEntity.ok(agent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/agents/{id}")
    public ResponseEntity<?> supprimerAgent(@PathVariable Long id) {
        try {
            serviceAdmin.supprimerAgent(id);
            return ResponseEntity.ok("Agent supprimé avec succès.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/agents/{id}")
    public ResponseEntity<?> modifierAgent(@PathVariable Long id, @RequestBody RequeteConnexion requete) {
        try {
            Utilisateur agent = serviceAdmin.modifierAgent(id, requete.getNomUtilisateur(), requete.getMotDePasse());
            return ResponseEntity.ok(agent);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
