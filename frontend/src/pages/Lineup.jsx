import { useEffect, useState } from "react";

export default function Lineup() {
  // État pour stocker les artistes récupérés depuis l'API
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true); // Pour afficher un chargement

  // Fonction exécutée au montage du composant (équivalent componentDidMount)
  useEffect(() => {
    // Appel à l'API pour récupérer les artistes
    const fetchArtists = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/artists");
        const data = await response.json();
        setArtists(data);      // Met à jour la liste des artistes
        setLoading(false);     // On a fini de charger
      } catch (error) {
        console.error("Erreur lors du chargement des artistes :", error);
        setLoading(false); // Même en cas d’erreur, on stoppe le "chargement"
      }
    };

    fetchArtists(); // Lance l'appel API
  }, []); // Le tableau vide signifie que ça ne s’exécute qu’une seule fois

  return (
    <div>
      <h2>Programmation des artistes</h2>

      {/* Affichage d’un message pendant le chargement */}
      {loading && <p>Chargement en cours...</p>}

      {/* Affichage des artistes quand les données sont prêtes */}
      {!loading && artists.length === 0 && <p>Aucun artiste trouvé.</p>}

      {!loading && artists.length > 0 && (
        <ul>
          {artists.map((artist) => (
            <li key={artist.id}>
              <strong>{artist.name}</strong>
              {/* Tu peux ajouter ici genre un bouton "favori" plus tard */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}