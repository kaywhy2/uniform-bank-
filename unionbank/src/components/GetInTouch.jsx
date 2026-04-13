import { useState } from "react";
import { useNavigate } from "react-router-dom";


const GOLD = "#C9A84C";
const GOLD_LIGHT = "#f5efe0";
const GOLD_TEXT_SHADOW = "0 0 8px rgba(201,168,76,0.7)";

const ORDER_TYPES = [
  "School Uniforms",
  "Sports Wear",
  "Corporate Apparel",
  "Security Uniforms",
  "Bespoke Tailoring",
  "Other",
];

const MEASUREMENT_OPTIONS = [
  {
    id: "showroom",
    icon: (
      <svg width="22" height="22" fill="none" stroke={GOLD} strokeWidth="1.6" viewBox="0 0 24 24">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    label: "Visit the Showroom",
    desc: "Come in and we'll measure you on the spot.",
  },
  {
    id: "inperson",
    icon: (
      <svg width="22" height="22" fill="none" stroke={GOLD} strokeWidth="1.6" viewBox="0 0 24 24">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
        <path d="M19 8v6M22 11h-6" />
      </svg>
    ),
    label: "In-Person at Your Location",
    desc: "We send a tailor to you — home, office, or venue.",
  },
  {
    id: "online",
    icon: (
      <svg width="22" height="22" fill="none" stroke={GOLD} strokeWidth="1.6" viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: "Online / Remote",
    desc: "Video call with step-by-step measurement guidance.",
  },
];

export default function GetInTouch() {
  const navigate = useNavigate();
  const [measureMethod, setMeasureMethod] = useState("showroom");
  const [knowsMeasurements, setKnowsMeasurements] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    orderType: "",
    notes: "",
  });

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.city.trim()) e.city = "Required";
    if (!form.orderType) e.orderType = "Please select a category";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  /* ─── Styles ─── */
  const inputStyle = (field) => ({
    width: "100%",
    border: "none",
    borderBottom: `1px solid ${errors[field] ? "#e05252" : "var(--border-strong)"}`,
    padding: "10px 0",
    fontSize: 13,
    color: "var(--text-main)",
    background: "transparent",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "inherit",
  });

  const labelStyle = {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: GOLD,
    display: "block",
    marginBottom: 6,
  };

  const errorMsg = (field) =>
    errors[field] ? (
      <span style={{ fontSize: 10, color: "#e05252", marginTop: 3, display: "block" }}>
        {errors[field]}
      </span>
    ) : null;

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .git-page {
          min-height: 100vh;
          background: #fafaf8;
          padding-top: 60px;
          font-family: 'Georgia', serif;
        }

        .git-container {
          max-width: 860px;
          margin: 0 auto;
          padding: 60px 24px 80px;
        }

        /* Info cards */
        .info-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 32px;
        }
        @media (max-width: 640px) {
          .info-cards { grid-template-columns: 1fr; }
        }

        .info-card {
          background: var(--bg-card);
          border: 1px solid rgba(201,168,76,0.18);
          border-radius: 8px;
          padding: 18px 20px;
        }

        /* Measurement cards */
        .measure-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-top: 16px;
        }
        @media (max-width: 640px) {
          .measure-cards { grid-template-columns: 1fr; }
        }

        .measure-card {
          border: 1.5px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 20px 18px;
          cursor: pointer;
          position: relative;
          background: var(--bg-card);
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .measure-card.selected {
          border-color: ${GOLD};
          box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
          background: #fffdf7;
        }
        .measure-card:hover { border-color: ${GOLD}; }

        .radio-dot {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1.5px solid rgba(0,0,0,0.25);
          background: var(--bg-card);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.2s;
        }
        .radio-dot.selected {
          border-color: ${GOLD};
          background: ${GOLD};
        }
        .radio-dot.selected::after {
          content: '';
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--bg-card);
        }

        /* Toggle */
        .toggle-track {
          width: 42px;
          height: 24px;
          border-radius: 99px;
          cursor: pointer;
          transition: background 0.25s;
          position: relative;
          flex-shrink: 0;
        }
        .toggle-thumb {
          position: absolute;
          top: 3px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--bg-card);
          transition: left 0.25s;
          box-shadow: 0 1px 4px rgba(0,0,0,0.18);
        }

        /* Form grid */
        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px 32px;
          margin-top: 16px;
        }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr; }
        }
        .form-full { grid-column: 1 / -1; }

        /* Submit */
        .submit-btn {
          background: var(--text-main);
          color: var(--bg-card);
          border: none;
          border-radius: 999px;
          padding: 14px 36px;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: background 0.22s, transform 0.15s;
          font-family: inherit;
        }
        .submit-btn:hover { background: ${GOLD}; }
        .submit-btn:active { transform: scale(0.97); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* Footer */
        .footer {
          background: var(--bg-card);
          border-top: 1px solid var(--border-light);
          padding: 48px 24px 28px;
        }
        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1fr 1.4fr;
          gap: 32px;
        }
        @media (max-width: 700px) {
          .footer-inner { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 420px) {
          .footer-inner { grid-template-columns: 1fr; }
        }
        .footer-col-title {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 14px;
        }
        .footer-link {
          display: block;
          font-size: 13px;
          color: var(--text-muted);
          margin-bottom: 8px;
          cursor: pointer;
          transition: color 0.18s;
          text-decoration: none;
        }
        .footer-link:hover { color: ${GOLD}; }
        .footer-bottom {
          max-width: 1100px;
          margin: 32px auto 0;
          padding-top: 20px;
          border-top: 1px solid var(--border-light);
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        /* Success */
        .success-box {
          text-align: center;
          padding: 60px 20px;
        }
        .success-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: ${GOLD_LIGHT};
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
        }

        input:focus { border-bottom-color: ${GOLD} !important; }
        select:focus { border-bottom-color: ${GOLD} !important; }
        textarea:focus { border-color: ${GOLD} !important; }

        .section-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: ${GOLD};
          margin-bottom: 14px;
          margin-top: 36px;
          display: block;
        }
      `}</style>

      <div className="git-page">
        <div className="git-container">

          {/* ── Header ── */}
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 400, margin: "0 0 10px", color: "var(--text-main)", letterSpacing: "-0.01em" }}>
              Get in Touch
            </h1>
            <p style={{ fontSize: 13.5, color: "var(--text-muted)", margin: 0, lineHeight: 1.6 }}>
              Whether you need a full uniform order, a single bespoke piece, or simply want<br />
              to ask a question — we're here.
            </p>
          </div>

          {/* ── Info Cards ── */}
          <div className="info-cards">
            {[
              { title: "Showroom", lines: ["Plot 14, Aminu Kano Crescent", "Wuse II, Abuja"] },
              { title: "Hours", lines: ["Mon – Fri: 9am – 6pm", "Sat: 10am – 4pm"] },
              { title: "Contact", lines: ["inquiry@uniformbank.com", "+234 800 000 0000"] },
            ].map((card) => (
              <div key={card.title} className="info-card">
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>
                  {card.title}
                </div>
                {card.lines.map((l) => (
                  <div key={l} style={{ fontSize: 13, color: "rgba(0,0,0,0.6)", lineHeight: 1.7 }}>{l}</div>
                ))}
              </div>
            ))}
          </div>

          {submitted ? (
            /* ── Success State ── */
            <div className="success-box">
              <div className="success-circle">
                <svg width="28" height="28" fill="none" stroke={GOLD} strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 style={{ fontWeight: 400, fontSize: 22, marginBottom: 10, color: "var(--text-main)" }}>Enquiry Sent!</h2>
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 28 }}>
                Thank you. We typically respond within 24 hours.
              </p>
              <button
                className="submit-btn"
                onClick={() => { setSubmitted(false); setForm({ firstName:"",lastName:"",email:"",phone:"",city:"",orderType:"",notes:"" }); }}
              >
                Send Another
              </button>
            </div>
          ) : (
            <>
              {/* ── Measurement Method ── */}
              <span className="section-label">How would you like your measurements taken?</span>
              <div className="measure-cards">
                {MEASUREMENT_OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className={`measure-card${measureMethod === opt.id ? " selected" : ""}`}
                    onClick={() => setMeasureMethod(opt.id)}
                  >
                    <div className={`radio-dot${measureMethod === opt.id ? " selected" : ""}`} />
                    <div style={{ marginBottom: 12, marginTop: 2 }}>{opt.icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-main)", marginBottom: 6 }}>{opt.label}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.55 }}>{opt.desc}</div>
                  </div>
                ))}
              </div>

              {/* ── Know Measurements Toggle ── */}
              <span className="section-label">Do you already know your measurements?</span>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div
                  className="toggle-track"
                  style={{ background: knowsMeasurements ? GOLD : "var(--border-strong)" }}
                  onClick={() => setKnowsMeasurements((v) => !v)}
                >
                  <div
                    className="toggle-thumb"
                    style={{ left: knowsMeasurements ? 21 : 3 }}
                  />
                </div>
                <span style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {knowsMeasurements ? "Yes — I'll provide my measurements" : "No — I'll be measured by your team"}
                </span>
              </div>

              {/* ── Form ── */}
              <span className="section-label" style={{ marginTop: 40 }}>Your Information</span>
              <div className="form-grid">

                <div>
                  <label style={labelStyle}>First Name</label>
                  <input placeholder="Amara" value={form.firstName} onChange={set("firstName")} style={inputStyle("firstName")} />
                  {errorMsg("firstName")}
                </div>

                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input placeholder="Okonkwo" value={form.lastName} onChange={set("lastName")} style={inputStyle("lastName")} />
                  {errorMsg("lastName")}
                </div>

                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input placeholder="amara@example.com" value={form.email} onChange={set("email")} style={inputStyle("email")} />
                  {errorMsg("email")}
                </div>

                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input placeholder="+234 800 000 0000" value={form.phone} onChange={set("phone")} style={inputStyle("phone")} />
                  {errorMsg("phone")}
                </div>

                <div>
                  <label style={labelStyle}>State / City</label>
                  <input placeholder="Abuja, FCT" value={form.city} onChange={set("city")} style={inputStyle("city")} />
                  {errorMsg("city")}
                </div>

                <div>
                  <label style={labelStyle}>Order Type</label>
                  <select
                    value={form.orderType}
                    onChange={set("orderType")}
                    style={{
                      ...inputStyle("orderType"),
                      appearance: "none",
                      WebkitAppearance: "none",
                      color: form.orderType ? "var(--text-main)" : "rgba(0,0,0,0.35)",
                      cursor: "pointer",
                    }}
                  >
                    <option value="" disabled>Select a category</option>
                    {ORDER_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errorMsg("orderType")}
                </div>

                <div className="form-full">
                  <label style={labelStyle}>
                    Tell us about your order{" "}
                    <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0, color: "rgba(0,0,0,0.35)", fontSize: 10 }}>
                      (optional)
                    </span>
                  </label>
                  <textarea
                    placeholder="Describe what you need — quantity, occasion, preferred fabrics, colours, deadline..."
                    value={form.notes}
                    onChange={set("notes")}
                    rows={4}
                    style={{
                      width: "100%",
                      border: "1px solid var(--border-strong)",
                      borderRadius: 6,
                      padding: "12px 14px",
                      fontSize: 13,
                      color: "var(--text-main)",
                      background: "var(--bg-card)",
                      outline: "none",
                      resize: "vertical",
                      lineHeight: 1.6,
                      fontFamily: "inherit",
                      marginTop: 2,
                      transition: "border-color 0.2s",
                    }}
                  />
                </div>
              </div>

              {/* ── Submit ── */}
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 32, flexWrap: "wrap" }}>
                <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? "Sending…" : "Send Enquiry"}
                </button>
                <span style={{ fontSize: 12, color: "rgba(0,0,0,0.38)", letterSpacing: "0.01em" }}>
                  We typically respond within 24 hours.
                </span>
              </div>
            </>
          )}
        </div>

      </div>
    </>
  );
}