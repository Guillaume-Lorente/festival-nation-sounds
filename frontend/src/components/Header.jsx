import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { cartItems } = useCart(); // ✅ Récupère les articles du panier

  const totalItems = Array.isArray(cartItems)
  ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
  : 0;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (user && typeof user !== "object") {
  localStorage.removeItem("user");
}

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link to="/">Nation Sounds</Link>
      </h1>

      <nav className="flex gap-4 items-center">
        <Link to="/lineup" className="hover:underline">Line-up</Link>
        <Link to="/tickets" className="hover:underline">Billetterie</Link>

        {user ? (
          <>
            <Link to="/account" className="hover:underline">Mon compte</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">Connexion</Link>
        )}

        <Link to="/cart" className="relative hover:underline">
          Mon panier
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
}