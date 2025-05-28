// Tickets.jsx
import { Link } from "react-router-dom";

export default function Tickets() {
  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-3xl font-bold mb-4">Billetterie 🎟️</h2>

      <p className="mb-6">Choisissez votre pass pour le festival :</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">🎫 Pass 1 jour</h3>
          <p className="text-sm text-gray-500 mb-2">Valable pour une journée au choix</p>
          <p className="text-lg font-bold mb-2">25€</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded shadow hover:opacity-90 transition">Réserver</button>
        </div>

        <div className="border p-4 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-semibold">🎟️ Pass 3 jours</h3>
          <p className="text-sm text-gray-500 mb-2">Accès complet au festival</p>
          <p className="text-lg font-bold mb-2">60€</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded shadow hover:opacity-90 transition">Réserver</button>
        </div>
      </div>

      <Link to="/" className="inline-block mt-6 text-blue-600 hover:underline">
        ← Retour à l'accueil
      </Link>
    </div>
  );
}