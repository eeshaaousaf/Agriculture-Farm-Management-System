const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all farms
router.get("/", (req, res) => {
    db.query("SELECT * FROM farms", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// POST new farm
router.post("/", (req, res) => {
    const { farm_name, location, size_acres } = req.body;
    const sql = "INSERT INTO farms (farm_name, location, size_acres) VALUES (?, ?, ?)";
    db.query(sql, [farm_name, location, size_acres], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Farm added", farm_id: result.insertId });
    });
});

// UPDATE farm - Fixed to use farm_id
router.put("/:farm_id", (req, res) => {
    const { farm_name, location, size_acres } = req.body;
    const { farm_id } = req.params;
    const sql = "UPDATE farms SET farm_name = ?, location = ?, size_acres = ? WHERE farm_id = ?";
    db.query(sql, [farm_name, location, size_acres, farm_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Farm updated" });
    });
});

// DELETE farm - Fixed to use farm_id
router.delete("/:farm_id", (req, res) => {
    const { farm_id } = req.params;
    db.query("DELETE FROM farms WHERE farm_id = ?", [farm_id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Farm deleted" });
    });
});

module.exports = router;