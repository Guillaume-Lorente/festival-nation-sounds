// Charge les variables d’environnement (.env)
require("dotenv").config();

// Importe l'application Express
const express = require("express");
const app = require("./app");
const path = require("path");

// Servir les fichiers React (frontend build)
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// Détermine le port à utiliser
const PORT = process.env.PORT || 5000;

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
