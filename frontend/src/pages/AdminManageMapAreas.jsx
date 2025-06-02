import { useEffect, useState } from "react";

export default function AdminManageMapAreas() {
  const [zones, setZones] = useState([]);
  const [editingZone, setEditingZone] = useState(null);
  const [zoneName, setZoneName] = useState("");

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = () => {
    fetch("http://localhost:5000/api/map-areas")
      .then((res) => res.json())
      .then((data) => setZones(data))
      .catch((err) => console.error("Erreur chargement zones:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingZone ? "PUT" : "POST";
    const url = editingZone
      ? `http://localhost:5000/api/map-areas/${editingZone.id}`
      : "http://localhost:5000/api/map-areas";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: zoneName }),
    })
      .then(() => {
        fetchZones();
        setZoneName("");
        setEditingZone(null);
      })
      .catch((err) => console.error("Erreur enregistrement:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/map-areas/${id}`, { method: "DELETE" })
      .then(() => fetchZones())
      .catch((err) => console.error("Erreur suppression:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🗺️ Gestion des Zones</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nom de la zone"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingZone ? "Modifier" : "Ajouter"} la zone
        </button>
      </form>

      <ul className="space-y-4">
        {zones.map((zone) => (
          <li key={zone.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{zone.name}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => {
                  setEditingZone(zone);
                  setZoneName(zone.name);
                }}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(zone.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
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