const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const verifyToken = require("../middlewares/authMiddleware");

// Liste des favoris d’un utilisateur
router.get("/:id/favorites", verifyToken, favoritesController.getUserFavorites);

// Ajouter un artiste aux favoris
router.post("/:id/favorites", verifyToken, favoritesController.addFavorite);

// Supprimer un artiste des favoris
router.delete(
  "/:id/favorites/:artist_id",
  verifyToken,
  favoritesController.removeFavorite
);

module.exports = router;
