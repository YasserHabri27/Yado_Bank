package com.yasserdoha.Yado_Bank.service;

import com.yasserdoha.Yado_Bank.dto.RequeteChangementMotDePasse;
import com.yasserdoha.Yado_Bank.dto.ReponseJwt;
import com.yasserdoha.Yado_Bank.dto.RequeteConnexion;
import com.yasserdoha.Yado_Bank.entite.Utilisateur;
import com.yasserdoha.Yado_Bank.depot.DepotUtilisateur;
import com.yasserdoha.Yado_Bank.securite.OutilsJwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ServiceAuth {

    @Autowired
    private AuthenticationManager gestionnaireAuthentification;

    @Autowired
    private DepotUtilisateur depotUtilisateur;

    @Autowired
    private PasswordEncoder encodeurMotDePasse;

    @Autowired
    private OutilsJwt outilsJwt;

    public ReponseJwt authentifierUtilisateur(RequeteConnexion requete) {
        Authentication authentication = gestionnaireAuthentification.authenticate(
                new UsernamePasswordAuthenticationToken(requete.getNomUtilisateur(), requete.getMotDePasse()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = outilsJwt.genererToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String role = userDetails.getAuthorities().stream().findFirst().get().getAuthority();

        Utilisateur utilisateur = depotUtilisateur.findByNomUtilisateur(userDetails.getUsername()).orElseThrow();

        return new ReponseJwt(jwt, utilisateur.getId(), userDetails.getUsername(), utilisateur.getEmail(), role);
    }

    public void changerMotDePasse(String nomUtilisateur, RequeteChangementMotDePasse requete) {
        Utilisateur utilisateur = depotUtilisateur.findByNomUtilisateur(nomUtilisateur)
                .orElseThrow(() -> new RuntimeException("Erreur: Utilisateur non trouvé."));

        if (!encodeurMotDePasse.matches(requete.getAncienMotDePasse(), utilisateur.getMotDePasse())) {
            throw new RuntimeException("Erreur: L'ancien mot de passe est incorrect.");
        }

        utilisateur.setMotDePasse(encodeurMotDePasse.encode(requete.getNouveauMotDePasse()));
        depotUtilisateur.save(utilisateur);
    }

    @Autowired
    private ServiceEmail serviceEmail;

    public void motDePasseOublie(String identifiant) {
        
        Utilisateur utilisateur = depotUtilisateur.findByNomUtilisateur(identifiant)
                .or(() -> depotUtilisateur.findByEmail(identifiant))
                .orElseThrow(() -> new RuntimeException("Cet identifiant ou email n'est lié à aucun compte."));

        
        
        
        
        

        
        
        String code = String.valueOf((int) (Math.random() * 900000) + 100000);

        
        
        

        String subject = "Réinitialisation de votre mot de passe - Yado Bank";
        String body = "<h1>Bonjour " + utilisateur.getNomUtilisateur() + ",</h1>"
                + "<p>Vous avez demandé la réinitialisation de votre mot de passe.</p>"
                + "<p>Votre code de vérification est : <strong style='font-size: 18px; color: #D4AF37;'>" + code
                + "</strong></p>"
                + "<p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer cet email.</p>"
                + "<br><p>Cordialement,<br>L'équipe Yado Bank</p>";

        serviceEmail.sendEmail(utilisateur.getEmail(), subject, body);
    }
}
