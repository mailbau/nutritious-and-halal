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

// FAQ CRUD routes
router.get('/faqs', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, question, answer, created_at FROM faqs ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching FAQs:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/faqs', authenticateAdmin, async (req, res) => {
    try {
        const { question, answer } = req.body;
        const result = await pool.query(
            'INSERT INTO faqs (question, answer) VALUES ($1, $2) RETURNING *',
            [question, answer]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/faqs/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const result = await pool.query(
            'UPDATE faqs SET question = $1, answer = $2 WHERE id = $3 RETURNING *',
            [question, answer, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/faqs/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM faqs WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        res.json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        console.error('Error deleting FAQ:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Foods CRUD routes
router.get('/foods', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, halal, reason, created_at FROM foods ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/foods', authenticateAdmin, async (req, res) => {
    try {
        const { name, halal, reason } = req.body;
        const result = await pool.query(
            'INSERT INTO foods (name, halal, reason) VALUES ($1, $2, $3) RETURNING *',
            [name, halal, reason]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating food:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/foods/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { name, halal, reason } = req.body;
        const result = await pool.query(
            'UPDATE foods SET name = $1, halal = $2, reason = $3 WHERE id = $4 RETURNING *',
            [name, halal, reason, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Food not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating food:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/foods/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM foods WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Food not found' });
        }
        res.json({ message: 'Food deleted successfully' });
    } catch (error) {
        console.error('Error deleting food:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
