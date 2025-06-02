import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Erreur chargement événements:", err));
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) return;

    fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" })
      .then(() => setEvents((prev) => prev.filter((event) => event.id !== id)))
      .catch((err) => console.error("Erreur suppression:", err));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎟️ Gestion des événements</h1>
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          ⬅️ Retour au Dashboard
        </button>
      </div>

      <button
        onClick={() => navigate("/admin/add-event")}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        ➕ Ajouter un événement
      </button>

      {events.length === 0 ? (
        <p>Aucun événement trouvé.</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border p-4 rounded shadow flex justify-between items-center">
              <div>
                <p className="font-bold">{event.title}</p>
                <p className="text-sm text-gray-600">
  {new Date(event.date).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  })} à {new Date(event.date).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit"
  })} — {event.stage}
</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/admin/events/${event.id}`)}
                  className="px-3 py-1 bg-yellow-400 text-black rounded hover:bg-yellow-300"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}