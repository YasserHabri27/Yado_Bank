package com.yasserdoha.Yado_Bank.controleur;

import com.yasserdoha.Yado_Bank.dto.RequeteCompteBancaireDto;
import com.yasserdoha.Yado_Bank.dto.RequeteClientDto;
import com.yasserdoha.Yado_Bank.entite.CompteBancaire;
import com.yasserdoha.Yado_Bank.entite.Client;
import com.yasserdoha.Yado_Bank.service.ServiceAgent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/agent")
@PreAuthorize("hasRole('AGENT_GUICHET')")
public class ControleurAgent {

    @Autowired
    private ServiceAgent serviceAgent;

import jakarta.validation.Valid;

    @PostMapping("/clients")
    public ResponseEntity<?> creerClient(@Valid @RequestBody RequeteClientDto requete) {
        try {
            Client client = serviceAgent.creerClient(requete);
            return ResponseEntity.ok(client);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/clients")
    public ResponseEntity<?> tousLesClients() {
        return ResponseEntity.ok(serviceAgent.tousLesClients());
    }

    @GetMapping("/clients/{id}")
    public ResponseEntity<?> clientParId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(serviceAgent.clientParId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/clients/{id}")
    public ResponseEntity<?> modifierClient(@PathVariable Long id, @RequestBody RequeteClientDto requete) {
        try {
            return ResponseEntity.ok(serviceAgent.modifierClient(id, requete));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/clients/{id}")
    public ResponseEntity<?> supprimerClient(@PathVariable Long id) {
        try {
            serviceAgent.supprimerClient(id);
            return ResponseEntity.ok("Client supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/comptes")
    public ResponseEntity<?> creerCompte(@RequestBody RequeteCompteBancaireDto requete) {
        try {
            CompteBancaire compte = serviceAgent.creerCompte(requete);
            return ResponseEntity.ok(compte);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/comptes")
    public ResponseEntity<?> tousLesComptes() {
        return ResponseEntity.ok(serviceAgent.tousLesComptes());
    }

    @GetMapping("/comptes/{rib}")
    public ResponseEntity<?> compteParRib(@PathVariable String rib) {
        try {
            return ResponseEntity.ok(serviceAgent.compteParRib(rib));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/comptes/{rib}/statut")
    public ResponseEntity<?> changerStatutCompte(@PathVariable String rib, @RequestBody String statutStr) {
        try {
            // Remove JSON quotes if present
            statutStr = statutStr.replace("\"", "");
            com.yasserdoha.Yado_Bank.enumerations.StatutCompte statut = com.yasserdoha.Yado_Bank.enumerations.StatutCompte
                    .valueOf(statutStr);
            return ResponseEntity.ok(serviceAgent.changerStatutCompte(rib, statut));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erreur: Statut invalide ou " + e.getMessage());
        }
    }

    @DeleteMapping("/comptes/{rib}")
    public ResponseEntity<?> supprimerCompte(@PathVariable String rib) {
        try {
            serviceAgent.supprimerCompte(rib);
            return ResponseEntity.ok("Compte supprimé avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
