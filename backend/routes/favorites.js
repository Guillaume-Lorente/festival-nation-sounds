const express = require("express");
const router = express.Router();
const favoritesController = require("../controllers/favoritesController");
const verifyToken = require("../middlewares/authMiddleware");

// Liste des favoris d’un utilisateur
router.get("/:user_id", verifyToken, favoritesController.getUserFavorites);

// Ajouter un artiste aux favoris
router.post("/:user_id", verifyToken, favoritesController.addFavorite);

// Supprimer un artiste des favoris
router.delete(
  "/:user_id/:artist_id",
  verifyToken,
  favoritesController.removeFavorite
);

module.exports = router;
