import { useLocation, useNavigate } from "react-router-dom";

const GOLD = "#C9A84C";

function formatNaira(amount) {
  return "₦" + amount.toLocaleString();
}

function CheckCircleIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const reference  = state?.reference  ?? "N/A";
  const total      = state?.total      ?? 0;
  const fulfillment = state?.fulfillment ?? "home";

  return (
    <div style={{ minHeight: "100vh", background: "#f7f7f7", paddingTop: 80, display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "48px 36px", maxWidth: 480, width: "90%", textAlign: "center", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>

        {/* Icon */}
        <div style={{ marginBottom: 20 }}>
          <CheckCircleIcon />
        </div>

        {/* Heading */}
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111", margin: "0 0 8px" }}>Order Confirmed!</h2>
        <p style={{ fontSize: 13, color: "rgba(0,0,0,0.45)", margin: "0 0 32px", lineHeight: 1.6 }}>
          Thank you for your purchase. Your order has been received and is being processed.
        </p>

        {/* Details */}
        <div style={{ background: "#f7f7f7", borderRadius: 12, padding: "20px", marginBottom: 28, textAlign: "left", display: "flex", flexDirection: "column", gap: 14 }}>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>Transaction Ref</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#111", fontFamily: "monospace" }}>{reference}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>Amount Paid</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: GOLD }}>{formatNaira(total)}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)" }}>Fulfilment</span>
            <span style={{
              fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 999,
              background: fulfillment === "home" ? "rgba(201,168,76,0.1)" : "rgba(46,204,113,0.1)",
              color: fulfillment === "home" ? GOLD : "#2ecc71",
            }}>
              {fulfillment === "home" ? "Home Delivery" : "In-Person Pickup"}
            </span>
          </div>

        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button
            onClick={() => navigate("/gallery")}
            style={{ width: "100%", background: "#111", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/")}
            style={{ width: "100%", background: "transparent", color: "rgba(0,0,0,0.4)", border: "1.5px solid rgba(0,0,0,0.1)", borderRadius: 10, padding: "14px", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Back to Home
          </button>
        </div>

      </div>
    </div>
  );
}