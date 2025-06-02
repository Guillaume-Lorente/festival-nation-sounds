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
          <p>contact@festivalnationsounds.fr</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📞 Par téléphone</h2>
          <p>+33 1 23 45 67 89</p>
          <p>Du lundi au vendredi, de 9h à 17h</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">📍 Adresse postale</h2>
          <p>
            Association SoundWave<br />
            123 rue du Groove<br />
            75000 Paris, France
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">📝 Formulaire de contact (fictif)</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Votre nom"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Votre email"
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Votre message"
            rows="4"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled
          >
            Envoyer (non fonctionnel)
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-2">
          🔒 Ce formulaire est fictif. Aucune donnée n'est envoyée.
        </p>
      </div>
    </div>
  );
}