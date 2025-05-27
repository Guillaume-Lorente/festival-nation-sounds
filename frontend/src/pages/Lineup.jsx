import { useEffect, useState } from "react";
import ArtistCard from "../components/ArtistCard";

export default function Lineup() {
  const [artists, setArtists] = useState([]);

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

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Line-up</h2>

      <ul className="space-y-4">
        {artists.map((artist) => (
          <li key={artist.id}>
            <ArtistCard artist={artist} />
          </li>
        ))}
      </ul>
    </div>
  );
}