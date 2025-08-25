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

        // Seed foods with new categories and fields
        const sampleFoods = [
            {
                name: 'Nasi Putih',
                category: 'karbohidrat',
                halal: true,
                reason: 'Nasi putih adalah makanan pokok yang terbuat dari beras yang sudah dimasak. Beras adalah biji-bijian yang halal untuk dikonsumsi.',
                tips: 'Pilih beras yang berkualitas baik dan simpan dalam wadah tertutup untuk menjaga kesegaran.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/nasi-putih.jpg`
            },
            {
                name: 'Daging Sapi',
                category: 'protein-hewani',
                halal: true,
                reason: 'Daging sapi halal jika disembelih sesuai syariat Islam dengan menyebut nama Allah.',
                tips: 'Pastikan membeli daging dari penjual yang terpercaya dan memiliki sertifikasi halal.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/daging-sapi.jpg`
            },
            {
                name: 'Tempe',
                category: 'protein-nabati',
                halal: true,
                reason: 'Tempe terbuat dari kedelai yang difermentasi dengan ragi tempe. Kedelai adalah bahan nabati yang halal.',
                tips: 'Pilih tempe yang masih segar dengan aroma yang khas dan tidak berbau asam.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/tempe.jpg`
            },
            {
                name: 'Minyak Goreng',
                category: 'lemak',
                halal: true,
                reason: 'Minyak goreng nabati seperti minyak kelapa sawit atau minyak kelapa adalah lemak yang halal.',
                tips: 'Gunakan minyak goreng yang bersih dan tidak berbau tengik. Ganti minyak secara berkala.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/minyak-goreng.jpg`
            },
            {
                name: 'Brokoli',
                category: 'vitamin-mineral',
                halal: true,
                reason: 'Brokoli adalah sayuran yang kaya vitamin dan mineral. Semua sayuran segar halal untuk dikonsumsi.',
                tips: 'Cuci brokoli dengan air mengalir sebelum dimasak untuk menghilangkan kotoran dan pestisida.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/brokoli.jpg`
            },
            {
                name: 'Gelatin Babi',
                category: 'bahan-tambahan-pangan',
                halal: false,
                reason: 'Gelatin yang berasal dari babi haram untuk dikonsumsi karena babi adalah hewan yang haram.',
                tips: 'Selalu periksa label kemasan untuk memastikan gelatin yang digunakan berasal dari sumber halal.',
                image: `${process.env.R2_PUBLIC_BASE_URL}/foods/gelatin.jpg`
            }
        ];

        for (const food of sampleFoods) {
            await pool.query(`
                INSERT INTO foods (name, category, halal, reason, tips, image)
                VALUES ($1, $2, $3, $4, $5, $6)
                ON CONFLICT DO NOTHING
            `, [food.name, food.category, food.halal, food.reason, food.tips, food.image]);
        }

        // Seed foods from JSON file (if exists)
        const foodsPath = path.join(process.cwd(), 'data', 'foods.json');
        if (fs.existsSync(foodsPath)) {
            const foods = JSON.parse(fs.readFileSync(foodsPath, 'utf-8'));
            for (const food of foods) {
                await pool.query(`
                    INSERT INTO foods (name, brand, category, halal, reason, tips, image, barcode)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                    ON CONFLICT DO NOTHING
                `, [food.name, food.brand, food.category, food.halal, food.reason, food.tips || '', food.image, food.barcode]);
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
