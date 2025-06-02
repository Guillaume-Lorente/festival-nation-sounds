const eventsModel = require("../models/eventsModel");

// GET /api/events?day=
exports.getAllEvents = async (req, res) => {
  try {
    const { day, map_area_id } = req.query;
    let events;

    if (map_area_id) {
      events = await eventsModel.findByMapAreaId(map_area_id); // ✅ AJOUTÉ
    } else if (day) {
      events = await eventsModel.findByDay(day);
    } else {
      events = await eventsModel.findAll();
    }

    res.json(events);
  } catch (error) {
    console.error("Erreur dans getAllEvents:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// GET /api/events/:id
exports.getEventById = async (req, res) => {
  try {
    const event = await eventsModel.findById(req.params.id);
    if (!event) return res.status(404).json({ error: "Événement introuvable" });
    res.json(event);
  } catch (error) {
    console.error("Erreur dans getEventById:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/events
exports.createEvent = async (req, res) => {
  const { title, date, stage, artist_id } = req.body;

  if (!title || !date || !stage || !artist_id) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  try {
    const event = await eventsModel.create({ title, date, stage, artist_id });
    res.status(201).json(event);
  } catch (error) {
    console.error("Erreur dans createEvent:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// PUT /api/events/:id
exports.updateEvent = async (req, res) => {
  const { title, date, stage, artist_id } = req.body;

  try {
    const updated = await eventsModel.update(req.params.id, {
      title,
      date,
      stage,
      artist_id,
    });
    if (!updated)
      return res.status(404).json({ error: "Événement introuvable" });
    res.json(updated);
  } catch (error) {
    console.error("Erreur dans updateEvent:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// DELETE /api/events/:id
exports.deleteEvent = async (req, res) => {
  try {
    const deleted = await eventsModel.delete(req.params.id);
    if (!deleted)
      return res.status(404).json({ error: "Événement introuvable" });
    res.json({ message: "Événement supprimé", deleted });
  } catch (error) {
    console.error("Erreur dans deleteEvent:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
