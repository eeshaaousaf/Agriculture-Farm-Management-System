import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ResponsiveContainer, LineChart, Line, CartesianGrid, 
  XAxis, YAxis, Tooltip, BarChart, Bar, Cell, 
  AreaChart, Area, Legend, PieChart, Pie 
} from "recharts";

/* ==========================================================================
   CONSTANTS & HELPERS
   ========================================================================== */
const COLORS = ["#2d6a4f", "#e9b44c", "#0984e3", "#8e44ad", "#c0392b"];

const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#15803D" }}>{title}</h1>
    <p style={{ color: "#64748b", fontSize: 14 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const isPremium = status === "Premium";
  return (
    <span style={{
      padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
      background: isPremium ? "#d8f3dc" : "#fef3c7",
      color: isPremium ? "#1b4332" : "#92400e"
    }}>
      {status}
    </span>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    summary: [],
    revenueTrend: [],
    cropHealth: [],
    waterUsage: [],
    cropDistribution: [],
    harvests: [],
    farms: []
  });

  // Fetch data from backend
  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        // Replace this URL with your actual backend endpoint when ready
        const response = await axios.get("http://localhost:5000/api/reports");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#2d6a4f" }}>
        <h2>Loading Analytics...</h2>
      </div>
    );
  }

  return (
    <div>
      <Topbar title="Reports & Analytics" subtitle="Data-driven insights for smarter farming"/>

      {/* Tabs Navigation */}
      <div className="tabs" style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        {["overview","revenue","water","crops"].map(t => (
          <button 
            key={t} 
            onClick={() => setActiveTab(t)}
            style={{
              padding: "10px 16px", borderRadius: 12, border: "1px solid #e2e8f0",
              background: activeTab === t ? "#2d6a4f" : "white",
              color: activeTab === t ? "white" : "#475569",
              cursor: "pointer", fontWeight: 600
            }}
          >
            {t === "overview" ? "📊 Overview" : t === "revenue" ? "💰 Revenue" : t === "water" ? "💧 Water" : "🌱 Crops"}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            {data.summary.map(s => (
              <div key={s.label} style={{ padding: 20, background: "white", border: "1px solid #e2e8f0", borderRadius: 16 }}>
                <div style={{ background: s.bg, color: s.color, marginBottom: 12, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, fontSize: 20 }}>{s.icon}</div>
                <div style={{ color: s.color, fontSize: 26, fontWeight: 700 }}>{s.value}</div>
                <div style={{ color: "#475569", fontSize: 14 }}>{s.label}</div>
                <div style={{ color: "#16a34a", fontSize: 12, marginTop: 4 }}>{s.change}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>📈 Revenue Trend</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data.revenueTrend}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="month" tick={{fontSize:12}}/>
                  <YAxis tick={{fontSize:12}}/>
                  <Tooltip formatter={v => `₨${v}K`}/>
                  <Line type="monotone" dataKey="revenue" stroke="#2d6a4f" strokeWidth={3} dot={{fill: "#2d6a4f", r: 4}}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>🌱 Crop Health Distribution</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data.cropHealth} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis type="number" domain={[0,100]} tick={{fontSize:12}}/>
                  <YAxis dataKey="crop" type="category" tick={{fontSize:12}} width={70}/>
                  <Tooltip/>
                  <Bar dataKey="health" name="Health %" radius={[0,6,6,0]}>
                    {data.cropHealth.map((e,i) => <Cell key={i} fill={e.health >= 85 ? "#2d6a4f" : e.health >= 70 ? "#e9b44c" : "#c0392b"}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Revenue Tab */}
      {activeTab === "revenue" && (
        <div>
          <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>💰 Monthly Revenue vs Expenses</div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.revenueTrend}>
                <defs>
                  <linearGradient id="gR2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2d6a4f" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2d6a4f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="month"/><YAxis/>
                <Tooltip formatter={v => `₨${v}K`}/><Legend/>
                <Area type="monotone" dataKey="revenue" stroke="#2d6a4f" fill="url(#gR2)" name="Revenue" strokeWidth={2.5}/>
                <Area type="monotone" dataKey="expenses" stroke="#e9b44c" fill="rgba(233,180,76,0.15)" name="Expenses" strokeWidth={2.5}/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🌽 Harvest Revenue Breakdown</div>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e2e8f0", color: "#64748b" }}>
                  {["Crop","Farm","Quantity","Quality","Revenue"].map(h => <th key={h} style={{ padding: 10 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {data.harvests.map(r => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #e2e8f0" }}>
                    <td style={{ padding: 10 }}><strong>{r.crop}</strong></td>
                    <td style={{ fontSize: 13, padding: 10 }}>{r.farm}</td>
                    <td style={{ padding: 10 }}>{r.qty}</td>
                    <td style={{ padding: 10 }}><StatusBadge status={r.quality}/></td>
                    <td style={{ padding: 10 }}><strong style={{color:"#2d6a4f"}}>{r.revenue}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Water Tab */}
      {activeTab === "water" && (
        <div>
          <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>💧 Water Usage Over Time</div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.waterUsage}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="week"/><YAxis/>
                <Tooltip/>
                <Bar dataKey="usage" name="Liters" fill="#74b9ff" radius={[8,8,0,0]}>
                  {data.waterUsage.map((e,i) => <Cell key={i} fill={i === data.waterUsage.length - 1 ? "#0984e3" : "#74b9ff"}/>)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
            {data.farms.map((f) => (
              <div key={f.id} style={{padding: 22, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
                <div style={{fontWeight: 700, marginBottom: 4}}>{f.name}</div>
                <div style={{fontSize: 12, color: "#6b8c72", marginBottom: 12}}>Irrigation efficiency this month</div>
                <div style={{ background: "#e2e8f0", height: 8, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{width:`${f.efficiency}%`, background: "#0984e3", height: "100%"}}/>
                </div>
                <div style={{textAlign: "right", fontSize: 12, color: "#0984e3", fontWeight: 700, marginTop: 5}}>{f.efficiency}% efficient</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Crops Tab */}
      {activeTab === "crops" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🥧 Crop Area Distribution</div>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={data.cropDistribution} cx="50%" cy="50%" outerRadius={80} innerRadius={50} dataKey="value" label={({name,percent}) => `${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                  {data.cropDistribution.map((e,i) => <Cell key={i} fill={COLORS[i % COLORS.length]}/>)}
                </Pie>
                <Tooltip/><Legend/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div style={{ padding: 20, background: "white", borderRadius: 16, border: "1px solid #e2e8f0" }}>
            <div style={{ fontWeight: 700, marginBottom: 12 }}>🌱 Crop Health Overview</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {data.cropHealth.map(c => (
                <div key={c.crop}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{fontSize: 14, fontWeight: 600}}>{c.crop}</span>
                    <span style={{fontWeight: 700, color: c.health >= 85 ? "#2d6a4f" : c.health >= 70 ? "#e9b44c" : "#c0392b"}}>{c.health}%</span>
                  </div>
                  <div style={{ background: "#e2e8f0", height: 8, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{width: `${c.health}%`, height: "100%", background: c.health >= 85 ? "#2d6a4f" : c.health >= 70 ? "#e9b44c" : "#c0392b"}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;