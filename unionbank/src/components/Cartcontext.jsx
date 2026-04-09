import { createContext, useContext, useState } from "react";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1, price: i.unitPrice * (i.qty + 1) }
            : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category.toUpperCase(),
          unitPrice: product.unitPrice ?? 45000,
          price: product.unitPrice ?? 45000,
          qty: 1,
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