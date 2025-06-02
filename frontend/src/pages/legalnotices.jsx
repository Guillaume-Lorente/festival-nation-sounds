import React from "react";

export default function MentionsLegales() {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📄 Mentions légales</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
        <p>
          Le site <strong>Festival Nation Sounds</strong> est édité par l’association fictive{" "}
          <strong>SoundWave</strong>, loi 1901, dont le siège social est situé :
        </p>
        <p>
          123 rue du Groove<br />
          75000 Paris, France
        </p>
        <p>SIRET : 123 456 789 00000</p>
        <p>Email : contact@festivalnationsounds.fr</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Directeur de la publication</h2>
        <p>Jean-Michel Fête, Président de l’association SoundWave.</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Hébergement</h2>
        <p>
          Le site est hébergé par <strong>OVH</strong>, dont le siège social est situé :
        </p>
        <p>
          2 rue Kellermann<br />
          59100 Roubaix, France
        </p>
        <p>Site web : www.ovh.com</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
        <p>
          Tous les contenus présents sur ce site (textes, images, vidéos, logo, etc.) sont la
          propriété exclusive de l’association SoundWave ou de ses partenaires, sauf mention
          contraire. Toute reproduction, distribution ou utilisation sans autorisation est interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
        <p>
          Les informations collectées lors de l’inscription ou de la commande de billets sont
          traitées conformément à la réglementation en vigueur. Vous disposez d’un droit d’accès,
          de rectification et de suppression de vos données en nous contactant.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Cookies</h2>
        <p>
          Ce site peut utiliser des cookies à des fins de mesure d’audience ou d’amélioration
          de l’expérience utilisateur. Vous pouvez les désactiver dans les paramètres de votre navigateur.
        </p>
      </section>
    </div>
  );
}