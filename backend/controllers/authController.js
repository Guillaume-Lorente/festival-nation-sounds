const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const pool = require("../db");
require("dotenv").config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) return res.status(401).json({ error: "Utilisateur non trouvé" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ error: "Mot de passe incorrect" });

    if (!user.is_admin)
      return res
        .status(403)
        .json({ error: "Accès réservé aux administrateurs" });

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: true },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.json({ token });
  } catch (err) {
    console.error("Erreur login admin :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
