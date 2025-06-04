import React from "react";

export default function Contact() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📬 Contact</h1>

      <p className="mb-6">
        Une question, une remarque, un souci avec votre billet ? N'hésitez pas à nous écrire !
      </p>

      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">📧 Par email</h2>
          <p>
            <a
              href="mailto:contact@festivalnationsounds.fr"
              className="text-blue-600 hover:underline"
            >
              contact@festivalnationsounds.fr
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📞 Par téléphone</h2>
          <p>
            <a href="tel:+33123456789" className="text-blue-600 hover:underline">
              +33 1 23 45 67 89
            </a>
          </p>
          <p>Du lundi au vendredi, de 9h à 17h</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📍 Adresse postale</h2>
          <address className="not-italic">
            Association SoundWave<br />
            123 rue du Groove<br />
            75000 Paris, France
          </address>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">📝 Formulaire de contact (fictif)</h2>

        <form className="space-y-4" aria-describedby="form-note">
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Votre nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Votre email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border rounded"
              disabled
            />
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Votre message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full p-2 border rounded"
              disabled
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled
            aria-disabled="true"
          >
            Envoyer (non fonctionnel)
          </button>
        </form>

        <p id="form-note" className="text-sm text-gray-500 mt-2">
          🔒 Ce formulaire est fictif. Aucune donnée n'est envoyée.
        </p>
      </div>
    </div>
  );
}
