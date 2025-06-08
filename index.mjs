import express from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
const db = new sqlite3.Database('./db/learning_platform.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create tables (run once on first setup)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      instructor TEXT NOT NULL,
      duration TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS instructors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      bio TEXT NOT NULL,
      subjects TEXT NOT NULL,
      contact TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      type TEXT NOT NULL,
      instructor TEXT NOT NULL,
      description TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

// Sample data (insert only if tables are empty)
db.get('SELECT COUNT(*) as count FROM courses', (err, row) => {
  if (row.count === 0) {
    db.run(`
      INSERT INTO courses (name, instructor, duration)
      VALUES
        ('Web Development 101', 'John Doe', '8 weeks'),
        ('Data Science Basics', 'Jane Smith', '10 weeks')
    `);
    db.run(`
      INSERT INTO instructors (name, bio, subjects, contact)
      VALUES
        ('John Doe', 'Experienced web developer with 10 years in industry.', 'Web Development, JavaScript', 'john.doe@email.com'),
        ('Jane Smith', 'Data scientist with a PhD in AI.', 'Data Science, Python', 'jane.smith@email.com')
    `);
    db.run(`
      INSERT INTO events (title, date, type, instructor, description, status)
      VALUES
        ('Live Q&A: Web Technologies', '2025-06-09 18:00', 'Q&A', 'John Doe', 'Ask questions about web development.', 'Upcoming'),
        ('Guest Lecture: AI Trends', '2025-06-15 14:00', 'Lecture', 'Jane Smith', 'Explore the latest in AI.', 'Upcoming')
    `);
  }
});

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Online Learning Platform' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});