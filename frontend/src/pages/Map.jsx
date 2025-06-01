import { useEffect, useState } from "react";

export default function Map() {
  const [areas, setAreas] = useState([]);

  useEffect(() => {
    const fetchMapAreas = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/map-areas");
        const data = await res.json();
        setAreas(data);
      } catch (err) {
        console.error("Erreur lors du chargement des zones de carte :", err);
      }
    };

    fetchMapAreas();
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6">
      {/* Image de la carte */}
      <img src="/images/festival-map.jpg" alt="Carte du festival" className="w-full rounded shadow" />

      {/* Points interactifs */}
      {areas.map((area) => (
        <div
          key={area.id}
          className="absolute bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-800 transition"
          style={{
            top: `${area.y_coord}%`,
            left: `${area.x_coord}%`,
            transform: "translate(-50%, -50%)"
          }}
          title={area.name}
        >
          {area.name}
        </div>
      ))}
    </div>
  );
}