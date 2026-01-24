package com.yasserdoha.Yado_Bank.depot;

import com.yasserdoha.Yado_Bank.entite.CompteBancaire;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DepotCompteBancaire extends JpaRepository<CompteBancaire, String> {
    List<CompteBancaire> trouverParClient_Id(Long clientId);

    Optional<CompteBancaire> trouverParRib(String rib);
}
