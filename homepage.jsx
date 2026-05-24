import React, { useState, useEffect } from "react";

/* ==========================================================================
   1. PREMIUM SLOW COUNTER HOOK
   ========================================================================== */
const useCountUp = (end, duration = 4000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const currentCount = Math.floor(easeOutCubic(progress) * end);
      setCount(currentCount);
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);
  return count;
};

/* ==========================================================================
   2. MIDNIGHT HARVEST STYLES
   ========================================================================== */
const GlobalStyle = () => (
  <style>{`
    :root {
      --bg-dark: #14281e; 
      --card-bg: #1a3226; 
      --leaf-bright: #52b788;
      --leaf-muted: #2d6a4f;
      --forest-dark: #0d1a14; 
      --text-white: #f8f9fa;
      --text-dim: rgba(248, 249, 250, 0.6);
      --accent: #d4a373;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: 'Inter', sans-serif; 
      background: var(--bg-dark); 
      color: var(--text-white); 
      overflow-x: hidden; 
    }

    .home-nav { 
      position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
      width: 90%; max-width: 1100px; display: flex; justify-content: space-between; 
      align-items: center; padding: 12px 35px; z-index: 1000; 
      transition: 0.5s; border-radius: 100px;
      border: 1px solid rgba(82, 183, 136, 0.1);
      background: rgba(20, 40, 30, 0.7);
      backdrop-filter: blur(15px);
    }
    .home-nav.scrolled { background: var(--card-bg); border-color: var(--leaf-bright); }

    .nav-link { color: var(--text-dim); text-decoration: none; font-size: 14px; font-weight: 500; transition: 0.3s; }
    .nav-link:hover { color: var(--leaf-bright); }

    .hero { 
      min-height: 100vh; display: flex; align-items: center; padding: 0 10%; 
      gap: 50px;
      background: var(--bg-dark);
    }
    .hero-image-container { flex: 1; display: flex; justify-content: flex-end; }
    .hero-img-card {
      width: 100%; max-width: 500px; height: 600px; 
      border-radius: 40px; overflow: hidden;
      border: 1px solid rgba(82, 183, 136, 0.2);
      box-shadow: 0 30px 60px rgba(0,0,0,0.5);
    }
    .hero-img-card img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.8); }

    .features-grid { 
      display: grid; grid-template-columns: repeat(3, 1fr); 
      gap: 30px; padding: 80px 10% 120px; background: var(--bg-dark);
    }
    .f-card { 
      padding: 50px 40px; background: var(--card-bg); border-radius: 30px; 
      border: 1px solid rgba(255,255,255,0.03); 
      transition: 0.6s cubic-bezier(0.2, 1, 0.3, 1); cursor: pointer;
      text-align: center;
    }
    .f-card:hover { 
      transform: translateY(-15px); 
      background: #213f30; border-color: var(--leaf-bright);
      box-shadow: 0 40px 80px rgba(0,0,0,0.6);
    }

    .stats-container { padding: 0 10% 100px; background: var(--bg-dark); }
    .stats-bar {
      display: flex; justify-content: space-around; padding: 70px 5%;
      background: linear-gradient(135deg, #1a3226 0%, #14281e 100%);
      border-radius: 40px; border: 1px solid rgba(82, 183, 136, 0.1); text-align: center;
    }
    .stat-item h2 { font-size: 64px; font-weight: 900; color: var(--leaf-bright); }
    .stat-item p { color: var(--text-dim); text-transform: uppercase; letter-spacing: 3px; font-size: 11px; }

    .btn { padding: 16px 35px; border-radius: 100px; font-weight: 700; cursor: pointer; transition: 0.4s; border: none; }
    .btn-primary { background: var(--leaf-bright); color: var(--bg-dark); }

    .footer { 
      background: var(--forest-dark); 
      color: white; 
      padding: 100px 10% 40px; 
      border-radius: 40px 40px 0 0;
    }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; }
    .footer-col h4 { margin-bottom: 24px; font-size: 16px; color: #52b788; letter-spacing: 1px; }
    .footer-links { list-style: none; }
    .footer-links li { margin-bottom: 12px; }
    .footer-links a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: 0.3s; }

    @media (max-width: 992px) { 
      .hero { flex-direction: column; text-align: center; padding-top: 150px; }
      .hero-image-container { display: none; }
      .features-grid { grid-template-columns: 1fr; }
    }
  `}</style>
);

