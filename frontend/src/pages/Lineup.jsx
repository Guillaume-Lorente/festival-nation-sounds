import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Lineup() {
  const [artists, setArtists] = useState([]);
  const { favorites, addFavorite } = useFavorites();

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

  const handleAddFavorite = (artistId) => {
    addFavorite(artistId);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">🎤 La line-up</h2>
        <p className="text-gray-600">
          Découvre les artistes qui vont enflammer la scène !
        </p>
      </div>

      <ul className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
        {artists.map((artist) => (
          <li key={artist.id}>
            <ArtistCard
              artist={artist}
              isFavorite={favorites.some((fav) => fav.id === artist.id)}
              onAddFavorite={handleAddFavorite}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}