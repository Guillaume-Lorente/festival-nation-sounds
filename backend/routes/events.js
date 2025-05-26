const express = require("express");
const router = express.Router();
const eventsController = require("../controllers/eventsController");

// Toutes les routes liées aux événements
router.get("/", eventsController.getAllEvents);
router.get("/:id", eventsController.getEventById);
router.post("/", eventsController.createEvent);
router.put("/:id", eventsController.updateEvent);
router.delete("/:id", eventsController.deleteEvent);

module.exports = router;
