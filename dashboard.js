const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
    // 3 Queries: Count farms, workers, and crops
    const qFarms = "SELECT COUNT(*) as total FROM farms";
    const qWorkers = "SELECT COUNT(*) as total FROM workers";
    const qCrops = "SELECT COUNT(*) as total FROM crops";

    // Running multiple queries at once (requires multipleStatements: true in db.js)
    db.query(`${qFarms}; ${qWorkers}; ${qCrops}`, (err, results) => {
        if (err) {
            console.error("Dashboard DB Error:", err);
            return res.status(500).json({ error: "Database query failed" });
        }

        // results is an array of arrays
        const farmCount = results[0][0].total;
        const workerCount = results[1][0].total;
        const cropCount = results[2][0].total;

        res.json({
            stats: [
                { icon: "🌾", label: "Total Farms", value: farmCount, change: "Registered", up: true, color: "#2d6a4f", bg: "#d8f3dc" },
                { icon: "🌱", label: "Active Crops", value: cropCount, change: "In Field", up: true, color: "#0984e3", bg: "#ebf5ff" },
                { icon: "👷", label: "Active Workers", value: workerCount, change: "On Staff", up: true, color: "#16a085", bg: "#e8f8f5" },
                { icon: "📊", label: "Revenue (May)", value: "₨2.1M", change: "+18%", up: true, color: "#c0392b", bg: "#fdf2f2" }
            ],
            chartRevenue: [
                { month: "Jan", revenue: 400 }, { month: "Feb", revenue: 500 },
                { month: "Mar", revenue: 600 }, { month: "Apr", revenue: 550 },
                { month: "May", revenue: 700 }
            ],
            chartCrops: [
                { name: "Wheat", value: 40 }, { name: "Maize", value: 35 }, { name: "Rice", value: 25 }
            ],
            chartHealth: [
                { crop: "Wheat", health: 92 }, { crop: "Maize", health: 78 }, { crop: "Rice", health: 64 }
            ],
            upcoming: [
                { icon: "💧", event: "Irrigation — Golden Fields", date: "Today", time: "4:00 PM", dateColor: "#2d6a4f" }
            ]
        });
    });
});

module.exports = router;