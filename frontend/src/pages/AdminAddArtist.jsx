import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddArtist() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    name: "",
    genre: "",
    description: "",
    image_url: "",
    spotify_url: "",
    youtube_url: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      navigate("/admin/artists");
    } catch (err) {
      console.error("Erreur ajout artiste :", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl text-blue-600 font-bold mb-4">➕ Ajouter un artiste</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          className="border p-2 w-full"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={(e) =>
            setFormData({ ...formData, image_url: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="url"
          placeholder="Spotify URL"
          value={formData.spotify_url}
          onChange={(e) =>
            setFormData({ ...formData, spotify_url: e.target.value })
          }
          className="border p-2 w-full"
        />
        <input
          type="url"
          placeholder="YouTube URL"
          value={formData.youtube_url}
          onChange={(e) =>
            setFormData({ ...formData, youtube_url: e.target.value })
          }
          className="border p-2 w-full"
        />

        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            ➕ Ajouter
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/artists")}
            className="text-gray-600 underline"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}