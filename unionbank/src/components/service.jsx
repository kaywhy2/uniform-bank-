import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#FAF3E0";
const BG = "#F9F8F6";

const FAQS = [
  { q: "What is the minimum order quantity for bulk production?" },
  { q: "How long does production typically take?" },
  { q: "Can I see fabric samples before placing an order?" },
  { q: "Do you handle deliveries outside Abuja?" },
  { q: "What happens if a garment doesn't fit after delivery?" },
  { q: "Can you redesign our current school or corporate uniform?" },
  { q: "How are measurements taken for bespoke orders?" },
  { q: "Do you offer embroidery, branding, or logo printing?" },
  { q: "What payment methods do you accept?" },
  { q: "Can individuals order a single bespoke piece, or is this service for organisations only?" },
];

const SERVICES = [
  {
    id: 1,
    tag: "Uniform Production",
    title: "Uniform Production",
    description:
      "We produce institutional uniforms at scale — every category handled with consistent quality control, material curation, and precise sizing across your full team or student body.",
    items: [
      { name: "School Uniforms", detail: "Blazers, shirts, skirts, trousers, and PE kits for nursery through secondary schools." },
      { name: "Sportswear", detail: "Performance-ready kits for football, athletics, basketball, and multi-sport teams." },
      { name: "Janitorial & Facility", detail: "Durable, functional workwear built for demanding environments." },
      { name: "Security Uniforms", detail: "Authority-commanding dress uniforms and tactical assemblies for security personnel." },
      { name: "Corporate & Institutional Apparel", detail: "Polished, branded uniforms for staff across hospitality, healthcare, and corporate settings." },
    ],
    imageRight: true,
  },
  {
    id: 2,
    tag: "Bespoke & Custom",
    title: "Custom Tailoring",
    description:
      "Every body is different. Our bespoke tailoring service produces garments that fit your exact measurements, your preferred fabrics, and your personal or organisational aesthetic.",
    items: [
      { name: "Individual Bespoke Garments", detail: "Suits, shirts, trousers, gowns, and outfits made to your precise measurements and taste." },
      { name: "Organisational Bespoke", detail: "Branded, tailored pieces for leadership teams, event wear, and board-level corporate uniforms." },
      { name: "Measurement Sessions", detail: "In-person at our Abuja showroom, at your location, or guided remotely via video call." },
      { name: "Fabric Consultation", detail: "We source from a curated range of local and imported textiles to match your vision." },
    ],
    imageRight: false,
  },
  {
    id: 3,
    tag: "Creative Services",
    title: "Garment Design & Redesign",
    description:
      "Your existing uniform doesn't have to stay as it is. We work with institutions and teams to reimagine their garments — improving function, elevating aesthetics, and bringing designs up to a 2026 standard.",
    items: [
      { name: "Uniform Redesign", detail: "Refreshing dated school, corporate, or sports uniforms with modern cuts and updated branding." },
      { name: "Sportswear Enhancement", detail: "Improving aerodynamics, breathability, and team identity in existing kits." },
      { name: "Functional Upgrades", detail: "Adding pockets, reinforcing stress points, improving fit range, and updating materials." },
      { name: "Style Modernisation", detail: "Creating contemporary silhouettes from legacy designs without losing institutional identity." },
    ],
    imageRight: true,
  },
  {
    id: 4,
    tag: "Bulk & Procurement",
    title: "Bulk Garment Production",
    description:
      "Whether you're outfitting a school of 500 or a company of 3,000 — our production capacity handles medium and large-scale orders without compromising on quality or consistency.",
    items: [
      { name: "Schools & Institutions", detail: "Uniform packages across all year groups with consistent sizing, quality, and branding." },
      { name: "Companies & Organisations", detail: "Staff uniforms delivered across multiple departments, branches, or locations." },
      { name: "Event & Campaign Orders", detail: "Short-run bulk orders for sporting events, corporate days, and institutional campaigns." },
      { name: "Reorder Management", detail: "Ongoing supply agreements for organisations needing regular restocking throughout the year." },
    ],
    imageRight: false,
  },
];

