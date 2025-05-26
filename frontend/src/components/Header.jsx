import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Lineup</Link></li>
        <li><Link to="/account">Mon compte</Link></li>
        <li><Link to="/login">Connexion</Link></li>
        <li><Link to="/register">Inscription</Link></li>
      </ul>
    </nav>
  );
}