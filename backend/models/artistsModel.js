// Connexion à la base PostgreSQL
const pool = require("../db");

// Récupère tous les artistes
exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM artists");
  return result.rows;
};

// Récupère un artiste par son ID
exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM artists WHERE id = $1", [id]);
  return result.rows[0];
};

// Crée un nouvel artiste
exports.create = async ({ name, genre, description, image_url }) => {
  const result = await pool.query(
    `INSERT INTO artists (name, genre, description, image_url, spotify_url, youtube_url)
VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [name, genre, description, image_url]
  );
  return result.rows[0];
};

// Met à jour un artiste existant
exports.update = async (id, { name, genre, description, image_url }) => {
  const result = await pool.query(
    `UPDATE artists
SET name = $1, genre = $2, description = $3, image_url = $4, spotify_url = $5, youtube_url = $6
WHERE id = $7
     RETURNING *`,
    [name, genre, description, image_url, id]
  );
  return result.rows[0];
};

// Supprime un artiste
exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM artists WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
