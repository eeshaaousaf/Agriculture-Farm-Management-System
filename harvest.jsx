import React, { useState, useEffect } from "react";
import axios from "axios";

/* ==========================================================================
   2. SUB-COMPONENTS
   ========================================================================== */
const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 30, textAlign: "center" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#22C55E", margin: 0 }}>{title}</h1>
    <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 500, marginTop: 8 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const colors = {
    Completed: { bg: "#dcfce7", text: "#166534" },
    Pending: { bg: "#fef9c3", text: "#854d0e" },
  };
  const style = colors[status] || { bg: "#f1f5f9", text: "#1e293b" };
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
   3. MAIN COMPONENT
   ========================================================================== */
const HarvestPage = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({
    crop_id: "",
    harvest_date: "",
    expected_yield: "",
    status: "Completed"
  });

  const API_URL = "http://localhost:5000/api/harvests";

  const fetchHarvests = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching harvests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHarvests();
  }, []);

  const handleSave = async () => {
    try {
      const response = await axios.post(API_URL, form);
      if (response.data.message) {
        setModal(false);
        fetchHarvests(); 
      }
    } catch (error) {
      console.error("Error saving harvest:", error);
      alert("Error saving record.");
    }
  };

  return (
    <div style={{ padding: "40px", backgroundColor: "#171821", minHeight: "100vh" }}>
      <Topbar title="Harvest Records" subtitle="Track all crop harvests and revenues" />

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 30 }}>
        <div style={{ padding: 25, background: "white", borderRadius: "25px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ color: "#22C55E", fontSize: 32, fontWeight: 800 }}>{records.length}</div>
          <div style={{ fontSize: 15, color: "#64748B", fontWeight: 600, textTransform: "uppercase" }}>Total Records</div>
        </div>
      </div>

      {/* Table Section */}
      <div style={{ background: "white", padding: "35px", borderRadius: "40px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px" }}>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#1E293B" }}>🌽 Recent Harvests</div>
          <button 
            style={{ background: "#2d6a4f", color: "white", border: "none", padding: "16px 32px", borderRadius: "25px", cursor: "pointer", fontWeight: 700, fontSize: "16px" }} 
            onClick={() => setModal(true)}
          >
            ＋ Record Harvest
          </button>
        </div>
        
        {loading ? (
          <p style={{ textAlign: "center", color: "#1e293b", fontSize: "18px" }}>Loading data...</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ textAlign: "left", borderBottom: "2px solid #F1F5F9" }}>
                  {["Crop ID", "Date", "Expected Yield", "Status"].map((h) => (
                    <th key={h} style={{ padding: "20px 15px", color: "#64748b", fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "20px 15px", fontSize: "16px", fontWeight: 700, color: "#1e293b" }}>#{r.crop_id}</td>
                    <td style={{ fontSize: "15px", color: "#475569" }}>{new Date(r.harvest_date).toLocaleDateString()}</td>
                    <td style={{ fontSize: "15px", fontWeight: 700, color: "#2d6a4f" }}>{r.expected_yield}</td>
                    <td style={{ padding: "20px 15px" }}><StatusBadge status={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL - DESIGNED TO MATCH ASSIGN NEW CROP */}
      {modal && (
        <Modal title="Record Harvest" onClose={() => setModal(false)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            
            <div>
              <label style={labelStyle}>Crop ID</label>
              <input 
                type="number" 
                style={inputStyle} 
                placeholder="e.g. 1"
                onChange={(e) => setForm({ ...form, crop_id: e.target.value })} 
              />
            </div>

            <div>
              <label style={labelStyle}>Harvest Date</label>
              <input 
                type="date" 
                style={inputStyle} 
                onChange={(e) => setForm({ ...form, harvest_date: e.target.value })} 
              />
            </div>

            <div>
              <label style={labelStyle}>Expected Yield</label>
              <input 
                placeholder="e.g. 20 tons" 
                style={inputStyle} 
                onChange={(e) => setForm({ ...form, expected_yield: e.target.value })} 
              />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select 
                style={inputStyle} 
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
              <button 
                style={{ flex: 1, padding: "20px", borderRadius: "22px", border: "2px solid #F1F5F9", background: "white", fontWeight: 800, color: "#475569", cursor: "pointer" }}
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button 
                style={{ flex: 1, padding: "20px", borderRadius: "22px", border: "none", background: "#2d6a4f", color: "white", fontWeight: 800, cursor: "pointer", fontSize: "16px" }}
                onClick={handleSave}
              >
                Save Record
              </button>
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
    textAlign: "left"
};

export default HarvestPage;