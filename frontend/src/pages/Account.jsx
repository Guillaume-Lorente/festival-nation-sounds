import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext"; // ✅ On utilise maintenant le contexte
import ArtistCard from "../components/ArtistCard";

export default function Account() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const { favorites, removeFavorite } = useFavorites(); // ✅ Accès au contexte

  // Redirection si utilisateur non connecté
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  // Déconnexion
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="bg-white rounded shadow p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2">Bienvenue {user?.username} 👋</h2>
        <p className="text-gray-600">Voici vos artistes favoris :</p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
      >
        Déconnexion
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {!error && favorites.length === 0 && <p>Aucun favori pour l’instant.</p>}

      <ul className="space-y-4">
        {favorites.map((artist) => (
          <li key={artist.id} className="flex justify-between items-center border rounded p-4 shadow">
            <div>
              <p className="text-lg font-semibold">{artist.name}</p>
              {artist.genre && <p className="text-sm text-gray-600">{artist.genre}</p>}
            </div>
            <button
              onClick={() => removeFavorite(artist.id)}
              className="text-sm bg-gray-200 text-red-600 px-3 py-1 rounded hover:bg-gray-300"
            >
              Retirer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}