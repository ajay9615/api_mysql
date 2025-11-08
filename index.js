const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());
app.post('/newTeacher', (request, response) => {
    const { name, email } = request.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Please provide name and email" });
    }

    const sql = "INSERT INTO teachers (name, email) VALUES (?,?)";

    db.query(sql, [name, email], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem" });
        }
        response.status(201).json({ message: "new Teacher Added Successfully" });
    })
});

app.listen(6000, () => {
    console.log("Server is running...");
});