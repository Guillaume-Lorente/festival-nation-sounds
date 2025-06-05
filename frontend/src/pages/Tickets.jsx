import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function Tickets() {
  const { cart, addToCart, removeFromCart, clearCart, total } = useCart();
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const PRICES = {
    "Pass Vendredi": 20,
    "Pass Samedi": 20,
    "Pass Dimanche": 20,
    "Pass 3 jours": 50,
  };

  const handleAddToCart = (passName) => {
    const price = PRICES[passName];
    if (price === undefined) {
      console.warn(`Pass inconnu : ${passName}`);
      return;
    }
    addToCart({ name: passName, price });
  };

  const groupedCart = cart.reduce((acc, item) => {
    const key = item.name;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});

  const groupedItems = Object.values(groupedCart);

  return (
    <div className="p-6 max-w-2xl mx-auto relative" aria-label="Page de billetterie">
      <h1 className="text-3xl font-bold text-center mb-6">🎫 Billetterie</h1>

      <section className="grid gap-4 mb-8" aria-labelledby="pass-options-title">
        <h2 id="pass-options-title" className="text-xl font-semibold">
          Choisissez votre pass
        </h2>
        {Object.entries(PRICES).map(([name, price]) => (
          <button
            key={name}
            onClick={() => handleAddToCart(name)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Ajouter {name} - {price}€
          </button>
        ))}
      </section>

      <section aria-labelledby="cart-title">
        <h2 id="cart-title" className="text-xl font-semibold mb-4">🛒 Mon panier</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide.</p>
        ) : (
          <>
            <p className="text-right font-semibold mb-2">Total : {total}€</p>
            <button
              onClick={() => setIsPanelOpen(true)}
              className="w-full py-2 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Valider mon panier
            </button>
          </>
        )}
      </section>

      {/* 🧊 SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isPanelOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">🧾 Récapitulatif</h2>
            <button
              onClick={() => setIsPanelOpen(false)}
              className="text-gray-600 hover:text-black text-2xl"
              aria-label="Fermer le panier"
            >
              ×
            </button>
          </div>

          {groupedItems.length === 0 ? (
            <p className="text-gray-500">Votre panier est vide.</p>
          ) : (
            <>
              <div className="overflow-y-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b text-sm text-gray-600">
                      <th className="py-2">Pass</th>
                      <th>Qté</th>
                      <th>Total</th>
                      <th className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedItems.map((item, i) => (
                      <tr key={i} className="border-b">
                        <td className="py-2">{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.price * item.quantity}€</td>
                        <td className="flex justify-center gap-2 py-2">
                          <button
                            onClick={() => handleAddToCart(item.name)}
                            className="text-green-600 hover:text-green-800 font-bold text-lg"
                            title="Ajouter"
                          >
                            ➕
                          </button>
                          <button
                            onClick={() => {
                              const indexToRemove = cart.findIndex((el) => el.name === item.name);
                              if (indexToRemove !== -1) removeFromCart(indexToRemove);
                            }}
                            className="text-yellow-600 hover:text-yellow-800 font-bold text-lg"
                            title="Retirer un"
                          >
                            ➖
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Supprimer tous les "${item.name}" du panier ?`)) {
                                for (let j = cart.length - 1; j >= 0; j--) {
                                  if (cart[j].name === item.name) removeFromCart(j);
                                }
                              }
                            }}
                            className="text-red-600 hover:text-red-800 font-bold text-lg"
                            title="Supprimer tous"
                          >
                            🗑
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4">
                <p className="font-semibold text-right mb-4">Total : {total}€</p>
                <button
                  onClick={() => {
                    alert("🎉 Votre commande a bien été prise en compte !");
                    clearCart();
                    setIsPanelOpen(false);
                  }}
                  className="w-full py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                  Confirmer la commande
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
