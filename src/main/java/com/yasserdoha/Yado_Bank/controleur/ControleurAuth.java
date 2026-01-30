package com.yasserdoha.Yado_Bank.controleur;

import com.yasserdoha.Yado_Bank.dto.RequeteChangementMotDePasse;
import com.yasserdoha.Yado_Bank.dto.ReponseJwt;
import com.yasserdoha.Yado_Bank.dto.RequeteConnexion;
import com.yasserdoha.Yado_Bank.service.ServiceAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/auth")
public class ControleurAuth {

    @Autowired
    private ServiceAuth serviceAuth;

    @PostMapping("/connexion")
    public ResponseEntity<?> authentifierUtilisateur(@RequestBody RequeteConnexion requete) {
        try {
            ReponseJwt reponse = serviceAuth.authentifierUtilisateur(requete);
            return ResponseEntity.ok(reponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Identifiant ou mot de passe incorrects");
        }
    }

    @PostMapping("/changer-mot-de-passe")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> changerMotDePasse(@RequestBody RequeteChangementMotDePasse requete, Principal principal) {
        try {
            serviceAuth.changerMotDePasse(principal.getName(), requete);
            return ResponseEntity.ok("Mot de passe changé avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/mot-de-passe-oublie")
    public ResponseEntity<?> motDePasseOublie(@RequestBody String identifiant) {
        try {
            
            String cleanId = identifiant.replaceAll("[\"{}]", "").split(":")[1].trim();
            serviceAuth.motDePasseOublie(cleanId);
            return ResponseEntity.ok("Un email de réinitialisation a été envoyé.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
