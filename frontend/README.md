# 🎨 Nation Sounds Festival – Frontend

Ce dossier contient l’interface utilisateur du site **Nation Sounds**, développée en **React.js**.  
Elle permet de consulter la programmation du festival, se connecter à un compte, et ajouter des artistes en favoris.

---

## ⚙️ Stack utilisée

- **React.js** avec Vite
- **React Router DOM** pour la navigation
- **Tailwind CSS** pour le style
- **Thunder Client** / `fetch` pour interagir avec l'API
- Stockage du `token` dans `localStorage`

---

## 📁 Arborescence simplifiée

frontend/
├── src/
│ ├── components/
│ │ └── Header.jsx
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Lineup.jsx
│ │ ├── Login.jsx
│ │ └── Account.jsx
│ ├── App.jsx
│ └── main.jsx
├── public/
├── index.html
└── README.md

yaml
Copier

---

## 🧭 Pages et navigation

| URL        | Rôle                           |
| ---------- | ------------------------------ |
| `/`        | Accueil du site                |
| `/login`   | Connexion de l’utilisateur     |
| `/account` | Liste des artistes favoris     |
| `/lineup`  | Liste des artistes du festival |

> L'accès à `/account` est protégé : nécessite un token valide dans `localStorage`.

---

## 🔐 Authentification

- Lors de la connexion (`/login`), l’API retourne :
  - un token JWT
  - un objet `user`
- Ces données sont stockées dans `localStorage` :
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

Le token est inclus dans l'en-tête Authorization des requêtes protégées.

---

⭐ Favoris

Sur la page /lineup, un bouton “Ajouter aux favoris” apparaît si l’utilisateur est connecté.

Les favoris sont envoyés via :
POST / api/users/:id/favorites
Authorization: Bearer <token>

L'utilisateur peut consulter ses favoris sur /account.

---

🖥️ Démarrage local
📦 Installation

cd frontend
npm install

🚀 Lancement
npm run dev

L'application sera disponible sur : http://localhost:5173

---

🔗 Dépendances principales
react
react-router-dom
tailwindcss (préconfiguré avec Vite)
vite (outil de build et dev-server)

---

📌 Auteurs
Développé dans le cadre d’une mise en situation professionnelle reconstituée – 2025
Par Guillaume Lorente

---
