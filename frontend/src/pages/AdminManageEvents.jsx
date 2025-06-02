import { useEffect, useState } from "react";

export default function AdminManageEvents() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({ name: "", date: "", time: "", map_area_id: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Erreur chargement événements:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/events/${id}`, { method: "DELETE" })
      .then(() => fetchEvents())
      .catch((err) => console.error("Erreur suppression:", err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = editingEvent ? "PUT" : "POST";
    const url = editingEvent
      ? `http://localhost:5000/api/events/${editingEvent.id}`
      : "http://localhost:5000/api/events";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(() => {
        fetchEvents();
        setFormData({ name: "", date: "", time: "", map_area_id: "" });
        setEditingEvent(null);
      })
      .catch((err) => console.error("Erreur enregistrement:", err));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎟️ Gestion des Événements</h1>

      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Nom"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="ID zone (map_area_id)"
          value={formData.map_area_id}
          onChange={(e) => setFormData({ ...formData, map_area_id: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingEvent ? "Modifier" : "Ajouter"} l'événement
        </button>
      </form>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded shadow">
            <p className="font-semibold">{event.name}</p>
            <p>{event.date} à {event.time} - Map: {event.map_area_id}</p>
            <div className="space-x-2 mt-2">
              <button
                onClick={() => {
                  setEditingEvent(event);
                  setFormData({
                    name: event.name,
                    date: event.date,
                    time: event.time,
                    map_area_id: event.map_area_id,
                  });
                }}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(event.id)}
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