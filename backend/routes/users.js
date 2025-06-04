const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/authMiddleware");
const validatePasswordStrength = require("../middlewares/validatePasswordStrenght");

// Inscription
router.post("/register", validatePasswordStrength, usersController.register);

// Connexion
router.post("/login", usersController.login);

// Récupérer l’utilisateur connecté
router.get("/me", verifyToken, usersController.getCurrentUser);

module.exports = router;
