# 🎨 Nation Sounds Festival – Frontend

Ce dossier contient l’interface utilisateur du site **Nation Sounds**, développée en **React.js**.  
Elle permet de consulter la programmation du festival, se connecter à un compte, et ajouter des artistes en favoris.

---

## ⚙️ Stack utilisée

- **React.js** avec Vite
- **React Router DOM** pour la navigation
- **Tailwind CSS version 3.4.3** pour le style car instabilité entre les environnements Tailwind CSS v4 et PostCSS/Vite actuel
- **Thunder Client** / `fetch` pour interagir avec l'API
- Gestion des favoris via Context API
- Auth via JWT (token dans `localStorage`)
- Connexion à une API Node.js/Express
- Stockage du `token` dans `localStorage`

---

## 📁 Arborescence simplifiée

frontend/
├── src/
│ ├── components/ # Composants génériques (Header, ArtistCard, etc.)
│ ├── context/ # Contexts (CartContext, FavoritesContext)
│ ├── pages/ # Pages (Home, Lineup, Login, etc.)
│ ├── App.jsx
│ └── main.jsx
├── public/
├── index.html
└── README.md

---

## 🧭 Pages et navigation

| URL         | Fonction                             |
| ----------- | ------------------------------------ |
| `/`         | Page d’accueil                       |
| `/lineup`   | Liste des artistes                   |
| `/login`    | Connexion                            |
| `/register` | Création de compte                   |
| `/account`  | Profil utilisateur (favoris, logout) |
| `/tickets`  | Choix de billets à acheter           |
| `/cart`     | Récapitulatif + bouton de commande   |

> ✅ Accès sécurisé aux pages sensibles (compte, favoris)

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

🛒 Panier
Gestion via CartContext

Page dédiée /cart avec compteur

"Valider mon panier" (placeholder)

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
