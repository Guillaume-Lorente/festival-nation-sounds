import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";

export default function Home() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.error("Erreur de chargement des artistes :", err));
  }, []);

  return (
    <main className="text-center">
      {/* HERO SECTION */}
      <div className="relative">
        <img
          src="/images/photoAccueil.jpg"
          alt="Photo de festivaliers"
          className="w-full md:h-[600px] object-cover"
        />

        <section className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white px-6">
          <h1 className="text-4xl font-bold mb-4">Nation Sounds Festival</h1>
          <p className="text-lg mb-6 max-w-2xl">
            L'événement musical de l'année ! Prépare-toi à vivre 3 jours inoubliables au rythme de la musique.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
            <Link
              to="/lineup"
              className="flex-1 h-16 text-center bg-white text-blue-600 font-semibold px-6 rounded hover:bg-gray-100 transition flex items-center justify-center"
            >
              Découvrir la programmation
            </Link>
            <Link
              to="/tickets"
              className="flex-1 h-16 text-center bg-yellow-400 text-black font-semibold px-6 rounded hover:bg-yellow-300 transition flex items-center justify-center"
            >
              Acheter un billet
            </Link>
          </div>
        </section>
      </div>

      {/* CARROUSEL D'ARTISTES */}
      <section className="mt-12 px-4">
        <h2 className="text-2xl font-semibold mb-4">Artistes en avant-première 🎤</h2>
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {artists.map((artist) => (
              <div key={artist.id} className="min-w-[250px]">
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}