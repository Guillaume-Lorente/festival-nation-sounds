import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ArtistCard from "../components/ArtistCard";

export default function Home() {
  const [artists, setArtists] = useState([]);
  const [showAlert, setShowAlert] = useState(true);
  const [importantInfo, setImportantInfo] = useState("");
  const carouselRef = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then((res) => res.json())
      .then((data) => setArtists(data))
      .catch((err) => console.error("Erreur de chargement des artistes :", err));

    setImportantInfo("Changement de dernière minute : la scène Vortex ouvrira 1h plus tard !");
  }, []);

  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
      {/* ALERTE IMPORTANTE */}
      {showAlert && importantInfo && (
        <div className="bg-red-100 border border-red-400 text-red-800 px-4 py-3 text-center relative z-50" role="alert">
          <strong className="font-bold">Annonce importante : </strong>
          <span>{importantInfo}</span>
          <button
            onClick={() => setShowAlert(false)}
            className="absolute right-4 top-2 text-xl hover:text-red-600"
            aria-label="Fermer l'alerte"
          >
            ✖
          </button>
        </div>
      )}

      <main className="text-center">
        {/* HERO */}
        <div className="relative">
          <img
            src="/images/photoAccueil.jpg"
            alt="Photo de festivaliers"
            className="w-full h-[80vh] sm:h-[80vh] md:h-[600px] object-cover"
          />

          <section className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white px-6">
            <h1 className="sr-only">Festival Nation Sounds</h1> {/* Accessibilité & SEO */}
            <img
              src="/images/NationSounds.png"
              alt="Nation Sounds Festival"
              className="h-20 mx-auto mb-4 object-contain"
            />
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

        {/* SECTION ARTISTES */}
        <section className="mt-10 px-4 relative" aria-label="Artistes à l'affiche">
          <h2 className="text-2xl text-blue-600 font-bold mb-4">🔥 À l'affiche 🔥</h2>

          <button
            onClick={scrollLeft}
            className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow z-10 hover:bg-blue-700"
            aria-label="Faire défiler vers la gauche"
          >
            ◀
          </button>

          <div
            ref={carouselRef}
            className="flex overflow-x-auto no-scrollbar gap-4 px-6"
          >
            {artists.slice(0, 6).map((artist) => (
              <div key={artist.id} className="flex-shrink-0 w-64 mx-2">
                <ArtistCard artist={artist} />
              </div>
            ))}

            <Link
  to="/lineup"
  className="flex-shrink-0 w-64 mx-2 bg-yellow-400 text-center p-6 rounded-xl shadow hover:bg-yellow-200 transition cursor-pointer flex flex-col justify-center items-center"
>
  <h3 className="text-xl text-red-600 font-bold mb-2">
    Voir toute la programmation
  </h3>
</Link>
          </div>

          <button
            onClick={scrollRight}
            className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full shadow z-10 hover:bg-blue-700"
            aria-label="Faire défiler vers la droite"
          >
            ▶
          </button>
        </section>
      </main>
    </>
  );
}
