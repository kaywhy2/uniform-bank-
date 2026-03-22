import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_TEXT_SHADOW = "0 0 8px rgba(201,168,76,0.7), 0 0 18px rgba(201,168,76,0.35)";

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [logoHovered, setLogoHovered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const navItems = ["Home", "Gallery", "Services", "Get in Touch"];

  const handleNavClick = (key) => {
    setActive(key);
    if (key === "Home") { navigate("/"); return; }
    if (key === "Gallery") { navigate("/gallery"); return; }
    if (key === "Get in Touch") { navigate("/contact"); return; }
    const id = key.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 200;
          background: #fff;
          border-bottom: 1px solid rgba(0,0,0,0.08);
        }

        .navbar-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
          height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .nav-links {
          display: flex;
          align-items: center;
        }

        .nav-item-wrapper {
          position: relative;
          cursor: pointer;
        }

        .nav-item-label {
          padding: 6px 14px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.18s, text-shadow 0.18s;
          user-select: none;
          display: flex;
          align-items: center;
          white-space: nowrap;
        }

        .nav-underline {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          height: 1.5px;
          transition: width 0.2s ease, background 0.2s, box-shadow 0.2s;
        }

        @media (max-width: 860px) {
          .nav-item-label { padding: 6px 10px; font-size: 10px; }
        }

        @media (max-width: 600px) {
          .navbar-wrapper { height: auto; }
          .navbar-inner {
            height: auto;
            flex-direction: column;
            align-items: center;
            padding: 10px 16px 8px;
          }
          .nav-links {
            flex-wrap: wrap;
            justify-content: center;
            padding: 6px 0 2px;
          }
          .nav-item-label { font-size: 9px; padding: 5px 8px; }
        }
      `}</style>

      <nav className="navbar-wrapper">
        <div className="navbar-inner">

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
              margin: 0,
              textShadow: logoHovered ? GOLD_TEXT_SHADOW : "none",
              transition: "color 0.22s, text-shadow 0.22s",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Uniform Bank
          </h1>

          {/* Nav Links */}
          <div className="nav-links">
            {navItems.map((key) => {
              const showGold = active === key || hoveredItem === key;
              return (
                <div
                  key={key}
                  className="nav-item-wrapper"
                  onMouseEnter={() => setHoveredItem(key)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => handleNavClick(key)}
                >
                  <div
                    className="nav-item-label"
                    style={{
                      color: showGold ? GOLD : "rgba(0,0,0,0.5)",
                      textShadow: showGold ? GOLD_TEXT_SHADOW : "none",
                    }}
                  >
                    {key}
                  </div>
                  <div
                    className="nav-underline"
                    style={{
                      background: showGold ? GOLD : "#000",
                      boxShadow: showGold ? `0 0 6px ${GOLD}, 0 0 14px rgba(201,168,76,0.4)` : "none",
                      width: showGold ? "60%" : "0%",
                    }}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </nav>
    </>
  );
}