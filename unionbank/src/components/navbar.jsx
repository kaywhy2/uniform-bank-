import { useState, useEffect, useRef } from "react";

const NAV_DATA = {
  Men: [
    { heading: "New & Featured", links: ["New Arrivals", "Best Sellers", "Latest Drops", "Air Max Collection", "Shop All Sale"] },
    { heading: "Clothing", links: ["All Clothing", "Hoodies & Sweatshirts", "Jackets & Vests", "Pants", "Shorts", "Swim", "Tops & Graphic Tees"] },
    { heading: "Accessories", links: ["All Accessories", "Bags & Backpacks", "Hats & Headwear", "Socks"] },
  ],
  Women: [
    { heading: "New & Featured", links: ["New Arrivals", "Best Sellers", "Latest Drops", "Trending Now", "Shop All Sale"] },
    { heading: "Clothing", links: ["All Clothing", "Dresses & Skirts", "Hoodies & Sweatshirts", "Jackets & Vests", "Leggings", "Shorts", "Tops & T-Shirts"] },
    { heading: "Accessories", links: ["All Accessories", "Bags & Backpacks", "Hats & Headwear", "Socks", "Jewellery"] },
  ],
  Kids: [
    { heading: "New & Featured", links: ["New Arrivals", "Best Sellers", "Latest Drops", "Shop All Sale"] },
    { heading: "Clothing", links: ["All Clothing", "Sets & Bundles", "Graphic Tees", "Hoodies", "Joggers & Pants", "Shorts"] },
    { heading: "Accessories", links: ["All Accessories", "Bags", "Hats", "Socks"] },
  ],
};

function MegaMenu({ sections, open, onMouseEnter, onMouseLeave }) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: "fixed",
        top: 53,
        left: 0,
        width: "100%",
        opacity: open ? 1 : 0,
        transform: open ? "translateY(0)" : "translateY(-6px)",
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.22s ease, transform 0.22s ease",
        background: "rgba(14,14,14,0.98)",
        backdropFilter: "blur(20px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        zIndex: 100,
        padding: "36px 0 40px",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", paddingLeft: 32, display: "flex", gap: 64 }}>
        {sections.map((col, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 14, minWidth: 160 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#fff", letterSpacing: "0.03em", marginBottom: 2 }}>
              {col.heading}
            </span>
            {col.links.map((link, j) => (
              <a  // ← was missing the opening <a tag
                key={j}
                href="#"
                onClick={(e) => e.preventDefault()}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  textDecoration: "none",
                  transition: "color 0.15s",
                  lineHeight: 1,
                }}
              >
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);
  const timers = useRef({});

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Pacifico&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const navItems = ["Men", "Women", "Kids", "Contact"];

  const handleEnter = (key) => {
    clearTimeout(timers.current[key]);
    if (NAV_DATA[key]) setOpenMenu(key);
  };

  const handleLeave = (key) => {
    if (NAV_DATA[key]) {
      timers.current[key] = setTimeout(() => {
        setOpenMenu((prev) => (prev === key ? null : prev));
      }, 130);
    }
  };

  const keepOpen = (key) => clearTimeout(timers.current[key]);

  const scheduleClose = (key) => {
    timers.current[key] = setTimeout(() => {
      setOpenMenu((prev) => (prev === key ? null : prev));
    }, 130);
  };

  return (
    <div style={{ background: "#111", minHeight: "100vh" }}>
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 200,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          height: 54,
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
          <h1 style={{ fontSize: 18, color: "#fff", fontFamily: "Pacifico, cursive", fontWeight: 400 }}>
            Uniform Bank
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navItems.map((key) => (
              <div
                key={key}
                onMouseEnter={() => handleEnter(key)}
                onMouseLeave={() => handleLeave(key)}
                onClick={() => setActive(key)}
                style={{ position: "relative" }}
              >
                <div
                  style={{
                    padding: "6px 16px",
                    cursor: "pointer",
                    fontSize: 14,
                    fontWeight: 500,
                    color: openMenu === key || active === key ? "#fff" : "rgba(255,255,255,0.65)",
                    transition: "color 0.18s",
                    userSelect: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    borderRadius: 6,
                  }}
                >
                  {key}
                  {NAV_DATA[key] && (
                    <span
                      style={{
                        fontSize: 9,
                        opacity: 0.5,
                        marginTop: 1,
                        display: "inline-block",
                        transition: "transform 0.2s",
                        transform: openMenu === key ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ▾
                    </span>
                  )}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: -1,
                    left: "50%",
                    transform: "translateX(-50%)",
                    height: 2,
                    borderRadius: 1,
                    background: "#fff",
                    width: openMenu === key || active === key ? "60%" : "0%",
                    transition: "width 0.2s ease",
                  }}
                />
              </div>
            ))}
          </div>

          <button
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            style={{
              background: "#fff",
              color: "#000",
              fontSize: 13,
              fontWeight: 600,
              padding: "7px 22px",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              transition: "opacity 0.2s",
            }}
          >
            Shop
          </button>
        </div>
      </nav>

      {navItems
        .filter((k) => NAV_DATA[k])
        .map((key) => (
          <MegaMenu
            key={key}
            sections={NAV_DATA[key]}
            open={openMenu === key}
            onMouseEnter={() => keepOpen(key)}
            onMouseLeave={() => scheduleClose(key)}
          />
        ))}
    </div>
  );
}