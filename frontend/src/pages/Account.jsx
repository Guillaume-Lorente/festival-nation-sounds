import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";

export default function Account() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Si non connecté → redirige vers /login
  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  // Récupère les favoris
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/users/${user.id}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Erreur lors du chargement");
        } else {
          setFavorites(data);
        }
      } catch (err) {
        setError("Erreur serveur ou réseau");
      }
    };

    fetchFavorites();
  }, [user.id, token]);

  // Déconnexion
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Mon compte</h2>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-4"
      >
        Déconnexion
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {!error && favorites.length === 0 && <p>Aucun favori pour l’instant.</p>}

      <ul className="space-y-4">
  {favorites.map((artist) => (
    <li key={artist.id}>
      <ArtistCard artist={artist} linkToDetail={false} />
    </li>
  ))}
</ul>
    </div>
  );
}