import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import pool from '../database/config.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const result = await pool.query('SELECT * FROM admin WHERE id = $1', [decoded.adminId]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        req.admin = result.rows[0];
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

export const loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password required' });
        }

        const result = await pool.query('SELECT * FROM admin WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const admin = result.rows[0];
        const isValidPassword = await bcrypt.compare(password, admin.password_hash);

        if (!isValidPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            token,
            admin: {
                id: admin.id,
                username: admin.username
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
