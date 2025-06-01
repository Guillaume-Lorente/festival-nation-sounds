export default function Partenaires() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🤝 Nos Partenaires</h2>
      <p className="mb-4">Merci à tous ceux qui rendent ce festival possible :</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center">
        <img src="/images/logo1.png" alt="Partenaire 1" className="mx-auto h-16" />
        <img src="/images/logo2.png" alt="Partenaire 2" className="mx-auto h-16" />
        <img src="/images/logo3.png" alt="Partenaire 3" className="mx-auto h-16" />
        {/* Ajoute d'autres logos au besoin */}
      </div>
    </div>
  );
}