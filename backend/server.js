// Charge les variables d’environnement (.env)
require("dotenv").config();

// Importe l'application Express
const app = require("./app");

// Détermine le port à utiliser
const PORT = process.env.PORT || 5000;

// Démarre le serveur
app.listen(PORT, () => {
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
