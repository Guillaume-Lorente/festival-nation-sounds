export default function Tickets() {
  return (
    <div className="p-6 text-center max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">🎟️ Billetterie</h2>
      <p className="mb-4 text-lg text-gray-700">
        Préparez-vous à vivre l’expérience Nation Sounds Festival 2025 !
      </p>

      {/* Message temporaire */}
      <p className="mb-6 text-red-600 font-semibold">
        🚧 La billetterie sera disponible très bientôt.
      </p>

      {/* Bouton fictif (ou lien vers un service réel si besoin) */}
      <button
        disabled
        className="bg-gray-400 text-white px-6 py-3 rounded cursor-not-allowed"
      >
        Achat indisponible pour le moment
      </button>

      {/* Lien réel si nécessaire
      <a
        href="https://example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded"
      >
        Réserver maintenant
      </a> 
      */}
    </div>
  );
}