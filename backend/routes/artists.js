const express = require("express");
const router = express.Router();
const artistsController = require("../controllers/artistsController");

// GET tous les artistes
router.get("/", artistsController.getAllArtists);

// GET un artiste par ID
router.get("/:id", artistsController.getArtistById);

// POST nouveau artiste
router.post("/", artistsController.createArtist);

// PUT modifier artiste
router.put("/:id", artistsController.updateArtist);

// DELETE artiste
router.delete("/:id", artistsController.deleteArtist);

module.exports = router;
