import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: 'p2p-exchange.cddjruxsyl3k.ap-southeast-1.rds.amazonaws.com',
    user: 'admin',
    password: '88Rosetrap88$',
    database: 'p2p_exchange',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Database connected successfully to RDS');
        connection.release();
    } catch (err) {
        console.error('Database connection error:', {
            message: err.message,
            code: err.code,
            errno: err.errno
        });
        // Don't exit process to allow Stripe to still work
        console.error('Database connection failed but server will continue running');
    }
};

testConnection();

export default pool; 