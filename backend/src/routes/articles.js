import express from 'express';
import pool from '../database/config.js';
import { authenticateAdmin } from '../middleware/auth.js';
import multer from 'multer';
import { uploadToR2, deleteFromR2 } from '../services/r2Service.js';

const router = express.Router();

// Configure multer for memory storage (for R2 upload)
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

// Public routes
router.get('/', async (req, res) => {
    try {
        const { category, limit = 10, offset = 0 } = req.query;

        let query = 'SELECT * FROM articles WHERE published_at IS NOT NULL';
        const params = [];

        if (category) {
            query += ' AND category = $1';
            params.push(category);
        }

        query += ' ORDER BY published_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
        params.push(parseInt(limit), parseInt(offset));

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM articles WHERE id = $1 AND published_at IS NOT NULL', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin routes (protected)
router.post('/', authenticateAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, summary, content, category, author } = req.body;

        if (!title || !summary || !content) {
            return res.status(400).json({ error: 'Title, summary, and content are required' });
        }

        let imageUrl = null;
        if (req.file) {
            try {
                imageUrl = await uploadToR2(req.file, 'articles');
            } catch (uploadError) {
                console.error('R2 upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload image' });
            }
        }

        const result = await pool.query(`
      INSERT INTO articles (title, summary, content, image, category, author, published_at)
      VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
      RETURNING *
    `, [title, summary, content, imageUrl, category, author]);

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', authenticateAdmin, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { title, summary, content, category, author } = req.body;

        if (!title || !summary || !content) {
            return res.status(400).json({ error: 'Title, summary, and content are required' });
        }

        // Check if article exists
        const existingArticle = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
        if (existingArticle.rows.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        let imageUrl = existingArticle.rows[0].image;
        if (req.file) {
            try {
                // Delete old image from R2 if it exists
                if (existingArticle.rows[0].image) {
                    await deleteFromR2(existingArticle.rows[0].image);
                }

                // Upload new image
                imageUrl = await uploadToR2(req.file, 'articles');
            } catch (uploadError) {
                console.error('R2 upload error:', uploadError);
                return res.status(500).json({ error: 'Failed to upload image' });
            }
        }

        const result = await pool.query(`
      UPDATE articles 
      SET title = $1, summary = $2, content = $3, image = $4, category = $5, author = $6, updated_at = CURRENT_TIMESTAMP
      WHERE id = $7
      RETURNING *
    `, [title, summary, content, imageUrl, category, author, id]);

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Get article to delete image from R2
        const article = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
        if (article.rows.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }

        // Delete image from R2 if it exists
        if (article.rows[0].image) {
            await deleteFromR2(article.rows[0].image);
        }

        const result = await pool.query('DELETE FROM articles WHERE id = $1 RETURNING *', [id]);

        res.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Admin route to get all articles (including unpublished)
router.get('/admin/all', authenticateAdmin, async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching all articles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
