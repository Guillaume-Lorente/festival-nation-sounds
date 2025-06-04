export default function InfosPratiques() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-left">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">🧭 Infos pratiques</h1>

      <section className="mb-6" role="region" aria-labelledby="hours-title">
        <h2 id="hours-title" className="text-xl font-semibold mb-2">🕒 Horaires</h2>
        <p>Le festival ouvre ses portes chaque jour à 14h et se termine à 2h du matin.</p>
      </section>

      <section className="mb-6" role="region" aria-labelledby="access-title">
        <h2 id="access-title" className="text-xl font-semibold mb-2">📍 Accès</h2>
        <p>Adresse : Parc des Expositions, 75000 Paris</p>
        <p>Transports : RER B - Station Parc Expo</p>
      </section>

      <section className="mb-6" role="region" aria-labelledby="bring-title">
        <h2 id="bring-title" className="text-xl font-semibold mb-2">🎒 Ce qu’il faut apporter</h2>
        <ul className="list-disc pl-6">
          <li>Billet d’entrée (version numérique ou papier)</li>
          <li>Pièce d’identité</li>
          <li>Protection solaire et bouteille d’eau (50cl max)</li>
        </ul>
      </section>

      <section className="mb-6" role="region" aria-labelledby="forbidden-title">
        <h2 id="forbidden-title" className="text-xl font-semibold mb-2">🚫 Objets interdits</h2>
        <ul className="list-disc pl-6">
          <li>Objets coupants</li>
          <li>Substances illicites</li>
          <li>Boissons alcoolisées extérieures</li>
        </ul>
      </section>
    </div>
  );
}
