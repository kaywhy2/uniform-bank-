import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";
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

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();
  const [fulfillment, setFulfillment] = useState("home");

  // --- helpers that mutate context state ---

  const allSelected = cartItems.length > 0 && cartItems.every((i) => i.selected);

  const toggleSelectAll = () => {
    setCartItems((prev) => prev.map((i) => ({ ...i, selected: !allSelected })));
  };

  const toggleSelect = (id) => {
    setCartItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, selected: !i.selected } : i))
    );
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

  // --- totals ---
  const selectedItems = cartItems.filter((i) => i.selected);
  const subtotal = selectedItems.reduce((sum, i) => sum + i.price, 0);
  const fulfillmentCost = fulfillment === "home" ? 5000 : 0;
  const total = subtotal + fulfillmentCost;

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", paddingTop: 60 }}>
      <style>{`
        .qty-btn:hover { background: ${GOLD} !important; color: #fff !important; }
        .remove-btn:hover { color: #e53e3e !important; }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "40px 32px 80px",
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: 28,
          alignItems: "start",
        }}
      >
        {/* LEFT — Cart Items */}
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: "#111", margin: "0 0 4px" }}>
            Your Cart
          </h2>
          <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", margin: "0 0 24px" }}>
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
          </p>

          {/* Select All */}
          {cartItems.length > 0 && (
            <div
              onClick={toggleSelectAll}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 20,
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: allSelected ? GOLD : "transparent",
                  border: `2px solid ${allSelected ? GOLD : "rgba(0,0,0,0.2)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.18s",
                  flexShrink: 0,
                }}
              >
                {allSelected && <CheckIcon />}
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.5)" }}>
                Select All Items
              </span>
            </div>
          )}

          {/* Items list or empty state */}
          {cartItems.length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 14, padding: "60px 32px", textAlign: "center" }}>
              <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", margin: 0 }}>
                Your cart is empty.
              </p>
              <button
                onClick={() => navigate("/gallery")}
                style={{
                  marginTop: 20,
                  background: GOLD,
                  color: "#fff",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 28px",
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    gap: 18,
                    border: item.selected
                      ? `1.5px solid ${GOLD}`
                      : "1.5px solid transparent",
                    transition: "border 0.18s",
                  }}
                >
                  {/* Checkbox */}
                  <div
                    onClick={() => toggleSelect(item.id)}
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: item.selected ? GOLD : "transparent",
                      border: `2px solid ${item.selected ? GOLD : "rgba(0,0,0,0.2)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                      transition: "all 0.18s",
                    }}
                  >
                    {item.selected && <CheckIcon />}
                  </div>

                  {/* Image */}
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 10,
                      background: "#ddd",
                      flexShrink: 0,
                      overflow: "hidden",
                    }}
                  >
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#111", margin: "0 0 3px" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(0,0,0,0.35)", margin: "0 0 6px", textTransform: "uppercase" }}>
                      {item.category}
                    </p>
                    <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: 0 }}>
                      {formatNaira(item.unitPrice)} per unit
                    </p>

                    {/* Remove */}
                    <button
                      className="remove-btn"
                      onClick={() => removeItem(item.id)}
                      style={{
                        marginTop: 8,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        fontSize: 11,
                        color: "rgba(0,0,0,0.35)",
                        padding: 0,
                        transition: "color 0.18s",
                      }}
                    >
                      <TrashIcon /> Remove
                    </button>
                  </div>

                  {/* Price + Qty */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#111", margin: 0 }}>
                      {formatNaira(item.price)}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0,
                        border: "1px solid rgba(0,0,0,0.12)",
                        borderRadius: 8,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        className="qty-btn"
                        onClick={() => changeQty(item.id, -1)}
                        style={{
                          width: 30,
                          height: 30,
                          background: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 16,
                          color: "#555",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        −
                      </button>
                      <span style={{ width: 32, textAlign: "center", fontSize: 13, fontWeight: 600, color: "#111" }}>
                        {item.qty}
                      </span>
                      <button
                        className="qty-btn"
                        onClick={() => changeQty(item.id, 1)}
                        style={{
                          width: 30,
                          height: 30,
                          background: "#fff",
                          border: "none",
                          cursor: "pointer",
                          fontSize: 16,
                          color: "#555",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background 0.15s, color 0.15s",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Order Summary */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "28px 24px",
            position: "sticky",
            top: 80,
          }}
        >
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: "0 0 22px" }}>
            Order Summary
          </h3>

          {/* Fulfillment Method */}
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 12px" }}>
            Fulfilment Method
          </p>

          {/* Home Delivery */}
          <div
            onClick={() => setFulfillment("home")}
            style={{
              border: `1.5px solid ${fulfillment === "home" ? GOLD : "rgba(0,0,0,0.1)"}`,
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 10,
              cursor: "pointer",
              background: fulfillment === "home" ? "rgba(201,168,76,0.04)" : "#fff",
              transition: "border 0.18s, background 0.18s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `2px solid ${fulfillment === "home" ? GOLD : "rgba(0,0,0,0.2)"}`,
                  background: fulfillment === "home" ? GOLD : "transparent",
                  flexShrink: 0,
                  transition: "all 0.18s",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>Home Delivery</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: "0 0 8px 26px", lineHeight: 1.5 }}>
              We ship directly to your address across Nigeria.
            </p>
            <span style={{ marginLeft: 26, fontSize: 11, fontWeight: 700, color: GOLD }}>₦5,000</span>
          </div>

          {/* In-Person Pickup */}
          <div
            onClick={() => setFulfillment("pickup")}
            style={{
              border: `1.5px solid ${fulfillment === "pickup" ? GOLD : "rgba(0,0,0,0.1)"}`,
              borderRadius: 10,
              padding: "14px 16px",
              marginBottom: 24,
              cursor: "pointer",
              background: fulfillment === "pickup" ? "rgba(201,168,76,0.04)" : "#fff",
              transition: "border 0.18s, background 0.18s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  border: `2px solid ${fulfillment === "pickup" ? GOLD : "rgba(0,0,0,0.2)"}`,
                  background: fulfillment === "pickup" ? GOLD : "transparent",
                  flexShrink: 0,
                  transition: "all 0.18s",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>In-Person Pickup</span>
            </div>
            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", margin: "0 0 8px 26px", lineHeight: 1.5 }}>
              Collect from our Abuja showroom at your convenience.
            </p>
            <span style={{ marginLeft: 26, fontSize: 11, fontWeight: 700, color: "#2ecc71", background: "rgba(46,204,113,0.1)", padding: "2px 10px", borderRadius: 999 }}>
              Free
            </span>
          </div>

          {/* Summary rows */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 18, marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Selected items</span>
              <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>
                {selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Subtotal</span>
              <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>{formatNaira(subtotal)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
              <span style={{ fontSize: 12, color: "rgba(0,0,0,0.45)" }}>Fulfilment</span>
              <span style={{ fontSize: 12, color: "#111", fontWeight: 600 }}>{formatNaira(fulfillmentCost)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 22 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>Total</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: GOLD }}>{formatNaira(total)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
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
            disabled={selectedItems.length === 0}
          >
            Proceed to Checkout
          </button>

          {/* Secure checkout */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, color: "rgba(0,0,0,0.35)" }}>
            <LockIcon />
            <span style={{ fontSize: 11 }}>Secure checkout</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 32px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1fr 1.5fr", gap: 40, marginBottom: 48 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", margin: "0 0 14px" }}>
                Uniform Bank
              </h3>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 220 }}>
                Premium uniforms and bespoke garments crafted for institutions, teams, and individuals who demand distinction.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 16px" }}>
                Services
              </p>
              {["School Uniforms", "Sports Wear", "Corporate Apparel", "Security Uniforms", "Bespoke Tailoring"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 10px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
                >
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 16px" }}>
                Company
              </p>
              {["About Us", "Why Us", "Gallery", "Contact"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 10px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
                >
                  {item}
                </p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 16px" }}>
                Get In Touch
              </p>
              {["inquiry@uniformbank.com", "+234 800 000 0000", "Abuja, Nigeria"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 10px" }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", margin: 0 }}>
              © 2026 Uniform Bank. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <p key={item} style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", margin: 0, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}