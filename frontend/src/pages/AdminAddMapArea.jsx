import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddMapArea() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    x_coord: "",
    y_coord: "",
    description: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/map-areas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) navigate("/admin/map-areas");
    } catch (error) {
      console.error("Erreur lors de l'ajout de la zone:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl text-blue-600 font-bold mb-4">➕ Ajouter une zone</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" placeholder="Nom" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="type" type="text" placeholder="Type" value={formData.type} onChange={handleChange} className="border p-2 w-full" />
        <input name="x_coord" type="number" placeholder="Coordonnée X" value={formData.x_coord} onChange={handleChange} className="border p-2 w-full" />
        <input name="y_coord" type="number" placeholder="Coordonnée Y" value={formData.y_coord} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">➕ Créer</button>
        <button
            type="button"
            onClick={() => navigate("/admin/events")}
            className="text-gray-600 underline"
          >
            Annuler</button>
      </form>
    </div>
  );
}