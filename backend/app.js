const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
});

app.post("/todos", (req, res) => {
    const { task } = req.body;
    const sql = "INSERT INTO todos (task, completed) VALUES (?, false)";
    db.query(sql, [task], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Task added successfully", id: data.insertId });
        }
    });
});

app.get("/todos", (req, res) => {
    const sql = "SELECT * FROM todos";
    db.query(sql, (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json(data);
        }
    });
});

app.put("/todos/:id", (req, res) => {
    const { id } = req.params;
    const { task } = req.body; 
    const sql = "UPDATE todos SET task = ? WHERE id = ?"; 
    db.query(sql, [task, id], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Task updated successfully" });
        }
    });
});


app.delete("/todos/:id", (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM todos WHERE id = ?";
    db.query(sql, [id], (err, data) => {
        if (err) {
            res.json(err);
        } else {
            res.json({ message: "Task deleted successfully" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
