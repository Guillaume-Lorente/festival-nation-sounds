import { createContext, useContext, useEffect, useState } from "react";

export const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user || !token) return;
      try {
        const res = await fetch(`/api/users/${user.id}/favorites`, {
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
  }, []);

  const addFavorite = async (artistId) => {
    if (!user || !token) return;

    try {
      const res = await fetch(`/api/users/${user.id}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ artist_id: artistId }),
      });

      const data = await res.json();
      if (res.ok) {
        setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      console.error("Erreur d’ajout aux favoris", error);
    }
  };

  const removeFavorite = async (artistId) => {
    if (!user || !token) return;

    try {
      const res = await fetch(`/api/users/${user.id}/favorites/${artistId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setFavorites((prev) => prev.filter((artist) => artist.id !== artistId));
      }
    } catch (error) {
      console.error("Erreur de suppression du favori", error);
    }
  };

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
