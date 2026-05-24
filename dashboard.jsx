import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, PieChart, Pie, Cell 
} from "recharts";

const COLORS = ["#2d6a4f", "#e9b44c", "#0984e3"];

const Topbar = ({ title, subtitle }) => (
  <div style={{ marginTop: 10, marginBottom: 15, textAlign: 'center' }}>
    <h1 style={{ fontSize: 32, fontWeight: 800, color: "#2d6a4f", margin: 0 }}>{title}</h1>
    <p style={{ color: "#94a3b8", fontSize: 14, marginTop: 4 }}>{subtitle}</p>
  </div>
);

const Dashboard = ({ onNavigate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        setData(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const quickActions = [
    { icon:"🌾", label:"Add Farm",      page:"farms"      },
    { icon:"🌱", label:"Assign Crop",   page:"crops"      },
    { icon:"💧", label:"Log Water",     page:"irrigation" },
    { icon:"🌽", label:"Record Harvest",page:"harvest"    },
    { icon:"👷", label:"Add Worker",    page:"workers"    },
    { icon:"📊", label:"View Report",   page:"reports"    },
  ];

  if (loading) return <div style={{ color: "#2d6a4f", textAlign: "center", padding: "50px", fontWeight: "bold" }}>Loading Dashboard...</div>;
  if (!data) return <div style={{ color: "red", textAlign: "center" }}>Error loading data. Check backend connection.</div>;

  return (
    <div style={{ padding: '15px 20px 20px 20px' }}>
      <Topbar title="Dashboard" subtitle={`Good morning! Today is ${new Date().toDateString()}`} />

      {/* Quick Actions */}
      <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))", gap:10, marginBottom:20}}>
        {quickActions.map(a=>(
          <div key={a.label} onClick={()=>onNavigate(a.page)} style={{ cursor: 'pointer', padding: 15, background: 'white', borderRadius: 10, textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{a.icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{a.label}</div>
          </div>
        ))}
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 20 }}>
        {data.stats.map(s=>(
          <div key={s.label} style={{ padding: 18, background: 'white', borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <div style={{background:s.bg, color:s.color, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, marginBottom: 10, fontSize: 20}}>
              {s.icon}
            </div>
            <div style={{color: s.color, fontSize: 30, fontWeight: 800}}>{s.value}</div>
            <div style={{ color: '#1a1a1a', fontSize: 14, fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 12, color: s.up ? '#2d6a4f' : '#c0392b', marginTop: 6 }}>
              {s.up?"↑":"↓"} {s.change}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14, marginBottom: 20 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 15, color: '#1a1a1a', textAlign: 'center' }}>📈 Monthly Revenue</div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data.chartRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{fontSize:11, fill: '#1a1a1a', fontWeight: 600}} />
              <YAxis tick={{fontSize:11, fill: '#1a1a1a', fontWeight: 600}} />
              <Tooltip labelStyle={{fontSize: 12}} itemStyle={{fontSize: 12}} />
              <Area type="monotone" dataKey="revenue" stroke="#2d6a4f" fill="#d8f3dc" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: 'white', padding: 20, borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 15, color: '#1a1a1a', textAlign: 'center' }}>🥧 Crop Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data.chartCrops} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} fontSize={11} fontWeight={600}>
                {data.chartCrops.map((e,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 14 }}>
        <div style={{ background: 'white', padding: 20, borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 20, color: '#1a1a1a', textAlign: 'center' }}>📅 Upcoming Events</div>
          {data.upcoming.map((ev,i)=>(
            <div key={i} style={{ display: 'flex', alignItems: 'center', paddingBottom: 12, marginBottom: 12, borderBottom: i !== data.upcoming.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
              <div style={{ width: 40, fontSize: 24, display: 'flex', justifyContent: 'center' }}>{ev.icon}</div>
              <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a' }}>{ev.event}</div>
                <div style={{ fontSize: 13, color: ev.dateColor, fontWeight: 600 }}>{ev.date} | {ev.time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', padding: 20, borderRadius: 14, boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 18, color: '#1a1a1a', textAlign: 'center' }}>🌱 Crop Health Status</div>
          {data.chartHealth.map(c=>(
            <div key={c.crop} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, marginBottom: 4, color: '#1a1a1a' }}>
                <span>{c.crop}</span>
                <span>{c.health}%</span>
              </div>
              <div style={{ width: '100%', height: 8, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${c.health}%`, height: '100%', background: c.health > 80 ? '#2d6a4f' : '#e9b44c' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;