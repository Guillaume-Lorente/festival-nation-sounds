import { useEffect, useState } from "react";

export default function Lineup() {
  const [artists, setArtists] = useState([]);
  const [message, setMessage] = useState("");
  const [favoritesAdded, setFavoritesAdded] = useState(new Set());

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

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

  const handleFavorite = async (artistId) => {
    if (!user || !token) {
      setMessage("Connectez-vous pour ajouter un favori.");
      return;
    }

    // désactive le bouton
    if (favoritesAdded.has(artistId)) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${user.id}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ artist_id: artistId }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Erreur");
      } else {
        setMessage(`✅ "${data.name || 'Artiste'}" ajouté aux favoris.`);
        setFavoritesAdded((prev) => new Set(prev).add(artistId));
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout aux favoris :", error);
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Line-up</h2>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <ul className="space-y-4">
        {artists.map((artist) => (
          <li
            key={artist.id}
            className="p-4 border rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{artist.name}</h3>
              {artist.genre && <p className="text-sm text-gray-600">{artist.genre}</p>}
            </div>
            {user && (
              <button
                onClick={() => handleFavorite(artist.id)}
                disabled={favoritesAdded.has(artist.id)}
                className={`px-3 py-1 rounded transition ${
                  favoritesAdded.has(artist.id)
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-yellow-400 text-black hover:bg-yellow-300"
                }`}
              >
                {favoritesAdded.has(artist.id) ? "Ajouté" : "★ Favori"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}