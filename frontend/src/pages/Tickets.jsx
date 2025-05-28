import { useCart } from "../context/CartContext";

export default function Tickets() {
  const { cart, addToCart, clearCart } = useCart();

  const handleSubmit = () => {
    alert("Panier validé !");
    clearCart();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">🎫 Billetterie</h2>

      <div className="grid gap-4 mb-8">
        <button
          onClick={() => addToCart("1 jour")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Ajouter Pass 1 jour
        </button>
        <button
          onClick={() => addToCart("3 jours")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Ajouter Pass 3 jours
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-4">🛒 Mon panier</h3>

      {cart.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <ul className="mb-4 space-y-2">
          {cart.map((item, i) => (
            <li key={i} className="border p-2 rounded bg-white shadow">
              {item}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSubmit}
        disabled={cart.length === 0}
        className={`w-full py-2 rounded ${
          cart.length === 0
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        Valider mon panier
      </button>
    </div>
  );
}