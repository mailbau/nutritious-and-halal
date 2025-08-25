import pool from './config.js';

async function dropFoodsTable() {
    try {
        console.log('Dropping foods table...');
        await pool.query('DROP TABLE IF EXISTS foods CASCADE;');
        console.log('foods table dropped successfully.');
    } catch (error) {
        console.error('Error dropping foods table:', error);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

dropFoodsTable();
