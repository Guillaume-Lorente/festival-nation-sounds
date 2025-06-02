import { useEffect, useState, useRef } from "react";
import {
  FaMusic,
  FaBeer,
  FaHamburger,
  FaWater,
  FaToilet,
  FaDoorOpen,
  FaMapMarkerAlt
} from "react-icons/fa";

export default function Map() {
  const [areas, setAreas] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const imageRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState(null);

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

  useEffect(() => {
    if (!imageRef.current) return;

    const updateSize = () => {
      const { width, height } = imageRef.current.getBoundingClientRect();
      setImageSize({ width, height });
    };

    updateSize();

    const observer = new ResizeObserver(() => updateSize());
    observer.observe(imageRef.current);

    return () => observer.disconnect();
  }, []);

  // Fonction pour retourner l’icône en fonction du type
  const getIconByType = (type) => {
  const normalized = type.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  switch (normalized) {
    case "stage":
      return <FaMusic size={20} />;
    case "bar":
      return <FaBeer size={20} />;
    case "restauration":
      return <FaHamburger size={20} />;
    case "point d'eau":
    case "pointdeau":
      return <FaWater size={20} />;
    case "toilettes":
      return <FaToilet size={20} />;
    case "entree":
    case "entree du festival":
      return <FaDoorOpen size={20} />;
    default:
      return <FaMapMarkerAlt size={20} />;
  }
};

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6">
      <img
        src="/images/festivalMap.png"
        alt="Carte du festival"
        className="w-full rounded shadow"
        ref={imageRef}
      />

      {areas.map((area) => (
        <div
          key={area.id}
          className="absolute bg-white text-blue-700 p-1 rounded-full shadow cursor-pointer hover:scale-110 transition"
          style={{
            top: `${(area.y_coord / 1024) * 100}%`,
            left: `${(area.x_coord / 1024) * 100}%`,
            transform: "translate(-50%, -50%)"
          }}
          title={area.name}
          onClick={() => setSelectedArea(area)}
        >
          {getIconByType(area.type)}
        </div>
      ))}
        {/* ⬇️ Infobulle affichée si une zone est sélectionnée */}
    {selectedArea && (
      <div
        className="absolute bg-white text-black p-3 rounded-lg shadow-lg z-50 w-64"
        style={{
          top: `${(selectedArea.y_coord / 1024) * 100}%`,
          left: `${(selectedArea.x_coord / 1024) * 100}%`,
          transform: "translate(-50%, -120%)"
        }}
      >
        <div className="flex justify-between items-start">
          <strong>{selectedArea.name}</strong>
          <button
            onClick={() => setSelectedArea(null)}
            className="ml-2 text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>
        <p className="text-sm mt-2">{selectedArea.description}</p>
      </div>
    )}
    </div>
  );
}