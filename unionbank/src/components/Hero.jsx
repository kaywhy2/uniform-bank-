import heroBg from "../assets/7.jpeg";

export default function Hero() {
  const services = [
    {
      icon: "✕",
      title: "Bespoke Tailoring",
      desc: "Personal fittings, pattern making and precision construction for enduring garments.",
    },
    {
      icon: "✦",
      title: "Restoration & Rework",
      desc: "Revitalising heritage pieces with hand-finished repairs and tasteful alterations.",
    },
    {
      icon: "❖",
      title: "Limited Capsule Production",
      desc: "Small-run production with strict quality control and artisanal finishing.",
    },
  ];

  const whyUs = [
    { title: "Material Curation", desc: "Direct sourcing from small mills with strict tactile standards." },
    { title: "Precision Craft", desc: "Hand-finished details and exacting stitches at every seam." },
    { title: "Sustainable Practices", desc: "Responsible waste minimisation and considered production cycles." },
    { title: "Client Partnership", desc: "Collaborative processes that respect vision and craft." },
  ];

  return (
    <div style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>

      {/* ── Hero Section ── */}
      <section
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "80px",
          paddingLeft: "60px",
          margin: 0,
        }}
      >
        <img
          src={heroBg}
          alt="Uniform Bank Hero"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)",
            zIndex: 1,
          }}
        />
        <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 20 }}>
          <h1
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 400,
              color: "#fff",
              fontFamily: "Pacifico, cursive",
              margin: 0,
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Uniform Bank
          </h1>
          <button
            onMouseEnter={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#fff"; }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#fff",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "10px 24px",
              border: "1.5px solid rgba(255,255,255,0.7)",
              borderRadius: 999,
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
              width: "fit-content",
            }}
          >
            <span>→</span> Explore Our Gallery
          </button>
        </div>
      </section>

      {/* ── Crafted Silence Banner ── */}
      <section
        style={{
          width: "100%",
          background: "#7a6420",
          marginTop: -1,
          padding: "60px 40px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 16,
        }}
      >
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 600, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}>
          Crafted Silence — Fabrics that Speak in Shadow
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.82)", fontFamily: "Georgia, serif", maxWidth: 600, lineHeight: 1.7, fontStyle: "italic" }}>
          Uniform Bank shapes subtlety into form. We select premium textiles,
          precision-seam, and finish with restraint — every stitch tuned to
          timeless silhouettes and tactile depth.
        </p>
      </section>

      {/* ── Services Section ── */}
      <section style={{ width: "100%", background: "#fff", padding: "64px 60px", boxSizing: "border-box" }}>
        <p style={{ margin: "0 0 28px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111" }}>
          Services
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {services.map((s) => (
            <div key={s.title} style={{ background: "#111", borderRadius: 4, padding: "32px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ color: "#fff", fontSize: 18, opacity: 0.6 }}>{s.icon}</span>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "Georgia, serif" }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Us Section ── */}
      <section style={{ width: "100%", background: "#fff", padding: "0 60px 80px", boxSizing: "border-box" }}>
        <p style={{ margin: "0 0 28px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#111" }}>
          Why Us
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {whyUs.map((w) => (
            <div key={w.title} style={{ border: "1px solid #e5e5e5", borderRadius: 4, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 10, background: "#fafafa" }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#111", fontFamily: "Georgia, serif" }}>{w.title}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Inquire Section ── */}
      <section
        style={{
          width: "100%",
          background: "#7a6420",
          padding: "64px 40px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: 0, fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, color: "#fff", fontFamily: "Georgia, serif" }}>
          Inquire About a Commission
        </h2>
        <p style={{ margin: "0 0 24px", fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Share your brief and we'll propose a focused plan, materials, and time-frame.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 740 }}>
          <input
            type="text"
            placeholder="Full name"
            style={{
              flex: 1,
              minWidth: 200,
              padding: "14px 18px",
              fontSize: 13,
              fontFamily: "Georgia, serif",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 3,
              background: "rgba(255,255,255,0.95)",
              color: "#111",
              outline: "none",
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            style={{
              flex: 1,
              minWidth: 200,
              padding: "14px 18px",
              fontSize: 13,
              fontFamily: "Georgia, serif",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 3,
              background: "rgba(255,255,255,0.95)",
              color: "#111",
              outline: "none",
            }}
          />
        </div>
        <button
          onMouseEnter={(e) => { e.currentTarget.style.background = "#5a4a10"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#111"; }}
          style={{
            marginTop: 8,
            padding: "13px 36px",
            background: "#111",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "Georgia, serif",
            letterSpacing: "0.06em",
            border: "none",
            borderRadius: 3,
            cursor: "pointer",
            transition: "background 0.2s",
          }}
        >
          Get In Touch
        </button>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          width: "100%",
          background: "#fff",
          padding: "52px 60px",
          boxSizing: "border-box",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 40,
          borderTop: "1px solid #e5e5e5",
        }}
      >
        {/* Brand column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#7a6420", fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}>
            Uniform Bank
          </span>
          <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>
            17 Holloway Lane, Suite 203, London — Bespoke tailoring and textile consultancy.
          </p>
        </div>

        {/* Explore column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", marginBottom: 4 }}>
            Explore
          </span>
          {["Collections", "Craft", "Services", "Clients"].map((link) => (
            <a
              key={link}
              href="#"
              style={{ fontSize: 13, color: "#555", textDecoration: "none", fontFamily: "Georgia, serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#7a6420"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "#555"; }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Connect column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#111", marginBottom: 4 }}>
            Connect
          </span>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ),
              },
              {
                label: "X",
                href: "#",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.857L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ),
              },
              {
                label: "Facebook",
                href: "#",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                ),
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  border: "1px solid #ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#555",
                  textDecoration: "none",
                  transition: "border-color 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#7a6420"; e.currentTarget.style.color = "#7a6420"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#ddd"; e.currentTarget.style.color = "#555"; }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}