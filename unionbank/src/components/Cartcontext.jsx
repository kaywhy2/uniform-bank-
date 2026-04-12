import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      const addQty = product.qty || 1;
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + addQty, price: i.unitPrice * (i.qty + addQty) }
            : i
        );
      }
      const unitPrice = product.unitPrice ?? product.price ?? 45000;
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category ? String(product.category).toUpperCase() : "UNCLASSIFIED",
          unitPrice,
          price: unitPrice * addQty,
          qty: addQty,
          selected: true,
          image: product.image ?? null,
        },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQty = (id, qty) => {
    if (qty < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty, price: i.unitPrice * qty } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}