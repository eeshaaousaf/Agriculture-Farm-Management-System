import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed: npm install axios
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Cell 
} from "recharts";

/* ==========================================================================
   SUB-COMPONENTS
   ========================================================================== */
const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 16 }}>
    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#15803D", marginBottom: 4 }}>{title}</h1>
    <p style={{ color: "#cbd5e1", fontSize: 14, fontWeight: 500 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const isComp = status === "Completed";
  return (
    <span style={{ 
      padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600,
      background: isComp ? "#dcfce7" : "#dbeafe", color: isComp ? "#166534" : "#1e40af" 
    }}>
      {status || "Scheduled"}
    </span>
  );
};

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
const IrrigationPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ farm_id: "1", irrigation_date: "", water_amount: "", method: "Drip" });

  const API_URL = "http://localhost:5000/api/irrigation"; // Adjust to your server port

  // 1. Fetch data from Backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setRecords(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Save to Backend
  const save = async () => {
    try {
      await axios.post(API_URL, form);
      setModal(false);
      fetchData(); // Refresh list after adding
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save irrigation record.");
    }
  };

  // Chart Logic (Derived from actual records)
  const chartWater = [
    { week: "Week 1", usage: 4500 },
    { week: "Week 2", usage: 5200 },
    { week: "Week 3", usage: 3800 },
    { week: "Current", usage: records.reduce((acc, r) => acc + (parseInt(r.water_amount) || 0), 0) }, 
  ];

  const modalLabelStyle = { display: "block", fontSize: "14px", fontWeight: "800", color: "#1e293b", textAlign: "left", marginBottom: "8px" };
  const modalInputStyle = { width: "100%", padding: "12px", background: "#2d3748", border: "none", borderRadius: "15px", color: "white", fontSize: "14px", outline: "none", boxSizing: "border-box" };

  return (
    <div style={{ padding: "20px", background: "#171821", minHeight: "100vh" }}>
      <Topbar title="Irrigation Management" subtitle="Track water usage and schedule irrigation"/>

      {/* 1. Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        {[
          {icon:"💧", label:"Total Records", value: records.length, color:"#0984e3", bg:"#ebf5ff"},
          {icon:"✅", label:"Status", value: "Live Sync", color:"#2d6a4f", bg:"#d8f3dc"},
        ].map(s=>(
          <div key={s.label} style={{padding:20, background: "white", borderRadius: 16, boxShadow: "0 2px 4px rgba(0,0,0,0.05)"}}>
            <div style={{background:s.bg, color:s.color, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 8, marginBottom: 12}}>{s.icon}</div>
            <div style={{color:s.color, fontSize:26, fontWeight: 800}}>{s.value}</div>
            <div style={{color: "#1e293b", fontSize: 14}}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20, marginBottom: 24 }}>
        {/* 2. Water usage chart */}
        <div style={{ background: "white", padding: 20, borderRadius: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 15, color: "#1e293b" }}>💧 Usage Trend (Liters)</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartWater}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="week" tick={{fontSize:12, fill: "#1e293b"}}/>
              <YAxis tick={{fontSize:12, fill: "#1e293b"}}/>
              <Tooltip/>
              <Bar dataKey="usage" name="Water (L)" radius={[6,6,0,0]}>
                {chartWater.map((e,i)=><Cell key={i} fill={i===3?"#0984e3":"#74b9ff"}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Action Card */}
        <div style={{ background: "white", padding: 20, borderRadius: 16, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "20px" }}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>🚜</div>
            <h3 style={{ color: "#1e293b" }}>Need to irrigate?</h3>
            <p style={{ color: "#64748b", fontSize: "14px" }}>Add a new record to sync with the central database.</p>
            <button style={{marginTop:15, width:"100%", background: "#2d6a4f", color: "white", border: "none", padding: 14, borderRadius: 12, cursor: "pointer", fontWeight: 700}} onClick={()=>setModal(true)}>
              ＋ Add Irrigation Record
            </button>
          </div>
        </div>
      </div>

      {/* 4. Full Table */}
      <div style={{ background: "white", padding: 20, borderRadius: 16 }}>
        <div style={{ fontWeight: 700, marginBottom: 15, color: "#1e293b" }}>📋 Database Records</div>
        <div style={{overflowX:"auto"}}>
          {loading ? <p>Loading...</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #f1f5f9" }}>
                  {["Farm ID","Date","Amount","Method"].map(h=><th key={h} style={{ padding: 12, color: "#64748b", fontSize: "13px" }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map(r=>(
                  <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: 12 }}><strong style={{color: "#1e293b"}}>Farm #{r.farm_id}</strong></td>
                    <td style={{fontSize:13, color: "#1e293b"}}>{new Date(r.irrigation_date).toLocaleDateString()}</td>
                    <td style={{ padding: 12 }}>
                      <strong style={{color:"#0984e3"}}>{r.water_amount} L</strong>
                    </td>
                    <td><span style={{ background: "#f1f5f9", padding: "4px 10px", borderRadius: 8, fontSize: 12, color: "#1e293b" }}>{r.method}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 5. MODAL */}
      {modal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }}>
          <div style={{ background: "white", padding: "25px 30px", borderRadius: "30px", width: "100%", maxWidth: "450px", position: "relative" }}>
            <button onClick={()=>setModal(false)} style={{ position: "absolute", top: "20px", right: "20px", border: "none", background: "#f1f5f9", cursor: "pointer", width: "32px", height: "32px", borderRadius: "50%" }}>✕</button>
            <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#1e293b", marginBottom: "20px" }}>New Irrigation Record</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              <div>
                <label style={modalLabelStyle}>Farm ID</label>
                <input type="number" style={modalInputStyle} value={form.farm_id} onChange={e=>setForm({...form, farm_id: e.target.value})} />
              </div>
              <div>
                <label style={modalLabelStyle}>Date</label>
                <input type="date" style={modalInputStyle} onChange={e=>setForm({...form, irrigation_date: e.target.value})}/>
              </div>
              <div style={{ display: "flex", gap: "15px" }}>
                <div style={{ flex: 1 }}>
                  <label style={modalLabelStyle}>Usage (L)</label>
                  <input type="number" placeholder="1200" style={modalInputStyle} onChange={e=>setForm({...form, water_amount: e.target.value})}/>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={modalLabelStyle}>Method</label>
                  <select style={modalInputStyle} value={form.method} onChange={e=>setForm({...form, method: e.target.value})}>
                    {["Drip","Sprinkler","Flood","Furrow"].map(m=><option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <button style={{ padding: "14px", background: "#2d6a4f", color: "white", border: "none", borderRadius: "15px", fontWeight: "800", cursor: "pointer", marginTop: "10px" }} onClick={save}>
                Save to Database
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IrrigationPage;