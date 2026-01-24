package com.yasserdoha.Yado_Bank.controleur;

import com.yasserdoha.Yado_Bank.dto.RequeteVirementDto;
import com.yasserdoha.Yado_Bank.entite.Operation;
import com.yasserdoha.Yado_Bank.entite.CompteBancaire;
import com.yasserdoha.Yado_Bank.depot.DepotClient;
import com.yasserdoha.Yado_Bank.service.ServiceClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/client")
@PreAuthorize("hasRole('CLIENT')")
public class ControleurClient {

    @Autowired
    private ServiceClient serviceClient;

    @Autowired
    private DepotClient depotClient;

    @GetMapping("/comptes")
    public ResponseEntity<List<CompteBancaire>> obtenirMesComptes(Principal principal) {
        String nomUtilisateur = principal.getName();
        Long idClient = depotClient.trouverParUtilisateur_NomUtilisateur(nomUtilisateur).get().getId();
        return ResponseEntity.ok(serviceClient.obtenirComptesClient(idClient));
    }

    @GetMapping("/operations/{rib}")
    public ResponseEntity<Page<Operation>> obtenirOperations(@PathVariable String rib,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(serviceClient.obtenirOperationsCompte(rib, PageRequest.of(page, size)));
    }

    @PostMapping("/virement")
    public ResponseEntity<?> effectuerVirement(@RequestBody RequeteVirementDto requete, Principal principal) {
        try {
            serviceClient.virement(principal.getName(), requete);
            return ResponseEntity.ok("Virement effectué avec succès");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
