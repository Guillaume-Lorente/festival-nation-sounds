import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, total, clearCart } = useCart();

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">🛒 Mon panier</h2>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4 mb-4">
            {cart.map((item, idx) => (
              <li key={idx} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.price} €</p>
                </div>
                <button
                  onClick={() => removeFromCart(idx)}
                  className="text-red-600 hover:underline"
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <p className="text-right font-bold mb-4">Total : {total} €</p>

          {cart.length > 0 && (
  <div className="mt-6 text-center">
    <button
      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
      onClick={() => alert("Paiement fictif validé ✅")}
    >
      Valider mon panier
    </button>
  </div>
)}

          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Vider le panier
          </button>
        </>
      )}
    </div>
  );
}