import { useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import heroBg from "../assets/7.jpeg";

const EMAILJS_SERVICE_ID  = "service_mx6czp2";
const EMAILJS_TEMPLATE_ID = "template_8mqn1fo";
const EMAILJS_PUBLIC_KEY  = "mQ8FYKpxQP3lAPbAu";

emailjs.init(EMAILJS_PUBLIC_KEY);

export default function Hero() {
  const navigate  = useNavigate();

  const [fields,  setFields]  = useState({ from_name: "", reply_to: "" });
  const [status,  setStatus]  = useState("idle"); // "idle" | "sending" | "success" | "error"

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!fields.from_name.trim() || !fields.reply_to.trim()) {
      setStatus("validation_error");
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: fields.from_name,
          reply_to:  fields.reply_to,
        }
      );
      setStatus("success");
      setFields({ from_name: "", reply_to: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("send_error:" + (err?.text || err?.message || JSON.stringify(err)));
    }
  };

  const services = [
    { icon: "✕", title: "Bespoke Tailoring", desc: "Personal fittings, pattern making and precision construction for enduring garments." },
    { icon: "✦", title: "Restoration & Rework", desc: "Revitalising heritage pieces with hand-finished repairs and tasteful alterations." },
    { icon: "❖", title: "Limited Capsule Production", desc: "Small-run production with strict quality control and artisanal finishing." },
  ];

  const whyUs = [
    { title: "Material Curation", desc: "Direct sourcing from small mills with strict tactile standards." },
    { title: "Precision Craft", desc: "Hand-finished details and exacting stitches at every seam." },
    { title: "Sustainable Practices", desc: "Responsible waste minimisation and considered production cycles." },
    { title: "Client Partnership", desc: "Collaborative processes that respect vision and craft." },
  ];

  return (
    <div style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", fontFamily: "Georgia, serif" }}>
      <style>{`
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .whyus-grid    { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .inquire-inputs { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; width: 100%; max-width: 740px; }
        .inquire-inputs input { flex: 1; min-width: 200px; }
        .hero-footer-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 40px; }
        .hero-content { padding-left: 60px; padding-bottom: 80px; }
        .section-pad { padding: 64px 60px; }
        .section-pad-bottom { padding: 0 60px 80px; }

        @media (max-width: 860px) {
          .services-grid { grid-template-columns: 1fr 1fr; }
          .whyus-grid    { grid-template-columns: 1fr 1fr; }
          .hero-footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
          .section-pad { padding: 48px 32px; }
          .section-pad-bottom { padding: 0 32px 60px; }
          .hero-content { padding-left: 32px; padding-bottom: 60px; }
        }

        @media (max-width: 540px) {
          .services-grid { grid-template-columns: 1fr; }
          .whyus-grid    { grid-template-columns: 1fr 1fr; gap: 12px; }
          .hero-footer-grid { grid-template-columns: 1fr; gap: 24px; }
          .section-pad { padding: 40px 16px; }
          .section-pad-bottom { padding: 0 16px 48px; }
          .hero-content { padding-left: 20px; padding-bottom: 48px; }
          .inquire-inputs { flex-direction: column; }
          .inquire-inputs input { min-width: unset; width: 100%; }
        }

        @media (max-width: 360px) {
          .whyus-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Hero Section ── */}
      <section style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden", display: "flex", alignItems: "flex-end", margin: 0 }}>
        <img src={heroBg} alt="Uniform Bank Hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.85 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 100%)", zIndex: 1 }} />
        <div className="hero-content" style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 20 }}>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 400, color: "var(--bg-card)", fontFamily: "Pacifico, cursive", margin: 0, lineHeight: 1.1, letterSpacing: "-0.01em" }}>
            Uniform Bank
          </h1>
          <button
            onClick={() => navigate("/gallery")}
            onMouseEnter={(e) => { e.currentTarget.style.background = "var(--bg-card)"; e.currentTarget.style.color = "var(--text-main)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--bg-card)"; }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "var(--bg-card)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "10px 24px", border: "1.5px solid rgba(255,255,255,0.7)", borderRadius: 999, cursor: "pointer", transition: "background 0.2s, color 0.2s", width: "fit-content" }}
          >
            <span>→</span> Explore Our Gallery
          </button>
        </div>
      </section>

      {/* ── Crafted Silence Banner ── */}
      <section style={{ width: "100%", background: "#7a6420", marginTop: -1, padding: "clamp(40px, 6vw, 60px) clamp(16px, 5vw, 60px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 16, boxSizing: "border-box" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(18px, 3vw, 32px)", fontWeight: 600, color: "var(--bg-card)", fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}>
          Crafted Silence — Fabrics that Speak in Shadow
        </h2>
        <p style={{ margin: 0, fontSize: "clamp(13px, 1.5vw, 15px)", color: "rgba(255,255,255,0.82)", fontFamily: "Georgia, serif", maxWidth: 600, lineHeight: 1.7, fontStyle: "italic" }}>
          Uniform Bank shapes subtlety into form. We select premium textiles, precision-seam, and finish with restraint — every stitch tuned to timeless silhouettes and tactile depth.
        </p>
      </section>

      {/* ── Services Section ── */}
      <section id="services" className="section-pad" style={{ width: "100%", background: "var(--bg-card)", boxSizing: "border-box" }}>
        <p style={{ margin: "0 0 24px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-main)" }}>Services</p>
        <div className="services-grid">
          {services.map((s) => (
            <div key={s.title} style={{ background: "var(--text-main)", borderRadius: 4, padding: "28px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
              <span style={{ color: "var(--bg-card)", fontSize: 18, opacity: 0.6 }}>{s.icon}</span>
              <h3 style={{ margin: 0, fontSize: 15, fontWeight: 600, color: "var(--bg-card)", fontFamily: "Georgia, serif" }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Us Section ── */}
      <section id="why-us" className="section-pad-bottom" style={{ width: "100%", background: "var(--bg-card)", boxSizing: "border-box" }}>
        <p style={{ margin: "0 0 24px 0", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-main)" }}>Why Us</p>
        <div className="whyus-grid">
          {whyUs.map((w) => (
            <div key={w.title} style={{ border: "1px solid #e5e5e5", borderRadius: 4, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 10, background: "#fafafa" }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--text-main)", fontFamily: "Georgia, serif" }}>{w.title}</h4>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, fontFamily: "Georgia, serif" }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Inquire Section ── */}
      <section id="contact" style={{ width: "100%", background: "#7a6420", padding: "clamp(40px, 6vw, 64px) clamp(16px, 5vw, 40px)", boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
        <h2 style={{ margin: 0, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 600, color: "var(--bg-card)", fontFamily: "Georgia, serif" }}>
          Inquire About a Commission
        </h2>
        <p style={{ margin: "0 0 16px", fontSize: 14, color: "rgba(255,255,255,0.8)", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
          Share your brief and we'll propose a focused plan, materials, and time-frame.
        </p>

        <div className="inquire-inputs">
            <input
              type="text"
              name="from_name"
              placeholder="Full name"
              value={fields.from_name}
              onChange={handleChange}
              style={{ padding: "14px 18px", fontSize: 13, fontFamily: "Georgia, serif", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3, background: "rgba(255,255,255,0.95)", color: "var(--text-main)", outline: "none" }}
            />
            <input
              type="email"
              name="reply_to"
              placeholder="Email address"
              value={fields.reply_to}
              onChange={handleChange}
              style={{ padding: "14px 18px", fontSize: 13, fontFamily: "Georgia, serif", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 3, background: "rgba(255,255,255,0.95)", color: "var(--text-main)", outline: "none" }}
            />
          </div>

        {/* Feedback messages */}
        {status === "success" && (
          <p style={{ margin: 0, fontSize: 13, color: "#d4f7c5", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            ✓ Message sent — we'll be in touch shortly.
          </p>
        )}
        {status === "validation_error" && (
          <p style={{ margin: 0, fontSize: 13, color: "#ffd6d6", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            ✕ Please fill in both your name and email address.
          </p>
        )}
        {status.startsWith("send_error") && (
          <p style={{ margin: 0, fontSize: 13, color: "#ffd6d6", fontFamily: "Georgia, serif", fontStyle: "italic" }}>
            ✕ {status.replace("send_error:", "") || "Something went wrong."}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={status === "sending"}
          onMouseEnter={(e) => { if (status !== "sending") e.currentTarget.style.background = "#5a4a10"; }}
          onMouseLeave={(e) => { if (status !== "sending") e.currentTarget.style.background = "var(--text-main)"; }}
          style={{ marginTop: 8, padding: "13px 36px", background: "var(--text-main)", color: "var(--bg-card)", fontSize: 13, fontWeight: 700, fontFamily: "Georgia, serif", letterSpacing: "0.06em", border: "none", borderRadius: 3, cursor: status === "sending" ? "not-allowed" : "pointer", opacity: status === "sending" ? 0.6 : 1, transition: "background 0.2s", width: "clamp(160px, 40%, 240px)" }}
        >
          {status === "sending" ? "Sending…" : "Get In Touch"}
        </button>
      </section>

    </div>
  );
}