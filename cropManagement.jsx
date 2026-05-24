import React, { useState, useEffect } from "react";
import axios from "axios";

/* ==========================================================================
   SUB-COMPONENTS 
   ========================================================================== */
const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 30, textAlign: "center" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#22C55E", margin: 0 }}>{title}</h1>
    <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 500, marginTop: 8 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    Planted: { bg: "#ebf5ff", text: "#0984e3" },
    Growing: { bg: "#BFF0D4", text: "#065F46" },
    Harvesting: { bg: "#fef3c7", text: "#92400e" },
    Completed: { bg: "#f1f5f9", text: "#475569" },
  };
  const style = colors[status] || colors.Growing;
  return (
    <span style={{ padding: "6px 12px", borderRadius: 50, fontSize: 12, fontWeight: 700, background: style.bg, color: style.text }}>
      {status}
    </span>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div style={{ 
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
    background: "rgba(10, 15, 25, 0.8)", backdropFilter: "blur(4px)", 
    display: "flex", alignItems: "center", justifyContent: "center", 
    zIndex: 9999, padding: "20px" 
  }}>
    <div style={{ 
      background: "white", padding: "40px", borderRadius: "40px", 
      width: "100%", maxWidth: "550px", maxHeight: "90vh", 
      display: "flex", flexDirection: "column",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      position: "relative"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ fontSize: "32px", fontWeight: 800, color: "#1e293b", margin: 0 }}>{title}</h2>
        <button onClick={onClose} style={{ border: "none", background: "#f1f5f9", cursor: "pointer", fontSize: "20px", width: "40px", height: "40px", borderRadius: "50%", color: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ overflowY: "auto", paddingRight: "5px", flex: 1 }}>{children}</div>
    </div>
  </div>
);

/* ==========================================================================
   MAIN COMPONENT
   ========================================================================== */
