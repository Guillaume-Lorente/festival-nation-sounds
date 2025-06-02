import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddEvents() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    date: "",
    stage: "",
    artist_id: "",
    map_areas_id: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Événement ajouté !");
        navigate("/admin/dashboard");
      } else {
        alert("Erreur lors de l'ajout.");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ajouter un événement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" placeholder="Titre" onChange={handleChange} className="w-full border p-2" required />
        <input type="datetime-local" name="date" onChange={handleChange} className="w-full border p-2" required />
        <input name="stage" placeholder="Nom de la scène" onChange={handleChange} className="w-full border p-2" required />
        <input name="artist_id" placeholder="ID de l'artiste" onChange={handleChange} className="w-full border p-2" required />
        <input name="map_areas_id" placeholder="ID de la zone" onChange={handleChange} className="w-full border p-2" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
    </div>
  );
}