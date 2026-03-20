import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_GLOW = "0 0 10px rgba(201,168,76,0.55), 0 0 22px rgba(201,168,76,0.25)";
const GOLD_TEXT_SHADOW = "0 0 8px rgba(201,168,76,0.7), 0 0 18px rgba(201,168,76,0.35)";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [shopHovered, setShopHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const navItems = ["Gallery", "Services", "Why Us", "Contact"];

  const handleNavClick = (key) => {
    setActive(key);

    if (key === "Gallery") {
      navigate("/gallery");
      return;
    }

    const id = key.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes goldPulse {
          0%   { box-shadow: 0 0 8px rgba(201,168,76,0.5), 0 0 18px rgba(201,168,76,0.2); }
          50%  { box-shadow: 0 0 14px rgba(201,168,76,0.8), 0 0 32px rgba(201,168,76,0.38); }
          100% { box-shadow: 0 0 8px rgba(201,168,76,0.5), 0 0 18px rgba(201,168,76,0.2); }
        }
      `}</style>

      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 200,
          background: "#fff",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          height: 60,
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 32px",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <h1
            onMouseEnter={() => setLogoHovered(true)}
            onMouseLeave={() => setLogoHovered(false)}
            onClick={() => navigate("/")}
            style={{
              fontSize: 18,
              color: logoHovered ? GOLD : "#000",
              fontFamily: "Pacifico, cursive",
              fontWeight: 400,
              letterSpacing: "0.01em",
              textShadow: logoHovered ? GOLD_TEXT_SHADOW : "none",
              transition: "color 0.22s, text-shadow 0.22s",
              cursor: "pointer",
            }}
          >
            Uniform Bank
          </h1>

          {/* Nav Items */}
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            {navItems.map((key) => {
              const isActive = active === key;
              const isHovered = hoveredItem === key;
              const showGold = isActive || isHovered;

              return (
                <div
                  key={key}
                  onMouseEnter={() => setHoveredItem(key)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleNavClick(key)}
                  style={{ position: "relative" }}
                >
                  <div
                    style={{
                      padding: "6px 18px",
                      cursor: "pointer",
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: showGold ? GOLD : "rgba(0,0,0,0.5)",
                      textShadow: showGold ? GOLD_TEXT_SHADOW : "none",
                      transition: "color 0.18s, text-shadow 0.18s",
                      userSelect: "none",
                      display: "flex",
                      alignItems: "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {key}
                  </div>

                  {/* Underline — turns gold on hover */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: -1,
                      left: "50%",
                      transform: "translateX(-50%)",
                      height: 1.5,
                      background: showGold ? GOLD : "#000",
                      boxShadow: showGold
                        ? `0 0 6px ${GOLD}, 0 0 14px rgba(201,168,76,0.4)`
                        : "none",
                      width: showGold ? "60%" : "0%",
                      transition: "width 0.2s ease, background 0.2s, box-shadow 0.2s",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Shop Button */}
          <button
            onMouseEnter={() => setShopHovered(true)}
            onMouseLeave={() => setShopHovered(false)}
            style={{
              background: shopHovered ? GOLD : "transparent",
              color: shopHovered ? "#fff" : "#000",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "7px 22px",
              borderRadius: 999,
              border: `1.5px solid ${shopHovered ? GOLD : "#000"}`,
              cursor: "pointer",
              transition: "background 0.22s, color 0.22s, border-color 0.22s, box-shadow 0.22s",
              boxShadow: shopHovered ? GOLD_GLOW : "none",
              animation: shopHovered ? "goldPulse 1.8s ease-in-out infinite" : "none",
            }}
          >
            Shop
          </button>
        </div>
      </nav>
    </>
  );
}