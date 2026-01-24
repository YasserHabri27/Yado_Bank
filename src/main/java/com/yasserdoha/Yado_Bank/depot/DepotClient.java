package com.yasserdoha.Yado_Bank.depot;

import com.yasserdoha.Yado_Bank.entite.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DepotClient extends JpaRepository<Client, Long> {
    Optional<Client> trouverParNumeroIdentite(String numeroIdentite);

    Boolean existeParNumeroIdentite(String numeroIdentite);

    Optional<Client> trouverParUtilisateur_NomUtilisateur(String nomUtilisateur);
}
