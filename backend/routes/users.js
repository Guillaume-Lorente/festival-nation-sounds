const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const verifyToken = require("../middlewares/authMiddleware");

// Inscription
router.post("/register", usersController.register);

// Connexion
router.post("/login", usersController.login);

// Récupérer l’utilisateur connecté
router.get("/me", verifyToken, usersController.getCurrentUser);

module.exports = router;
