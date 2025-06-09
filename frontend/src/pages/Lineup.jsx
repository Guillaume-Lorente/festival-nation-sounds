import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Lineup() {
  const [day, setDay] = useState("all");
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite } = useFavorites();

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      try {
        if (day === "all") {
          const res = await fetch("http://localhost:5000/api/artists");
          const data = await res.json();
          setArtists(data);
        } else {
          const eventRes = await fetch(`http://localhost:5000/api/events?day=${day}`);
          const events = await eventRes.json();

          const artistIds = [...new Set(events.map((event) => event.artist_id))];
          const artistFetches = artistIds.map((id) =>
            fetch(`http://localhost:5000/api/artists/${id}`).then((res) => res.json())
          );
          const artistData = await Promise.all(artistFetches);
          setArtists(artistData);
        }
      } catch (err) {
        console.error("Erreur lors du chargement des artistes :", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, [day]);

  const handleAddFavorite = (artistId) => {
    addFavorite(artistId);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="sr-only">Programmation du festival Nation Sounds</h1>

      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">🎤 La Programmation</h2>
        <p className="text-gray-600 mb-6">
          Découvre les artistes présents chaque jour du festival.
        </p>

        {/* Filtres par jour */}
        <div className="flex justify-center flex-wrap gap-4 mb-8" role="group" aria-label="Filtrer la programmation par jour">
          {[
            { label: "Toute la programmation", value: "all", color: "bg-gradient-to-r from-blue-400 to-indigo-500" },
            { label: "Vendredi", value: "vendredi", color: "bg-gradient-to-r from-pink-400 to-red-500" },
            { label: "Samedi", value: "samedi", color: "bg-gradient-to-r from-green-400 to-emerald-500" },
            { label: "Dimanche", value: "dimanche", color: "bg-gradient-to-r from-yellow-400 to-orange-500" },
          ].map(({ label, value, color }) => (
            <button
              key={value}
              onClick={() => setDay(value)}
              className={`text-white px-5 py-3 rounded-lg shadow-md font-semibold transition transform hover:scale-105 ${
                value === day ? `${color} border-4 border-white` : `${color} opacity-80`
              }`}
              aria-current={value === day ? "true" : undefined}
              aria-label={`Afficher les artistes du ${label.toLowerCase()}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des artistes */}
      {loading ? (
        <p className="text-center">Chargement en cours...</p>
      ) : (
        <ul
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          aria-label={`Liste des artistes pour ${day === "all" ? "tous les jours" : `le ${day}`}`}
        >
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
      )}
    </div>
  );
}