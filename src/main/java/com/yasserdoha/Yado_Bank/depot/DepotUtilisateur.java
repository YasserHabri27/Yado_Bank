package com.yasserdoha.Yado_Bank.depot;

import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DepotUtilisateur extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> trouverParNomUtilisateur(String nomUtilisateur);

    Boolean existeParNomUtilisateur(String nomUtilisateur);

    Boolean existeParEmail(String email);
}
