const pool = require("../db");

// Trouver un utilisateur par email
exports.findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

// Créer un nouvel utilisateur
exports.createUser = async ({ email, username, password }) => {
  const result = await pool.query(
    "INSERT INTO users (email, username, password) VALUES ($1, $2, $3) RETURNING id, email, username",
    [email, username, password]
  );
  return result.rows[0];
};
