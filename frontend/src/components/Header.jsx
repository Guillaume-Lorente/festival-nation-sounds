import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link to="/">Nation Sounds</Link>
      </h1>

      <nav className="flex gap-4 items-center">
        <Link to="/lineup" className="hover:underline">
          Line-up
        </Link>

        {user ? (
          <>
            <Link to="/account" className="hover:underline">
              Mon compte
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Connexion
          </Link>
        )}
        <Link to="/tickets" className="hover:underline">
  Billetterie
</Link>
      </nav>
    </header>
  );
}