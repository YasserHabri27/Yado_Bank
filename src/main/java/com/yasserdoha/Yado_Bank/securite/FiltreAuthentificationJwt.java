package com.yasserdoha.Yado_Bank.securite;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class FiltreAuthentificationJwt extends OncePerRequestFilter {

    @Autowired
    private OutilsJwt outilsJwt;

    @Autowired
    private ServiceDetailsUtilisateurPersonnalise serviceDetailsUtilisateur;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = analyserJwt(request);
            if (jwt != null && outilsJwt.validerTokenJwt(jwt)) {
                String nomUtilisateur = outilsJwt.obtenirNomUtilisateurDepuisTokenJwt(jwt);

                UserDetails userDetails = serviceDetailsUtilisateur.loadUserByUsername(nomUtilisateur);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Impossible de définir l'authentification utilisateur: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    private String analyserJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}
