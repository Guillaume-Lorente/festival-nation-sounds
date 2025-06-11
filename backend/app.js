const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Charge les variables d’environnement
require("dotenv").config();

// Crée une instance de l’app Express
const app = express();

// === MIDDLEWARES GLOBAUX ===
app.use(cors()); // Autorise les requêtes cross-origin
app.use(express.json()); // Parse les corps de requêtes JSON
app.use(morgan("dev")); // Log les requêtes dans la console

// === ROUTES ===
const artistsRoutes = require("./routes/artists");
const eventsRoutes = require("./routes/events");
const usersRoutes = require("./routes/users");
const favoritesRoutes = require("./routes/favorites");
const mapAreasRoutes = require("./routes/mapAreas");
const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contact");

// Montage des routes sur les préfixes d’API
app.use("/api/artists", artistsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/users", favoritesRoutes);
app.use("/api/map-areas", mapAreasRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/contact", contactRoutes);

// Export de l’app pour utilisation dans server.js
module.exports = app;
