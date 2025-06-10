import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminManageMapAreas() {
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = () => {
    fetch("/api/map-areas")
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error("Erreur chargement zones:", err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cette zone ?")) return;

    fetch(`/api/map-areas/${id}`, { method: "DELETE" })
      .then(() => fetchZones())
      .catch((err) => console.error("Erreur suppression:", err));
  };

  return (
    <div className="p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl text-blue-600 font-bold">🗺️ Gestion des Zones</h1>
      <button
        onClick={() => navigate("/admin/dashboard")}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-gray-600"
      >
        ⬅️ Retour au Dashboard
      </button>
    </div>

    <button
      onClick={() => navigate("/admin/add-map-area")}
      className="mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      ➕ Ajouter une zone
    </button>

      <ul className="space-y-4">
        {zones.map((zone) => (
          <li key={zone.id} className="border p-4 rounded shadow bg-white">
            <p className="font-semibold text-lg text-blue-600">{zone.name}</p>
            <p className="text-sm text-gray-600">{zone.description}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => navigate(`/admin/map-areas/${zone.id}`)}
                className="bg-yellow-300 px-3 py-1 rounded hover:bg-yellow-400"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={() => handleDelete(zone.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
