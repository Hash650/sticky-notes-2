
import dotenv from 'dotenv';
import pkg from 'pg';

const { Pool } = pkg;

dotenv.config();

// Use the connection string from your Supabase settings or .env
const connectionString = process.env.SUPABASE_DB_URL;

// Create the pool
const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Important for Supabase or other managed DBs
    },
});

pool.connect()
    .then(() => console.log('Connected to Supabase Postgres database'))
    .catch((err) => console.error('Database connection error:', err));

export default pool;
