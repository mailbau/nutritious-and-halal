
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import multer from 'multer';
import pool from "./database/config.js";
import articlesRouter from "./routes/articles.js";
import adminRouter from "./routes/admin.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration for production
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://nutritious-and-halal.vercel.app', 'http://localhost:3000']
    : true,
  credentials: true
}));

app.use(express.json());
app.use(morgan("dev"));

// Root route for debugging
app.get("/", (req, res) => {
  res.json({
    message: "NAY Halal Guide API",
    status: "running",
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// Foods API (migrated to PostgreSQL)
app.get("/api/foods", async (req, res) => {
  try {
    const { q, category, halal } = req.query;
    let query = 'SELECT * FROM foods WHERE 1=1';
    const params = [];
    let paramCount = 0;

    if (q) {
      paramCount++;
      query += ` AND (LOWER(name) LIKE LOWER($${paramCount}) OR LOWER(brand) LIKE LOWER($${paramCount}))`;
      params.push(`%${q}%`);
    }

    if (category) {
      paramCount++;
      query += ` AND LOWER(category) = LOWER($${paramCount})`;
      params.push(category);
    }

    if (halal !== undefined) {
      paramCount++;
      query += ` AND halal = $${paramCount}`;
      params.push(halal === 'true');
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching foods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/foods/:id", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM foods WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Not found" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Quick "check" by name/barcode
app.get("/api/check", async (req, res) => {
  try {
    const { name, barcode } = req.query;
    let match = null;

    if (barcode) {
      const result = await pool.query('SELECT * FROM foods WHERE barcode = $1', [barcode]);
      if (result.rows.length > 0) {
        match = result.rows[0];
      }
    }

    if (!match && name) {
      const result = await pool.query('SELECT * FROM foods WHERE LOWER(name) = LOWER($1)', [name]);
      if (result.rows.length > 0) {
        match = result.rows[0];
      }
    }

    if (!match) {
      return res.json({
        found: false,
        halal: null,
        reason: "Not found in local database"
      });
    }

    res.json({
      found: true,
      halal: match.halal,
      item: match,
      reason: match.reason || null
    });
  } catch (error) {
    console.error('Error checking food:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// FAQs API (migrated to PostgreSQL)
app.get("/api/faqs", async (req, res) => {
  try {
    const result = await pool.query('SELECT id, question, answer FROM faqs ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Observations API (migrated to PostgreSQL)
app.get("/api/observations", async (req, res) => {
  try {
    const result = await pool.query('SELECT id, question, yes_outcome, no_outcome FROM observations WHERE active = TRUE ORDER BY sort_order ASC, created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching observations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Use routers
app.use("/api/articles", articlesRouter);
app.use("/api/admin", adminRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
  }
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API listening on port ${PORT}`);
});
