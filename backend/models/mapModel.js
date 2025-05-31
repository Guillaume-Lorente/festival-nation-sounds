// models/mapModel.js
const pool = require("../db");

exports.findAll = async () => {
  const result = await pool.query("SELECT * FROM map_areas");
  return result.rows;
};

exports.findById = async (id) => {
  const result = await pool.query("SELECT * FROM map_areas WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

exports.create = async ({ name, type, x_coord, y_coord, description }) => {
  const result = await pool.query(
    "INSERT INTO map_areas (name, type, x_coord, y_coord, description) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, type, x_coord, y_coord, description]
  );
  return result.rows[0];
};

exports.update = async (id, { name, type, x_coord, y_coord, description }) => {
  const result = await pool.query(
    "UPDATE map_areas SET name=$1, type=$2, x_coord=$3, y_coord=$4, description=$5 WHERE id=$6 RETURNING *",
    [name, type, x_coord, y_coord, description, id]
  );
  return result.rows[0];
};

exports.delete = async (id) => {
  const result = await pool.query(
    "DELETE FROM map_areas WHERE id=$1 RETURNING *",
    [id]
  );
  return result.rows[0];
};
