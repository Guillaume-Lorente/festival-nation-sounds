import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { useFavorites } from "../contexts/FavoritesContext"; // ✅ Import du contexte

export default function Lineup() {
  const [artists, setArtists] = useState([]);
  const { favorites, addFavorite } = useFavorites(); // ✅ Récupère les favoris + fonction d'ajout

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/artists");
        const data = await res.json();
        setArtists(data);
      } catch (err) {
        console.error("Erreur lors du chargement des artistes :", err);
      }
    };

    fetchArtists();
  }, []);

  // ✅ Fonction appelée quand on clique sur "Ajouter aux favoris"
  const handleAddFavorite = (artistId) => {
    addFavorite(artistId);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Line-up</h2>

      <ul className="space-y-4">
        {artists.map((artist) => (
          <li key={artist.id}>
            <ArtistCard
              artist={artist}
              isFavorite={favorites.some((fav) => fav.id === artist.id)} // ✅ On vérifie si déjà ajouté
              onAddFavorite={handleAddFavorite} // ✅ Action pour ajouter
            />
          </li>
        ))}
      </ul>
    </div>
  );
}