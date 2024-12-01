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
    queueLimit: 0,
    connectTimeout: 60000,
    acquireTimeout: 60000,
    timeout: 60000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    debug: false,
    trace: true
});

pool.on('connection', (connection) => {
    console.log('New database connection established');
    
    connection.on('error', (err) => {
        console.error('Database connection error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.log('Attempting to reconnect...');
        }
    });
});

const testConnection = async (retries = 5) => {
    for (let i = 0; i < retries; i++) {
        try {
            const connection = await pool.getConnection();
            console.log('Database connected successfully to RDS');
            
            await connection.query('SELECT 1');
            connection.release();
            return true;
        } catch (err) {
            console.error(`Database connection attempt ${i + 1} failed:`, {
                message: err.message,
                code: err.code,
                errno: err.errno
            });
            
            if (i === retries - 1) {
                console.error('All connection attempts failed');
                return false;
            }
            
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
};

testConnection().then(success => {
    if (!success) {
        console.warn('Database connection failed, but server will continue running');
    }
}).catch(err => {
    console.error('Fatal database error:', err);
});

pool.on('error', (err) => {
    console.error('Pool error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Lost connection to database. Reconnecting...');
        testConnection();
    }
});

export default pool; 