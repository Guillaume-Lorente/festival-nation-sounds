import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function AdminEditMapArea() {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    x_coord: "",
    y_coord: "",
    description: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/map-areas/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Erreur chargement zone:", err));
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/map-areas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) navigate("/admin/map-areas");
    } catch (error) {
      console.error("Erreur modification zone:", error);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ Modifier une zone</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" type="text" value={formData.name} onChange={handleChange} className="border p-2 w-full" />
        <input name="type" type="text" value={formData.type} onChange={handleChange} className="border p-2 w-full" />
        <input name="x_coord" type="number" value={formData.x_coord} onChange={handleChange} className="border p-2 w-full" />
        <input name="y_coord" type="number" value={formData.y_coord} onChange={handleChange} className="border p-2 w-full" />
        <textarea name="description" value={formData.description} onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">Mettre à jour</button>
      </form>
    </div>
  );
}