const CropManagement = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    crop_name: "", 
    farm_id: "", 
    quantity: "", 
    planting_date: "", 
    expected_harvest: ""
  });
  const [activeTab, setActiveTab] = useState("list");

  const API_URL = "http://localhost:5000/api/crops"; 

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      // Ensure the data is an array
      setCrops(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching crops:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  const openAssign = () => { 
    setForm({
        crop_name: "", 
        farm_id: "", 
        quantity: "", 
        planting_date: "", 
        expected_harvest: ""
    }); 
    setModal("assign"); 
  };

  const save = async () => {
    if (!form.crop_name || !form.farm_id) {
        alert("Please fill in the Crop Name and Farm ID");
        return;
    }

    try {
      if (modal === "assign") {
        await axios.post(API_URL, form);
        alert("Crop assigned successfully!");
      } 
      
      setModal(null);
      fetchCrops(); // Force refresh from database
    } catch (error) {
      alert("Error saving crop. Check backend connection.");
      console.error(error);
    }
  };

  // Helper to safely format dates
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#171821", minHeight: "100vh" }}>
      <Topbar title="Crop Management" subtitle="Assign crops, track growth, manage records" />

      {/* TABS & ACTION AREA */}
      <div style={{ background: "white", padding: "15px", borderRadius: "30px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", marginBottom: "30px", display: "flex", gap: "10px", alignItems: "center" }}>
        <div style={{ display: "flex", gap: 10, flex: 1 }}>
          {["list","records"].map(t => (
            <button 
              key={t} 
              onClick={() => setActiveTab(t)}
              style={{ 
                padding: "14px 28px", borderRadius: "22px", cursor: "pointer", border: "none",
                background: activeTab === t ? "#2d6a4f" : "#F1F5F9", 
                color: activeTab === t ? "#fff" : "#1E293B",
                fontWeight: 700, fontSize: "15px", transition: "all 0.2s"
              }}
            >
              {t === "list" ? "📋 Crop List" : "📁 Crop Records"}
            </button>
          ))}
        </div>
        <button onClick={openAssign} style={{ background: "#2d6a4f", color: "white", padding: "16px 32px", borderRadius: "25px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "16px" }}>＋ Assign New Crop</button>
      </div>

      {loading ? (
        <div style={{ color: "white", textAlign: "center", fontSize: "18px", marginTop: "50px" }}>Loading crops...</div>
      ) : (
        <>
          {activeTab === "list" && (
            <div style={{ background: "white", padding: "35px", borderRadius: "40px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ fontWeight: 800, fontSize: "24px", color: "#1E293B", marginBottom: "25px" }}>🌱 Active Crop Monitoring</div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left", borderBottom: "2px solid #F1F5F9" }}>
                      {["ID", "Crop", "Farm ID", "Quantity", "Planted", "Harvest", "Status"].map(h => (
                        <th key={h} style={{ padding: "20px 15px", fontSize: "14px", color: "#64748B", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {crops.map(c => (
                      <tr key={c.id || c.crop_id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                        <td style={{ padding: "20px 15px", color: "#64748B" }}>#{c.id || c.crop_id}</td>
                        <td style={{ padding: "20px 15px" }}><strong style={{ color: "#1E293B", fontSize: "16px" }}>{c.crop_name}</strong></td>
                        <td style={{ fontSize: "15px", color: "#475569" }}>Farm {c.farm_id}</td>
                        <td style={{ fontSize: "15px", color: "#475569" }}>{c.quantity}</td>
                        <td style={{ fontSize: "15px", color: "#475569" }}>{formatDate(c.planting_date)}</td>
                        <td style={{ fontSize: "15px", color: "#475569" }}>{formatDate(c.expected_harvest)}</td>
                        <td><StatusBadge status="Growing"/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "30px" }}>
              {crops.map(c => (
                <div key={c.id || c.crop_id} style={{ padding: "35px", borderRadius: "40px", background: "white", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "25px" }}>
                    <div style={{ width: "65px", height: "65px", borderRadius: "22px", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px" }}>🌱</div>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "22px", color: "#1E293B" }}>{c.crop_name}</div>
                      <div style={{ fontSize: "15px", color: "#475569", fontWeight: 600 }}>Farm Reference: {c.farm_id}</div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                    {[["Qty", c.quantity], ["Planted", formatDate(c.planting_date)], ["Expected Harvest", formatDate(c.expected_harvest)]].map(([k, v]) => (
                      <div key={k} style={{ padding: "18px", borderRadius: "20px", background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                        <div style={{ fontSize: "12px", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>{k}</div>
                        <div style={{ fontSize: "16px", fontWeight: 700, color: "#1E293B", marginTop: "5px" }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* STYLISH ASSIGN MODAL */}
      {modal === "assign" && (
        <Modal title="Assign New Crop" onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            <div>
                <label style={labelStyle}>Crop Name</label>
                <input 
                  style={inputStyle}
                  value={form.crop_name}
                  onChange={e => setForm({...form, crop_name: e.target.value})}
                  placeholder="e.g. Golden Wheat"
                />
            </div>

            <div>
                <label style={labelStyle}>Farm ID</label>
                <input 
                  type="number"
                  style={inputStyle}
                  value={form.farm_id}
                  onChange={e => setForm({...form, farm_id: e.target.value})}
                  placeholder="e.g. 1"
                />
            </div>

            <div>
                <label style={labelStyle}>Quantity</label>
                <input 
                  style={inputStyle}
                  value={form.quantity}
                  onChange={e => setForm({...form, quantity: e.target.value})}
                  placeholder="e.g. 1200 kg"
                />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div>
                    <label style={labelStyle}>Planting Date</label>
                    <input 
                      type="date"
                      style={inputStyle}
                      value={form.planting_date}
                      onChange={e => setForm({...form, planting_date: e.target.value})}
                    />
                </div>
                <div>
                    <label style={labelStyle}>Expected Harvest</label>
                    <input 
                      type="date"
                      style={inputStyle}
                      value={form.expected_harvest}
                      onChange={e => setForm({...form, expected_harvest: e.target.value})}
                    />
                </div>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: "20px", borderRadius: "22px", border: "2px solid #F1F5F9", background: "white", fontWeight: 800, color: "#475569", cursor: "pointer" }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: "20px", borderRadius: "22px", background: "#2D6A4F", color: "white", border: "none", fontWeight: 800, cursor: "pointer", fontSize: "16px" }}>Assign Crop</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const labelStyle = {
    display: "block",
    textAlign: "center",
    color: "#334155",
    fontWeight: "800",
    fontSize: "16px",
    marginBottom: "12px",
    textTransform: "capitalize"
};

const inputStyle = {
    width: "100%", 
    padding: "18px", 
    borderRadius: "18px", 
    border: "2px solid #f1f5f9", 
    background: "#334155", 
    color: "#ffffff", 
    fontWeight: "600", 
    fontSize: "16px", 
    outline: "none", 
    boxSizing: "border-box",
    textAlign: "left",
    transition: "border-color 0.2s"
};

export default CropManagement;