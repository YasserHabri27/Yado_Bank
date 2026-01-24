package com.yasserdoha.Yado_Bank.config;

import com.yasserdoha.Yado_Bank.securite.ServiceDetailsUtilisateurPersonnalise;
import com.yasserdoha.Yado_Bank.securite.FiltreAuthentificationJwt;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
public class ConfigSecurite {

    private final ServiceDetailsUtilisateurPersonnalise serviceDetailsUtilisateur;
    private final FiltreAuthentificationJwt filtreAuthentificationJwt;

    public ConfigSecurite(ServiceDetailsUtilisateurPersonnalise serviceDetailsUtilisateur,
            FiltreAuthentificationJwt filtreAuthentificationJwt) {
        this.serviceDetailsUtilisateur = serviceDetailsUtilisateur;
        this.filtreAuthentificationJwt = filtreAuthentificationJwt;
    }

    @Bean
    public DaoAuthenticationProvider fournisseurAuthentification() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(serviceDetailsUtilisateur);
        authProvider.setPasswordEncoder(encodeurMotDePasse());
        return authProvider;
    }

    @Bean
    public AuthenticationManager gestionnaireAuthentification(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder encodeurMotDePasse() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain chaineFiltreSecurite(HttpSecurity http) throws Exception {
        http.csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(sourceConfigurationCors()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/auth/**").permitAll()
                        .anyRequest().authenticated());

        http.authenticationProvider(fournisseurAuthentification());
        http.addFilterBefore(filtreAuthentificationJwt, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public UrlBasedCorsConfigurationSource sourceConfigurationCors() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174",
                "http://localhost:5175", "http://localhost:3000"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
