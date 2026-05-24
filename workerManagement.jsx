import React, { useState, useEffect } from "react";
import axios from "axios";

/* ==========================================================================
   1. HELPERS & SUB-COMPONENTS
   ========================================================================== */
const Topbar = ({ title, subtitle }) => (
  <div style={{ marginBottom: 30, textAlign: "center" }}>
    <h1 style={{ fontSize: 36, fontWeight: 800, color: "#52b788", margin: 0 }}>{title}</h1>
    <p style={{ color: "#FFFFFF", fontSize: "16px", fontWeight: 500, marginTop: 8 }}>{subtitle}</p>
  </div>
);

const StatusBadge = ({ status }) => {
  const isActive = status === "Active";
  const color = isActive ? "#2d6a4f" : "#854d0e"; 
  const bg = isActive ? "#d8f3dc" : "#fef3c7";    
  return (
    <span style={{ padding: "6px 12px", borderRadius: 50, fontSize: 11, fontWeight: 700, background: bg, color }}>
      {status || "Active"}
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
   2. MAIN COMPONENT
   ========================================================================== */
const WorkerManagement = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); 
  
  const [form, setForm] = useState({ 
    worker_id: null, // Updated key name
    worker_name: "", 
    role: "", 
    farm_id: 1, 
    phone: "", 
    salary: 25000, 
    status: "Active" 
  });

  const API_URL = "http://localhost:5000/api/workers";

  const fetchWorkers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setWorkers(res.data);
    } catch (err) {
      console.error("Error fetching workers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkers();
  }, []);

  const openAdd = () => {
    setForm({ worker_id: null, worker_name: "", role: "", farm_id: 1, phone: "", salary: 25000, status: "Active" });
    setModal("add");
  };

  const openEdit = (worker) => {
    setForm(worker);
    setModal("edit");
  };

  const deleteWorker = async (worker_id) => {
    if (window.confirm("Are you sure you want to delete this worker?")) {
      try {
        await axios.delete(`${API_URL}/${worker_id}`);
        fetchWorkers();
      } catch (err) {
        console.error("Error deleting worker:", err);
      }
    }
  };

  const save = async () => {
    try {
      if (modal === "add") {
        await axios.post(API_URL, form);
      } else if (modal === "edit") {
        // MUST use worker_id here
        await axios.put(`${API_URL}/${form.worker_id}`, form);
      }
      setModal(null);
      fetchWorkers();
    } catch (err) {
      console.error("Error saving worker:", err);
    }
  };

  return (
    <div style={{ padding: "40px", background: "#171821", minHeight: "100vh" }}>
      <Topbar title="Worker Management" subtitle="Manage your agricultural workforce" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 30 }}>
        <div style={{ padding: 25, background: "white", borderRadius: "25px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
          <div style={{ color: "#2d6a4f", fontSize: 32, fontWeight: 800 }}>{workers.length}</div>
          <div style={{ fontSize: 15, color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>Total Workers</div>
        </div>
      </div>

      <div style={{ background: "white", padding: "35px", borderRadius: "40px", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 25, alignItems: "center" }}>
          <div style={{ fontSize: "24px", fontWeight: 800, color: "#1b4332" }}>👷 Active Workforce</div>
          <button 
            style={{ padding: "16px 32px", background: "#2d6a4f", color: "white", border: "none", borderRadius: "25px", cursor: "pointer", fontWeight: 700, fontSize: "16px" }} 
            onClick={openAdd}
          >
            ＋ Add Worker
          </button>
        </div>

        {loading ? <p style={{ textAlign: "center", fontSize: "18px" }}>Loading workers...</p> : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 25 }}>
            {workers.map((w) => (
              <div key={w.worker_id} style={{ padding: 25, border: "2px solid #f1f5f9", borderRadius: "25px", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 15, marginBottom: 18 }}>
                  <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#52b788", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "18px" }}>
                    {w.worker_name ? w.worker_name[0] : "W"}
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "17px", color: "#1b4332" }}>{w.worker_name}</div>
                    <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 700 }}>{w.role}</div>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <StatusBadge status={w.status} />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 15 }}>
                  <div style={{ padding: "12px", borderRadius: 12, background: "#f8faf9" }}>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 800, letterSpacing: "0.5px" }}>PHONE</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{w.phone}</div>
                  </div>
                  <div style={{ padding: "12px", borderRadius: 12, background: "#f8faf9" }}>
                    <div style={{ fontSize: 10, color: "#64748b", fontWeight: 800, letterSpacing: "0.5px" }}>SALARY</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>₨{w.salary}</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button onClick={() => openEdit(w)} style={{ border: "none", background: "#f1f5f9", color: "#1e293b", padding: "8px 15px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Edit</button>
                  <button onClick={() => deleteWorker(w.worker_id)} style={{ border: "none", background: "#fee2e2", color: "#991b1b", padding: "8px 15px", borderRadius: "10px", fontWeight: "700", cursor: "pointer" }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {modal && (
        <Modal title={modal === "add" ? "New Worker" : "Edit Worker"} onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
            <div>
              <label style={labelStyle}>Worker Name</label>
              <input style={inputStyle} value={form.worker_name} onChange={e => setForm({...form, worker_name: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Phone Number</label>
              <input style={inputStyle} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Role</label>
              <input style={inputStyle} value={form.role} onChange={e => setForm({...form, role: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Monthly Salary</label>
              <input type="number" style={inputStyle} value={form.salary} onChange={e => setForm({...form, salary: e.target.value})} />
            </div>
            <div>
              <label style={labelStyle}>Worker Status</label>
              <select style={inputStyle} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
                <option value="Active" style={{background: "#334155"}}>Active</option>
                <option value="On Leave" style={{background: "#334155"}}>On Leave</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, padding: "20px", borderRadius: "22px", border: "2px solid #F1F5F9", background: "white", fontWeight: 800, color: "#475569", cursor: "pointer" }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, padding: "20px", borderRadius: "22px", background: "#2d6a4f", color: "white", border: "none", fontWeight: 800, cursor: "pointer", fontSize: "16px" }}>
                {modal === "add" ? "Save Worker" : "Update Worker"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

const labelStyle = { display: "block", textAlign: "center", color: "#334155", fontWeight: "800", fontSize: "16px", marginBottom: "12px" };
const inputStyle = { width: "100%", padding: "18px", borderRadius: "18px", border: "2px solid #f1f5f9", background: "#334155", color: "#ffffff", fontWeight: "600", fontSize: "16px", outline: "none", boxSizing: "border-box" };

export default WorkerManagement;