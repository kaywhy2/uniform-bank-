import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./Cartcontext";

import img001 from "../assets/001.jpeg";
import img002 from "../assets/002.jpeg";
import img003 from "../assets/003.jpeg";
import img004 from "../assets/004.jpeg";
import img005 from "../assets/005.jpeg";
import img006 from "../assets/006.jpeg";
import img007 from "../assets/007.jpeg";
import img008 from "../assets/008.jpeg";
import img009 from "../assets/009.jpeg";
import img010 from "../assets/010.jpeg";
import img011 from "../assets/011.jpeg";
import img012 from "../assets/012.jpeg";
import img013 from "../assets/013.jpeg";
import img014 from "../assets/014.jpeg";
import img015 from "../assets/015.jpeg";

const GOLD = "#C9A84C";
const GREEN = "#2ecc71";
const RED = "#e05555";

const categories = [
  "All",
  "School Uniforms",
  "Sports Wear",
  "Janitorial & Work",
  "Security Uniforms",
  "Corporate & Institutional",
  "Bespoke Custom Tailored",
];

const products = [
  { id: 1,  name: "Classic School Blazer",    subtitle: "Ages 6–18",          category: "School Uniforms",           unitPrice: 45000, image: img001 },
  { id: 2,  name: "Junior Shirt Set",          subtitle: "Summer Edition",     category: "School Uniforms",           unitPrice: 18000, image: img002 },
  { id: 3,  name: "Track Suit Pro",            subtitle: "All-Weather",        category: "Sports Wear",               unitPrice: 22000, image: img003 },
  { id: 4,  name: "Football Kit",              subtitle: "Competition Grade",  category: "Sports Wear",               unitPrice: 30000, image: img004 },
  { id: 5,  name: "Running Shorts Set",        subtitle: "Lightweight",        category: "Sports Wear",               unitPrice: 12000, image: img005 },
  { id: 6,  name: "Maintenance Overall",       subtitle: "Heavy-Duty",         category: "Janitorial & Work",         unitPrice: 15000, image: img006 },
  { id: 7,  name: "Workshop Coverall",         subtitle: "Reinforced Seams",   category: "Janitorial & Work",         unitPrice: 17000, image: img007 },
  { id: 8,  name: "Guard Dress Uniform",       subtitle: "Premium Series",     category: "Security Uniforms",         unitPrice: 35000, image: img008 },
  { id: 9,  name: "Tactical Ensemble",         subtitle: "Field-Ready",        category: "Security Uniforms",         unitPrice: 40000, image: img009 },
  { id: 10, name: "Executive Suit",            subtitle: "Corporate Line",     category: "Corporate & Institutional", unitPrice: 45000, image: img010 },
  { id: 11, name: "Staff Polo Set",            subtitle: "Institutional",      category: "Corporate & Institutional", unitPrice: 14000, image: img011 },
  { id: 12, name: "Ladies Office Wear",        subtitle: "Tailored Fit",       category: "Corporate & Institutional", unitPrice: 38000, image: img012 },
  { id: 13, name: "Bespoke Three-Piece",       subtitle: "Handcrafted",        category: "Bespoke Custom Tailored",   unitPrice: 45000, image: img013 },
  { id: 14, name: "Commissioned Day Dress",    subtitle: "Bespoke",            category: "Bespoke Custom Tailored",   unitPrice: 55000, image: img014 },
  { id: 15, name: "Tailored Safari Suit",      subtitle: "Custom Order",       category: "Bespoke Custom Tailored",   unitPrice: 60000, image: img015 },
];

function CartIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function RemoveIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function Gallery() {
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cartItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const cartCount = cartItems.reduce((sum, i) => sum + (i.qty ?? 1), 0);

  const handleCartToggle = (e, product) => {
    e.stopPropagation();
    const inCart = cartItems.some((i) => i.id === product.id);
    if (inCart) {
      removeFromCart(product.id);
    } else {
      addToCart({ ...product, qty: 1 });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-card)", paddingTop: 60 }}>
      <style>{`
        .filter-scroll::-webkit-scrollbar { display: none; }

        .product-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px 14px;
        }

        .product-card-img {
          position: relative;
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 1 / 1.08;
          background: var(--border-strong);
          cursor: default;
        }

        .cart-toggle-btn {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          padding: 9px 0;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: background 0.18s, opacity 0.18s;
          border-radius: 0 0 10px 10px;
        }

        .in-cart-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 3px 8px;
          border-radius: 999px;
          background: ${GOLD};
          color: var(--bg-card);
          pointer-events: none;
        }

        .gallery-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(3, 1fr); gap: 16px 12px; }
        }
        @media (max-width: 600px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 14px 10px; padding: 16px 12px 60px; }
          .gallery-footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; }
        }
        @media (max-width: 400px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); gap: 12px 8px; padding: 12px 10px 60px; }
          .gallery-footer-grid { grid-template-columns: 1fr; gap: 20px; }
        }
      `}</style>

      {/* Sticky top bar: categories + cart */}
      <div
        className="filter-scroll"
        style={{
          borderBottom: "1px solid var(--border-light)",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          overflowX: "auto",
          scrollbarWidth: "none",
          background: "var(--bg-card)",
          position: "sticky",
          top: 60,
          zIndex: 100,
        }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                flexShrink: 0,
                padding: "7px 13px",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: "0.04em",
                background: isActive ? GOLD : "transparent",
                color: isActive ? "var(--bg-card)" : "var(--text-muted)",
                border: "none",
                borderRadius: 999,
                cursor: "pointer",
                transition: "all 0.18s",
                whiteSpace: "nowrap",
                margin: "10px 2px",
              }}
            >
              {cat}
            </button>
          );
        })}

        {/* Cart CTA — navigate manually */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            flexShrink: 0,
            marginLeft: "auto",
            padding: "7px 14px",
            fontSize: 11,
            fontWeight: 700,
            background: cartCount > 0 ? GOLD : "transparent",
            color: cartCount > 0 ? "var(--bg-card)" : "var(--text-muted)",
            border: cartCount > 0 ? "none" : "1px solid var(--border-strong)",
            borderRadius: 999,
            cursor: "pointer",
            transition: "all 0.18s",
            display: "flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
            margin: "10px 0 10px 12px",
          }}
        >
          <CartIcon />
          {cartCount > 0 ? `Go to Cart (${cartCount})` : "Cart"}
        </button>
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.map((product) => {
          const inCart = cartItems.some((i) => i.id === product.id);
          const isHovered = hoveredId === product.id;

          // Button appearance:
          // - Not in cart, not hovered → subtle dark bar
          // - Not in cart, hovered → GOLD "Add to Cart"
          // - In cart, not hovered → GREEN "Added"
          // - In cart, hovered → RED "Remove"
          let btnBg, btnColor, btnLabel, BtnIcon;

          if (inCart && isHovered) {
            btnBg = RED; btnColor = "var(--bg-card)"; btnLabel = "Remove"; BtnIcon = RemoveIcon;
          } else if (inCart) {
            btnBg = GREEN; btnColor = "var(--bg-card)"; btnLabel = "Added"; BtnIcon = CheckIcon;
          } else if (isHovered) {
            btnBg = GOLD; btnColor = "var(--bg-card)"; btnLabel = "Add to Cart"; BtnIcon = CartIcon;
          } else {
            btnBg = "var(--text-muted)"; btnColor = "var(--bg-card)"; btnLabel = "Add to Cart"; BtnIcon = CartIcon;
          }

          return (
            <div key={product.id}>
              <div
                className="product-card-img"
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "var(--border-strong)" }} />
                )}

                {/* "In Cart" top-left badge */}
                {inCart && (
                  <div className="in-cart-badge">In Cart</div>
                )}

                {/* Full-width cart toggle bar at bottom of image */}
                <button
                  className="cart-toggle-btn"
                  onClick={(e) => handleCartToggle(e, product)}
                  style={{
                    background: btnBg,
                    color: btnColor,
                    opacity: isHovered || inCart ? 1 : 0.82,
                  }}
                  title={inCart ? "Click to remove from cart" : "Click to add to cart"}
                >
                  <BtnIcon />
                  {btnLabel}
                </button>
              </div>

              {/* Product info */}
              <div style={{ marginTop: 8, paddingLeft: 2 }}>
                <p style={{
                  fontSize: 12, fontWeight: 700, color: "var(--text-main)", margin: 0,
                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                }}>
                  {product.name}
                </p>
                <p style={{ fontSize: 10, color: "var(--text-muted)", margin: "3px 0 0" }}>
                  {product.subtitle}
                </p>
                <p style={{ fontSize: 11, color: GOLD, fontWeight: 700, margin: "4px 0 0" }}>
                  ₦{product.unitPrice.toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}