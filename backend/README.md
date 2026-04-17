# 🧠 LeadFlow — Backend

API REST sécurisée permettant la gestion de demandes clients avec authentification admin.

---

## 🎯 Objectif
Le backend de LeadFlow permet de :
- gérer les demandes clients
- sécuriser l’accès admin
- valider strictement les données
- exposer une API REST propre et sécurisée

---

## 🛠️ Stack technique
- NestJS
- Prisma ORM
- PostgreSQL
- JWT (authentification)
- bcrypt (hash des mots de passe)
- class-validator / class-transformer

---

## ⚙️ Installation

### 1. Installer les dépendances
```bash
npm install
```

### 2. Configuration des variables d'environnement
Créer un fichier .env basé sur .env.example
Exemple : 
```bash
  DATABASE_URL=
  JWT_SECRET=
  PORT=3000
  FRONTEND_URL=http://localhost:5173
  ADMIN_EMAIL=
  ADMIN_PASSWORD=
```

### 3. Générer Prisma
```bash
  npx prisma generate
```

### 4. Lancer des migrations
```bash
  npx prisma migrate dev
```

### 5. Lancer le serveur
```bash
  npm run start:dev
```

## 🔐 Authentification
Le backend utilise JWT pour sécuriser les routes.

Flow : 
1. Login via /auth/login
2. Retour d'un access_token
3. Envoi du token dans les requêtes
```bash
  Authorization: Bearer <token>
```

## 📡 Endpoints principaux

### 🔓 Public
POST /contact-requests
Créer une demande client : 
```bash
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
```

### 🔐 Auth
POST /auth/login
Connexion admin
```bash
  {
    "email": "string",
    "password": "string"
  }
```

### 🔒 Admin
GET /contact-requests/admin
Récupérer toutes les demandes (protégé JWT)

## 🛡️ Sécurité
- validation DTO stricte (ValidationPipe)
- whitelist: true
- forbidNonWhitelisted: true
- mots de passe hashés avec bcrypt
- routes sensibles protégées par JwtAuthGuard
- CORS configuré
- Helmet activé

## 🧠 Architecture
Structure simplifié : 
```bash
  src/
  ├── auth/
  ├── contact-requests/
  ├── prisma/
  ├── common/
```

## ⚠️ Bonnes pratiques appliquées
- séparation controller / service
- validation côté backend obligatoire
- aucune confiance accordée au frontend
- gestion des erreurs avec exception NestJS

## 📌 Notes
- Le seed permet de créer un admin initial
- Le backend constitue la source de vérité des données