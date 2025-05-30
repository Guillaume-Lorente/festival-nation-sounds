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

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
    <header className="w-full bg-blue-700 text-yellow-400 font-bold font-size-xl">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/" className="hover:bg-yellow-400">Nation Sounds</Link>
        </h1>

        <nav className="flex gap-4 items-center">
          <Link to="/lineup" className="bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">Programmation</Link>
          <Link to="/lineup" className="bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">Plan du festival</Link>
          <Link to="/lineup" className="bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">Infos Pratiques</Link>
          <Link to="/tickets" className="bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">Billetterie</Link>

          <Link to="/cart" className="bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">
            Mon panier
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <div className="relative" ref={menuRef}>
            <button
              onClick={toggleMenu}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-gray-200"
            >
              <UserCircle className="w-6 h-6" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black shadow rounded z-50 py-2">
                {!user ? (
                  <>
                    <Link
                      to="/login"
                      className="text-blue-600 block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Se connecter
                    </Link>
                    <Link
                      to="/register"
                      className="text-blue-600 block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      S’inscrire
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/account"
                      className="text-blue-600 block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setMenuOpen(false)}
                    >
                      Mon compte
                    </Link>
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left text-blue-600 px-4 py-2 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}