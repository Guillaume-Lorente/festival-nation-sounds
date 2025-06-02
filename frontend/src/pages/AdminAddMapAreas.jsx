import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminAddMapAreas() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    type: "",
    x_coord: "",
    y_coord: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:5000/api/map-areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        alert("Zone ajoutée !");
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
      <h2 className="text-xl font-bold mb-4">Ajouter une zone</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="name" placeholder="Nom" onChange={handleChange} className="w-full border p-2" required />
        <input name="type" placeholder="Type (stage, bar, etc.)" onChange={handleChange} className="w-full border p-2" required />
        <input name="x_coord" placeholder="Coordonnée X" onChange={handleChange} className="w-full border p-2" required />
        <input name="y_coord" placeholder="Coordonnée Y" onChange={handleChange} className="w-full border p-2" required />
        <textarea name="description" placeholder="Description" onChange={handleChange} className="w-full border p-2" required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Ajouter</button>
      </form>
    </div>
  );
}
