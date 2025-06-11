const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const verifyToken = require("../middlewares/authMiddleware");

// Liste des favoris d’un utilisateur
router.get(
  "/user/:user_id/favorites",
  verifyToken,
  favoritesController.getUserFavorites
);

// Ajouter un artiste aux favoris
router.post(
  "/user/:user_id/favorites",
  verifyToken,
  favoritesController.addFavorite
);

// Supprimer un favori
router.delete(
  "/user/:user_id/favorites/:artist_id",
  verifyToken,
  favoritesController.removeFavorite
);

module.exports = router;
