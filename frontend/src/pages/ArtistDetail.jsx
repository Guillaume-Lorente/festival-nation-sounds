import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const { favorites, addFavorite } = useFavorites();

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Artiste introuvable");
        } else {
          setArtist(data);
        }
      } catch (err) {
        setError("Erreur serveur");
      }
    };

    fetchArtist();
  }, [id]);

  const isFavorite = favorites.some((fav) => fav.id === artist?.id);

  const handleAddFavorite = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addFavorite(artist.id);
  };

  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!artist) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">{artist.name}</h2>
      {artist.genre && <p className="text-gray-600 mb-4">{artist.genre}</p>}
      {artist.description && <p className="mb-6">{artist.description}</p>}

      {user && (
        <button
          onClick={handleAddFavorite}
          disabled={isFavorite}
          className={`w-full py-2 px-4 rounded transition ${
            isFavorite
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {isFavorite ? "✔️ Déjà en favoris" : "★ Ajouter aux favoris"}
        </button>
      )}
    </div>
  );
}