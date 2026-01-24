package com.yasserdoha.Yado_Bank.securite;

import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ServiceDetailsUtilisateurPersonnalise implements UserDetailsService {

    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = depotUtilisateur.findByNomUtilisateur(username)
                .orElseThrow(() -> new UsernameNotFoundException(
                        "Utilisateur non trouvé avec le nom d'utilisateur: " + username));

        return User.builder()
                .username(utilisateur.getNomUtilisateur())
                .password(utilisateur.getMotDePasse())
                .roles(utilisateur.getRole().name())
                .build();
    }
}
