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

    @PostMapping("/clients")
    public ResponseEntity<?> creerClient(@RequestBody RequeteClientDto requete) {
        try {
            Client client = serviceAgent.creerClient(requete);
            return ResponseEntity.ok(client);
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
}
