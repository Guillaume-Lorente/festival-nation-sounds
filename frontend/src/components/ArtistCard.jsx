import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useState } from "react";

export default function ArtistCard({ artist, linkToDetail = true }) {
  const { favorites, addFavorite } = useFavorites();
  const [message, setMessage] = useState("");

  const isFavorite = favorites.some((fav) => fav.id === artist.id);

  const handleAdd = async () => {
    if (isFavorite) return;

    const result = await addFavorite(artist.id);
    if (result.success) {
      setMessage(`✅ "${artist.name}" ajouté aux favoris`);
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        {linkToDetail ? (
          <Link
            to={`/artists/${artist.id}`}
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            {artist.name}
          </Link>
        ) : (
          <p className="text-lg font-semibold">{artist.name}</p>
        )}
        {artist.genre && <p className="text-sm text-gray-600">{artist.genre}</p>}
      </div>

      <div className="ml-4 text-right">
        <button
          onClick={handleAdd}
          disabled={isFavorite}
          className={`px-4 py-2 rounded ${
            isFavorite
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {isFavorite ? "Ajouté" : "★ Ajouter aux favoris"}
        </button>

        {message && <p className="text-sm mt-1 text-green-600">{message}</p>}
      </div>
    </div>
  );
}