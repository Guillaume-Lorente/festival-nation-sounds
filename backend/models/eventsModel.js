const pool = require("../db");

// Récupère tous les événements
exports.findAll = async () => {
  const result = await pool.query(
    `SELECT events.*, artists.name AS artist_name
     FROM events
     JOIN artists ON events.artist_id = artists.id`
  );
  return result.rows;
};

// Récupère un événement par ID
exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM events WHERE id = $1", [id]);
  return result.rows[0];
};

// Récupère tous les événements d'un jour donné
// DOW : 0 = Sunday, 1 = Monday, ..., 6 = Saturday
exports.findByDay = async (day) => {
  const dayMap = {
    dimanche: 0,
    lundi: 1,
    mardi: 2,
    mercredi: 3,
    jeudi: 4,
    vendredi: 5,
    samedi: 6,
  };
  const dow = dayMap[day.toLowerCase()];
  const result = await pool.query(
    `SELECT * FROM events WHERE EXTRACT(DOW FROM date) = $1`,
    [dow]
  );
  return result.rows;
};

// Crée un nouvel événement
exports.create = async ({ title, date, stage, artist_id }) => {
  const result = await pool.query(
    `INSERT INTO events (title, date, stage, artist_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, date, stage, artist_id]
  );
  return result.rows[0];
};

// Met à jour un événement existant
exports.update = async (id, { title, date, stage, artist_id }) => {
  const result = await pool.query(
    `UPDATE events
     SET title = $1, date = $2, stage = $3, artist_id = $4
     WHERE id = $5
     RETURNING *`,
    [title, date, stage, artist_id, id]
  );
  return result.rows[0];
};

// Supprime un événement
exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM events WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
