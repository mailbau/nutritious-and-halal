import pool from './config.js';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

const seedData = async () => {
    try {
        // Create admin user
        const adminPassword = await bcrypt.hash('admin123', 10);
        await pool.query(`
      INSERT INTO admin (username, password_hash) 
      VALUES ($1, $2) 
      ON CONFLICT (username) DO NOTHING
    `, ['admin', adminPassword]);

        // Seed articles with placeholder R2 URLs
        const articles = [
            {
                title: 'Sertifikasi Makanan Halal di Era Modern',
                summary: 'Panduan lengkap tentang proses sertifikasi halal di era digital',
                content: 'Artikel lengkap tentang sertifikasi halal...',
                image: `${process.env.R2_PUBLIC_BASE_URL}/articles/placeholder-article1.jpg`,
                category: 'Sertifikasi',
                author: 'Tim NAY'
            },
            {
                title: 'Memahami Bahan Bahan Halal',
                summary: 'Penjelasan mendalam tentang bahan-bahan yang diperbolehkan dan tidak',
                content: 'Artikel lengkap tentang bahan halal...',
                image: `${process.env.R2_PUBLIC_BASE_URL}/articles/placeholder-article2.jpg`,
                category: 'Edukasi',
                author: 'Tim NAY'
            },
            {
                title: 'Dampak Sertifikasi Halal terhadap Kepercayaan Konsumen',
                summary: 'Analisis dampak sertifikasi halal pada kepercayaan konsumen',
                content: 'Artikel lengkap tentang dampak sertifikasi...',
                image: `${process.env.R2_PUBLIC_BASE_URL}/articles/placeholder-article3.jpg`,
                category: 'Penelitian',
                author: 'Tim NAY'
            }
        ];

        for (const article of articles) {
            await pool.query(`
        INSERT INTO articles (title, summary, content, image, category, author)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT DO NOTHING
      `, [article.title, article.summary, article.content, article.image, article.category, article.author]);
        }

        // Seed foods from JSON file
        const foodsPath = path.join(process.cwd(), 'data', 'foods.json');
        if (fs.existsSync(foodsPath)) {
            const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf-8'));
            for (const food of foods) {
                await pool.query(`
          INSERT INTO foods (name, brand, category, halal, reason, image, barcode)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
          ON CONFLICT DO NOTHING
        `, [food.name, food.brand, food.category, food.halal, food.reason, food.image, food.barcode]);
            }
        }

        // Seed FAQs from JSON file
        const faqsPath = path.join(process.cwd(), 'data', 'faqs.json');
        if (fs.existsSync(faqsPath)) {
            const faqs = JSON.parse(fs.readFileSync(faqsPath, 'utf-8'));
            for (const faq of faqs) {
                await pool.query(`
          INSERT INTO faqs (question, answer)
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [faq.q, faq.a]);
            }
        }

        console.log('Database seeded successfully!');
        console.log('Admin credentials: username: admin, password: admin123');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await pool.end();
    }
};

seedData();
