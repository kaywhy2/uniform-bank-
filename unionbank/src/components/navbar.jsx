import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./Cartcontext";

const GOLD = "#C9A84C";
const GOLD_GLOW = "0 0 8px rgba(201,168,76,0.65), 0 0 20px rgba(201,168,76,0.3)";

const NAV_ITEMS = [
  { label: "Home",         path: "/" },
  { label: "Gallery",      path: "/gallery" },
  { label: "Services",     path: "/services" },
  { label: "Get in Touch", path: "/contact" },
];

function UserIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

const ICON_ITEMS = [
  { label: "Profile", path: "/profile", Icon: UserIcon },
  { label: "Cart",    path: "/cart",    Icon: CartIcon },
];

export default function Navbar() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleClick = (item) => {
    if (item.path) navigate(item.path);
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nb {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 300;
          background: var(--bg-card);
          border-bottom: 1px solid var(--border-light);
        }

        .nb__inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 32px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .nb__logo {
          font-family: "Pacifico", cursive;
          font-weight: 400;
          font-size: 17px;
          letter-spacing: 0.01em;
          color: var(--text-main);
          cursor: pointer;
          transition: color 0.2s ease, text-shadow 0.2s ease;
          flex-shrink: 0;
          user-select: none;
        }
        .nb__logo:hover {
          color: ${GOLD};
          text-shadow: ${GOLD_GLOW};
        }

        .nb__links {
          display: flex;
          align-items: center;
          list-style: none;
          gap: 2px;
        }

        .nb__item {
          position: relative;
          cursor: pointer;
          padding: 6px 16px;
          line-height: 1;
        }

        .nb__label {
          font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: var(--text-muted);
          transition: color 0.18s ease, text-shadow 0.18s ease;
          user-select: none;
          white-space: nowrap;
        }

        .nb__item--active .nb__label,
        .nb__item--hovered .nb__label {
          color: ${GOLD};
          text-shadow: ${GOLD_GLOW};
        }

        .nb__bar {
          position: absolute;
          bottom: -1px;
          left: 50%;
          translate: -50% 0;
          height: 1.5px;
          width: 0;
          background: ${GOLD};
          transition: width 0.22s ease, box-shadow 0.22s ease;
          border-radius: 99px;
        }

        .nb__item--active .nb__bar,
        .nb__item--hovered .nb__bar {
          width: 60%;
          box-shadow: 0 0 6px ${GOLD}, 0 0 14px rgba(201,168,76,0.35);
        }

        .nb__icons {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-shrink: 0;
        }

        .nb__icon-item {
          position: relative;
          cursor: pointer;
          padding: 6px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          transition: color 0.18s ease, text-shadow 0.18s ease;
        }

        .nb__icon-item--active,
        .nb__icon-item--hovered {
          color: ${GOLD};
          filter: drop-shadow(0 0 4px rgba(201,168,76,0.6));
        }

        .nb__icon-item .nb__bar {
          bottom: -1px;
        }

        .nb__icon-item--active .nb__bar,
        .nb__icon-item--hovered .nb__bar {
          width: 60%;
          box-shadow: 0 0 6px ${GOLD}, 0 0 14px rgba(201,168,76,0.35);
        }

        .nb__badge {
          position: absolute;
          top: 2px;
          right: 2px;
          background: ${GOLD};
          color: var(--bg-card);
          font-size: 9px;
          font-weight: 700;
          line-height: 1;
          min-width: 15px;
          height: 15px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 3px;
          pointer-events: none;
        }

        @media (max-width: 860px) {
          .nb__item { padding: 6px 11px; }
          .nb__label { font-size: 9.5px; }
        }

        @media (max-width: 600px) {
          .nb__inner {
            height: auto;
            flex-direction: column;
            padding: 10px 16px 8px;
            gap: 8px;
          }
          .nb__links { flex-wrap: wrap; justify-content: center; }
          .nb__label { font-size: 9px; }
          .nb__icon-item { padding: 6px 8px; }
        }
      `}</style>

      <nav className="nb" role="navigation" aria-label="Main navigation">
        <div className="nb__inner">

          {/* Logo */}
          <span
            className="nb__logo"
            onClick={() => { setActive(null); navigate("/"); }}
            aria-label="Uniform Bank — go home"
          >
            Uniform Bank
          </span>

          {/* Nav links */}
          <ul className="nb__links">
            {NAV_ITEMS.map((item) => {
              const isActive  = location.pathname === item.path;
              const isHovered = hovered === item.label;
              const cls = [
                "nb__item",
                isActive  ? "nb__item--active"  : "",
                isHovered ? "nb__item--hovered" : "",
              ].filter(Boolean).join(" ");

              return (
                <li
                  key={item.label}
                  className={cls}
                  onClick={() => handleClick(item)}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="nb__label">{item.label}</span>
                  <span className="nb__bar" aria-hidden="true" />
                </li>
              );
            })}
          </ul>

          {/* Icon nav items — Profile + Cart */}
          <div className="nb__icons" aria-label="Account and cart">
            {ICON_ITEMS.map(({ label, path, Icon }) => {
              const isActive  = location.pathname === path;
              const isHovered = hovered === label;
              const cls = [
                "nb__icon-item",
                isActive  ? "nb__icon-item--active"  : "",
                isHovered ? "nb__icon-item--hovered" : "",
              ].filter(Boolean).join(" ");

              return (
                <div
                  key={label}
                  className={cls}
                  onClick={() => navigate(path)}
                  onMouseEnter={() => setHovered(label)}
                  onMouseLeave={() => setHovered(null)}
                  role="button"
                  tabIndex={0}
                  aria-label={label}
                  onKeyDown={(e) => e.key === "Enter" && navigate(path)}
                >
                  <Icon />
                  {label === "Cart" && cartCount > 0 && (
                    <span className="nb__badge">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                  <span className="nb__bar" aria-hidden="true" />
                </div>
              );
            })}
          </div>

        </div>
      </nav>
    </>
  );
}