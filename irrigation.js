const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const sql = "SELECT * FROM irrigation";

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
        farm_id,
        irrigation_date,
        water_amount,
        method
    } = req.body;

    const sql = `
        INSERT INTO irrigation
        (farm_id, irrigation_date, water_amount, method)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql,
        [
            farm_id,
            irrigation_date,
            water_amount,
            method
        ],
        (err, result) => {

            if(err){
                res.json(err);
            } else {
                res.json({
                    message: "Irrigation added successfully"
                });
            }

        });

});

module.exports = router;