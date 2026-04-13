import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaystackPayment } from "react-paystack";
import { useCart } from "./Cartcontext";

// ─── Replace with your real Paystack public key ───────────────────────────────
const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "rgba(201,168,76,0.12)";

function formatNaira(n) {
  return "₦" + Number(n).toLocaleString();
}

// ── Lock icon ─────────────────────────────────────────────────────────────────
function LockIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function CheckCircle() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

// ── Payment button — own component for stable hook ────────────────────────────
function PayButton({ config, disabled, label = "Pay Now" }) {
  const initializePayment = usePaystackPayment(config);
  return (
    <button
      className="pay-now-btn"
      disabled={disabled}
      onClick={() => !disabled && initializePayment({
        onSuccess: config._onSuccess,
        onClose: config._onClose,
      })}
    >
      <LockIcon />
      <span>{label}</span>
    </button>
  );
}

// ── Field component ───────────────────────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div className="field-wrap">
      <label className="field-label">{label}</label>
      {children}
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart();

  const selectedItems = cartItems.filter((i) => i.selected);
  const [fulfillment] = useState(() => {
    // read from sessionStorage if Cart stored it, else default "home"
    return sessionStorage.getItem("ub_fulfillment") || "home";
  });

  const subtotal = selectedItems.reduce((s, i) => s + i.price, 0);
  const deliveryCost = fulfillment === "home" ? 5000 : 0;
  const total = subtotal + deliveryCost;

  // ── Form state ──────────────────────────────────────────────────────────────
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // "form" | "success"

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required";
    if (!/^[0-9]{10,14}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid phone required";
    if (fulfillment === "home") {
      if (!form.address.trim()) e.address = "Required for delivery";
      if (!form.city.trim()) e.city = "Required";
      if (!form.state.trim()) e.state = "Required";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const paystackConfig = {
    reference: `UB_${Date.now()}`,
    email: form.email,
    amount: total * 100,
    publicKey: PAYSTACK_PUBLIC_KEY,
    currency: "NGN",
    metadata: {
      custom_fields: [
        { display_name: "Customer Name", variable_name: "name", value: `${form.firstName} ${form.lastName}` },
        { display_name: "Phone", variable_name: "phone", value: form.phone },
        { display_name: "Fulfilment", variable_name: "fulfilment", value: fulfillment === "home" ? "Home Delivery" : "In-Person Pickup" },
        { display_name: "Delivery Address", variable_name: "address", value: fulfillment === "home" ? `${form.address}, ${form.city}, ${form.state}` : "Pickup" },
        { display_name: "Items", variable_name: "items", value: selectedItems.map((i) => `${i.name} ×${i.qty}`).join(", ") },
      ],
    },
    _onSuccess: (ref) => {
      setCartItems((prev) => prev.filter((i) => !i.selected));
      sessionStorage.removeItem("ub_fulfillment");
      setStep("success");
      window._lastRef = ref.reference;
    },
    _onClose: () => console.log("Paystack dialog closed"),
  };

  const handleSubmitAndPay = () => {
    if (!validate()) return;
    // PayButton handles opening Paystack — this just triggers validation UI
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (step === "success") {
    return (
      <div className="checkout-root">
        <style>{css}</style>
        <div className="success-wrap">
          <div className="success-card">
            <div className="success-icon-ring">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="success-title">Order Confirmed!</h2>
            <p className="success-sub">
              Thank you, {form.firstName}. Your payment was received and your order is being processed.
            </p>
            <div className="success-ref">
              <span style={{ fontSize: 11, color: "rgba(0,0,0,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Reference</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111", fontFamily: "monospace" }}>{window._lastRef}</span>
            </div>
            <div className="success-detail-row">
              <span>Total Paid</span><strong>{formatNaira(total)}</strong>
            </div>
            <div className="success-detail-row">
              <span>Fulfilment</span>
              <strong>{fulfillment === "home" ? "Home Delivery" : "In-Person Pickup"}</strong>
            </div>
            {fulfillment === "home" && (
              <div className="success-detail-row">
                <span>Deliver to</span>
                <strong style={{ textAlign: "right", maxWidth: 200 }}>{form.address}, {form.city}, {form.state}</strong>
              </div>
            )}
            <button className="back-to-shop" onClick={() => navigate("/gallery")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Empty cart guard ────────────────────────────────────────────────────────
  if (selectedItems.length === 0) {
    return (
      <div className="checkout-root">
        <style>{css}</style>
        <div className="success-wrap">
          <div className="success-card" style={{ textAlign: "center" }}>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.4)", marginBottom: 20 }}>
              No items selected for checkout.
            </p>
            <button className="back-to-shop" onClick={() => navigate("/cart")}>Back to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-root">
      <style>{css}</style>

      {/* ── Top bar ── */}
      <header className="checkout-header">
        <button className="back-btn" onClick={() => navigate("/cart")}>
          <ChevronLeft />
          <span>Back to Cart</span>
        </button>
        <div className="logo-text">Uniform Bank</div>
        <div className="secure-badge">
          <LockIcon />
          <span>Secure Checkout</span>
        </div>
      </header>

      <main className="checkout-body">

        {/* ══ LEFT: Form ══════════════════════════════════════════════════════ */}
        <section className="checkout-form-col">

          {/* Progress steps */}
          <div className="steps">
            {["Cart", "Details", "Payment"].map((s, i) => (
              <div key={s} className="step-item">
                <div className={`step-dot ${i < 2 ? "done" : i === 2 ? "active" : ""}`}>
                  {i < 2 ? <CheckCircle /> : <span>{i + 1}</span>}
                </div>
                <span className={`step-label ${i === 2 ? "step-active-label" : ""}`}>{s}</span>
                {i < 2 && <div className="step-line" />}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-row">
              <Field label="First Name" error={errors.firstName}>
                <input className={`f-input ${errors.firstName ? "f-err" : ""}`}
                  placeholder="John" value={form.firstName} onChange={set("firstName")} />
              </Field>
              <Field label="Last Name" error={errors.lastName}>
                <input className={`f-input ${errors.lastName ? "f-err" : ""}`}
                  placeholder="Doe" value={form.lastName} onChange={set("lastName")} />
              </Field>
            </div>
            <Field label="Email Address" error={errors.email}>
              <input className={`f-input ${errors.email ? "f-err" : ""}`}
                type="email" placeholder="you@example.com"
                value={form.email} onChange={set("email")} />
            </Field>
            <Field label="Phone Number" error={errors.phone}>
              <input className={`f-input ${errors.phone ? "f-err" : ""}`}
                type="tel" placeholder="08012345678"
                value={form.phone} onChange={set("phone")} />
            </Field>
          </div>

          {/* Delivery address — only for home delivery */}
          {fulfillment === "home" && (
            <div className="form-section">
              <h3 className="section-title">Delivery Address</h3>
              <Field label="Street Address" error={errors.address}>
                <input className={`f-input ${errors.address ? "f-err" : ""}`}
                  placeholder="12 Awolowo Road" value={form.address} onChange={set("address")} />
              </Field>
              <div className="form-row">
                <Field label="City" error={errors.city}>
                  <input className={`f-input ${errors.city ? "f-err" : ""}`}
                    placeholder="Abuja" value={form.city} onChange={set("city")} />
                </Field>
                <Field label="State" error={errors.state}>
                  <select className={`f-input ${errors.state ? "f-err" : ""}`}
                    value={form.state} onChange={set("state")}>
                    <option value="">Select state</option>
                    {["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
                      "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
                      "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa",
                      "Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba",
                      "Yobe","Zamfara"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
            </div>
          )}

          {/* Fulfillment summary pill */}
          <div className="fulfillment-pill">
            <div className="fulfillment-pill-dot" />
            <span>
              {fulfillment === "home"
                ? "Home Delivery — ₦5,000 nationwide"
                : "In-Person Pickup — Abuja Showroom · Free"}
            </span>
          </div>

          {/* Pay button */}
          <div className="pay-section">
            <PayButton
              config={paystackConfig}
              disabled={false}
              label={`Pay ${formatNaira(total)} Securely`}
            />
            <p className="pay-note">
              By completing your purchase you agree to our{" "}
              <span style={{ color: GOLD, cursor: "pointer" }}>Terms of Service</span>{" "}
              and{" "}
              <span style={{ color: GOLD, cursor: "pointer" }}>Privacy Policy</span>.
              Your card details are never stored.
            </p>
          </div>

        </section>

        {/* ══ RIGHT: Order Summary ═════════════════════════════════════════════ */}
        <aside className="checkout-summary-col">
          <div className="summary-card">
            <h3 className="summary-heading">Order Summary</h3>
            <p className="summary-count">{selectedItems.length} item{selectedItems.length !== 1 ? "s" : ""} selected</p>

            <div className="summary-items">
              {selectedItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <div className="summary-item-img">
                    {item.image
                      ? <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : <div style={{ width: "100%", height: "100%", background: "rgba(201,168,76,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: GOLD }}>IMG</div>
                    }
                    <span className="summary-item-qty">{item.qty}</span>
                  </div>
                  <div className="summary-item-info">
                    <p className="summary-item-name">{item.name}</p>
                    <p className="summary-item-cat">{item.category}</p>
                  </div>
                  <p className="summary-item-price">{formatNaira(item.price)}</p>
                </div>
              ))}
            </div>

            <div className="summary-divider" />

            <div className="summary-line">
              <span>Subtotal</span><span>{formatNaira(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Fulfilment</span>
              <span style={{ color: deliveryCost === 0 ? "#2ecc71" : "#111" }}>
                {deliveryCost === 0 ? "Free" : formatNaira(deliveryCost)}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>
              <span style={{ color: GOLD }}>{formatNaira(total)}</span>
            </div>

            {/* Trust badges */}
            <div className="trust-badges">
              {["256-bit SSL", "Paystack Secured", "Instant Receipt"].map((b) => (
                <div key={b} className="trust-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill={GOLD} stroke="none">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────────────────────────
const GOLD_HEX = "#C9A84C";

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .checkout-root {
    min-height: 100vh;
    background: #f5f4f0;
    font-family: 'DM Sans', sans-serif;
  }

  /* ── Header ── */
  .checkout-header {
    position: sticky; top: 0; z-index: 50;
    background: #fff;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 0 32px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .back-btn {
    display: flex; align-items: center; gap: 6px;
    background: none; border: none; cursor: pointer;
    font-size: 13px; color: rgba(0,0,0,0.5);
    font-family: 'DM Sans', sans-serif;
    transition: color 0.18s;
  }
  .back-btn:hover { color: ${GOLD_HEX}; }
  .logo-text {
    font-family: 'Cormorant Garamond', serif;
    font-size: 22px; font-weight: 700; color: #111;
    letter-spacing: 0.02em;
  }
  .secure-badge {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; color: rgba(0,0,0,0.4);
    font-weight: 500;
  }

  /* ── Body layout ── */
  .checkout-body {
    max-width: 1080px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    display: grid;
    grid-template-columns: 1fr 400px;
    gap: 32px;
    align-items: start;
  }

  /* ── Form col ── */
  .checkout-form-col {
    display: flex; flex-direction: column; gap: 28px;
  }

  /* Steps */
  .steps {
    display: flex; align-items: center; gap: 0;
  }
  .step-item {
    display: flex; align-items: center; gap: 8px;
  }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; flex-shrink: 0;
    background: rgba(0,0,0,0.07); color: rgba(0,0,0,0.35);
  }
  .step-dot.done { background: transparent; }
  .step-dot.active {
    background: #111; color: #fff;
  }
  .step-label {
    font-size: 12px; color: rgba(0,0,0,0.4); font-weight: 500; white-space: nowrap;
  }
  .step-active-label { color: #111; font-weight: 700; }
  .step-line {
    width: 32px; height: 1px; background: rgba(0,0,0,0.12); margin: 0 6px;
  }

  /* Form section card */
  .form-section {
    background: #fff;
    border-radius: 16px;
    padding: 26px 24px;
    display: flex; flex-direction: column; gap: 14px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .section-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 18px; font-weight: 700; color: #111;
    margin-bottom: 2px;
  }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

  /* Field */
  .field-wrap { display: flex; flex-direction: column; gap: 5px; }
  .field-label {
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; color: rgba(0,0,0,0.45);
  }
  .f-input {
    padding: 11px 14px;
    border: 1.5px solid rgba(0,0,0,0.12);
    border-radius: 10px;
    font-size: 13px; color: #111;
    background: #fff;
    font-family: 'DM Sans', sans-serif;
    transition: border-color 0.18s, box-shadow 0.18s;
    width: 100%;
    appearance: none;
  }
  .f-input:focus {
    outline: none;
    border-color: ${GOLD_HEX};
    box-shadow: 0 0 0 3px rgba(201,168,76,0.12);
  }
  .f-input.f-err { border-color: #e53e3e; }
  .field-error { font-size: 11px; color: #e53e3e; }

  /* Fulfillment pill */
  .fulfillment-pill {
    display: flex; align-items: center; gap: 10px;
    background: ${GOLD_HEX}1a;
    border: 1.5px solid ${GOLD_HEX}55;
    border-radius: 999px;
    padding: 10px 18px;
    font-size: 12px; font-weight: 600; color: #7a5c1e;
  }
  .fulfillment-pill-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: ${GOLD_HEX}; flex-shrink: 0;
  }

  /* Pay section */
  .pay-section { display: flex; flex-direction: column; gap: 14px; }
  .pay-now-btn {
    width: 100%;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    background: #111; color: #fff;
    border: none; border-radius: 12px;
    padding: 17px 24px;
    font-size: 14px; font-weight: 700;
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.18);
  }
  .pay-now-btn:hover:not(:disabled) {
    background: ${GOLD_HEX};
    box-shadow: 0 6px 28px rgba(201,168,76,0.35);
    transform: translateY(-1px);
  }
  .pay-now-btn:active:not(:disabled) { transform: translateY(0); }
  .pay-now-btn:disabled { opacity: 0.45; cursor: not-allowed; }
  .pay-note {
    font-size: 11px; color: rgba(0,0,0,0.38); line-height: 1.6; text-align: center;
  }

  /* ── Summary col ── */
  .summary-card {
    background: #fff;
    border-radius: 20px;
    padding: 28px 24px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    position: sticky; top: 80px;
  }
  .summary-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px; font-weight: 700; color: #111;
    margin-bottom: 2px;
  }
  .summary-count { font-size: 11px; color: rgba(0,0,0,0.4); margin-bottom: 20px; }

  .summary-items { display: flex; flex-direction: column; gap: 14px; }
  .summary-item { display: flex; align-items: center; gap: 12px; }
  .summary-item-img {
    width: 56px; height: 56px; border-radius: 10px;
    background: #f0ece2; flex-shrink: 0; overflow: hidden;
    position: relative;
  }
  .summary-item-qty {
    position: absolute; top: -6px; right: -6px;
    width: 18px; height: 18px; border-radius: 50%;
    background: #111; color: #fff;
    font-size: 10px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
  }
  .summary-item-info { flex: 1; min-width: 0; }
  .summary-item-name {
    font-size: 12px; font-weight: 700; color: #111;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    margin-bottom: 2px;
  }
  .summary-item-cat {
    font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(0,0,0,0.35);
  }
  .summary-item-price { font-size: 13px; font-weight: 700; color: #111; flex-shrink: 0; }

  .summary-divider { height: 1px; background: rgba(0,0,0,0.07); margin: 16px 0; }
  .summary-line {
    display: flex; justify-content: space-between;
    font-size: 12px; color: rgba(0,0,0,0.5); margin-bottom: 8px;
  }
  .summary-line span:last-child { font-weight: 600; color: #111; }
  .summary-total {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 16px; font-weight: 800; color: #111;
    margin-top: 4px;
  }

  /* Trust badges */
  .trust-badges {
    margin-top: 20px;
    display: flex; flex-direction: column; gap: 8px;
  }
  .trust-badge {
    display: flex; align-items: center; gap: 8px;
    font-size: 11px; color: rgba(0,0,0,0.45); font-weight: 500;
  }

  /* ── Success ── */
  .success-wrap {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 40px 20px;
  }
  .success-card {
    background: #fff; border-radius: 20px;
    padding: 48px 40px; max-width: 480px; width: 100%;
    box-shadow: 0 2px 24px rgba(0,0,0,0.07);
    display: flex; flex-direction: column; align-items: center;
    text-align: center;
  }
  .success-icon-ring {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(201,168,76,0.1);
    border: 2px solid rgba(201,168,76,0.3);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 24px;
  }
  .success-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px; font-weight: 700; color: #111; margin-bottom: 10px;
  }
  .success-sub {
    font-size: 13px; color: rgba(0,0,0,0.5); line-height: 1.6;
    margin-bottom: 28px;
  }
  .success-ref {
    background: #f5f4f0; border-radius: 10px;
    padding: 14px 20px; width: 100%;
    display: flex; flex-direction: column; gap: 4px;
    margin-bottom: 16px;
  }
  .success-detail-row {
    display: flex; justify-content: space-between; align-items: center;
    font-size: 12px; color: rgba(0,0,0,0.5);
    padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.05);
    width: 100%;
  }
  .success-detail-row strong { font-weight: 700; color: #111; }
  .back-to-shop {
    margin-top: 28px;
    background: #111; color: #fff; border: none;
    border-radius: 999px; padding: 13px 36px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    transition: background 0.2s;
  }
  .back-to-shop:hover { background: ${GOLD_HEX}; }

  /* ── Responsive ── */
  @media (max-width: 860px) {
    .checkout-body {
      grid-template-columns: 1fr;
      padding: 32px 16px 64px;
    }
    .checkout-summary-col { order: -1; }
    .summary-card { position: static; }
    .form-row { grid-template-columns: 1fr; }
  }
  @media (max-width: 480px) {
    .checkout-header { padding: 0 16px; }
    .secure-badge span { display: none; }
    .steps .step-line { width: 20px; }
    .form-section { padding: 20px 16px; }
    .success-card { padding: 36px 20px; }
  }
`;