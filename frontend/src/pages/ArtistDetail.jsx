import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

export default function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));
  const { favorites, addFavorite } = useFavorites();

  useEffect(() => {
    const fetchArtistAndEvent = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Artiste introuvable");
          return;
        }

        setArtist(data);

        // Cherche l'événement correspondant
        const eventRes = await fetch("http://localhost:5000/api/events");
        const events = await eventRes.json();
        const foundEvent = events.find((e) => e.artist_id === Number(id));
        setEvent(foundEvent);
      } catch (err) {
        setError("Erreur serveur");
      }
    };

    fetchArtistAndEvent();
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
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={artist.image_url}
          alt={artist.name}
          className="w-full md:w-1/2 rounded shadow object-cover"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2 text-blue-700">{artist.name}</h2>
          {artist.genre && <p className="text-gray-600 mb-4">{artist.genre}</p>}
          {artist.description && <p className="mb-6">{artist.description}</p>}

          {event && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-4">
              <p><strong>Jour :</strong> {new Date(event.date).toLocaleDateString("fr-FR", { weekday: "long" })}</p>
              <p><strong>Heure :</strong> {new Date(event.date).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}</p>
              <p><strong>Scène :</strong> {event.stage}</p>
            </div>
          )}

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

          {artist.spotify_url && (
            <a
              href={artist.spotify_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              🎧 Écouter sur Spotify
            </a>
          )}
        </div>
      </div>

      {artist.youtube_url && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">🎬 Clip</h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={artist.youtube_url}
              className="w-full h-64 md:h-96"
              title="Clip de l'artiste"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}