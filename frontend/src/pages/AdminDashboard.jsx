import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    setAdminData({ username: "superadmin" });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  if (!adminData) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🎛️ Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>

      <p className="mb-6">Bienvenue, {adminData.username} 👋</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          onClick={() => navigate("/admin/add-artist")}
          className="p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 transition"
        >
          <h2 className="text-lg font-semibold mb-2">🎤 Gérer les artistes</h2>
          <p className="text-sm">Ajouter, modifier ou supprimer un artiste.</p>
        </div>

        <div
          onClick={() => navigate("/admin/add-event")}
          className="p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 transition"
        >
          <h2 className="text-lg font-semibold mb-2">🎟️ Gérer les événements</h2>
          <p className="text-sm">Créer ou organiser la programmation.</p>
        </div>

        <div
          onClick={() => navigate("/admin/add-map-area")}
          className="p-4 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200 transition"
        >
          <h2 className="text-lg font-semibold mb-2">🗺️ Gérer les zones</h2>
          <p className="text-sm">Modifier les zones de la carte.</p>
        </div>
      </div>
    </div>
  );
}
