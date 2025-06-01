export default function InfosPratiques() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-left">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🧭 Infos pratiques</h2>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">🕒 Horaires</h3>
        <p>Le festival ouvre ses portes chaque jour à 14h et se termine à 2h du matin.</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">📍 Accès</h3>
        <p>Adresse : Parc des Expositions, 75000 Paris</p>
        <p>Transports : RER B - Station Parc Expo</p>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">🎒 Ce qu’il faut apporter</h3>
        <ul className="list-disc pl-6">
          <li>Billet d’entrée (version numérique ou papier)</li>
          <li>Pièce d’identité</li>
          <li>Protection solaire et bouteille d’eau (50cl max)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-xl font-semibold mb-2">🚫 Objets interdits</h3>
        <ul className="list-disc pl-6">
          <li>Objets coupants</li>
          <li>Substances illicites</li>
          <li>Boissons alcoolisées extérieures</li>
        </ul>
      </section>
    </div>
  );
}