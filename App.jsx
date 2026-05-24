import React, { useState } from "react";
// 1. Import all the components from your files
import HomePage from "./homepage";
import LoginPage from "./login";
import Dashboard from "./dashboard";
import FarmManagement from "./farmManagement";
import CropManagement from "./cropManagement";
import IrrigationPage from "./irrigation";
import HarvestPage from "./harvest";
import WorkerManagement from "./workerManagement";
import ReportsPage from "./reports";
import Sidebar from "./sidebar";

// 2. Global Styles (Ensure index.css or App.css is imported)
import "./index.css";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("home");
<style>{`
    /* ... your existing styles ... */

    .footer { background: #081c15; padding: 80px 60px 40px; border-top: 1px solid rgba(255,255,255,0.05); }
    .footer-top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr 1.5fr; gap: 40px; margin-bottom: 60px; }
    .footer-brand { display: flex; flexDirection: column; gap: 20px; }
    .footer-logo { display: flex; align-items: center; gap: 10px; }
    .footer-logo-text { font-family: serif; font-size: 24px; font-weight: 700; color: white; }
    .footer-desc { color: rgba(255,255,255,0.5); font-size: 14px; line-height: 1.6; }
    .footer-col-title { color: white; font-weight: 700; margin-bottom: 24px; font-size: 15px; text-transform: uppercase; letter-spacing: 1px; }
    .footer-links { display: flex; flex-direction: column; gap: 12px; }
    .footer-link { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: 0.2s; }
    .footer-link:hover { color: #52b788; transform: translateX(5px); }
    .footer-input-wrap { display: flex; gap: 10px; margin: 20px 0; }
    .footer-input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; color: white; flex: 1; }
    .footer-sub-btn { background: #52b788; color: #081c15; border: none; padding: 12px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 40px; display: flex; justify-content: space-between; font-size: 13px; color: rgba(255,255,255,0.3); }
    .footer-bottom-link { color: rgba(255,255,255,0.3); text-decoration: none; margin-left: 20px; }
    
    /* Responsive adjustment */
    @media (max-width: 1024px) {
      .footer-top { grid-template-columns: repeat(2, 1fr); }
      .home-nav { padding: 20px; }
    }
  `}</style>
  // Logic to determine if we should show the sidebar layout
  const authPages = ["dashboard", "farms", "crops", "irrigation", "harvest", "workers", "reports"];
  const isAuth = authPages.includes(page);

  // 3. Simple routing logic
  if (page === "home") return <HomePage onNavigate={setPage} />;
  if (page === "login") return <LoginPage onNavigate={setPage} />;

  // 4. Map the string state to the actual imported Component
  const PageComponent = {
    dashboard:  Dashboard,
    farms:      FarmManagement,
    crops:      CropManagement,
    irrigation: IrrigationPage,
    harvest:    HarvestPage,
    workers:    WorkerManagement,
    reports:    ReportsPage,
  }[page] || Dashboard;

  return (
    <div className="layout" style={{ display: "flex", minHeight: "100vh" }}>
      {/* The Sidebar will always be visible on auth pages */}
      <Sidebar active={page} onNavigate={setPage} />
      
      <main className="main-content" style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <PageComponent onNavigate={setPage} />
      </main>
    </div>
  );
}