// controllers/mapController.js
const mapModel = require("../models/mapModel");

exports.getAllAreas = async (req, res) => {
  try {
    const areas = await mapModel.findAll();
    res.json(areas);
  } catch (error) {
    console.error("Erreur getAllAreas:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.getAreaById = async (req, res) => {
  try {
    const area = await mapModel.findById(req.params.id);
    if (!area) return res.status(404).json({ error: "Zone non trouvée" });
    res.json(area);
  } catch (error) {
    console.error("Erreur getAreaById:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.createArea = async (req, res) => {
  const { name, type, x_coord, y_coord, description } = req.body;
  if (!name || !type || x_coord == null || y_coord == null) {
    return res.status(400).json({ error: "Champs obligatoires manquants" });
  }
  try {
    const newArea = await mapModel.create({
      name,
      type,
      x_coord,
      y_coord,
      description,
    });
    res.status(201).json(newArea);
  } catch (error) {
    console.error("Erreur createArea:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateArea = async (req, res) => {
  try {
    const updated = await mapModel.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Zone introuvable" });
    res.json(updated);
  } catch (error) {
    console.error("Erreur updateArea:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteArea = async (req, res) => {
  try {
    const deleted = await mapModel.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Zone introuvable" });
    res.json({ message: "Zone supprimée", deleted });
  } catch (error) {
    console.error("Erreur deleteArea:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
