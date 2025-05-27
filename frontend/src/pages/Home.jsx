import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="p-6 text-center max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">🎶 Nation Sounds Festival 2025</h1>
      <p className="text-lg mb-6 text-gray-700">
        Vibrez au rythme de la musique, du soleil et de vos artistes préférés.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
        <Link
          to="/lineup"
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          🎸 Découvrir la line-up
        </Link>

        <Link
          to="/account"
          className="bg-yellow-400 text-black px-6 py-3 rounded hover:bg-yellow-300 transition"
        >
          ⭐ Mes favoris
        </Link>

        <a
          href="#"
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          🎟️ Billetterie
        </a>
      </div>
    </div>
  );
}