package com.yasserdoha.Yado_Bank.controleur;

import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class DebugController {

    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @GetMapping("/api/debug/check-user")
    public ResponseEntity<?> checkUser(@RequestParam String email) {
        Optional<Utilisateur> user = depotUtilisateur.findByNomUtilisateur(email);
        if (user.isPresent()) {
            return ResponseEntity
                    .ok("User found: " + user.get().getNomUtilisateur() + ", Role: " + user.get().getRole());
        } else {
            return ResponseEntity.badRequest().body("User NOT found: " + email);
        }
    }
}
