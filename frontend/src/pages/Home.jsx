import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="text-center p-8">
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-10 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">🎶 Nation Sounds Festival</h1>
        <p className="text-lg mb-6">
          L'événement musical de l'année ! Prépare-toi à vivre 3 jours inoubliables au rythme de la musique.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/lineup"
            className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-100 transition"
          >
            Découvrir la line-up
          </Link>

          <Link
            to="/tickets"
            className="bg-yellow-400 text-black font-semibold px-6 py-2 rounded hover:bg-yellow-300 transition"
          >
            Acheter un billet
          </Link>
        </div>
      </section>
    </main>
  );
}