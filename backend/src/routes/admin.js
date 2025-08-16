import express from 'express';
import { loginAdmin, authenticateAdmin } from '../middleware/auth.js';
import pool from '../database/config.js';

const router = express.Router();

// Admin login
router.post('/login', loginAdmin);

// Get admin dashboard stats
router.get('/stats', authenticateAdmin, async (req, res) => {
    try {
        const articlesCount = await pool.query('SELECT COUNT(*) FROM articles');
        const foodsCount = await pool.query('SELECT COUNT(*) FROM foods');
        const faqsCount = await pool.query('SELECT COUNT(*) FROM faqs');

        res.json({
            articles: parseInt(articlesCount.rows[0].count),
            foods: parseInt(foodsCount.rows[0].count),
            faqs: parseInt(faqsCount.rows[0].count)
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get recent articles for admin dashboard
router.get('/recent-articles', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT id, title, category, author, created_at, published_at 
      FROM articles 
      ORDER BY created_at DESC 
      LIMIT 5
    `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching recent articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
