// routes/mapAreas.js
const express = require("express");
const router = express.Router();
const mapController = require("../controllers/mapController");

// GET toutes les zones de la carte
router.get("/", mapController.getAllAreas);

// GET une zone par ID
router.get("/:id", mapController.getAreaById);

// POST une nouvelle zone
router.post("/", mapController.createArea);

// PUT mettre à jour une zone
router.put("/:id", mapController.updateArea);

// DELETE une zone
router.delete("/:id", mapController.deleteArea);

module.exports = router;
