import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import Database from 'better-sqlite3';
import fs from 'fs';

function sqliteApiPlugin(): Plugin {
  return {
    name: 'sqlite-api-plugin',
    configureServer(server) {
      const dbPath = path.resolve(import.meta.dirname || __dirname, 'database.sqlite');

      function getDb() {
        if (!fs.existsSync(dbPath)) {
          console.warn('database.sqlite missing, initializing...');
        }
        return new Database(dbPath);
      }

      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api')) {
          return next();
        }

        res.setHeader('Content-Type', 'application/json');

        const db = getDb();

        try {
          // --- GET ASSOCIATIONS ---
          if (req.url === '/api/associations' && req.method === 'GET') {
            const stmt = db.prepare("SELECT * FROM associations WHERE status = 'approved' OR status IS NULL");
            const rows = stmt.all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          // --- ALL ASSOCIATIONS (FOR ADMIN) ---
          if (req.url === '/api/associations/all' && req.method === 'GET') {
            const stmt = db.prepare("SELECT * FROM associations");
            const rows = stmt.all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          // --- POST NEW ASSOCIATION ---
          if (req.url === '/api/associations' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
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
                res.end(JSON.stringify(created));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              } finally {
                db.close();
              }
            });
            return;
          }

          // --- GET USERS ---
          if (req.url === '/api/users' && req.method === 'GET') {
            const users = db.prepare("SELECT * FROM users").all();
            db.close();
            return res.end(JSON.stringify(users));
          }

          // --- POST USER ---
          if (req.url === '/api/users' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                const data = JSON.parse(body);
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
                res.end(JSON.stringify(data));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              } finally {
                db.close();
              }
            });
            return;
          }

          // --- APPROVE USER / ASSOC ---
          if (req.url === '/api/users/approve' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                const { userId } = JSON.parse(body);
                const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
                if (user) {
                  db.prepare("UPDATE users SET status = 'approved' WHERE id = ?").run(userId);
                  if (user.associationId) {
                    db.prepare("UPDATE associations SET status = 'approved' WHERE id = ?").run(user.associationId);
                  }
                }
                res.end(JSON.stringify({ success: true }));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              } finally {
                db.close();
              }
            });
            return;
          }

          // --- DELETE USER & ASSOCIATED ASSOC ---
          if (req.url === '/api/users/delete' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => (body += chunk));
            req.on('end', () => {
              try {
                const { userId } = JSON.parse(body);
                const user = db.prepare('SELECT * FROM users WHERE id = ?').get(userId) as any;
                if (user) {
                  db.prepare('DELETE FROM users WHERE id = ?').run(userId);
                  if (user.associationId) {
                    db.prepare('DELETE FROM associations WHERE id = ?').run(user.associationId);
                  }
                }
                res.end(JSON.stringify({ success: true }));
              } catch (err: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: err.message }));
              } finally {
                db.close();
              }
            });
            return;
          }

          // Fallback for other GET endpoints
          if (req.url === '/api/events' && req.method === 'GET') {
            const rows = db.prepare("SELECT * FROM events WHERE status = 'approved' OR status IS NULL").all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          if (req.url === '/api/posts' && req.method === 'GET') {
            const rows = db.prepare("SELECT * FROM posts WHERE status = 'approved' OR status IS NULL").all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          if (req.url === '/api/articles' && req.method === 'GET') {
            const rows = db.prepare("SELECT * FROM articles").all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          if (req.url === '/api/comments' && req.method === 'GET') {
            const rows = db.prepare("SELECT * FROM comments").all();
            db.close();
            return res.end(JSON.stringify(rows));
          }

          db.close();
          next();
        } catch (e: any) {
          db.close();
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), sqliteApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname || __dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
