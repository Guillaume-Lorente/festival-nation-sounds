import { useParams, useNavigate } from "react-router-dom"; // Pour récupérer l'ID dans l'URL et rediriger
import { useEffect, useState } from "react"; // Hooks React
import ArtistCard from "../components/ArtistCard";
import FavoriteButton from "../components/FavoriteButton";

export default function ArtistDetail() {
  const { id } = useParams(); // Récupère l'ID de l'artiste dans l'URL
  const [artist, setArtist] = useState(null); // Stocke les données de l’artiste
  const [error, setError] = useState(""); // Gère les erreurs serveur
  const [message, setMessage] = useState(""); // Message d’ajout aux favoris

  const user = JSON.parse(localStorage.getItem("user")); // Récupère l’utilisateur connecté
  const token = localStorage.getItem("token"); // Récupère le token
  const navigate = useNavigate(); // Pour rediriger si non connecté

  // Effet déclenché à l’ouverture de la page
  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Artiste introuvable"); // Si l’artiste n’existe pas
        } else {
          setArtist(data); // Stocke l’artiste récupéré
        }
      } catch (err) {
        setError("Erreur serveur"); // Erreur de connexion
      }
    };

    fetchArtist();
  }, [id]); // Re-exécute si l’id change

  // Fonction appelée au clic sur "Ajouter aux favoris"
  const handleFavorite = async () => {
    if (!user || !token) {
      navigate("/login"); // Redirige si non connecté
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${user.id}/favorites`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // En-tête obligatoire
          },
          body: JSON.stringify({ artist_id: artist.id }), // Envoie l’ID de l’artiste
        }
      );

      const data = await res.json();
      if (!res.ok) {
        setMessage(data.error || "Erreur");
      } else {
        setMessage("Ajouté aux favoris !");
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  // Rendu conditionnel
  if (error) return <p className="text-red-500 p-4">{error}</p>;
  if (!artist) return <p className="p-4">Chargement...</p>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <ArtistCard artist={artist} linkToDetail={false} />
      {artist.description && <p className="mt-2">{artist.description}</p>}

      {/* Bouton visible seulement si connecté */}
      {user && (
  <FavoriteButton artistId={artist.id} />
)}
    </div>
  );
}