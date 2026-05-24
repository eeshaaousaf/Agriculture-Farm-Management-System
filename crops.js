const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {

    const sql = "SELECT * FROM crops";

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
        crop_name,
        planting_date,
        expected_harvest,
        quantity
    } = req.body;

    const sql = `
        INSERT INTO crops
        (farm_id, crop_name, planting_date, expected_harvest, quantity)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql,
        [
            farm_id,
            crop_name,
            planting_date,
            expected_harvest,
            quantity
        ],
        (err, result) => {

            if(err){
                res.json(err);
            } else {
                res.json({
                    message: "Crop added successfully"
                });
            }

        });

});

module.exports = router;