import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddArtist() {
  const navigate = useNavigate();
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    description: "",
    image_url: "",
    spotify_url: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(artist)
      });

      if (!res.ok) throw new Error("Erreur");

      alert("Artiste ajouté !");
      navigate("/admin/dashboard");
    } catch (err) {
      alert("Échec de l’ajout");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Ajouter un artiste</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={artist.name}
          onChange={(e) => setArtist({ ...artist, name: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Genre"
          value={artist.genre}
          onChange={(e) => setArtist({ ...artist, genre: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={artist.description}
          onChange={(e) => setArtist({ ...artist, description: e.target.value })}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={artist.image_url}
          onChange={(e) => setArtist({ ...artist, image_url: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Spotify URL"
          value={artist.spotify_url}
          onChange={(e) => setArtist({ ...artist, spotify_url: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Ajouter
        </button>
      </form>
    </div>
  );
}