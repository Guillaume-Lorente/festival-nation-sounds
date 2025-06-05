# 🎵 Nation Sounds Festival – Projet Fullstack

Bienvenue sur le dépôt du site **Nation Sounds Festival**, un projet fullstack conçu pour gérer un festival de musique avec une interface frontend dynamique et une API backend robuste.

---

## 🧱 Structure du projet

```
/frontend   → Interface React (Vite, Tailwind, Context API)
/backend    → API REST Node.js (Express, PostgreSQL)
/dist       → Version compilée du frontend (pour déploiement)
```

---

## 🎨 Frontend – React

L'interface utilisateur permet :

- de consulter la programmation du festival
- de gérer ses favoris
- de se connecter / créer un compte
- de gérer un panier de billets
- gestion de panier (React Context)

### 🔧 Stack

- React.js (via Vite)
- React Router DOM pour la navigation
- Tailwind CSS v3.4.3 - instabilité entre les environnements Tailwind CSS v4 et PostCSS/Vite actuel
- Context API (Favoris, Panier)
- Authentification via JWT (stocké dans `localStorage`)
- Interactions API avec `fetch`

### 🚀 Démarrage local

```bash
cd frontend
npm install
npm run dev
```

Accès : `http://localhost:5173`

---

## 🎧 Backend – API Express

Cette API REST permet de gérer les données du site (artistes, événements, utilisateurs, favoris...).

### 🔧 Stack

- Node.js / Express
- PostgreSQL (via `pg`)
- JWT pour l’auth
- bcrypt pour le hash
- CORS, morgan (middlewares)

### 📚 Fonctionnalités

- 🔐 Authentification sécurisée (JWT)
- 📅 Gestion des artistes et événements
- ⭐ Favoris par utilisateur
- 📍 Points de carte (`/api/map`)
- 📬 Formulaire de contact (`/api/contact`)
- 📍 Carte dynamique (via `mapController.js`)
- 📬 Formulaire de contact (via `contactController.js`)

### 🔌 Routes notables

- `POST /api/login`, `POST /api/register`
- `GET /api/artists`, `GET /api/events`
- `POST /api/users/:id/favorites`

> Toutes les routes sensibles sont protégées par token.

### 🧪 Démarrage local

```bash
cd backend
npm install
node server.js
```

Fichier `.env` requis :

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ton_mdp
DB_NAME=nation_sounds
JWT_SECRET=super_secret_token_key
```

---

## 🛠️ Espace d'administration (CMS)

Le site intègre un **espace réservé aux administrateurs** permettant de gérer dynamiquement le contenu affiché sur le frontend.

### 🔐 Accès

- L’admin doit être connecté avec un compte autorisé (JWT + rôle)
- Accès via une interface sécurisée (ex : `/admin` ou `/dashboard`)

### ✏️ Fonctions disponibles

- 👤 Gérer les utilisateurs
- 🎤 Ajouter / modifier / supprimer des artistes
- 📅 Gérer les événements du festival
- 📬 Consulter les messages reçus via le formulaire de contact

### ⚠️ Sécurité

- Authentification requise
- Vérification du rôle `admin` côté backend pour chaque action critique
- Tokens JWT vérifiés via middleware

> Toute tentative non autorisée est bloquée par l’API.

---

## 🌐 Déploiement

- **Frontend** : hébergeable via Vercel, Netlify ou autre
- **Backend** : compatible Render, Railway, Heroku, etc.
- Pensez à modifier les URLs dans le frontend pour pointer vers le backend en ligne

---

📌 Auteurs
Développé dans le cadre d’une mise en situation professionnelle reconstituée – 2025
Par Guillaume Lorente
