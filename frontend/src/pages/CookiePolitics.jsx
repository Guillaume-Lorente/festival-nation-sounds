export default function CookiePolitics() {
  return (
    <div className="max-w-4xl mx-auto p-6 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Politique de gestion des cookies</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">1. Qu’est-ce qu’un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur, mobile, tablette)
          lorsque vous consultez un site web. Il permet à un site de se souvenir de vos actions et préférences
          pendant un certain temps.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">2. Les cookies que nous utilisons</h2>
        
        <h3 className="font-semibold mt-4 mb-1">a) Cookies strictement nécessaires (sans consentement)</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Cookies de session pour vous connecter à votre compte</li>
          <li>Suivi de votre panier d’achat</li>
          <li>Conservation des artistes ajoutés à vos favoris</li>
          <li>Préférences de langue ou d’affichage</li>
        </ul>
        <p>Ces cookies sont indispensables et ne collectent pas de données personnelles à des fins publicitaires.</p>

        <h3 className="font-semibold mt-4 mb-1">b) Cookies de mesure d’audience (avec consentement)</h3>
        <p>
          Si vous l'acceptez, nous utilisons Google Analytics pour recueillir des données anonymes sur la fréquentation
          de notre site afin d'en améliorer le contenu et l’expérience utilisateur.
        </p>

        <h3 className="font-semibold mt-4 mb-1">c) Cookies publicitaires (avec consentement)</h3>
        <p>
          Dans certains cas, des cookies de réseaux sociaux ou de partenaires publicitaires peuvent être utilisés pour
          afficher des contenus externes (par exemple, des vidéos ou des lecteurs audio) ou des publicités personnalisées.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">3. Gestion du consentement</h2>
        <p>
          Lors de votre première visite, une bannière vous permet de gérer votre consentement. Vous pouvez accepter ou refuser l’utilisation des cookies non essentiels à tout moment.
          Vous pouvez également <strong>modifier votre choix à tout moment</strong> en cliquant sur le lien “Gérer mes cookies”
          situé en bas du site.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">4. Durée de conservation</h2>
        <p>
          Les cookies sont conservés pour une durée maximale de 13 mois, conformément aux recommandations de la CNIL.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">5. Contact</h2>
        <p>
          Pour toute question concernant notre politique de gestion des cookies, vous pouvez nous contacter à l’adresse
          suivante : <a href="mailto:contact@nation-sounds.fr" className="text-blue-600 underline">contact@nation-sounds.fr</a>
        </p>
      </section>
    </div>
  );
}