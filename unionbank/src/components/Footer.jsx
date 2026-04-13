import { Link } from "react-router-dom";

export default function Footer() {
  const GOLD = "#C9A84C";

  return (
    <footer style={{ background: "#fff", borderTop: "1px solid rgba(0,0,0,0.07)", marginTop: "auto", width: "100%" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px 28px" }}>
        
        {/* Top Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 48 }}>
          
          {/* Brand Info */}
          <div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", margin: "0 0 12px", fontFamily: "Georgia, serif" }}>Uniform Bank</h3>
            <p style={{ fontSize: 12, color: "rgba(0,0,0,0.4)", lineHeight: 1.7, margin: 0, maxWidth: 220, fontFamily: "Georgia, serif" }}>
              Premium uniforms and bespoke garments crafted for institutions, teams, and individuals who demand distinction.
            </p>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px", fontFamily: "Inter, sans-serif" }}>Services</p>
            {["School Uniforms", "Sports Wear", "Corporate Apparel", "Security Uniforms", "Bespoke Tailoring"].map((item) => (
              <Link
                to="/services"
                key={item} 
                style={{ display: "block", fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", textDecoration: "none", fontFamily: "Georgia, serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px", fontFamily: "Inter, sans-serif" }}>Company</p>
            {[
              { name: "About Us", path: "/" },
              { name: "Why Us", path: "/#why-us" },
              { name: "Gallery", path: "/gallery" },
              { name: "Contact", path: "/contact" }
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{ display: "block", fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", textDecoration: "none", fontFamily: "Georgia, serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.55)")}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", margin: "0 0 14px", fontFamily: "Inter, sans-serif" }}>Get In Touch</p>
            {["inquiry@uniformbank.com", "+234 800 000 0000", "Abuja, Nigeria"].map((item) => (
              <p key={item} style={{ fontSize: 12, color: "rgba(0,0,0,0.55)", margin: "0 0 9px", fontFamily: "Georgia, serif" }}>{item}</p>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)", paddingTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
          <p style={{ fontSize: 11, color: "rgba(0,0,0,0.3)", margin: 0, fontFamily: "Georgia, serif" }}>© 2026 Uniform Bank. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Use"].map((item) => (
              <p key={item} style={{ fontSize: 11, color: "rgba(0,0,0,0.35)", margin: 0, cursor: "pointer", fontFamily: "Georgia, serif" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(0,0,0,0.35)")}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
