import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./Cartcontext";

const GOLD = "#C9A84C";
const GOLD_LIGHT = "#FAF3E0";
const BG = "#F9F8F6";

const MEASUREMENT_FIELDS = [
  { key: "chest",         label: "Chest" },
  { key: "waist",         label: "Waist" },
  { key: "hips",          label: "Hips" },
  { key: "shoulderWidth", label: "Shoulder Width" },
  { key: "sleeveLength",  label: "Sleeve Length" },
  { key: "inseam",        label: "Inseam" },
  { key: "neck",          label: "Neck" },
  { key: "backLength",    label: "Back Length" },
  { key: "thigh",         label: "Thigh" },
];

const EMPTY_MEASUREMENTS = Object.fromEntries(MEASUREMENT_FIELDS.map(({ key }) => [key, ""]));

function formatNaira(amount) {
  return "₦" + Number(amount).toLocaleString("en-NG");
}

function MeasurementsPanel() {
  const [measurements, setMeasurements] = useState(EMPTY_MEASUREMENTS);
  const [tempValues, setTempValues]     = useState(EMPTY_MEASUREMENTS);
  const [isEditing, setIsEditing]       = useState(false);
  const [saved, setSaved]               = useState(false);
  const [lastUpdated, setLastUpdated]   = useState(null);

  const hasAny = MEASUREMENT_FIELDS.some(({ key }) => measurements[key]);

  const handleEdit = () => {
    setTempValues({ ...measurements });
    setIsEditing(true);
    setSaved(false);
  };

  const handleSave = () => {
    setMeasurements({ ...tempValues });
    setIsEditing(false);
    setSaved(true);
    const now = new Date();
    setLastUpdated(now.toLocaleDateString("en-GB", { month: "long", year: "numeric" }));
    setTimeout(() => setSaved(false), 3000);
  };

  const handleCancel = () => {
    setTempValues({ ...measurements });
    setIsEditing(false);
  };

  const handleChange = (key, val) => {
    const clean = val.replace(/[^\d.]/g, "");
    setTempValues((prev) => ({ ...prev, [key]: clean }));
  };

  const inputStyle = {
    boxSizing: "border-box",
    width: "100%",
    padding: "8px 36px 8px 10px",
    fontSize: 13,
    border: "1.5px solid rgba(0,0,0,0.12)",
    borderRadius: 8,
    color: "#1a1a1a",
    background: "#fff",
    outline: "none",
    fontFamily: "Inter, sans-serif",
    transition: "border-color 0.18s",
    textAlign: "right",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <style>{`
        .m-input:focus { border-color: ${GOLD} !important; }
        .m-row { display: flex; justify-content: space-between; align-items: center; padding: 11px 0; border-bottom: 0.5px solid rgba(0,0,0,0.06); gap: 16px; }
        .m-row:last-child { border-bottom: none; }
        .m-edit-row { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; padding: 6px 0; border-bottom: 0.5px solid rgba(0,0,0,0.06); align-items: center; }
        .m-edit-row:last-child { border-bottom: none; }
        @media (max-width: 480px) { .m-edit-row { grid-template-columns: 1fr; gap: 4px; } }
      `}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#1a1a1a" }}>My Measurements</p>
        {!isEditing && (
          <button
            onClick={handleEdit}
            style={{
              background: "transparent",
              border: `1px solid ${hasAny ? GOLD : "rgba(0,0,0,0.12)"}`,
              color: hasAny ? GOLD : "#666",
              borderRadius: 8, padding: "6px 14px", fontSize: 11,
              cursor: "pointer", fontFamily: "inherit", fontWeight: 500,
            }}
          >
            {hasAny ? "Update" : "Add Measurements"}
          </button>
        )}
      </div>

      <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "6px 20px 12px" }}>
        <p style={{ margin: "12px 0 4px", fontSize: 11, color: "#bbb" }}>
          {hasAny
            ? `Saved from your Get in Touch enquiry · Last updated ${lastUpdated || "—"}. All measurements in cm.`
            : "Enter your body measurements below. All values in cm."}
        </p>

        {saved && (
          <p style={{ margin: "4px 0 8px", fontSize: 11, color: "#0F6E56", fontWeight: 500 }}>✓ Measurements saved</p>
        )}

        {isEditing ? (
          <div style={{ marginTop: 10 }}>
            {MEASUREMENT_FIELDS.map(({ key, label }) => (
              <div key={key} className="m-edit-row">
                <label style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>{label}</label>
                <div style={{ position: "relative" }}>
                  <input
                    className="m-input"
                    style={inputStyle}
                    type="text"
                    inputMode="decimal"
                    value={tempValues[key]}
                    onChange={(e) => handleChange(key, e.target.value)}
                    placeholder="0"
                  />
                  <span style={{
                    position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                    fontSize: 11, color: "#bbb", pointerEvents: "none",
                  }}>cm</span>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <button onClick={handleSave} style={{ flex: 1, padding: "9px 0", fontSize: 13, fontWeight: 600, background: GOLD, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                Save Measurements
              </button>
              <button onClick={handleCancel} style={{ flex: 1, padding: "9px 0", fontSize: 13, fontWeight: 500, background: "transparent", color: "#888", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>
                Cancel
              </button>
            </div>
          </div>

        ) : hasAny ? (
          <div style={{ marginTop: 8 }}>
            {MEASUREMENT_FIELDS.map(({ key, label }) => (
              <div key={key} className="m-row">
                <span style={{ fontSize: 13, color: "#888" }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: measurements[key] ? "#1a1a1a" : "#ddd" }}>
                  {measurements[key] ? `${measurements[key]} cm` : "—"}
                </span>
              </div>
            ))}
          </div>

        ) : (
          <div style={{ textAlign: "center", padding: "28px 0 16px" }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ddd" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10 }}>
              <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-4" />
              <path d="M13 3h8v8" />
              <path d="M21 3l-9 9" />
            </svg>
            <p style={{ fontSize: 13, color: "#bbb", margin: 0 }}>No measurements saved yet.</p>
            <p style={{ fontSize: 11, color: "#ccc", margin: "4px 0 0" }}>Click "Add Measurements" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

const statusStyle = (status) => {
  if (status === "In Production") return { background: "#EAF3DE", color: "#3B6D11", border: "0.5px solid #C0DD97" };
  if (status === "Shipped")       return { background: "#E6F1FB", color: "#185FA5", border: "0.5px solid #B5D4F4" };
  if (status === "Delivered")     return { background: "#E1F5EE", color: "#0F6E56", border: "0.5px solid #9FE1CB" };
  return { background: "#F1EFE8", color: "#5F5E5A", border: "0.5px solid #D3D1C7" };
};

function Badge({ status }) {
  const s = statusStyle(status);
  return (
    <span style={{ ...s, fontSize: 11, fontWeight: 500, padding: "3px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

function TrashIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 01-8 0" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function FieldLabel({ children }) {
  return (
    <label style={{
      fontSize: 10, color: "#aaa", fontWeight: 600,
      letterSpacing: "0.07em", textTransform: "uppercase",
      display: "block", marginBottom: 5,
    }}>
      {children}
    </label>
  );
}

function OrderRow({ item, onRemove, status }) {
  const { image, name, category, qty, price, unitPrice } = item;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderBottom: "0.5px solid rgba(0,0,0,0.07)" }}>
      <div style={{ width: 46, height: 46, borderRadius: 8, background: "#e8e8e8", flexShrink: 0, overflow: "hidden" }}>
        {image && <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1a1a1a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</p>
        <p style={{ margin: "2px 0 0", fontSize: 11, color: "#888" }}>{category}</p>
        <p style={{ margin: "1px 0 0", fontSize: 11, color: "#bbb" }}>Qty: {qty} · {formatNaira(unitPrice)}/unit</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "#1a1a1a" }}>{formatNaira(price)}</p>
        <Badge status={status} />
        <button
          onClick={() => onRemove(item.id)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(0,0,0,0.3)", padding: 0, transition: "color 0.15s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e53e3e")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.3)")}
        >
          <TrashIcon /> Remove
        </button>
      </div>
    </div>
  );
}

const sideNav = ["Overview", "Personal Info", "My Measurements"];
const footerServices = ["School Uniforms", "Sports Wear", "Corporate Apparel", "Security Uniforms", "Bespoke Tailoring"];
const footerCompany  = ["About Us", "Why Us", "Gallery", "Contact"];
const footerContact  = ["inquiry@uniformbank.com", "+234 800 000 0000", "Abuja, Nigeria"];

export default function Profile() {
  const [activeNav, setActiveNav]       = useState("Overview");
  const [avatarSrc, setAvatarSrc]       = useState(null);
  const [avatarHovered, setAvatarHovered] = useState(false);

  const [name,  setName]  = useState("Amara Okonkwo");
  const [email, setEmail] = useState("amara@example.com");
  const [phone, setPhone] = useState("");
  const [sex,   setSex]   = useState("");

  const [nameTemp,  setNameTemp]  = useState("Amara Okonkwo");
  const [emailTemp, setEmailTemp] = useState("amara@example.com");
  const [phoneTemp, setPhoneTemp] = useState("");
  const [sexTemp,   setSexTemp]   = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [saved,     setSaved]     = useState(false);

  const [piEditing,   setPiEditing]   = useState(false);
  const [piSaved,     setPiSaved]     = useState(false);
  const [piNameTemp,  setPiNameTemp]  = useState("");
  const [piEmailTemp, setPiEmailTemp] = useState("");
  const [piPhoneTemp, setPiPhoneTemp] = useState("");
  const [piSexTemp,   setPiSexTemp]   = useState("");

  const fileInputRef = useRef(null);
  const navigate     = useNavigate();
  const { cartItems, setCartItems } = useContext(CartContext);

  const initials = name.trim().split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarSrc(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleEdit = () => { setNameTemp(name); setEmailTemp(email); setPhoneTemp(phone); setSexTemp(sex); setIsEditing(true); setSaved(false); };
  const handleSave = () => {
    setName(nameTemp.trim() || name); setEmail(emailTemp.trim() || email);
    setPhone(phoneTemp.trim()); setSex(sexTemp);
    setIsEditing(false); setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };
  const handleCancel = () => { setNameTemp(name); setEmailTemp(email); setPhoneTemp(phone); setSexTemp(sex); setIsEditing(false); };

  const handlePiEdit = () => { setPiNameTemp(name); setPiEmailTemp(email); setPiPhoneTemp(phone); setPiSexTemp(sex); setPiEditing(true); setPiSaved(false); };
  const handlePiSave = () => {
    setName(piNameTemp.trim() || name); setEmail(piEmailTemp.trim() || email);
    setPhone(piPhoneTemp.trim()); setSex(piSexTemp);
    setPiEditing(false); setPiSaved(true);
    setTimeout(() => setPiSaved(false), 2500);
  };
  const handlePiCancel = () => setPiEditing(false);

  const handleNavChange = (item) => {
    setActiveNav(item);
    setPiEditing(false); setPiSaved(false);
    setIsEditing(false); setSaved(false);
  };

  const handleRemove = (id) => setCartItems((prev) => prev.filter((i) => i.id !== id));

  const totalOrders     = cartItems.length;
  const totalSpent      = cartItems.reduce((sum, i) => sum + (i.price || 0), 0);
  const activeItems     = cartItems.filter((i) => i.selected).length;
  const inProgress      = cartItems.filter((i) => i.selected);
  const recentItems     = cartItems.filter((i) => !i.selected);

  const totalSpentLabel =
    totalSpent === 0        ? "₦0"
    : totalSpent >= 1000000 ? `₦${(totalSpent / 1000000).toFixed(1)}M`
    : totalSpent >= 1000    ? `₦${(totalSpent / 1000).toFixed(0)}k`
    : formatNaira(totalSpent);

  const inputStyle = {
    boxSizing: "border-box", width: "100%", padding: "9px 11px", fontSize: 13,
    border: "1.5px solid rgba(0,0,0,0.12)", borderRadius: 8, color: "#1a1a1a",
    background: "#fff", outline: "none", fontFamily: "Inter, sans-serif", transition: "border-color 0.18s",
  };

  const selectStyle = {
    ...inputStyle,
    appearance: "none", WebkitAppearance: "none",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 10px) center",
    paddingRight: 32, cursor: "pointer",
  };

  const InfoRow = ({ label, value }) => (
    <div style={{ padding: "12px 0", borderBottom: "0.5px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 12, color: "#999", minWidth: 80 }}>{label}</span>
      <span style={{ fontSize: 13, color: value ? "#1a1a1a" : "#ccc", fontWeight: value ? 500 : 400, textAlign: "right" }}>
        {value || "Not set"}
      </span>
    </div>
  );

  const chevronSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23aaa' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`;

  return (
    <div style={{ minHeight: "100vh", background: BG, paddingTop: 60, fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        * { box-sizing: border-box; }
        .p-wrap { flex: 1; max-width: 1100px; width: 100%; margin: 0 auto; padding: 32px 20px; }
        .p-grid { display: grid; grid-template-columns: 210px 1fr; gap: 20px; align-items: start; }
        .stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1.5fr 1fr 1.5fr; gap: 40px; margin-bottom: 48px; }
        .edit-input { width: 100%; padding: 8px 10px; font-size: 13px; border: 1.5px solid rgba(0,0,0,0.12); border-radius: 8px; color: #1a1a1a; background: #fff; outline: none; transition: border-color 0.18s; font-family: inherit; box-sizing: border-box; }
        .edit-input:focus { border-color: ${GOLD}; }
        .pi-input:focus { border-color: ${GOLD}; }
        .pi-select:focus { border-color: ${GOLD}; }
        .nav-item { padding: 11px 16px; font-size: 13px; cursor: pointer; transition: all 0.15s; border-bottom: 0.5px solid rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: space-between; }
        @media (max-width: 780px) { .p-grid { grid-template-columns: 1fr; } .footer-grid { grid-template-columns: 1fr 1fr; gap: 24px; } }
        @media (max-width: 520px) { .p-wrap { padding: 20px 14px; } .stat-grid { grid-template-columns: 1fr 1fr; } .footer-grid { grid-template-columns: 1fr 1fr; gap: 18px; } }
        @media (max-width: 380px) { .stat-grid { grid-template-columns: 1fr 1fr; gap: 8px; } .footer-grid { grid-template-columns: 1fr; gap: 20px; } }
      `}</style>

      <div className="p-wrap">
        <div className="p-grid">

          {/* ── SIDEBAR ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "24px 18px 20px", textAlign: "center" }}>
              <div
                onMouseEnter={() => setAvatarHovered(true)}
                onMouseLeave={() => setAvatarHovered(false)}
                onClick={() => fileInputRef.current.click()}
                style={{ position: "relative", width: 68, height: 68, borderRadius: "50%", margin: "0 auto 14px", cursor: "pointer", display: "inline-block" }}
              >
                {avatarSrc ? (
                  <img src={avatarSrc} alt="Profile" style={{ width: 68, height: 68, borderRadius: "50%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: 68, height: 68, borderRadius: "50%", background: GOLD, color: "#fff", fontSize: 24, fontWeight: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {initials}
                  </div>
                )}
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 3, opacity: avatarHovered ? 1 : 0, transition: "opacity 0.18s", pointerEvents: "none" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                    <circle cx="12" cy="13" r="4"/>
                  </svg>
                  <span style={{ fontSize: 9, color: "#fff", fontWeight: 500, letterSpacing: "0.05em" }}>CHANGE</span>
                </div>
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: "none" }} />

              {isEditing ? (
                <div style={{ textAlign: "left" }}>
                  <label style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Name</label>
                  <input className="edit-input" value={nameTemp} onChange={(e) => setNameTemp(e.target.value)} style={{ marginBottom: 10 }} />
                  <label style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Email</label>
                  <input className="edit-input" type="email" value={emailTemp} onChange={(e) => setEmailTemp(e.target.value)} style={{ marginBottom: 10 }} />
                  <label style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Phone</label>
                  <div style={{ position: "relative", marginBottom: 10 }}>
                    <div style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#888", pointerEvents: "none" }}>
                      🇳🇬 <span style={{ fontSize: 11 }}>+234</span>
                    </div>
                    <input className="edit-input" type="tel" value={phoneTemp} onChange={(e) => setPhoneTemp(e.target.value.replace(/[^\d\s\-]/g, ""))} placeholder="080 0000 0000" maxLength={14} style={{ paddingLeft: 62 }} />
                  </div>
                  <label style={{ fontSize: 10, color: "#aaa", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", display: "block", marginBottom: 4 }}>Sex</label>
                  <select className="edit-input" value={sexTemp} onChange={(e) => setSexTemp(e.target.value)} style={{ marginBottom: 14, appearance: "none", WebkitAppearance: "none", backgroundImage: chevronSVG, backgroundRepeat: "no-repeat", backgroundPosition: "calc(100% - 10px) center", paddingRight: 32, cursor: "pointer" }}>
                    <option value="" disabled>Select…</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={handleSave} style={{ flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 600, background: GOLD, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Save</button>
                    <button onClick={handleCancel} style={{ flex: 1, padding: "8px 0", fontSize: 12, fontWeight: 500, background: "transparent", color: "#888", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ margin: "0 0 3px", fontWeight: 600, fontSize: 15, color: "#1a1a1a" }}>{name}</p>
                  <p style={{ margin: "0 0 12px", fontSize: 12, color: "#aaa" }}>{email}</p>
                  {saved && <p style={{ margin: "0 0 8px", fontSize: 11, color: "#0F6E56", fontWeight: 500 }}>✓ Saved</p>}
                  <button onClick={handleEdit} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "6px 14px", fontSize: 11, color: "#666", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit", marginBottom: 12 }}>
                    <PencilIcon /> Edit profile
                  </button>
                  <br />
                  <span onClick={() => fileInputRef.current.click()} style={{ fontSize: 11, color: GOLD, cursor: "pointer", borderBottom: `1px dashed ${GOLD}`, paddingBottom: 1 }}>
                    Change photo
                  </span>
                </>
              )}
            </div>

            <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, overflow: "hidden" }}>
              {sideNav.map((item) => (
                <div key={item} className="nav-item" onClick={() => handleNavChange(item)} style={{ fontWeight: activeNav === item ? 500 : 400, color: activeNav === item ? GOLD : "#444", background: activeNav === item ? GOLD_LIGHT : "transparent", borderLeft: activeNav === item ? `2px solid ${GOLD}` : "2px solid transparent" }}>
                  {item}
                </div>
              ))}
            </div>

            <div onClick={() => navigate("/cart")} style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "11px 16px", fontSize: 13, color: "#444", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "background 0.15s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = GOLD_LIGHT)}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}><CartIcon /> My Cart</div>
              {totalOrders > 0 && (
                <span style={{ background: GOLD, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999 }}>{totalOrders}</span>
              )}
            </div>

            <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, overflow: "hidden" }}>
              <div onClick={() => navigate("/")} style={{ padding: "11px 16px", fontSize: 13, color: "#c0392b", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out
              </div>
            </div>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {activeNav === "Overview" && (
              <>
                <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#1a1a1a" }}>Account Overview</p>
                <div className="stat-grid">
                  {[
                    { label: "Total Orders", value: totalOrders },
                    { label: "Total Spent",  value: totalSpentLabel },
                    { label: "Active Items", value: activeItems },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 10, padding: "16px 14px", textAlign: "center" }}>
                      <p style={{ margin: "0 0 4px", fontSize: 24, fontWeight: 600, color: "#1a1a1a", lineHeight: 1 }}>{value}</p>
                      <p style={{ margin: 0, fontSize: 10, color: "#bbb", textTransform: "uppercase", letterSpacing: "0.09em" }}>{label}</p>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "18px 18px 4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>
                      Orders in Progress
                      {inProgress.length > 0 && <span style={{ marginLeft: 8, fontSize: 11, background: GOLD_LIGHT, color: GOLD, padding: "2px 8px", borderRadius: 999, fontWeight: 600 }}>{inProgress.length}</span>}
                    </p>
                    <span onClick={() => navigate("/cart")} style={{ fontSize: 12, color: GOLD, cursor: "pointer" }}>View cart</span>
                  </div>
                  {inProgress.length === 0 ? (
                    <p style={{ fontSize: 12, color: "#ccc", padding: "18px 0 14px" }}>
                      No active orders.{" "}
                      <span onClick={() => navigate("/gallery")} style={{ color: GOLD, cursor: "pointer" }}>Browse gallery →</span>
                    </p>
                  ) : (
                    inProgress.map((item) => <OrderRow key={item.id} item={item} onRemove={handleRemove} status="In Production" />)
                  )}
                </div>

                <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "18px 18px 4px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: "#1a1a1a" }}>
                      Recent Items
                      {recentItems.length > 0 && <span style={{ marginLeft: 8, fontSize: 11, background: "#f1f1f1", color: "#888", padding: "2px 8px", borderRadius: 999, fontWeight: 600 }}>{recentItems.length}</span>}
                    </p>
                    <span onClick={() => navigate("/cart")} style={{ fontSize: 12, color: GOLD, cursor: "pointer" }}>View all</span>
                  </div>
                  {recentItems.length === 0 ? (
                    <p style={{ fontSize: 12, color: "#ccc", padding: "18px 0 14px" }}>Nothing here yet.</p>
                  ) : (
                    recentItems.map((item) => <OrderRow key={item.id} item={item} onRemove={handleRemove} status="Shipped" />)
                  )}
                </div>
              </>
            )}

            {activeNav === "Personal Info" && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <p style={{ margin: 0, fontSize: 17, fontWeight: 500, color: "#1a1a1a" }}>Personal Info</p>
                  {!piEditing && (
                    <button onClick={handlePiEdit} style={{ background: "transparent", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, padding: "6px 14px", fontSize: 11, color: "#666", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
                      <PencilIcon /> Edit
                    </button>
                  )}
                </div>
                <div style={{ background: "#fff", border: "0.5px solid rgba(0,0,0,0.08)", borderRadius: 12, padding: "20px 20px 8px" }}>
                  {piEditing ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                      <div>
                        <FieldLabel>Full Name</FieldLabel>
                        <input className="pi-input" style={inputStyle} value={piNameTemp} onChange={(e) => setPiNameTemp(e.target.value)} placeholder="Your full name" />
                      </div>
                      <div>
                        <FieldLabel>Email Address</FieldLabel>
                        <input className="pi-input" style={inputStyle} type="email" value={piEmailTemp} onChange={(e) => setPiEmailTemp(e.target.value)} placeholder="you@example.com" />
                      </div>
                      <div>
                        <FieldLabel>Phone Number</FieldLabel>
                        <div style={{ position: "relative" }}>
                          <div style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#555", pointerEvents: "none" }}>
                            🇳🇬 <span style={{ fontSize: 12, color: "#888" }}>+234</span>
                          </div>
                          <input className="pi-input" style={{ ...inputStyle, paddingLeft: 68 }} type="tel" value={piPhoneTemp} onChange={(e) => setPiPhoneTemp(e.target.value.replace(/[^\d\s\-]/g, ""))} placeholder="080 0000 0000" maxLength={14} />
                        </div>
                      </div>
                      <div>
                        <FieldLabel>Sex</FieldLabel>
                        <select className="pi-select" style={selectStyle} value={piSexTemp} onChange={(e) => setPiSexTemp(e.target.value)}>
                          <option value="" disabled>Select…</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div style={{ display: "flex", gap: 10, paddingTop: 4, paddingBottom: 8 }}>
                        <button onClick={handlePiSave} style={{ flex: 1, padding: "9px 0", fontSize: 13, fontWeight: 600, background: GOLD, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Save Changes</button>
                        <button onClick={handlePiCancel} style={{ flex: 1, padding: "9px 0", fontSize: 13, fontWeight: 500, background: "transparent", color: "#888", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ paddingBottom: 10 }}>
                      {piSaved && <p style={{ margin: "0 0 12px", fontSize: 11, color: "#0F6E56", fontWeight: 500 }}>✓ Changes saved</p>}
                      <InfoRow label="Full Name" value={name} />
                      <InfoRow label="Email"     value={email} />
                      <InfoRow label="Phone"     value={phone ? `+234 ${phone}` : ""} />
                      <InfoRow label="Sex"       value={sex} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeNav === "My Measurements" && <MeasurementsPanel />}

          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", marginTop: 20 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 20px 28px" }}>
          <div className="footer-grid">
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: "0 0 12px" }}>Uniform Bank</h3>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 220 }}>
                Premium uniforms and bespoke garments crafted for institutions, teams, and individuals who demand distinction.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Services</p>
              {footerServices.map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}>{item}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Company</p>
              {footerCompany.map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}>{item}</p>
              ))}
            </div>
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px" }}>Get In Touch</p>
              {footerContact.map((item) => (
                <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px" }}>{item}</p>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <p style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", margin: 0 }}>© 2026 Uniform Bank. All rights reserved.</p>
            <div style={{ display: "flex", gap: 20 }}>
              {["Privacy Policy", "Terms of Use"].map((item) => (
                <p key={item} style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", margin: 0, cursor: "pointer" }} onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}>{item}</p>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}