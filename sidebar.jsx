import React from "react";

/* ==========================================================================
   1. SIDEBAR STYLES (REFINED WIDTH & SCALING)
   ========================================================================== */
const SidebarStyles = () => (
  <style>{`
    .sidebar {
      width: 280px; /* Narrowed slightly from 320px */
      background: #081c15;
      height: 100vh;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: 0;
      border-right: 1px solid rgba(255,255,255,0.07);
      overflow: hidden; 
    }

    /* Refined Logo Section */
    .sidebar-logo {
      padding: 35px 25px; /* Slightly tighter padding */
      flex-shrink: 0;
    }

    .logo-text {
      font-family: 'serif';
      font-size: 22px; /* Reduced from 26px */
      font-weight: 800;
      color: white;
      letter-spacing: 0.5px;
    }

    .logo-subtext {
      font-size: 13px; /* Slightly smaller */
      color: rgba(255,255,255,0.45);
      margin-top: 2px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 0 14px;
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: rgba(255,255,255,0.1) transparent;
    }

    .nav-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 12px 18px; /* Slightly reduced padding */
      background: transparent;
      border: none;
      border-radius: 10px;
      color: rgba(255,255,255,0.65);
      font-size: 15px; /* Reduced from 16px */
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      margin-bottom: 6px;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.05);
      color: white;
    }

    .nav-item.active {
      background: #2d6a4f;
      color: white;
      box-shadow: 0 4px 12px rgba(45, 106, 79, 0.3);
    }

    .nav-icon {
      font-size: 20px; /* Reduced from 22px */
      width: 24px;
      display: flex;
      justify-content: center;
    }

    /* Refined Footer Section */
    .sidebar-footer {
      padding: 20px 25px; /* Slightly reduced padding */
      border-top: 1px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
      background: #081c15;
    }

    .avatar {
      background: #52b788;
      color: #081c15;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-weight: 700;
    }
  `}</style>
);

const Sidebar = ({ active, onNavigate }) => {
  const navItems = [
    { id: "dashboard",  label: "Dashboard",         icon: "🏡" },
    { id: "farms",      label: "Farm Management",   icon: "🌾" },
    { id: "crops",      label: "Crop Management",   icon: "🌱" },
    { id: "irrigation", label: "Irrigation",        icon: "💧" },
    { id: "harvest",    label: "Harvest Records",   icon: "🌽" },
    { id: "workers",    label: "Worker Management", icon: "👷" },
    { id: "reports",    label: "Reports & Analytics", icon: "📊" },
  ];

  return (
    <div className="sidebar">
      <SidebarStyles />
      
      {/* Refined Logo Section */}
      <div className="sidebar-logo">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>🌿</span> {/* Slightly smaller icon */}
          <div>
            <div className="logo-text">AgriManage</div>
            <div className="logo-subtext">Farm Intelligence</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: ".1em", marginBottom: 12, padding: "0 18px" }}>
          MAIN MENU
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}

        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "20px 0" }} />
        
        <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)", letterSpacing: ".1em", marginBottom: 12, padding: "0 18px" }}>
          ACCOUNT
        </div>
        <button className="nav-item" onClick={() => onNavigate("home")}>
          <span className="nav-icon">🚪</span> Logout
        </button>
      </nav>

      {/* Fixed Profile Section */}
      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div className="avatar" style={{ width: 40, height: 40, fontSize: 14 }}>
            FA
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)" }}>
              Farmer Admin
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              admin@agrimanage.pk
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;