import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FavoriteButton({ artistId }) {
  const [message, setMessage] = useState("");
  const [added, setAdded] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleClick = async () => {
    if (!user || !token) {
      navigate("/login");
      return;
    }

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
        setMessage("Ajouté aux favoris !");
        setAdded(true);
      }
    } catch (err) {
      setMessage("Erreur serveur");
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleClick}
        disabled={added}
        className={`px-4 py-2 rounded ${
          added
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        {added ? "Ajouté" : "★ Ajouter aux favoris"}
      </button>

      {message && <p className="mt-1 text-sm text-green-600">{message}</p>}
    </div>
  );
}