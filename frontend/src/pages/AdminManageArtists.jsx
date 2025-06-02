import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminManageArtists() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setArtists(data);
      } catch (err) {
        console.error("Erreur lors du chargement des artistes", err);
      }
    };

    fetchArtists();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet artiste ?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/artists/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        setArtists((prev) => prev.filter((artist) => artist.id !== id));
      }
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">🎤 Gestion des artistes</h1>
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
      >
        ⬅️ Retour au Dashboard
      </button>
    </div>

    <button
      onClick={() => navigate("/admin/add-artist")}
      className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      ➕ Ajouter un artiste
    </button>

      {artists.length === 0 ? (
        <p>Aucun artiste trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {artists.map((artist) => (
            <li key={artist.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{artist.name}</p>
                <p className="text-sm text-gray-600">{artist.genre}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/artists/${artist.id}`)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(artist.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}