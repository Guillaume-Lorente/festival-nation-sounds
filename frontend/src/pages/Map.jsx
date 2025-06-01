import { useEffect, useState, useRef } from "react";

export default function Map() {
  const [areas, setAreas] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const imageRef = useRef(null);

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
    if (imageRef.current) {
      const updateSize = () => {
        const { width, height } = imageRef.current.getBoundingClientRect();
        setImageSize({ width, height });
      };
      updateSize();
      window.addEventListener("resize", updateSize);
      return () => window.removeEventListener("resize", updateSize);
    }
  }, []);

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
          className="absolute bg-blue-600 text-white text-xs px-2 py-1 rounded cursor-pointer hover:bg-blue-800 transition"
          style={{
            top: `${(area.y_coord / imageSize.height) * 100}%`,
            left: `${(area.x_coord / imageSize.width) * 100}%`,
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