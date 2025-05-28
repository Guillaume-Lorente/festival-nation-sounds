import { Navigate } from "react-router-dom";

/**
 * Composant pour protéger une route privée.
 * 
 * Vérifie si un utilisateur est présent dans le localStorage :
 * - S'il est connecté, il affiche la page enfant (children)
 * - Sinon, il redirige automatiquement vers la page de connexion ("/login")
 * 
 * @param {JSX.Element} children - Le composant enfant
 */
export default function PrivateRoute({ children }) {
  // Récupère les infos de l'utilisateur dans le localStorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Utilisateur existe, on affiche la page demandée
  if (user) return children;

  // Sinon, on redirige vers la page de login
  return <Navigate to="/login" replace />;
}