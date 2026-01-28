package com.yasserdoha.Yado_Bank.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class ServiceEmail {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String body) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("yasser.habri.dev2@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(body, true);

            mailSender.send(message);
        } catch (Exception e) {
            System.out.println("\n=================================================");
            System.out.println("⚠ [MODE DÉMO] Echec envoi SMTP. Simulation Email :");
            System.out.println("-------------------------------------------------");
            System.out.println("📧 À      : " + to);
            System.out.println("📝 Sujet  : " + subject);
            System.out.println("📄 Contenu: [VERSION HTML COMPLÈTE DISPONIBLE SUR MAILTRAP]");
            System.out.println("🔑 INFO   : L'email contient les identifiants générés.");
            System.out.println("=================================================\n");

        }
    }
}
