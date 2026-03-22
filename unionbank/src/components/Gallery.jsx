import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./useCart";

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
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function Gallery() {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartHovered, setCartHovered] = useState(null);
  const [justAdded, setJustAdded] = useState(null);

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const handleAddToCart = (product) => {
    addToCart(product);
    setJustAdded(product.id);
    setTimeout(() => {
      setJustAdded(null);
      navigate("/cart");
    }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", paddingTop: 60 }}>
      <style>{`
        @keyframes cartPop {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes tickIn {
          0%   { transform: scale(0.6); opacity: 0; }
          60%  { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .filter-scroll::-webkit-scrollbar { display: none; }

        .product-grid {
          max-width: 1200px;
          margin: 0 auto;
          padding: 24px 20px 80px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px 14px;
        }

        .gallery-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1.5fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 48px;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px 12px;
          }
        }

        @media (max-width: 600px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px 10px;
            padding: 16px 12px 60px;
          }
          .gallery-footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
        }

        @media (max-width: 400px) {
          .product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px 8px;
            padding: 12px 10px 60px;
          }
          .gallery-footer-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      {/* Filter Bar */}
      <div
        className="filter-scroll"
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          gap: 2,
          overflowX: "auto",
          scrollbarWidth: "none",
          background: "#fff",
          position: "sticky",
          top: 60,
          zIndex: 100,
        }}
      >
        {/* Cart badge */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            flexShrink: 0,
            marginLeft: "auto",
            padding: "7px 12px",
            fontSize: 11,
            fontWeight: 700,
            background: cartCount > 0 ? GOLD : "transparent",
            color: cartCount > 0 ? "#fff" : "rgba(0,0,0,0.4)",
            border: cartCount > 0 ? "none" : "1px solid rgba(0,0,0,0.12)",
            borderRadius: 999,
            cursor: "pointer",
            transition: "all 0.18s",
            display: "flex",
            alignItems: "center",
            gap: 6,
            whiteSpace: "nowrap",
            margin: "10px 4px 10px auto",
          }}
        >
          <CartIcon />
          {cartCount > 0 ? `Cart (${cartCount})` : "Cart"}
        </button>

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
                color: isActive ? "#fff" : "rgba(0,0,0,0.5)",
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
      </div>

      {/* Product Grid */}
      <div className="product-grid">
        {filtered.map((product) => {
          const inCart = cartItems.some((i) => i.id === product.id);
          const added = justAdded === product.id;

          return (
            <div key={product.id}>
              {/* Image Card */}
              <div
                style={{
                  position: "relative",
                  borderRadius: 10,
                  overflow: "hidden",
                  aspectRatio: "1 / 1.08",
                  background: "#ccc",
                  cursor: "pointer",
                }}
              >
                {product.image ? (
                  <img src={product.image} alt={product.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%" }} />
                )}

                {/* Cart button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  onMouseEnter={() => setCartHovered(product.id)}
                  onMouseLeave={() => setCartHovered(null)}
                  title={inCart ? "Add another" : "Add to cart"}
                  style={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    background: added ? "#2ecc71" : inCart ? GOLD : cartHovered === product.id ? GOLD : "rgba(255,255,255,0.92)",
                    color: added || inCart || cartHovered === product.id ? "#fff" : "#444",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.16)",
                    transition: "background 0.18s, color 0.18s",
                    animation: cartHovered === product.id && !added ? "cartPop 0.28s ease" : "none",
                  }}
                >
                  {added ? <span style={{ animation: "tickIn 0.3s ease" }}><CheckIcon /></span> : <CartIcon />}
                </button>

                {/* In Cart pill */}
                {inCart && !added && (
                  <div style={{
                    position: "absolute", top: 8, left: 8,
                    background: GOLD, color: "#fff",
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.08em",
                    textTransform: "uppercase", padding: "3px 8px", borderRadius: 999,
                  }}>
                    In Cart
                  </div>
                )}
              </div>

              {/* Name & subtitle */}
              <div style={{ marginTop: 8, paddingLeft: 2 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#111", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {product.name}
                </p>
                <p style={{ fontSize: 10, color: "rgba(0,0,0,0.4)", margin: "3px 0 0" }}>
                  {product.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid rgba(0,0,0,0.07)", padding: "48px 20px 28px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="gallery-footer-grid">
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: "0 0 12px" }}>Uniform Bank</h3>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 220 }}>
                Premium uniforms and bespoke garments crafted for institutions, teams, and individuals who demand distinction.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Services</p>
              {["School Uniforms", "Sports Wear", "Corporate Apparel", "Security Uniforms", "Bespoke Tailoring"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}>{item}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Company</p>
              {["About Us", "Why Us", "Gallery", "Contact"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}>{item}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Get In Touch</p>
              {["inquiry@uniformbank.com", "+234 800 000 0000", "Abuja, Nigeria"].map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px" }}>{item}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", margin: 0 }}>© 2026 Uniform Bank. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <p key={item} style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", margin: 0, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}