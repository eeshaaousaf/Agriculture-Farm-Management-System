const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ade5n@jk97",
    database: "agriculture_management",
    multipleStatements: true // CRITICAL FOR DASHBOARD
});

connection.connect((err) => {
    if(err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log(" Database connected");
    }
});
// db.js
module.exports = {
  farms: [/* your farm objects */],
  crops: [/* your crop objects */],
  workers: [],
  harvests: []
};
module.exports = connection;