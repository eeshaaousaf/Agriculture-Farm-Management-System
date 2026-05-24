import React, { useState } from "react";

/* ==========================================================================
   1. STYLES (GREYISH TEXT & RESPONSIVE FORGOT PWD)
   ========================================================================== */
const GlobalStyle = () => (
  <style>{`
    .login-container {
      display: flex;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
      font-size: 18px;
    }

    .login-left {
      flex: 1.2;
      background: #0f2318;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      color: white;
    }

    .login-right {
      flex: 1;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 30px;
    }

    .hero-pattern {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: radial-gradient(rgba(82,183,136,0.1) 1px, transparent 1px);
      background-size: 30px 30px;
    }

    /* Labels and Subtext - Now using the Greyish Slate color */
    .text-greyish { color: #5a6b61; } 
    .form-label { 
      display: block; 
      font-size: 15px; 
      font-weight: 600; 
      color: #4a5a51; /* Darker greyish tint */
      margin-bottom: 10px; 
    }
    
    .form-input { 
      width: 100%; 
      padding: 16px 18px; 
      border-radius: 12px; 
      border: 1px solid #e2e8f0; 
      font-size: 17px; 
      transition: 0.3s;
      box-sizing: border-box;
      background: #f0f7ff; 
      color: #1b4332;
    }
    .form-input:focus { outline: none; border-color: #52b788; background: white; box-shadow: 0 0 0 3px rgba(82,183,136,0.1); }

    /* FIXED RESPONSIVE FORGOT PASSWORD */
    .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      gap: 10px;
      width: 100%;
      flex-wrap: wrap; /* Allows stacking on mobile */
    }

    .forgot-link {
      color: #1b4332; 
      text-decoration: none; 
      font-weight: 700;
      font-size: 15px;
      white-space: nowrap; /* Prevents text from breaking weirdly */
    }

    .btn { 
      display: flex; align-items: center; gap: 10px; border: none; 
      border-radius: 12px; cursor: pointer; transition: 0.3s; font-weight: 600;
      justify-content: center;
    }
    .btn-primary { 
      background: #1b4332; 
      color: white; 
      width: 100%; 
      padding: 16px; 
      font-size: 18px; 
    }
    .btn-primary:hover { background: #0f2318; transform: translateY(-1px); }

    .social-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      width: 100%;
    }

    .social-btn {
      background: #f0f7ff;
      border: 1px solid #d0e3ff;
      padding: 14px;
      font-size: 16px;
      color: #1b4332;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      text-decoration: none;
    }

    /* Standardized "OR" line */
    .divider-text {
      font-size: 13px; 
      color: #94a3b8; 
      text-transform: uppercase; 
      letter-spacing: 1px;
      background: white;
      padding: 0 10px;
    }

    @media (max-width: 950px) {
      .login-container { flex-direction: column; }
      .login-left { display: none; } 
    }

    @media (max-width: 480px) {
      .form-options { flex-direction: column; align-items: flex-start; gap: 12px; }
      .social-grid { grid-template-columns: 1fr; }
    }

    @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
  `}</style>
);

const LoginPage = ({ onNavigate }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onNavigate("dashboard");
    }, 1000);
  };

  return (
    <div className="login-container">
      <GlobalStyle />

      <div className="login-left">
        <div className="hero-pattern" />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 80, marginBottom: 20, animation: "float 6s ease-in-out infinite" }}>🌿</div>
          <h1 style={{ fontFamily: "serif", fontSize: 48, fontWeight: 900, color: "white", marginBottom: 16 }}>
            AgriManage
          </h1>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, maxWidth: 360, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Smart agriculture management for the modern farmer. Grow smarter, harvest better.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 360, margin: "0 auto" }}>
            {[["🌾", "5 Farms"], ["🌱", "18 Crops"], ["💧", "Smart Irrigation"], ["📊", "Analytics"]].map(([e, l]) => (
              <div key={l} style={{ padding: "14px 18px", borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.8)", fontSize: 14, textAlign: "center" }}>
                {e} {l}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="login-right">
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "serif", fontSize: 36, fontWeight: 800, color: "#1b4332", marginBottom: 12 }}>
              Welcome Back
            </h2>
            <p className="text-greyish" style={{ fontSize: 18 }}>Sign in to your AgriManage account</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                className="form-input" 
                type="email" 
                placeholder="adeenatariq.info@gmail.com"
                required
                value={form.email} 
                onChange={e => setForm({ ...form, email: e.target.value })} 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                className="form-input" 
                type="password" 
                placeholder="••••••••"
                required
                value={form.password} 
                onChange={e => setForm({ ...form, password: e.target.value })} 
              />
            </div>

            <div className="form-options">
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: "#5a6b61" }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#1b4332' }} /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Loading..." : "Sign In →"}
            </button>
          </form>

          <div style={{ textAlign: "center", marginTop: 28, fontSize: 16 }}>
            <span className="text-greyish">Don't have an account?</span> <a href="#" style={{ color: "#1b4332", fontWeight: 700, textDecoration: "none" }}>Contact Admin</a>
          </div>

          <div style={{ position: "relative", textAlign: "center", margin: "36px 0" }}>
            <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "#f1f5f9", zIndex: 1 }} />
            <span className="divider-text" style={{ position: "relative", zIndex: 2 }}>or continue with</span>
          </div>

          <div className="social-grid">
            <button type="button" className="btn social-btn">
              <b style={{ color: '#4285F4', fontSize: '20px' }}>G</b> Google
            </button>
            <button type="button" className="btn social-btn">
              <b style={{ color: '#00A4EF', fontSize: '20px' }}>M</b> Microsoft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;