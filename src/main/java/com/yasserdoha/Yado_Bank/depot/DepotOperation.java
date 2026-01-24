package com.yasserdoha.Yado_Bank.depot;

import com.yasserdoha.Yado_Bank.entite.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepotOperation extends JpaRepository<Operation, Long> {
    List<Operation> trouverParCompte_Rib(String rib);

    Page<Operation> trouverParCompte_RibOrderByDateOperationDesc(String rib, Pageable pageable);
}
