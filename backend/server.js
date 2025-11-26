const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// --- Employees API ---

// Get all employees
app.get('/api/employees', (req, res) => {
    const sql = "SELECT * FROM employees";
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create new employee
app.post('/api/employees', (req, res) => {
    const { name, email, role, department, avatar } = req.body;
    const sql = "INSERT INTO employees (name, email, role, department, avatar) VALUES (?,?,?,?,?)";
    const params = [name, email, role, department, avatar];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, ...req.body }
        });
    });
});

// Update employee
app.put('/api/employees/:id', (req, res) => {
    const { name, email, role, department, avatar } = req.body;
    const sql = `UPDATE employees SET 
               name = COALESCE(?, name), 
               email = COALESCE(?, email), 
               role = COALESCE(?, role), 
               department = COALESCE(?, department), 
               avatar = COALESCE(?, avatar) 
               WHERE id = ?`;
    const params = [name, email, role, department, avatar, req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "changes": this.changes
        });
    });
});

// Delete employee
app.delete('/api/employees/:id', (req, res) => {
    const sql = 'DELETE FROM employees WHERE id = ?';
    db.run(sql, req.params.id, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// --- Tasks API ---

// Get all tasks
app.get('/api/tasks', (req, res) => {
    const sql = `SELECT tasks.*, employees.name as assignee_name, employees.avatar as assignee_avatar 
               FROM tasks 
               LEFT JOIN employees ON tasks.assignee_id = employees.id`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        });
    });
});

// Create new task
app.post('/api/tasks', (req, res) => {
    const { title, description, status, assignee_id, due_date } = req.body;
    const sql = "INSERT INTO tasks (title, description, status, assignee_id, due_date) VALUES (?,?,?,?,?)";
    const params = [title, description, status || 'Todo', assignee_id, due_date];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": { id: this.lastID, ...req.body }
        });
    });
});

// Update task
app.put('/api/tasks/:id', (req, res) => {
    const { title, description, status, assignee_id, due_date } = req.body;
    const sql = `UPDATE tasks SET 
               title = COALESCE(?, title), 
               description = COALESCE(?, description), 
               status = COALESCE(?, status), 
               assignee_id = COALESCE(?, assignee_id), 
               due_date = COALESCE(?, due_date) 
               WHERE id = ?`;
    const params = [title, description, status, assignee_id, due_date, req.params.id];
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "changes": this.changes
        });
    });
});

// Delete task
app.delete('/api/tasks/:id', (req, res) => {
    const sql = 'DELETE FROM tasks WHERE id = ?';
    db.run(sql, req.params.id, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({ "message": "deleted", changes: this.changes });
    });
});

// --- Dashboard Stats ---
app.get('/api/dashboard', (req, res) => {
    const stats = {};

    const p1 = new Promise((resolve, reject) => {
        db.get("SELECT count(*) as count FROM employees", (err, row) => {
            if (err) reject(err);
            else resolve(row.count);
        });
    });

    const p2 = new Promise((resolve, reject) => {
        db.get("SELECT count(*) as count FROM tasks", (err, row) => {
            if (err) reject(err);
            else resolve(row.count);
        });
    });

    const p3 = new Promise((resolve, reject) => {
        db.all("SELECT status, count(*) as count FROM tasks GROUP BY status", (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });

    Promise.all([p1, p2, p3]).then(values => {
        res.json({
            message: "success",
            data: {
                total_employees: values[0],
                total_tasks: values[1],
                task_distribution: values[2]
            }
        });
    }).catch(err => {
        res.status(400).json({ "error": err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
