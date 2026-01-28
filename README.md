# Yado Bank

**Projet :** Système de Gestion Bancaire (Architecture N-Tiers)  
**Année Universitaire :** 2025-2026

---

## 👥 Équipe & Encadrement

**Binôme :**
*   **Yasser Habri**
*   **Doha Allali**

**Encadrant :**
*   **Monsieur Hssaini Abdelilah**

---

## 📝 Présentation du Projet

Yado Bank est une application bancaire complète développée selon une **architecture N-Tiers** robuste, séparant clairement la logique métier, l'accès aux données et l'interface utilisateur. L'application offre deux espaces distincts et sécurisés :

1.  **Espace Client** : Permet aux clients de consulter leurs comptes, effectuer des virements et gérer leur profil.
2.  **Espace Agent (Guichet)** : Permet aux agents de la banque de gérer la clientèle (création/suppression de clients, ouverture de comptes, changements de statut).

---

## 🛠️ Architecture Technique

*   **Backend** : Java (Spring Boot 3.5), Spring Security (JWT), Spring Data JPA, Hibernate.
*   **Frontend** : React (Vite), TailwindCSS, Axios.
*   **Base de Données** : MySQL 8.
*   **Sécurité** : Authentification Stateless via JWT (JSON Web Tokens) avec contrôle strict des rôles (RBAC).

---

## ✅ Règles de Gestion Implémentées (Use Cases)

L'application respecte un ensemble strict de règles métier pour garantir l'intégrité et la sécurité des opérations :

### 1. Gestion des Utilisateurs & Sécurité
*   **Unicité** : Deux utilisateurs ne peuvent pas avoir le même email ou numéro d'identité.
*   **Ségrégation des Rôles** : Un Agent ne peut pas se connecter sur l'interface Client, et vice-versa.
*   **Hashage** : Tous les mots de passe sont hashés avec BCrypt avant stockage.

### 2. Gestion des Clients (Agent)
*   **Création Complète** : Création simultanée d'un profil Utilisateur (accès login) et d'un profil Client (données bancaires).
*   **Notification** : Envoi automatique d'un email (simulé ou via SMTP) contenant les identifiants provisoires lors de la création d'un client.
*   **Suppression en Cascade** : La suppression d'un client entraîne automatiquement la clôture et la suppression de tous ses comptes bancaires associés pour maintenir l'intégrité référentielle.

### 3. Gestion des Comptes Bancaires
*   **Format RIB** : Validation stricte des RIB (format unique, 24 caractères).
*   **Statuts** : Gestion du cycle de vie des comptes (`CREE`, `OUVERT`, `SUSPENDU`, `BLOQUE`).
*   **Soldes** : Contrôle des soldes initiaux à l'ouverture.

### 4. Opérations Bancaires
*   **Virements** : Vérification de la solvabilité (solde suffisant) avant tout débit.
*   **Traçabilité** : Historisation de toutes les opérations (Débit, Crédit, Virement) avec horodatage.

---

## 🚀 Guide de Test (Déploiement)

### Pré-requis
*   Java JDK 25+
*   Node.js & npm
*   MySQL Server (Base de données `yado_bank`)

### 1. Lancer le Backend
```bash
cd architecture/Yado_Bank
mvn spring-boot:run
```
*Le serveur démarrera sur http://localhost:8080*

### 2. Lancer le Frontend
```bash
cd architecture/Yado_Bank/frontend
npm install
npm run dev
```
*L'application sera accessible sur http://localhost:5173*

### 3. Identifiants de Test

| Rôle | Email / Login | Mot de Passe |
| :--- | :--- | :--- |
| **Agent** | `agent@yadobank.com` | `admin123` |
| **Client** | *(Utiliser un client créé par l'agent)* | *(Généré par email)* |

---

*Projet réalisé dans le cadre du module d'Architecture Logicielle.*
