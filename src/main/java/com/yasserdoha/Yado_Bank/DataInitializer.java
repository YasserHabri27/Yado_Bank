package com.yasserdoha.Yado_Bank;

import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.enumerations.Role;
import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner init(DepotUtilisateur depotUtilisateur, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if Agent exists
            if (!depotUtilisateur.existsByNomUtilisateur("agent@yadobank.com")) {
                Utilisateur agent = new Utilisateur();
                agent.setNomUtilisateur("agent@yadobank.com");
                agent.setEmail("agent@yadobank.com");
                agent.setMotDePasse(passwordEncoder.encode("password123"));
                agent.setRole(Role.AGENT_GUICHET);
                depotUtilisateur.save(agent);
                System.out.println(">>> Seeded Agent: agent@yadobank.com / password123");
            }
        };
    }
}
