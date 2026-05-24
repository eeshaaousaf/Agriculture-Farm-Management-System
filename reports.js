const express = require('express');
const router = express.Router();
const db = require('../db'); // Uses your existing DB connection

router.get('/', (req, res) => {
    // 1. Query for Total Farms
    const farmCountSql = "SELECT COUNT(*) AS total FROM farms";
    // 2. Query for Total Crops
    const cropCountSql = "SELECT COUNT(*) AS total FROM crops";

    db.query(farmCountSql, (err, farmResults) => {
        if (err) return res.status(500).json(err);

        db.query(cropCountSql, (err, cropResults) => {
            if (err) return res.status(500).json(err);

            const totalFarms = farmResults[0].total;
            const totalCrops = cropResults[0].total;

            // Now we build the response using the real numbers from DB
            const reportData = {
                summary: [
                    { 
                        icon: "🌾", 
                        label: "Total Farms", 
                        value: totalFarms.toString(), // REAL DATABASE COUNT
                        change: "Live from DB", 
                        color: "#2d6a4f", 
                        bg: "#d8f3dc" 
                    },
                    { 
                        icon: "🌱", 
                        label: "Active Crops", 
                        value: totalCrops.toString(), // REAL DATABASE COUNT
                        change: "Live from DB", 
                        color: "#0984e3", 
                        bg: "#ebf5ff" 
                    },
                    { icon: "💧", label: "Water Saved", value: "12%", change: "vs last mo", color: "#8e44ad", bg: "#f0e6ff" },
                    { icon: "💰", label: "Revenue", value: "₨2.1M", change: "↑ 18%", color: "#c0392b", bg: "#fdf2f2" }
                ],
                revenueTrend: [
                    { month: "Jan", revenue: 400, expenses: 240 },
                    { month: "Feb", revenue: 500, expenses: 300 },
                    { month: "Mar", revenue: 600, expenses: 350 },
                    { month: "Apr", revenue: 550, expenses: 400 },
                    { month: "May", revenue: 700, expenses: 450 }
                ],
                cropHealth: [
                    { crop: "Wheat", health: 92 },
                    { crop: "Maize", health: 78 },
                    { crop: "Barley", health: 64 }
                ],
                waterUsage: [
                    { week: "Wk 1", usage: 12000 },
                    { week: "Wk 2", usage: 15000 },
                    { week: "Wk 3", usage: 11000 },
                    { week: "Wk 4", usage: 9500 }
                ],
                cropDistribution: [
                    { name: "Wheat", value: 40 },
                    { name: "Maize", value: 35 },
                    { name: "Barley", value: 25 }
                ],
                harvests: [
                    { id: 1, crop: "Wheat A", farm: "North Valley", qty: "4.2 Tons", quality: "Premium", revenue: "₨850K" },
                    { id: 2, crop: "Maize B", farm: "Greenhill", qty: "3.8 Tons", quality: "Good", revenue: "₨620K" }
                ],
                farms: [
                    { id: 1, name: "North Valley Field", efficiency: 72 },
                    { id: 2, name: "Greenhill Orchard", efficiency: 85 }
                ]
            };

            res.json(reportData);
        });
    });
});

module.exports = router;