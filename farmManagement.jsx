import React, { useState, useEffect } from "react";
import axios from "axios";

const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 30, textAlign: "center" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#22C55E", margin: 0 }}>{title}</h1>
    <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 500, marginTop: 8 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    Active: { bg: "#BFF0D4", color: "#065F46" }, 
    Dormant: { bg: "#FEF3C7", color: "#92400E" },
    Inactive: { bg: "#F1F5F9", color: "#475569" }
  };
  const s = styles[status] || styles.Active;
  return (
    <span style={{ padding: "8px 16px", borderRadius: 50, fontSize: 13, fontWeight: 800, background: s.bg, color: s.color }}>
      {status}
    </span>
  );
};

const Modal = ({ title, children, onClose }) => (
  <div style={{ 
    position: "fixed", top: 0, left: 0, right: 0, bottom: 0, 
    background: "rgba(10, 15, 25, 0.9)", backdropFilter: "blur(8px)", 
    display: "flex", alignItems: "center", justifyContent: "center", 
    zIndex: 9999, padding: "20px" 
  }}>
    <div style={{ 
      background: "white", padding: "32px", borderRadius: "32px", 
      width: "100%", maxWidth: "500px", maxHeight: "90vh", 
      display: "flex", flexDirection: "column",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      position: "relative"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: 800, color: "#1E293B", margin: 0 }}>{title}</h2>
        <button onClick={onClose} style={{ border: "none", background: "#F1F5F9", cursor: "pointer", fontSize: "18px", width: "36px", height: "36px", borderRadius: "50%", color: "#1E293B", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
      </div>
      <div style={{ overflowY: "auto", paddingRight: "8px", flex: 1 }}>{children}</div>
    </div>
  </div>
);

const FarmManagement = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ farm_id: null, farm_name: "", location: "", size_acres: "" });
  const [search, setSearch] = useState("");

  const API_URL = "http://localhost:5000/api/farms"; 

  const fetchFarms = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setFarms(res.data);
    } catch (err) {
      console.error("Error fetching farms:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarms();
  }, []);

  const openAdd = () => { 
    setForm({ farm_id: null, farm_name: "", location: "", size_acres: "" }); 
    setModal("add"); 
  };

  const openEdit = (farm) => {
    setForm({ ...farm }); 
    setModal("edit");
  };

  const save = async () => {
    try {
      if (modal === "add") {
        await axios.post(API_URL, form);
      } else if (modal === "edit") {
        // Correctly using farm_id to match SQL
        await axios.put(`${API_URL}/${form.farm_id}`, form);
      }
      setModal(null);
      fetchFarms(); 
    } catch (err) {
      console.error("Error saving farm:", err);
      alert("Failed to save farm.");
    }
  };

  const removeFarm = async (farm_id) => {
    if (window.confirm("Are you sure you want to delete this farm?")) {
      try {
        await axios.delete(`${API_URL}/${farm_id}`);
        fetchFarms();
      } catch (err) {
        console.error("Error deleting farm:", err);
        alert("Failed to delete farm.");
      }
    }
  };

  const filtered = farms.filter(f =>
    (f.farm_name || "").toLowerCase().includes(search.toLowerCase()) ||
    (f.location || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "40px", backgroundColor: "#171821", minHeight: "100vh" }}>
      <Topbar title="Farm Management" subtitle="Manage all your estates and field records" />

      <div style={{ background: "white", padding: "12px", borderRadius: "28px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)", marginBottom: "30px", display: "flex", gap: "10px" }}>
        <div style={{ position: "relative", flex: 1 }}>
          <input 
            style={{ 
              width: "100%", padding: "16px 20px", borderRadius: "22px", border: "none", 
              background: "#334155", color: "#FFFFFF", 
              fontWeight: 600, fontSize: "15px", outline: "none", boxSizing: "border-box"
            }}
            placeholder="🔍 Search by estate name or location..." 
            value={search} 
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button onClick={openAdd} style={{ background: "#2D6A4F", color: "white", padding: "14px 28px", borderRadius: "22px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "15px" }}>＋ Add New Farm</button>
      </div>

      {loading ? (
        <div style={{ color: "white", textAlign: "center" }}>Fetching your estates...</div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "25px" }}>
          {filtered.map(f => (
            <div key={f.farm_id} style={{ padding: "28px", borderRadius: "32px", border: "1px solid #334155", background: "white", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "20px" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "20px", background: "#F1F5F9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>🌾</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "20px", color: "#1E293B" }}>{f.farm_name}</div>
                  <div style={{ fontSize: "14px", color: "#475569", fontWeight: 600 }}>📍 {f.location}</div>
                </div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "25px" }}>
                <div style={{ padding: "14px", borderRadius: "16px", background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Area</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B", marginTop: "2px" }}>{f.size_acres} Acres</div>
                </div>
                <div style={{ padding: "14px", borderRadius: "16px", background: "#F8FAFC", border: "1px solid #F1F5F9" }}>
                  <div style={{ fontSize: "11px", color: "#64748B", fontWeight: 800, textTransform: "uppercase" }}>Farm ID</div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#1E293B", marginTop: "2px" }}>
                    #{f.farm_id}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <StatusBadge status="Active"/>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button onClick={() => openEdit(f)} style={{ background: "#E0F2FE", color: "#0369A1", border: "none", padding: "10px 20px", borderRadius: "14px", cursor: "pointer", fontWeight: 800 }}>✏️ Edit</button>
                  <button onClick={() => removeFarm(f.farm_id)} style={{ background: "#FEE2E2", color: "#EF4444", border: "none", width: "44px", height: "44px", borderRadius: "14px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(modal === "add" || modal === "edit") && (
        <Modal title={modal === "add" ? "Register New Farm" : "Update Farm Record"} onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={labelStyle}>Farm Name</label>
              <input style={inputStyle} value={form.farm_name} onChange={e => setForm({ ...form, farm_name: e.target.value })} placeholder="e.g. Golden Fields" />
            </div>
            <div>
              <label style={labelStyle}>Location</label>
              <input style={inputStyle} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. North Sector" />
            </div>
            <div>
              <label style={labelStyle}>Size (Acres)</label>
              <input type="number" style={inputStyle} value={form.size_acres} onChange={e => setForm({ ...form, size_acres: e.target.value })} placeholder="e.g. 50" />
            </div>
            
            <div style={{ display: "flex", gap: "12px", marginTop: "10px" }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: "16px", borderRadius: "18px", border: "2px solid #E2E8F0", background: "white", color: "#1E293B", fontWeight: 800 }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: "16px", borderRadius: "18px", background: "#2D6A4F", color: "white", border: "none", fontWeight: 800 }}>
                {modal === "add" ? "Add Farm" : "Save Changes"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const labelStyle = { fontSize: "15px", fontWeight: 800, display: "block", marginBottom: "8px", color: "#1E293B" };
const inputStyle = { width: "100%", padding: "16px", borderRadius: "16px", border: "none", background: "#334155", color: "#FFFFFF", fontWeight: "600", fontSize: "15px", outline: "none", boxSizing: "border-box" };

export default FarmManagement;