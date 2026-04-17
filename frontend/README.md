# 🎨 LeadFlow — Frontend

Interface utilisateur de LeadFlow permettant d’envoyer des demandes clients et d’accéder à une interface admin sécurisée.

---

## 🎯 Objectif
Le frontend permet de :
- proposer un formulaire de contact public
- consommer l’API backend
- gérer l’authentification admin
- afficher les demandes clients de manière sécurisée

---

## 🛠️ Stack technique

- React (Vite)
- TailwindCSS
- Axios
- React Router

---

## ⚙️ Installation

### 1. Installer les dépendances
```bash
    npm install
```

### 2. Configuration
Créer un fichier .env basé sur .env.example
```bash
    VITE_API_URL=http://localhost:3000/api
```

### 3. Lancer le projet
```bash
    npm run dev
```

## 🌐 Fonctionnalités

### Page publique
- formulaire de contact
- validation des champs (frontend)
- envoi des données vers l’API

### Authentification admin
- formulaire de connexion
- récupération du token JWT
- stockage du toke (localStorage)

### Interface admin 
- route protégée côté frontend
- récupération des demandes via API
- affichages des données

## 🔐 Gestion de l’authentification
- token JWT stocké dans le localStorage
- contexte React (AuthContext) pour gérer l'état utilisateur
- redirection vers /login si non authentifié

## 📡 Communication avec le backend
Toutes les requêtes passent par Axios :
```bash
    baseURL: import.meta.env.VITE_API_URL
```

## ⚠️ Important
- le frontend ne garantit pas la sécurité
- toutes les validations critiques sont faites côté backend
- le frontend améliore uniquement l'expérience utilisateur

## 🧠 Architecture
```bash
    src/
    ├── api/
    ├── components/
    ├── context/
    ├── pages/
    ├── router/
```

## 📌 Bonnes pratiques appliquées
- séparation logique (pages / composants / api)
- gestion centralisée de l'authentification
- validation des formulaires côté backend
- gestion des erreurs utilisateur
- configuration via variables d'environnement

## 👨‍💻 Notes
- le frontend dépend entièrement du backend pour les données
- il agit comme une interface utilisateur consommant une API REST