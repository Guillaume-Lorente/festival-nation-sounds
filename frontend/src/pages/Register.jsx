// Import des hooks React nécessaires
import { useState } from "react"; // Pour gérer les champs du formulaire
import { useNavigate } from "react-router-dom"; // Pour rediriger l'utilisateur après inscription

export default function Register() {
  // Déclaration des états pour chaque champ du formulaire
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Pour afficher une erreur éventuelle

  const navigate = useNavigate(); // Permet de rediriger l'utilisateur

  // Fonction appelée lors de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setError(""); // Réinitialise l'erreur précédente

    try {
      // Appel à l'API pour s'inscrire
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // On envoie du JSON
        },
        body: JSON.stringify({ email, username, password }), // Corps de la requête
      });

      const data = await response.json(); // Réponse transformée en JSON

      // Si le serveur a renvoyé une erreur
      if (!response.ok) {
        setError(data.error || "Erreur lors de l'inscription");
        return;
      }

      // Si tout va bien, on redirige vers la page de connexion
      navigate("/login");
    } catch (err) {
      // Si le serveur ne répond pas ou erreur réseau
      setError("Erreur réseau ou serveur");
    }
  };

  // Rendu JSX : formulaire d'inscription
  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        {/* Champ email */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />

        {/* Champ nom d'utilisateur */}
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />

        {/* Champ mot de passe */}
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />

        {/* Bouton de soumission */}
        <button type="submit">S'inscrire</button>
      </form>

      {/* Affichage de l'erreur si elle existe */}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}