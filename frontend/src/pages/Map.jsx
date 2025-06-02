import { useEffect, useState, useRef } from "react";
import {
  FaMusic,
  FaBeer,
  FaHamburger,
  FaWater,
  FaToilet,
  FaDoorOpen,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Map() {
  const [areas, setAreas] = useState([]);
  const [imageSize, setImageSize] = useState({ width: 1, height: 1 });
  const imageRef = useRef(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [visibleArea, setVisibleArea] = useState(null);
  const [events, setEvents] = useState([]);
  const [visibleTypes, setVisibleTypes] = useState([
    "stage",
    "bar",
    "food",
    "watering place",
    "toilets",
    "entrance",
  ]);

  const typeOptions = [
    { key: "stage", label: "Scène", icon: <FaMusic /> },
    { key: "bar", label: "Bar", icon: <FaBeer /> },
    { key: "food", label: "Restauration", icon: <FaHamburger /> },
    { key: "watering place", label: "Point d'eau", icon: <FaWater /> },
    { key: "toilets", label: "Toilettes", icon: <FaToilet /> },
    { key: "entrance", label: "Entrée", icon: <FaDoorOpen /> },
  ];

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
    <div className="w-full max-w-5xl mx-auto mt-6">
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        <button
          onClick={() => setVisibleTypes(typeOptions.map((opt) => opt.key))}
          className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition ${
            visibleTypes.length === typeOptions.length
              ? "bg-blue-600 text-white"
              : "bg-white text-gray-700"
          }`}
        >
          🔁 Tout afficher
        </button>

        {typeOptions.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setVisibleTypes([key])}
            className={`flex items-center gap-2 px-3 py-1 rounded-full border text-sm transition
              ${
                visibleTypes.includes(key) && visibleTypes.length === 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700"
              }`}
          >
            {icon}
            {label}
          </button>
        ))}
      </div>

      <div className="relative">
        <img
          src="/images/festivalMap.png"
          alt="Carte du festival"
          className="w-full rounded shadow"
          ref={imageRef}
        />

        {areas
          .filter((area) =>
            visibleTypes.includes(
              area.type.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            )
          )
          .map((area) => (
            <div
              key={area.id}
              className="absolute bg-white text-blue-700 p-1 rounded-full shadow cursor-pointer hover:scale-110 transition"
              style={{
                top: `${(area.y_coord / 1024) * 100}%`,
                left: `${(area.x_coord / 1024) * 100}%`,
                transform: "translate(-50%, -50%)",
              }}
              title={area.name}
              onClick={() => {
                setSelectedArea(area);
                setVisibleArea(area);

                if (area.type.toLowerCase() === "stage") {
                  fetch(`http://localhost:5000/api/events?map_area_id=${area.id}`)
                    .then((res) => res.json())
                    .then((data) => setEvents(data))
                    .catch(() => setEvents([]));
                } else {
                  setEvents([]);
                }
              }}
            >
              {getIconByType(area.type)}
            </div>
          ))}

        {/* Tooltip Desktop */}
        {selectedArea && (
          <div
            className="absolute bg-white text-black p-3 rounded-lg shadow-lg z-50 w-[16rem] hidden sm:block"
            style={{
              top: `${(selectedArea.y_coord / 1024) * 100}%`,
              left: `${(selectedArea.x_coord / 1024) * 100}%`,
              marginTop: "2.5rem",
              marginLeft: "-9rem",
            }}
          >
            <div className="flex justify-between items-start">
              <strong>{selectedArea.name}</strong>
              <button
                onClick={() => {
                  setVisibleArea(null);
                  setTimeout(() => setSelectedArea(null), 300);
                }}
                className="ml-2 text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>
            <p className="text-sm mt-2">{selectedArea.description}</p>

            {selectedArea.type.toLowerCase() === "stage" && (
              <>
                <hr className="my-2" />
                <p className="text-sm font-semibold">Programmation :</p>
                {events.length > 0 ? (
                  <ul className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-1">
                    {events.map((event) => (
                      <li key={event.id} className="text-sm">
                        <div className="flex items-start gap-2">
                          <img
                            src={event.image_url}
                            alt={event.artist}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div>
                            <strong>{event.artist}</strong>
                            <p className="text-xs text-gray-600">
                              {new Date(event.date).toLocaleString("fr-FR", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm italic text-gray-500">Aucun concert programmé</p>
                )}
              </>
            )}
          </div>
        )}

        {/* Modal Mobile */}
        {selectedArea && (
          <div className="fixed bottom-0 left-0 right-0 bg-white p-4 z-50 rounded-t-lg shadow-md sm:hidden">
            <div className="flex justify-between items-center">
              <strong>{selectedArea.name}</strong>
              <button
                onClick={() => {
                  setVisibleArea(null);
                  setTimeout(() => setSelectedArea(null), 300);
                }}
                className="text-gray-500 hover:text-black"
              >
                ×
              </button>
            </div>
            <p className="text-sm mt-2">{selectedArea.description}</p>

            {selectedArea.type.toLowerCase() === "stage" && (
              <>
                <hr className="my-2" />
                <p className="text-sm font-semibold">Programmation :</p>
                {events.length > 0 ? (
                  <ul className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-1">
                    {events.map((event) => (
                      <li key={event.id} className="text-sm">
                        <div className="flex items-start gap-2">
                          <img
                            src={event.image_url}
                            alt={event.artist}
                            className="w-10 h-10 object-cover rounded-full"
                          />
                          <div>
                            <strong>{event.artist}</strong>
                            <p className="text-xs text-gray-600">
                              {new Date(event.date).toLocaleString("fr-FR", {
                                weekday: "short",
                                day: "2-digit",
                                month: "short",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm italic text-gray-500">Aucun concert programmé</p>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}