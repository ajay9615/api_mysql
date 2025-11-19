const express = require('express');
const app = express();
const db = require('./db');
app.use(express.json());
app.post('/newStudent', (request, response) => {
    const { name, email } = request.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Please provide name and email" });
    }
    const sql = "INSERT INTO students (name, email) VALUES (?,?)";

    db.query(sql, [name, email], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem" });
        }
        response.status(201).json({ message: "new Teacher Added Successfully" });
    })
});
/// All Students
app.get('/students', (request, response) => {
    const sql = "SELECT * FROM  students";
    db.query(sql, (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem", error: error } + error);
        }
        response.status(200).json({
            message: "All Teachers Fetch Successfully",
            teachers: result
        });
    })
});
/// Specific Student By ID
app.get('/student/:id', (request, response) => {
    const studentId = request.params.id;
    const sql = "SELECT * FROM  students WHERE id=?";
    db.query(sql, [studentId], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem", error: error } + error);
        }
        response.status(200).json({
            id: result.insertId,
            message: "Student found successfully Using ID Base",
            student: result
        });
    })
});

/// Specific Student By Name
app.get('/student/name/:name', (request, response) => {
    const studentName = request.params.name;
    const sql = "SELECT * FROM  students WHERE name=?";
    db.query(sql, [studentName], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem", error: error } + error);
        }
        response.status(200).json({
            name: result.name,
            message: "Student found successfully Using Name Base",
            student: result
        });
    })
});

/// Delete  Student By ID
app.delete('/deleteStudent/id/:id', (request, response) => {
    const studentId = request.params.id;
    const sql = "DELETE FROM students WHERE id=?";
    db.query(sql, [studentId], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem", error: error } + error);
        }
        response.status(200).json({
            id: studentId,
            message: "Student Deleted successfully By ID",
            student: result
        });
    })
});

/// Delete  Student By ID
app.delete('/deleteStudent/:name', (request, response) => {
    const studentName = request.params.name;
    const sql = "DELETE FROM students WHERE name=?";
    db.query(sql, [studentName], (error, result) => {
        if (error) {
            response.status(500).json({ message: "Database internal problem", error: error } + error);
        }
        response.status(200).json({
            name: studentName,
            message: "Student Deleted successfully By Name",

        });
    })
});

// Register with Email & Password

app.post('/register-email', (request, response) => {
    const { name, email, address, password } = request.body;
    const sql = "INSERT INTO teachers(name,email,address,password) VALUES (?,?,?,?)";
    db.query(sql, [name, email, address, password], (error, result) => {
        if (error) {
            console.log("Internal problems :" + error);
        }
        else {
            response.status(201).json({
                message: "New Teacher Registered Successfully",
                teacher: result
            });
        }
    })

})
// Login with Email & Password

app.post('/login-email', (request, response) => {
    const { email, password } = request.body;
    const sql = "SELECT * FROM teachers WHERE email=? AND password=?";
    db.query(sql, [email, password], (error, result) => {
        if (error) {
            console.log("Internal problems :" + error);
        }
        else {
            response.status(201).json({
                message: "Login Successfully",
                teacher: result
            });
        }
    })

})
app.listen(3000, () => {
    console.log("Server is running...");
});