# 🚀 LeadFlow

LeadFlow est une application full-stack permettant de centraliser et gérer des demandes clients via un formulaire public et une interface admin sécurisée.

---

## 🎯 Objectif du projet

Ce projet a été réalisé dans le but de : 
- maîtriser le développement full-stack
- comprendre le fonctionnement d'une API REST sécurisée
- mettre en place une authentification avec JWT
- appliquer des bonnes pratiques de validation et de sécurité

---

## 🎯 Objectif du projet

### 🌐 Côté public
- formulaire de contact (nom, email, message)
- enregistrement des demandes en base de données
- validation des données

### 🔐 Côté admin
- connexion sécurisée (JWT)
- accès protégé aux demandes clients
- affichages des demandes reçues

---

## 🛠️ Stack technique

### Frontend
- React (Vite)
- TailwindCSS
- Axios

### Backend
- NestJS
- Prisma
- PostgreSQL

### Sécurité
- JWT (authentification)
- bcrypt (hash des mots de passe)
- Validation DTO (class-validator)
- Helmet
- CORS configuré
- ValidationPipe (whitelist / forbidNonWhitelisted)

---

## 🔐 Sécurité mise en place
- validation stricte des entrées côté backend
- aucune confiance accordée au frontend
- protection des routes sensibles avec Guard JWT
- gestion des erreurs contrôlée
- mot de passe hashés

---

## 📁 Structure du projet
```bash
    leadflow/
    ├── backend/
    ├── frontend/
```

---

## ⚙️ Installation en local

### 1. Cloner le projet
```bash
    git clone <url du repo>
    cd leadflow
```

### 2. Backend
```bash
    cd backend
    npm install
```
- Créer un fichier .env basé sur .env.example
```bash
    npm run start:dev
```

### 3. Frontend
```bash
    cd frontend
    npm install
```
- Créer un fichier .env basé sur .env.example
```bash
    npm run dev
```

## 📌 Améliorations possibles
- gestion des statuts des demandes
- notifications email

## 👨‍💻 Auteur
Projet réalisé par Luca KIUSI dans le cadre de sa progression.