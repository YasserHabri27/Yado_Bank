package com.yasserdoha.Yado_Bank.securite;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class OutilsJwt {

    
    private static final String JWT_SECRET = "YasserAndDohaBankSecretKeyForJwtSigning123456789";
    private static final long JWT_EXPIRATION_MS = 3600000; 

    private Key cle() {
        return Keys.hmacShaKeyFor(JWT_SECRET.getBytes());
    }

    public String genererToken(Authentication authentication) {
        UserDetails userPrincipal = (UserDetails) authentication.getPrincipal();

        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date((new Date()).getTime() + JWT_EXPIRATION_MS))
                .signWith(cle(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String obtenirNomUtilisateurDepuisTokenJwt(String token) {
        return Jwts.parserBuilder().setSigningKey(cle()).build()
                .parseClaimsJws(token).getBody().getSubject();
    }

    public boolean validerTokenJwt(String authToken) {
        try {
            Jwts.parserBuilder().setSigningKey(cle()).build().parse(authToken);
            return true;
        } catch (MalformedJwtException e) {
            System.err.println("Token JWT invalide: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            System.err.println("Token JWT expiré: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            System.err.println("Token JWT non supporté: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            System.err.println("Chaine de claims JWT vide: " + e.getMessage());
        }
        return false;
    }
}
