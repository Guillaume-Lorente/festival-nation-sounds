const artistsModel = require("../models/artistsModel");

// Contrôleur pour récupérer tous les artistes
exports.getAllArtists = async (req, res) => {
  try {
    const artists = await artistsModel.findAll();
    res.json(artists);
  } catch (error) {
    console.error("Erreur dans getAllArtists:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Contrôleur pour récupérer un artiste par ID
exports.getArtistById = async (req, res) => {
  try {
    const artist = await artistsModel.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ error: "Artiste non trouvé" });
    }
    res.json(artist);
  } catch (error) {
    console.error("Erreur dans getArtistById:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// POST /api/artists
exports.createArtist = async (req, res) => {
  const { name, genre, description, image_url } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Le nom est requis." });
  }

  try {
    const artist = await artistsModel.create({
      name,
      genre,
      description,
      image_url,
    });
    res.status(201).json(artist);
  } catch (error) {
    console.error("Erreur dans createArtist:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// PUT /api/artists/:id
exports.updateArtist = async (req, res) => {
  const { name, genre, description, image_url } = req.body;

  try {
    const updated = await artistsModel.update(req.params.id, {
      name,
      genre,
      description,
      image_url,
    });

    if (!updated) {
      return res.status(404).json({ error: "Artiste introuvable" });
    }

    res.json(updated);
  } catch (error) {
    console.error("Erreur dans updateArtist:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// DELETE /api/artists/:id
exports.deleteArtist = async (req, res) => {
  try {
    const deleted = await artistsModel.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Artiste introuvable" });
    }
    res.json({ message: "Artiste supprimé", deleted });
  } catch (error) {
    console.error("Erreur dans deleteArtist:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
