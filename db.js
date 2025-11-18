const mysql = require('mysql2');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jp_university"

});

db.connect((error) => {
    if (error) {
        console.log("Database connection failed");
    } else {
        console.log("Database connected successfully");
    }
});
module.exports = db;
