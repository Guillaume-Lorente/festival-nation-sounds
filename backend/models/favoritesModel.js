const pool = require("../db");

// Récupère les artistes favoris d’un utilisateur (avec nom des artistes)
exports.findByUserId = async (userId) => {
  const result = await pool.query(
    `SELECT a.id, a.name, a.image_url
     FROM favorites f
     JOIN artists a ON f.artist_id = a.id
     WHERE f.user_id = $1`,
    [userId]
  );
  return result.rows;
};

// Ajoute un artiste aux favoris
exports.addFavorite = async (userId, artist_id) => {
  const result = await pool.query(
    "INSERT INTO favorites (user_id, artist_id) VALUES ($1, $2) RETURNING *",
    [userId, artist_id]
  );
  return result.rows[0];
};

// Supprime un artiste des favoris
exports.removeFavorite = async (userId, artist_id) => {
  const result = await pool.query(
    "DELETE FROM favorites WHERE user_id = $1 AND artist_id = $2 RETURNING *",
    [userId, artist_id]
  );
  return result.rows[0];
};
