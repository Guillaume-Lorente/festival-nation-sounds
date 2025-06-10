import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    stage: "",
    artist_id: "",
    map_areas_id: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Erreur chargement event:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/admin/events");
      }
    } catch (error) {
      console.error("Erreur modification event:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Modifier un événement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" type="text" value={formData.title} onChange={handleChange} className="border p-2 w-full" />
        <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
        <input name="stage" type="text" value={formData.stage} onChange={handleChange} className="border p-2 w-full" />
        <input name="artist_id" type="number" value={formData.artist_id} onChange={handleChange} className="border p-2 w-full" />
        <input name="map_areas_id" type="number" value={formData.map_areas_id} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Mettre à jour</button>
      </form>
    </div>
  );
}