function ImagePlaceholder({ label }) {
  return (
    <div style={{
      width: "100%",
      aspectRatio: "4 / 3",
      borderRadius: 12,
      background: "linear-gradient(135deg, #e8e4dc 0%, #d8d3c8 100%)",
      position: "relative",
      overflow: "hidden",
      flexShrink: 0,
    }}>
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={"stripe-" + label} width="20" height="20" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="20" stroke="var(--text-muted)" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={"url(#stripe-" + label + ")"} />
      </svg>
      <div style={{
        position: "absolute", bottom: 14, left: 14,
        background: "rgba(255,255,255,0.82)",
        backdropFilter: "blur(6px)",
        borderRadius: 20,
        padding: "5px 14px",
        fontSize: 11, color: "#555", fontWeight: 500,
        letterSpacing: "0.03em",
      }}>
        {label}
      </div>
    </div>
  );
}

function ServiceBlock({ service, index }) {
  const { tag, title, description, items, imageRight } = service;

  const textCol = (
    <div style={{ flex: "1 1 0", minWidth: 0 }}>
      <p style={{
        margin: "0 0 10px", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD,
      }}>
        {String(index + 1).padStart(2, "0")} — {tag}
      </p>
      <h2 style={{
        margin: "0 0 14px",
        fontSize: "clamp(20px, 2.5vw, 28px)",
        fontWeight: 600, color: "var(--text-main)",
        lineHeight: 1.2, letterSpacing: "-0.02em",
      }}>
        {title}
      </h2>
      <p style={{
        margin: "0 0 22px", fontSize: 13,
        color: "var(--text-muted)", lineHeight: 1.75, maxWidth: 480,
      }}>
        {description}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(({ name, detail }) => (
          <div key={name} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
            <span style={{
              marginTop: 4, width: 5, height: 5,
              borderRadius: "50%", background: GOLD, flexShrink: 0,
            }} />
            <div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-main)" }}>{name}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 6 }}>{detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const imageCol = (
    <div style={{ flex: "0 0 clamp(240px, 38%, 400px)" }}>
      <ImagePlaceholder label={title} />
    </div>
  );

  return (
    <div style={{
      display: "flex", flexDirection: "row",
      gap: "clamp(28px, 5vw, 64px)",
      alignItems: "center", flexWrap: "wrap",
    }}>
      {imageRight ? textCol : imageCol}
      {imageRight ? imageCol : textCol}
    </div>
  );
}

function FaqItem({ question }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen((o) => !o)}
      style={{
        borderBottom: "1px solid var(--border-light)",
        padding: "18px 0", cursor: "pointer", userSelect: "none",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 13, color: "var(--text-main)", fontFamily: "Inter, sans-serif", fontWeight: 400 }}>
          {question}
        </span>
        <span style={{
          width: 22, height: 22, borderRadius: "50%",
          border: "1px solid var(--border-strong)",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, fontSize: 16, color: "var(--text-muted)",
          transition: "transform 0.2s",
          transform: open ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          +
        </span>
      </div>
      {open && (
        <p style={{
          margin: "10px 0 0", fontSize: 12,
          color: "var(--text-muted)", lineHeight: 1.7,
          fontFamily: "Inter, sans-serif", maxWidth: 520,
        }}>
          Please reach out to us directly and we'll be happy to assist with this.
        </p>
      )}
    </div>
  );
}

export default function Services() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: "100vh",
      background: BG,
      paddingTop: 60,
      fontFamily: "Georgia, 'Times New Roman', serif",
      display: "flex",
      flexDirection: "column",
    }}>
      <style>{`
        * { box-sizing: border-box; }
        .svc-wrap { flex: 1; max-width: 1060px; width: 100%; margin: 0 auto; padding: 56px 24px 72px; }
        .svc-divider { border: none; border-top: 1px solid var(--border-light); margin: 56px 0; }
        .faq-grid { display: grid; grid-template-columns: 1fr 2fr; gap: clamp(32px, 6vw, 80px); align-items: start; max-width: 1060px; margin: 0 auto; }
        @media (max-width: 700px) { .faq-grid { grid-template-columns: 1fr; } }
        @media (max-width: 420px) { .svc-wrap { padding: 36px 16px 48px; } }
      `}</style>

      {/* ── Service blocks ── */}
      <div className="svc-wrap">
        <div style={{ marginBottom: 52, borderBottom: "1px solid var(--border-light)", paddingBottom: 28 }}>
          <p style={{
            margin: "0 0 8px", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.16em", textTransform: "uppercase",
            color: GOLD, fontFamily: "Inter, sans-serif",
          }}>
            What We Do
          </p>
          <h1 style={{
            margin: 0, fontSize: "clamp(26px, 4vw, 42px)",
            fontWeight: 700, color: "var(--text-main)",
            letterSpacing: "-0.025em", lineHeight: 1.15,
          }}>
            Our Services
          </h1>
          <p style={{
            margin: "12px 0 0", fontSize: 14,
            color: "var(--text-muted)", lineHeight: 1.7,
            maxWidth: 520, fontFamily: "Inter, sans-serif",
          }}>
            From mass uniform production to hand-crafted bespoke pieces — everything we make is built with intention and precision.
          </p>
        </div>

        {SERVICES.map((service, index) => (
          <div key={service.id}>
            <ServiceBlock service={service} index={index} />
            {index < SERVICES.length - 1 && <hr className="svc-divider" />}
          </div>
        ))}
      </div>

      {/* ── CTA Section ── */}
      <div style={{
        background: "var(--bg-card)",
        borderTop: "1px solid var(--border-light)",
        borderBottom: "1px solid var(--border-light)",
        textAlign: "center",
        padding: "64px 24px",
        fontFamily: "Inter, sans-serif",
      }}>
        <p style={{
          margin: "0 0 10px", fontSize: 10, fontWeight: 700,
          letterSpacing: "0.16em", textTransform: "uppercase", color: GOLD,
        }}>
          Ready to begin?
        </p>
        <h2 style={{
          margin: "0 0 10px",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: 600, color: "var(--text-main)",
          letterSpacing: "-0.02em",
          fontFamily: "Georgia, serif", lineHeight: 1.2,
        }}>
          Tell us what you need
        </h2>
        <p style={{
          margin: "0 0 28px", fontSize: 13,
          color: "var(--text-muted)", lineHeight: 1.6,
        }}>
          Every order starts with a conversation. Let us know what you need.
        </p>
        <button
          onClick={() => navigate("/contact")}
          style={{
            background: "var(--text-main)", color: "var(--bg-card)", border: "none",
            borderRadius: 999, padding: "14px 32px",
            fontSize: 13, fontWeight: 500, cursor: "pointer",
            fontFamily: "Inter, sans-serif", letterSpacing: "0.01em",
            transition: "background 0.18s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "var(--text-main)")}
        >
          Get in Touch
        </button>
      </div>

      {/* ── FAQ Section ── */}
      <div style={{
        background: GOLD_LIGHT,
        padding: "72px 24px 80px",
        fontFamily: "Inter, sans-serif",
      }}>
        <div className="faq-grid">
          <div style={{ position: "sticky", top: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 24, height: 1, background: GOLD }} />
              <span style={{
                fontSize: 10, fontWeight: 700,
                letterSpacing: "0.14em", textTransform: "uppercase", color: GOLD,
              }}>
                FAQs
              </span>
            </div>
            <h2 style={{
              margin: "0 0 16px",
              fontSize: "clamp(24px, 3vw, 34px)",
              fontWeight: 600, color: "var(--text-main)",
              letterSpacing: "-0.02em", lineHeight: 1.2,
              fontFamily: "Georgia, serif",
            }}>
              Questions we get asked a lot
            </h2>
            <p style={{
              margin: "0 0 20px", fontSize: 12,
              color: "var(--text-muted)", lineHeight: 1.7,
            }}>
              Can't find what you're looking for? Reach out directly and we'll respond within 24 hours.
            </p>
            <button
              onClick={() => navigate("/contact")}
              style={{
                background: "none", border: "none", padding: 0,
                fontSize: 11, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "var(--text-main)", cursor: "pointer",
                display: "flex", alignItems: "center", gap: 6,
                fontFamily: "inherit",
              }}
            >
              Send us a message →
            </button>
          </div>

          <div>
            {FAQS.map(({ q }) => (
              <FaqItem key={q} question={q} />
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}