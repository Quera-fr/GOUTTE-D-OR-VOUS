import express from 'express';
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const DB_FILE = path.join(__dirname, 'database.sqlite');
const db = new Database(DB_FILE);
db.pragma('journal_mode = WAL');

// Ensure tables exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE,
    password TEXT,
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
    lat REAL,
    lng REAL,
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

// API Endpoints
// --- GET ASSOCIATIONS (Approved or null status) ---
app.get('/api/associations', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM associations WHERE status = 'approved' OR status IS NULL").all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- ALL ASSOCIATIONS (FOR ADMIN / MANAGEMENT) ---
app.get('/api/associations/all', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM associations").all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- POST NEW / UPDATE ASSOCIATION ---
app.post('/api/associations', (req, res) => {
  try {
    const data = req.body;
    const id = data.id || 'assoc-' + Date.now();
    const lat = data.lat || 48.8870 + (Math.random() * 0.005 - 0.0025);
    const lng = data.lng || 2.3540 + (Math.random() * 0.005 - 0.0025);
    const status = data.status || 'approved';

    const stmt = db.prepare(`
      INSERT OR REPLACE INTO associations (
        id, name, logo, category, categoryLabel, address, publicCible, horaires, phone, email, website, thematique, contact, histoire, activites, fonctionnement, contactsDetails, lat, lng, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
      id,
      data.name,
      data.logo || '',
      data.category || 'maison_assoc',
      data.categoryLabel || 'Maison d’Associations',
      data.address || 'Goutte d’Or, 75018 Paris',
      data.publicCible || 'Tout public',
      data.horaires || 'Lundi - Vendredi',
      data.phone || '',
      data.email || '',
      data.website || '',
      data.thematique || 'Vie de quartier',
      data.contact || '',
      data.histoire || '',
      data.activites || '',
      data.fonctionnement || '',
      data.contactsDetails || '',
      lat,
      lng,
      status
    );

    const created = db.prepare('SELECT * FROM associations WHERE id = ?').get(id);
    res.json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET USERS ---
app.get('/api/users', (req, res) => {
  try {
    const users = db.prepare('SELECT * FROM users').all();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- POST USER ---
app.post('/api/users', (req, res) => {
  try {
    const data = req.body;
    const stmt = db.prepare(`
      INSERT OR REPLACE INTO users (id, email, password, name, role, status, associationId)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    stmt.run(
      data.id || 'usr-' + Date.now(),
      data.email,
      data.password || 'password',
      data.name,
      data.role,
      data.status || 'approved',
      data.associationId || null
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- APPROVE USER / ASSOC ---
app.post('/api/users/approve', (req, res) => {
  try {
    const { userId } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (user) {
      db.prepare("UPDATE users SET status = 'approved' WHERE id = ?").run(userId);
      if (user.associationId) {
        db.prepare("UPDATE associations SET status = 'approved' WHERE id = ?").run(user.associationId);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- DELETE USER & ASSOCIATED ASSOC ---
app.post('/api/users/delete', (req, res) => {
  try {
    const { userId } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
    if (user) {
      db.prepare('DELETE FROM users WHERE id = ?').run(userId);
      if (user.associationId) {
        db.prepare('DELETE FROM associations WHERE id = ?').run(user.associationId);
      }
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GET EVENTS ---
app.get('/api/events', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM events WHERE status = 'approved' OR status IS NULL").all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- GET POSTS ---
app.get('/api/posts', (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM posts WHERE status = 'approved' OR status IS NULL").all();
    const formatted = rows.map((row) => {
      if (row.requirements && typeof row.requirements === 'string') {
        try {
          return { ...row, requirements: JSON.parse(row.requirements) };
        } catch (_) {}
      }
      return row;
    });
    res.json(formatted);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- GET ARTICLES ---
app.get('/api/articles', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM articles').all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- GET COMMENTS ---
app.get('/api/comments', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM comments').all();
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Serve static assets from src/assets and public
const srcAssetsPath = path.join(__dirname, 'src', 'assets');
const publicPath = path.join(__dirname, 'public');

app.use('/src/assets', express.static(srcAssetsPath));
app.use('/assets', express.static(srcAssetsPath));
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
}

// Serve static files from dist in production
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// SPA routing fallback to index.html for non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    const indexPath = path.join(distPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Build files not found. Run npm run build first.');
    }
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
