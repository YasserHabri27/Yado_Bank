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
            
            if (!depotUtilisateur.existsByNomUtilisateur("agent@yadobank.com")) {
                Utilisateur agent = new Utilisateur();
                agent.setNomUtilisateur("agent@yadobank.com");
                agent.setEmail("agent@yadobank.com");
                agent.setMotDePasse(passwordEncoder.encode("password123"));
                agent.setRole(Role.AGENT_GUICHET);
                depotUtilisateur.save(agent);
                System.out.println(">>> Seeded Agent: agent@yadobank.com / password123");
            }

            
            if (!depotUtilisateur.existsByNomUtilisateur("client@yadobank.com")) {
                Utilisateur client = new Utilisateur();
                client.setNomUtilisateur("client@yadobank.com"); 
                client.setEmail("client@yadobank.com");
                client.setMotDePasse(passwordEncoder.encode("password123"));
                client.setRole(Role.CLIENT);
                depotUtilisateur.save(client);
                depotUtilisateur.save(client);
                System.out.println(">>> Seeded Client: client@yadobank.com / password123");
            }

            
            if (!depotUtilisateur.existsByNomUtilisateur("admin@yadobank.com")) {
                Utilisateur admin = new Utilisateur();
                admin.setNomUtilisateur("admin@yadobank.com");
                admin.setEmail("admin@yadobank.com");
                admin.setMotDePasse(passwordEncoder.encode("admin123"));
                admin.setRole(Role.ADMIN);
                depotUtilisateur.save(admin);
                System.out.println(">>> Seeded Admin: admin@yadobank.com / admin123");
            }
        };
    }
}
