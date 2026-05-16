import express from 'express';
import sqlite3 from 'sqlite3';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, 'estate.db');
const schemaFile = path.join(__dirname, 'database.sql');

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());

const db = await initializeDatabase();

async function initializeDatabase() {
  const dbExists = await fileExists(dbFile);
  const database = await openDatabase(dbFile);
  const schema = await fs.readFile(schemaFile, 'utf8');
  await execAsync(database, schema);

  if (!dbExists) {
    console.log('Created new database at', dbFile);
  }

  return database;
}

function fileExists(filePath) {
  return fs.access(filePath).then(() => true).catch(() => false);
}

function openDatabase(filePath) {
  return new Promise((resolve, reject) => {
    const database = new sqlite3.Database(filePath, (err) => {
      if (err) return reject(err);
      resolve(database);
    });
  });
}

function execAsync(database, sql) {
  return new Promise((resolve, reject) => {
    database.exec(sql, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

function runAsync(database, sql, params = []) {
  return new Promise((resolve, reject) => {
    database.run(sql, params, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getAsync(database, sql, params = []) {
  return new Promise((resolve, reject) => {
    database.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allAsync(database, sql, params = []) {
  return new Promise((resolve, reject) => {
    database.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await allAsync(db, 'SELECT * FROM properties');
    res.json({ properties });
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    res.status(500).json({ message: 'Unable to load properties.' });
  }
});

app.post('/api/auth', async (req, res) => {
  const { mode, email, password, name } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
  }

  try {
    if (mode === 'signup') {
      if (!name || typeof name !== 'string') {
        return res.status(400).json({ message: 'Name is required for signup.' });
      }

      const existingUser = await getAsync(db, 'SELECT id FROM users WHERE email = ?', [email]);
      if (existingUser) {
        return res.status(409).json({ message: 'Email is already registered.' });
      }

      await runAsync(db, 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password]);
      return res.json({ user: { name, email } });
    }

    const user = await getAsync(db, 'SELECT name, email, password FROM users WHERE email = ?', [email]);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    return res.json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Authentication failed.' });
  }
});

app.post('/api/inquiry', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !message) {
    return res.status(400).json({ message: 'Name and message are required.' });
  }

  try {
    await runAsync(db, 'INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)', [name, email || null, message]);
    return res.json({ status: 'ok', message: 'Inquiry received successfully.' });
  } catch (error) {
    console.error('Inquiry error:', error);
    return res.status(500).json({ message: 'Unable to save inquiry.' });
  }
});

app.get('/api/inquiries', async (req, res) => {
  try {
    const inquiries = await allAsync(db, 'SELECT * FROM inquiries ORDER BY submitted_at DESC');
    res.json({ inquiries });
  } catch (error) {
    console.error('Failed to fetch inquiries:', error);
    res.status(500).json({ message: 'Unable to load inquiries.' });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const users = await allAsync(db, 'SELECT id, name, email FROM users');
    res.json({ users });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    res.status(500).json({ message: 'Unable to load users.' });
  }
});

app.listen(port, () => {
  console.log(`Backend server listening on http://localhost:${port}`);
});
