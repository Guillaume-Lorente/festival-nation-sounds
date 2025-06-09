export default function Partenaires() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🤝 Nos Partenaires</h1>
      <p className="mb-4">Merci à tous ceux qui rendent ce festival possible :</p>

      <section role="region" aria-labelledby="logos-heading">
        <h2 id="logos-heading" className="sr-only">Logos des partenaires</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 items-center" role="list">
          <div role="listitem">
            <img
              src="/images/Orange.png"
              alt="Orange"
              className="mx-auto h-16"
            />
          </div>
          <div role="listitem">
            <img
              src="/images/NRJ.png"
              alt="NRJ"
              className="mx-auto h-16"
            />
          </div>
          <div role="listitem">
            <img
              src="/images/CreditAgricole.png"
              alt="Crédit Agricole"
              className="mx-auto h-16"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
