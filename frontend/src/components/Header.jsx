import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { UserCircle } from "lucide-react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

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
  <header className="w-full bg-blue-700 text-yellow-400 font-bold text-xl relative z-50">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      
      {/* LOGO */}
      <h1 className="text-xl font-bold">
        <Link to="/" className="hover:bg-yellow-400 px-2 py-1 rounded">Nation Sounds</Link>
      </h1>

      {/* NAVIGATION DESKTOP */}
      <nav className="hidden lg:flex gap-4 items-center">
        <Link to="/lineup" className="min-w-[180px] text-center bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">
  Programmation
</Link>
<Link to="/map" className="min-w-[180px] text-center bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">
  Plan du festival
</Link>
<Link to="/s" className="min-w-[180px] text-center bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">
  Infos Pratiques
</Link>
<Link to="/tickets" className="min-w-[180px] text-center bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300">
  Billetterie
</Link>

{/* Possibilité de voir le panier */}
{/* <Link to="/cart" className="min-w-[180px] text-center bg-yellow-500 text-white border border-white p-2 rounded-xl hover:bg-blue-400 duration-300 relative">
  Mon panier
  {totalItems > 0 && (
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
      {totalItems}
    </span>
  )}
</Link> */}

        {/* AVATAR - visible uniquement en desktop */}
        <div className="hidden md:block">
          <button
            onClick={() => navigate(user ? "/account" : "/login")}
            className="text-white text-3xl hover:text-yellow-300"
            title={user ? "Mon compte" : "Se connecter"}
          >
            <FaUserCircle />
          </button>
        </div>
      </nav>

      {/* MENU BURGER MOBILE */}
      <div className="lg:hidden relative" ref={menuRef}>
        <button
          onClick={toggleMenu}
          className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 hover:bg-gray-200"
        >
          {menuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>

        {/* MENU MOBILE SLIDE FROM RIGHT */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white text-black shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-4 space-y-2 pt-16">
            <Link to="/lineup" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Programmation</Link>
            <Link to="/map" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Plan du festival</Link>
            <Link to="/infos" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Infos Pratiques</Link>
            <Link to="/tickets" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Billetterie</Link>

            <hr className="my-2" />

            {!user ? (
              <>
                <Link to="/login" className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Se connecter</Link>
                <Link to="/register" className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>S’inscrire</Link>
              </>
            ) : (
              <>
                <Link to="/account" className="block px-4 py-2 text-blue-600 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>Mon compte</Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-blue-600 hover:bg-gray-100"
                >
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  </header>
);
}