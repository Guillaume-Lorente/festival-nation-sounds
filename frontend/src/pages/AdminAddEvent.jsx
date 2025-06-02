import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddEvent() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    stage: "",
    artist_id: "",
    map_areas_id: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        navigate("/admin/events");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'événement:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ Ajouter un événement</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" type="text" placeholder="Titre" value={formData.title} onChange={handleChange} className="border p-2 w-full" />
        <input name="date" type="datetime-local" value={formData.date} onChange={handleChange} className="border p-2 w-full" />
        <input name="stage" type="text" placeholder="Scène" value={formData.stage} onChange={handleChange} className="border p-2 w-full" />
        <input name="artist_id" type="number" placeholder="ID Artiste" value={formData.artist_id} onChange={handleChange} className="border p-2 w-full" />
        <input name="map_areas_id" type="number" placeholder="ID Zone (map_areas)" value={formData.map_areas_id} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Créer</button>
      </form>
    </div>
  );
}