const axios = require("axios");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

// POST /api/register
exports.register = async (req, res) => {
  const { email, username, password, recaptchaToken } = req.body;

  if (!email || !username || !password || !recaptchaToken) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  // ✅ Vérification reCAPTCHA côté serveur
  try {
    const verification = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      }
    );

    if (!verification.data.success) {
      return res
        .status(400)
        .json({ error: "Échec de la vérification reCAPTCHA." });
    }
  } catch (err) {
    console.error("Erreur reCAPTCHA :", err.message);
    return res.status(500).json({ error: "Erreur serveur reCAPTCHA." });
  }

  // ✅ Suite du traitement (utilisateur déjà existant, hash, etc.)
  try {
    const existingUser = await usersModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await usersModel.createUser({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email et mot de passe requis" });
  }

  try {
    const user = await usersModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe invalide" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Email ou mot de passe invalide" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userData } = user;
    res.json({ message: "Connexion réussie", user: userData, token });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /api/me (route protégée)
exports.getCurrentUser = async (req, res) => {
  res.json({ message: "Utilisateur connecté", user: req.user });
};
