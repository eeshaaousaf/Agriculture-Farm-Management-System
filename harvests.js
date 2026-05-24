const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const sql = "SELECT * FROM harvests";

    db.query(sql, (err, result) => {

        if(err){
            res.json(err);
        } else {
            res.json(result);
        }

    });

});

router.post("/", (req, res) => {

    const {
        crop_id,
        harvest_date,
        expected_yield,
        status
    } = req.body;

    const sql = `
        INSERT INTO harvests
        (crop_id, harvest_date, expected_yield, status)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql,
        [
            crop_id,
            harvest_date,
            expected_yield,
            status
        ],
        (err, result) => {

            if(err){
                res.json(err);
            } else {
                res.json({
                    message: "Harvest added successfully"
                });
            }

        });

});

module.exports = router;