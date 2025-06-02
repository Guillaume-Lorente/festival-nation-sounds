import { createContext, useContext, useEffect, useState } from "react";

// Création du contexte
export const FavoritesContext = createContext();

// Hook personnalisé pour accéder plus facilement au contexte
export function useFavorites() {
  return useContext(FavoritesContext);
}

// Fournisseur du contexte (entoure toute l'application)
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]); // État local pour les favoris
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Récupération automatique des favoris à la connexion
useEffect(() => {
  const fetchFavorites = async () => {
    if (!user || !token) return;
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user.id}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) setFavorites(data);
    } catch (error) {
      console.error("Erreur de chargement des favoris", error);
    }
  };

  fetchFavorites();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // ✅ appel unique au montage uniquement

  // Fonction pour ajouter un favori
  const addFavorite = async (artistId) => {
    if (!user || !token) return;

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
      if (res.ok) {
        setFavorites((prev) => [...prev, data]); // mise à jour instantanée
      }
    } catch (error) {
      console.error("Erreur d’ajout aux favoris", error);
    }
  };

  // Fonction pour retirer un favori
  const removeFavorite = async (artistId) => {
    if (!user || !token) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/${user.id}/favorites/${artistId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        setFavorites((prev) =>
          prev.filter((artist) => artist.id !== artistId)
        );
      }
    } catch (error) {
      console.error("Erreur de suppression du favori", error);
    }
  };

  // Valeur que tous les composants auront accès
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}