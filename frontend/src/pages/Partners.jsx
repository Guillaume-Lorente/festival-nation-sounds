export default function Partenaires() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🤝 Nos Partenaires</h2>
      <p className="mb-4">Merci à tous ceux qui rendent ce festival possible :</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center">
        <img src="/images/Orange.png" alt="Notre premier partenaire, Orange" className="mx-auto h-16" />
        <img src="/images/NRJ.png" alt="Notre deuxième partenaire, NRJ" className="mx-auto h-16" />
        <img src="/images/CreditAgricole.png" alt="Notre troisième partenaire, Credit Agricole" className="mx-auto h-16" />
        {/* Ajoute d'autres logos au besoin */}
      </div>
    </div>
  );
}