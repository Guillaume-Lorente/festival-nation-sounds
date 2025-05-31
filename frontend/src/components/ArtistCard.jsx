import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext"; // 🔄 Import du contexte des favoris

export default function ArtistCard({ artist, linkToDetail = true }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔄 On récupère les favoris et la fonction d’ajout depuis le contexte
  const { favorites, addFavorite } = useContext(FavoritesContext);

   const isAlreadyFavorite = favorites.some((fav) => fav.id === artist.id);

  return (
    <div className="p-4 border rounded shadow flex justify-between items-center">
      <div>
        <img src={artist.image_url} alt={artist.name} className="w-full h-40 object-cover rounded" />
        {/* 🔗 Lien vers la page détail si autorisé */}
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
        {/* 🎵 Genre affiché si présent */}
        {artist.genre && (
          <p className="text-sm text-gray-600">{artist.genre}</p>
        )}
      </div>

      {/* ⭐ Bouton Favori, visible seulement si connecté */}
       <button
  onClick={() => {
    if (!user) {
      alert("Veuillez vous connecter pour ajouter un favori.");
      return;
    }
    addFavorite(artist.id);
  }}
          disabled={isAlreadyFavorite}
          className={`px-4 py-2 rounded mt-2 transition-all duration-200 ${
            isAlreadyFavorite
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-yellow-400 text-black hover:bg-yellow-300"
          }`}
        >
          {isAlreadyFavorite ? "✔️ Déjà en favoris" : "★ Ajouter aux favoris"}
        </button>
    </div>
  );
}