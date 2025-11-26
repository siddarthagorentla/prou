const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'manager.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database ' + dbPath + ': ' + err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

db.serialize(() => {
  // Create Employees Table
  db.run(`CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL,
    department TEXT,
    avatar TEXT
  )`);

  // Create Tasks Table
  db.run(`CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'Todo',
    assignee_id INTEGER,
    due_date TEXT,
    FOREIGN KEY (assignee_id) REFERENCES employees (id)
  )`);

  // Seed Data if empty
  db.get("SELECT count(*) as count FROM employees", (err, row) => {
    if (row.count === 0) {
      console.log("Seeding initial data...");
      const stmt = db.prepare("INSERT INTO employees (name, email, role, department, avatar) VALUES (?, ?, ?, ?, ?)");
      stmt.run("Alice Johnson", "alice@example.com", "Frontend Developer", "Engineering", "https://i.pravatar.cc/150?u=alice");
      stmt.run("Bob Smith", "bob@example.com", "Backend Developer", "Engineering", "https://i.pravatar.cc/150?u=bob");
      stmt.run("Charlie Brown", "charlie@example.com", "Designer", "Design", "https://i.pravatar.cc/150?u=charlie");
      stmt.finalize();

      const taskStmt = db.prepare("INSERT INTO tasks (title, description, status, assignee_id, due_date) VALUES (?, ?, ?, ?, ?)");
      taskStmt.run("Design Homepage", "Create high-fidelity mockups for the new homepage.", "In Progress", 3, "2023-12-01");
      taskStmt.run("Setup API", "Initialize Node.js server and setup basic routes.", "Done", 2, "2023-11-20");
      taskStmt.run("Implement Login", "Create JWT authentication flow.", "Todo", 2, "2023-12-05");
      taskStmt.run("Frontend Setup", "Initialize React app with Vite.", "Done", 1, "2023-11-21");
      taskStmt.finalize();
    }
  });
});

module.exports = db;
