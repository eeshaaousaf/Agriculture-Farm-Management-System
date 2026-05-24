const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all workers
router.get("/", (req, res) => {
    const sql = "SELECT * FROM workers";
    db.query(sql, (err, result) => {
        if(err) return res.status(500).json(err);
        res.json(result);
    });
});

// POST new worker
router.post("/", (req, res) => {
    const { farm_id, worker_name, phone, role, salary, status } = req.body;
    const sql = `INSERT INTO workers (farm_id, worker_name, phone, role, salary, status) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [farm_id, worker_name, phone, role, salary, status || 'Active'], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Worker added successfully" });
    });
});

// PUT (Edit) worker - Uses worker_id
router.put("/:worker_id", (req, res) => {
    const { worker_id } = req.params;
    const { worker_name, phone, role, salary, status } = req.body;

    const sql = `
        UPDATE workers 
        SET worker_name = ?, phone = ?, role = ?, salary = ?, status = ? 
        WHERE worker_id = ?
    `;

    db.query(sql, [worker_name, phone, role, salary, status, worker_id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Worker updated successfully" });
    });
});

// DELETE worker - Uses worker_id
router.delete("/:worker_id", (req, res) => {
    const { worker_id } = req.params;
    const sql = "DELETE FROM workers WHERE worker_id = ?";

    db.query(sql, [worker_id], (err, result) => {
        if(err) return res.status(500).json(err);
        res.json({ message: "Worker deleted successfully" });
    });
});

module.exports = router;