const HomePage = ({ onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const farmCount = useCountUp(15, 4000);
  const userCount = useCountUp(5000, 4500);
  const efficiency = useCountUp(98, 4200);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <GlobalStyle />

      <nav className={`home-nav ${scrolled ? "scrolled" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🌿</span>
          <span style={{ fontSize: 20, fontWeight: 900, color: "var(--leaf-bright)" }}>AgriManage</span>
        </div>
        <div className="nav-links">
          {["Solutions", "Technology", "Contact"].map(item => (
            <a key={item} href="#" className="nav-link" style={{ marginLeft: 30 }}>{item}</a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn" style={{ background: 'transparent', color: 'white' }} onClick={() => onNavigate("login")}>Login</button>
          <button className="btn btn-primary" onClick={() => onNavigate("login")}>Get Started</button>
        </div>
      </nav>

      <section className="hero">
        <div style={{ flex: 1.2 }}>
          <div style={{ color: "var(--leaf-bright)", fontWeight: 700, fontSize: 13, letterSpacing: 3, marginBottom: 20 }}>
            FUTURE OF PAKISTANI AGRICULTURE
          </div>
          <h1 style={{ fontSize: "clamp(45px, 6vw, 75px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 35, fontFamily: 'serif' }}>
            The Future of <br />
            <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Agriculture</span> is Data.
          </h1>
          <p style={{ fontSize: 19, color: "var(--text-dim)", marginBottom: 45, lineHeight: 1.7, maxWidth: 550 }}>
            Modernizing Pakistan's fields with a unified platform for smarter irrigation and crop health tracking.
          </p>
          <button className="btn btn-primary" style={{ padding: "20px 45px", fontSize: 17 }} onClick={() => onNavigate("login")}>
            Launch Dashboard →
          </button>
        </div>
        
        <div className="hero-image-container">
          <div className="hero-img-card">
            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=1000" alt="Modern Farming" />
          </div>
        </div>
      </section>

      <div className="stats-container">
        <div className="stats-bar">
          <div className="stat-item"><h2>{farmCount}+</h2><p>Verified Farms</p></div>
          <div className="stat-item"><h2>{userCount.toLocaleString()}+</h2><p>Farmers</p></div>
          <div className="stat-item"><h2>{efficiency}%</h2><p>Water Saved</p></div>
        </div>
      </div>

      <section className="features-grid">
        {[
          { icon: "🛰️", title: "Satellite Mapping", desc: "Precision field boundaries and terrain analysis using high-res satellite telemetry." },
          { icon: "🧪", title: "Soil Analytics", desc: "Real-time pH, nitrogen, and moisture tracking to optimize fertilizer usage." },
          { icon: "📊", title: "Yield Forecast", desc: "AI-driven algorithms that predict harvest volume weeks in advance." },
          { icon: "🌦️", title: "Hyper-Local Weather", desc: "GPS-targeted weather alerts tailored specifically to your farm's coordinates." },
          { icon: "📦", title: "Inventory Flow", desc: "Seamless tracking of seeds, chemicals, and harvested stock levels." },
          { icon: "💹", title: "Market Insights", desc: "Live commodity prices and demand tracking for the best sale timing." },
        ].map((f, i) => (
          <div key={i} className="f-card">
            <div style={{ fontSize: 40, marginBottom: 20 }}>{f.icon}</div>
            <h3 style={{ color: 'var(--leaf-bright)', marginBottom: 15, fontSize: '20px' }}>{f.title}</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 25 }}>
              <span style={{ fontSize: 28 }}>🌿</span>
              <span style={{ fontSize: 24, fontWeight: 900 }}>AgriManage</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6, fontSize: 14 }}>
              Digitizing the soil of Pakistan. We provide end-to-end software solutions for farm owners.
            </p>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              {["Farm Dashboard", "Worker Portal", "Pricing Plans"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul className="footer-links">
              {["Help Center", "Privacy Policy", "Terms"].map(l => (
                <li key={l}><a href="#">{l}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Stay Connected</h4>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', padding: '6px', borderRadius: '12px', marginTop: '20px' }}>
              <input type="email" placeholder="Email" style={{ background: 'transparent', border: 'none', padding: '10px', color: 'white', flex: 1, outline: 'none' }} />
              <button className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12 }}>Join</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;