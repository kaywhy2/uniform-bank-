import { useNavigate } from "react-router-dom";
import { useCart } from "./Cartcontext";
import { useState } from "react";

const GOLD = "#C9A84C";

function formatNaira(amount) {
  return "₦" + amount.toLocaleString();
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

// Checkout is now handled in CheckoutPage.jsx

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [fulfillment, setFulfillment] = useState("home");

  const allSelected = cartItems.length > 0 && cartItems.every((i) => i.selected);

  const toggleSelectAll = () => {
    setCartItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const toggleSelect = (id) => {
    setCartItems((prev) => prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i)));
  };

  const changeQty = (id, delta) => {
    setCartItems((prev) =>
      prev.map((i) => {
        if (i.id !== id) return i;
        const newQty = Math.max(1, i.qty + delta);
        return { ...i, qty: newQty, price: i.unitPrice * newQty };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  };

  const selectedItems = cartItems.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const fulfillmentCost = fulfillment === "home" ? 5000 : 0;
  const total = subtotal + fulfillmentCost;

  const proceedToCheckout = () => {
    // Store fulfillment method for the checkout page
    sessionStorage.setItem("ub_fulfillment", fulfillment);
    navigate("/checkout");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", paddingTop: 60 }}>
      <style>{`
        * { box-sizing: border-box; }
        .qty-btn:hover { background: ${GOLD} !important; color: #fff !important; }
        .remove-btn:hover { color: #e53e3e !important; }
        .email-input:focus { border-color: ${GOLD} !important; outline: none; }

        .cart-wrapper {
          max-width: 760px;
          margin: 0 auto;
          padding: 36px 20px 80px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .cart-item {
          background: #fff;
          border-radius: 14px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: border 0.18s;
        }
        .cart-item-img {
          width: 72px; height: 72px;
          border-radius: 10px; background: #ddd;
          flex-shrink: 0; overflow: hidden;
        }
        .cart-item-info { flex: 1; min-width: 0; }
        .cart-item-right {
          display: flex; flex-direction: column;
          align-items: flex-end; gap: 10px; flex-shrink: 0;
        }
        .fulfillment-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cart-footer-grid { display: grid; grid-template-columns: 2fr 1.5fr 1fr 1.5fr; gap: 40px; margin-bottom: 48px; }

        @media (max-width: 700px) {
          .cart-wrapper { padding: 24px 14px 72px; gap: 16px; }
          .cart-item { padding: 14px; gap: 10px; }
          .cart-item-img { width: 60px; height: 60px; }
          .cart-footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (max-width: 480px) {
          .cart-wrapper { padding: 20px 12px 64px; gap: 14px; }
          .cart-item { flex-wrap: wrap; padding: 14px 12px; gap: 10px; align-items: flex-start; }
          .cart-item-img { width: 52px; height: 52px; border-radius: 8px; }
          .cart-item-info { flex: 1; }
          .cart-item-right { flex-direction: row; align-items: center; justify-content: space-between; width: 100%; gap: 0; padding-left: 34px; }
          .fulfillment-grid { grid-template-columns: 1fr; }
          .cart-footer-grid { grid-template-columns: 1fr 1fr; gap: 20px; }
        }
        @media (max-width: 360px) {
          .cart-footer-grid { grid-template-columns: 1fr; gap: 18px; }
        }
      `}</style>

      <div className="cart-wrapper">

        {/* ── Header ── */}
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>Your Cart</h2>
          <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", margin: 0 }}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* ── SECTION 1: Items ── */}
        {cartItems.length === 0 ? (
          <div style={{ background: "#fff", borderRadius: 14, padding: "56px 20px", textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", margin: 0 }}>Your cart is empty.</p>
            <button
              onClick={() => navigate("/gallery")}
              style={{
                marginTop: 18, background: GOLD, color: "#fff", border: "none",
                borderRadius: 999, padding: "10px 28px", fontSize: 11,
                fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
              }}
            >
              Shop Now
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Select All */}
            <div onClick={toggleSelectAll}
              style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4, cursor: "pointer", userSelect: "none" }}>
              <div style={{
                width: 20, height: 20, borderRadius: "50%",
                background: allSelected ? GOLD : "transparent",
                border: `2px solid ${allSelected ? GOLD : "rgba(0,0,0,0.2)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "all 0.18s", flexShrink: 0,
              }}>
                {allSelected && <CheckIcon />}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>
                Select All Items
              </span>
            </div>

            {/* Item rows */}
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item"
                style={{ border: item.selected ? `1.5px solid ${GOLD}` : "1.5px solid transparent" }}>
                <div onClick={() => toggleSelect(item.id)}
                  style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: item.selected ? GOLD : "transparent",
                    border: `2px solid ${item.selected ? GOLD : "rgba(0,0,0,0.2)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0, transition: "all 0.18s",
                  }}>
                  {item.selected && <CheckIcon />}
                </div>
                <div className="cart-item-img">
                  {item.image && <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
                </div>
                <div className="cart-item-info">
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 3px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", color: "rgba(0,0,0,0.35)", margin: "0 0 4px", textTransform: "uppercase" }}>
                    {item.category}
                  </p>
                  <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: 0 }}>
                    {formatNaira(item.unitPrice)} / unit
                  </p>
                  <button className="remove-btn" onClick={() => removeItem(item.id)}
                    style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "rgba(0,0,0,0.35)", padding: 0, transition: "color 0.18s" }}>
                    <TrashIcon /> Remove
                  </button>
                </div>
                <div className="cart-item-right">
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: 0 }}>{formatNaira(item.price)}</p>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, overflow: "hidden" }}>
                    <button className="qty-btn" onClick={() => changeQty(item.id, -1)}
                      style={{ width: 30, height: 30, background: "#fff", border: "none", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s, color 0.15s" }}>−</button>
                    <span style={{ width: 30, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111" }}>{item.qty}</span>
                    <button className="qty-btn" onClick={() => changeQty(item.id, 1)}
                      style={{ width: 30, height: 30, background: "#fff", border: "none", cursor: "pointer", fontSize: 16, color: "#555", display: "flex", alignItems: "center", justifyContent: "center", transition: "background 0.15s, color 0.15s" }}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── SECTION 2: Fulfillment ── */}
        {cartItems.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "22px 20px" }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>
              Fulfilment Method
            </p>
            <div className="fulfillment-grid">
              <div onClick={() => setFulfillment("home")}
                style={{ border: `1.5px solid ${fulfillment === "home" ? GOLD : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "14px", cursor: "pointer", background: fulfillment === "home" ? "rgba(201,168,76,0.04)" : "#fff", transition: "border 0.18s, background 0.18s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${fulfillment === "home" ? GOLD : "rgba(0,0,0,0.2)"}`, background: fulfillment === "home" ? GOLD : "transparent", flexShrink: 0, transition: "all 0.18s" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Home Delivery</span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: "0 0 8px", lineHeight: 1.5 }}>We ship directly to your address across Nigeria.</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: GOLD }}>₦5,000</span>
              </div>
              <div onClick={() => setFulfillment("pickup")}
                style={{ border: `1.5px solid ${fulfillment === "pickup" ? GOLD : "rgba(0,0,0,0.1)"}`, borderRadius: 10, padding: "14px", cursor: "pointer", background: fulfillment === "pickup" ? "rgba(201,168,76,0.04)" : "#fff", transition: "border 0.18s, background 0.18s" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${fulfillment === "pickup" ? GOLD : "rgba(0,0,0,0.2)"}`, background: fulfillment === "pickup" ? GOLD : "transparent", flexShrink: 0, transition: "all 0.18s" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>In-Person Pickup</span>
                </div>
                <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: "0 0 8px", lineHeight: 1.5 }}>Collect from our Abuja showroom at your convenience.</p>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2ecc71", background: "rgba(46,204,113,0.1)", padding: "2px 10px", borderRadius: 999 }}>Free</span>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 3: Totals + Checkout ── */}
        {cartItems.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 16, padding: "22px 20px" }}>
            {/* Summary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Selected items</span>
                <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>{selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Subtotal</span>
                <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>{formatNaira(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Fulfilment</span>
                <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>{formatNaira(fulfillmentCost)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.07)" }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#111" }}>Total</span>
                <span style={{ fontSize: 17, fontWeight: 800, color: GOLD }}>{formatNaira(total)}</span>
              </div>
            </div>

            {/* ── Proceed to Checkout Button ── */}
            <button
              onClick={proceedToCheckout}
              disabled={selectedItems.length === 0}
              style={{
                width: "100%",
                background: "#111",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "15px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.06em",
                cursor: selectedItems.length === 0 ? "not-allowed" : "pointer",
                opacity: selectedItems.length === 0 ? 0.4 : 1,
                transition: "opacity 0.18s",
                marginBottom: 12,
              }}
            >
              Proceed to Checkout
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "rgba(0,0,0,0.35)" }}>
              <LockIcon />
              <span style={{ fontSize: 11 }}>Secure checkout powered by Paystack</span>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}