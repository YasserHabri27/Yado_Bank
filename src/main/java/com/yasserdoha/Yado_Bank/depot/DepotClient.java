package com.yasserdoha.Yado_Bank.depot;

import com.yasserdoha.Yado_Bank.entite.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface DepotClient extends JpaRepository<Client, Long> {
    Optional<Client> findByNumeroIdentite(String numeroIdentite);

    Boolean existsByNumeroIdentite(String numeroIdentite);

    Optional<Client> findByUtilisateur_NomUtilisateur(String nomUtilisateur);
}
