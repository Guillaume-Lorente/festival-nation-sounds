import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { UserCircle } from "lucide-react";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

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

  const handleAvatarClick = () => {
    if (user) {
      navigate("/account");
    } else {
      setMenuOpen((prev) => !prev);
    }
  };

  // Ferme le menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center relative">
      <h1 className="text-lg font-bold">
        <Link to="/">Nation Sounds</Link>
      </h1>

      <nav className="flex gap-4 items-center">
        <Link to="/lineup" className="hover:underline">Line-up</Link>
        <Link to="/tickets" className="hover:underline">Billetterie</Link>
        {/* Panier avec compteur */}
        <Link to="/cart" className="relative hover:underline">
          Mon panier
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        {/* Avatar & menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={handleAvatarClick}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-gray-200"
          >
            <UserCircle className="w-6 h-6" />
          </button>

          {/* Menu déroulant pour utilisateurs non connectés */}
          {!user && menuOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white text-black shadow rounded p-2 z-50">
              <Link to="/login" className="block px-2 py-1 hover:bg-gray-100 rounded">Se connecter</Link>
              <Link to="/register" className="block px-2 py-1 hover:bg-gray-100 rounded">S’inscrire</Link>
            </div>
          )}

          {/* Bouton déconnexion si connecté */}
          {user && (
            <button
              onClick={handleLogout}
              className="ml-2 bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              Déconnexion
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}