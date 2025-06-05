import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../context/FavoritesContext"; // 🔄 Import du contexte des favoris

export default function ArtistCard({ artist, linkToDetail = true }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🔄 On récupère les favoris et la fonction d’ajout depuis le contexte
  const { favorites, addFavorite } = useContext(FavoritesContext);

  const isAlreadyFavorite = favorites.some((fav) => fav.id === artist.id);

  const handleImageError = (e) => {
    e.target.src = "/images/default-artist.png"; // Fallback image
    e.target.alt = "Image non disponible";
  };

  return (
  <div className="bg-yellow-400 p-4 border rounded-xl shadow flex flex-col justify-between w-full">
    {/* Partie image + texte centrée */}
    <div className="text-center">
      <div className="w-full mb-2">
        <img
          src={artist.image_url}
          alt={artist.name}
          onError={handleImageError}
          className="w-full h-full object-cover rounded-xl"
        />
      </div>

      {linkToDetail ? (
        <Link
          to={`/artist/${artist.id}`}
          className="text-xl font-bold text-red-600 block"
        >
          {artist.name}
        </Link>
      ) : (
        <p className="text-lg font-semibold text-red-600">{artist.name}</p>
      )}

      {artist.genre && (
        <p className="text-md text-black-600">{artist.genre}</p>
      )}
    </div>

    {/* Bouton favori en bas */}
    <button
      onClick={() => {
          if (!user) {
            alert("Veuillez vous connecter pour ajouter un favori.");
            return;
          }
          addFavorite(artist.id);
        }}
        disabled={isAlreadyFavorite}
        aria-pressed={isAlreadyFavorite}
        aria-label={
          isAlreadyFavorite
            ? `${artist.name} est déjà dans vos favoris`
            : `Ajouter ${artist.name} aux favoris`
        }
        className={`mt-4 w-full px-4 py-2 rounded transition-all duration-200 ${
          isAlreadyFavorite
            ? "bg-blue-200 text-yellow-600 cursor-not-allowed"
            : "bg-blue-600 text-yellow-300 hover:bg-blue-300"
        }`}
      >
        {isAlreadyFavorite ? "✔️ Déjà en favoris" : "★ Ajouter aux favoris"}
      </button>
  </div>
);
}