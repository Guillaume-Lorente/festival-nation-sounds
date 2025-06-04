import { useCart } from "../context/CartContext";

export default function Tickets() {
  const { cart, addToCart, clearCart } = useCart();

  const handleSubmit = () => {
    alert("🎉 Votre commande a bien été prise en compte !");
    clearCart();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto" aria-label="Page de billetterie">
      <h1 className="text-3xl font-bold text-center mb-6">🎫 Billetterie</h1>

      <section className="grid gap-4 mb-8" aria-labelledby="pass-options-title">
        <h2 id="pass-options-title" className="text-xl font-semibold">
          Choisissez votre pass
        </h2>
        <button
          onClick={() => addToCart("Pass 1 jour")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          aria-label="Ajouter un pass 1 jour au panier"
        >
          Ajouter Pass 1 jour
        </button>
        <button
          onClick={() => addToCart("Pass 3 jours")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          aria-label="Ajouter un pass 3 jours au panier"
        >
          Ajouter Pass 3 jours
        </button>
      </section>

      <section aria-labelledby="cart-title">
        <h2 id="cart-title" className="text-xl font-semibold mb-4">🛒 Mon panier</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <ul className="mb-4 space-y-2" role="list">
            {cart.map((item, i) => (
              <li key={i} role="listitem" className="border p-2 rounded bg-white shadow">
                🎟️ {item}
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
          aria-disabled={cart.length === 0}
        >
          Valider mon panier
        </button>
      </section>
    </div>
  );
}
