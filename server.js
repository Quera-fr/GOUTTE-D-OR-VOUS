import express from 'express';
import initSqlJs from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const DB_FILE = path.join(__dirname, 'goutte_d_or.sqlite');

async function main() {
  const SQL = await initSqlJs();
  let db;

  if (fs.existsSync(DB_FILE)) {
    const filebuffer = fs.readFileSync(DB_FILE);
    db = new SQL.Database(filebuffer);
  } else {
    db = new SQL.Database();
  }

  // Create SQLite tables if they do not exist
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE,
      name TEXT,
      role TEXT,
      status TEXT,
      associationId TEXT
    );

    CREATE TABLE IF NOT EXISTS associations (
      id TEXT PRIMARY KEY,
      name TEXT,
      logo TEXT,
      category TEXT,
      categoryLabel TEXT,
      address TEXT,
      publicCible TEXT,
      horaires TEXT,
      phone TEXT,
      email TEXT,
      website TEXT,
      thematique TEXT,
      contact TEXT,
      histoire TEXT,
      activites TEXT,
      fonctionnement TEXT,
      contactsDetails TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS events (
      id TEXT PRIMARY KEY,
      day TEXT,
      month TEXT,
      title TEXT,
      shortDesc TEXT,
      location TEXT,
      fullDesc TEXT,
      detailedLocations TEXT,
      colorTheme TEXT,
      position TEXT,
      time TEXT,
      organizer TEXT,
      tag TEXT,
      associationId TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      orgName TEXT,
      title TEXT,
      type TEXT,
      typeLabel TEXT,
      buttonText TEXT,
      bgColor TEXT,
      petalColor TEXT,
      image TEXT,
      duration TEXT,
      description TEXT,
      requirements TEXT,
      contactEmail TEXT,
      associationId TEXT,
      status TEXT
    );

    CREATE TABLE IF NOT EXISTS articles (
      id TEXT PRIMARY KEY,
      type TEXT,
      title TEXT,
      subtitle TEXT,
      author TEXT,
      durationOrReadTime TEXT,
      image TEXT,
      date TEXT,
      category TEXT,
      content TEXT,
      audioUrl TEXT,
      videoUrl TEXT
    );

    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      articleId TEXT,
      userId TEXT,
      authorName TEXT,
      content TEXT,
      date TEXT,
      status TEXT
    );
  `);

  function saveDatabase() {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DB_FILE, buffer);
  }

  // API Endpoints
  app.get('/api/associations', (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM associations WHERE status = 'approved' OR status IS NULL");
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/events', (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM events WHERE status = 'approved' OR status IS NULL");
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/posts', (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM posts WHERE status = 'approved' OR status IS NULL");
      const results = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        if (row.requirements) {
          try {
            row.requirements = JSON.parse(row.requirements);
          } catch (_) {}
        }
        results.push(row);
      }
      stmt.free();
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get('/api/articles', (req, res) => {
    try {
      const stmt = db.prepare("SELECT * FROM articles");
      const results = [];
      while (stmt.step()) {
        results.push(stmt.getAsObject());
      }
      stmt.free();
      res.json(results);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  saveDatabase();

  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`SQLite API Server running on port ${PORT}`);
  });
}

main().catch(console.error);
