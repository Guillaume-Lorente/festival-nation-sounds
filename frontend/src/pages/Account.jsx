import { useEffect, useState } from "react";

export default function Account() {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  // 🔐 Récupération des infos utilisateur
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // ✅ Appel à l’API pour récupérer les favoris
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !token) {
        setError("Utilisateur non connecté");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/users/${user.id}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Erreur lors du chargement des favoris");
        } else {
          setFavorites(data); // Stocke les favoris
        }
      } catch (err) {
        setError("Erreur réseau ou serveur");
      }
    };

    fetchFavorites();
  }, [user, token]); // Exécuté si user ou token change

  return (
    <div>
      <h2>Mes artistes favoris</h2>

      {/* Affiche une erreur si besoin */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Affiche un message si aucun favori */}
      {!error && favorites.length === 0 && <p>Aucun favori pour l’instant.</p>}

      {/* Affiche la liste des artistes favoris */}
      <ul>
        {favorites.map((artist) => (
          <li key={artist.id}>
            <strong>{artist.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}