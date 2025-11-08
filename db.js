const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "schoolmanagement"
});

db.connect((error) => {
    if (error) {
        console.log("Database connection failed");
    }
    else {
        console.log("database connected successfully");
    }
});
module.exports = db;