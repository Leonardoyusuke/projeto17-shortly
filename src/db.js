import pg from 'pg';
import './setup.js';

const { Pool } = pg;

    const db = new Pool({
        connectionString: process.env.DATABASE_URL
    });

export default db;