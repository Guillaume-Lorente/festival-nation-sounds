const favoritesModel = require("../models/favoritesModel");
const pool = require("../db"); // Ajout nécessaire pour requête directe à artists

// GET /api/users/:id/favorites
exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.params.id;
    const favorites = await favoritesModel.findByUserId(userId);
    res.json(favorites);
  } catch (error) {
    console.error("Erreur dans getUserFavorites:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/users/:id/favorites
exports.addFavorite = async (req, res) => {
  const userId = req.params.id;
  const { artist_id } = req.body;

  if (!artist_id) {
    return res.status(400).json({ error: "L'ID de l'artiste est requis." });
  }

  try {
    // Ajoute le favori dans la table favorites
    await favoritesModel.addFavorite(userId, artist_id);

    // Récupère l'artiste complet
    const result = await pool.query(
      "SELECT id, name, genre, image_url FROM artists WHERE id = $1",
      [artist_id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Artiste introuvable" });
    }

    res.status(201).json(result.rows[0]); // Renvoie l'artiste complet
  } catch (error) {
    console.error("Erreur dans addFavorite:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// DELETE /api/users/:id/favorites/:artist_id
exports.removeFavorite = async (req, res) => {
  const userId = req.params.id;
  const artistId = req.params.artist_id;

  try {
    const deleted = await favoritesModel.removeFavorite(userId, artistId);
    if (!deleted) {
      return res.status(404).json({ error: "Favori introuvable" });
    }
    res.json({ message: "Favori supprimé", deleted });
  } catch (error) {
    console.error("Erreur dans removeFavorite:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
