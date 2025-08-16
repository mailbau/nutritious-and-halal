import pool from './config.js';

const createTables = async () => {
    try {
        // Create articles table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        summary TEXT,
        content TEXT,
        image VARCHAR(500),
        category VARCHAR(100),
        author VARCHAR(100),
        published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create admin table for simple admin authentication
        await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create foods table (migrating from JSON)
        await pool.query(`
      CREATE TABLE IF NOT EXISTS foods (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        brand VARCHAR(255),
        category VARCHAR(100),
        halal BOOLEAN NOT NULL,
        reason TEXT,
        image VARCHAR(500),
        barcode VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        // Create faqs table (migrating from JSON)
        await pool.query(`
      CREATE TABLE IF NOT EXISTS faqs (
        id SERIAL PRIMARY KEY,
        question TEXT NOT NULL,
        answer TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

        console.log('Database tables created successfully!');
    } catch (error) {
        console.error('Error creating tables:', error);
    } finally {
        await pool.end();
    }
};

createTables();
