const express = require("express");
const cors = require("cors");
const app = express();

// 1. Middleware
app.use(cors());
app.use(express.json());

// 2. Import Routes
const farmsRoutes = require("./routes/farms");
const cropsRoutes = require("./routes/crops");
const workersRoutes = require("./routes/workers");
const irrigationRoutes = require("./routes/irrigation");
const harvestsRoutes = require("./routes/harvests");
const dashboardRoutes = require("./routes/dashboard");
const reportsRoutes = require("./routes/reports"); // <--- NEW: Import reports route

// 3. Register Routes
app.use("/api/farms", farmsRoutes);
app.use("/api/crops", cropsRoutes);
app.use("/api/workers", workersRoutes);
app.use("/api/irrigation", irrigationRoutes);
app.use("/api/harvests", harvestsRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportsRoutes); // <--- NEW: Register reports route

// 4. Test Route (To check if server is actually responding)
app.get("/", (req, res) => {
    res.send("AgriManage Backend is running!");
});

// 5. Global Error Handler (Optional but helpful for debugging)
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).send({ error: "Something went wrong on the server!" });
});

// 6. Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📡 API available at http://localhost:${PORT}/api/farms`);
    console.log(`📊 Reports API available at http://localhost:${PORT}/api/reports`); // Optional extra log
});