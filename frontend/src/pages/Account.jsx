import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";


export default function Account() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const { favorites, removeFavorite } = useFavorites();

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
        <li
          key={artist.id}
          className="flex justify-between items-center border rounded p-4 shadow flex-col sm:flex-row sm:items-start sm:space-x-4"
        >
          <div className="flex-1 text-left">
            <p className="text-lg font-semibold">{artist.name}</p>
            {artist.genre && (
              <p className="text-sm text-gray-600">Genre : {artist.genre}</p>
            )}
            {artist.date && artist.stage && (
  <p className="text-sm text-blue-600">
    📅 {new Date(artist.date).toLocaleDateString()} – 🕒 {new Date(artist.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – 🎪 {artist.stage}
  </p>
)}
          </div>

          <div className="flex space-x-2 mt-4 sm:mt-0">
            <Link
              to={`/artist/${artist.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
            >
              Voir la fiche
            </Link>

            <button
              onClick={() => removeFavorite(artist.id)}
              className="text-sm bg-gray-200 text-red-600 px-3 py-1 rounded hover:bg-gray-300"
            >
              Retirer
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}