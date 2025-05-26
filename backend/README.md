# 🎧 Festival Nation Sounds – Backend API

Ce dossier contient l’API REST du site du festival **Nation Sounds**, développée avec **Express.js** et connectée à une base **PostgreSQL**.

---

## 🚀 Stack technique

- **Node.js / Express**
- **PostgreSQL** (via `pg`)
- **JSON Web Tokens** pour l'authentification
- **bcrypt** pour le hash des mots de passe
- **CORS / morgan** pour les middlewares

## 🧪 Routes disponibles

### 🎤 Artistes (`/api/artists`)

| Méthode | Route  | Description             |
| ------- | ------ | ----------------------- |
| GET     | `/`    | Liste tous les artistes |
| GET     | `/:id` | Détail d’un artiste     |
| POST    | `/`    | Ajoute un artiste       |
| PUT     | `/:id` | Modifie un artiste      |
| DELETE  | `/:id` | Supprime un artiste     |

---

### 📅 Événements (`/api/events`)

| Méthode | Route                 |
| ------- | --------------------- |
| GET     | `/` – tous les events |
| GET     | `/:id` – par ID       |
| POST    | `/` – création        |
| PUT     | `/:id` – maj          |
| DELETE  | `/:id` – suppression  |

---

### 👤 Utilisateurs (`/api/users`)

| Méthode | Route       | Description                    |
| ------- | ----------- | ------------------------------ |
| POST    | `/register` | Créer un compte                |
| POST    | `/login`    | Se connecter                   |
| GET     | `/me`       | Infos du compte (token requis) |

---

### ⭐ Favoris (`/api/users/:id/favorites`)

| Méthode | Route         | Description                   |
| ------- | ------------- | ----------------------------- |
| GET     | `/`           | Liste les artistes favoris    |
| POST    | `/`           | Ajoute un artiste aux favoris |
| DELETE  | `/:artist_id` | Supprime un favori            |

> Toutes ces routes sont protégées par token JWT 🔐

---

## 🔐 Authentification

- À chaque connexion, l’API retourne un token JWT
- Ce token doit être ajouté dans les requêtes protégées :

```http
Authorization: Bearer <token>

---

## ⚙️ Pour le démarrage
cd backend
npm install
node server.js

---
## Fichier .env requis
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ton_mdp
DB_NAME=nation_sounds
JWT_SECRET=super_secret_token_key

---
📌 Auteurs
Développé dans le cadre d’une mise en situation professionnelle reconstituée – 2025
Par Guillaume Lorente
```
