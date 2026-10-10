const mysql = require('mysql');

// FIXED: Use environment variable instead of hardcoded password
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'db.production.internal',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecommerce_prod',
  port: parseInt(process.env.DB_PORT) || 3306
});

// REAL VULN: Another hardcoded secret
const REDIS_PASSWORD = 'R3d1s_Internal_Key_2026';

// REAL VULN: API key in code
const PAYMENT_KEY = 'pay_live_key_0123456789abcdef';

connection.connect((err) => {
  if (err) console.error('DB connection error:', err);
});

module.exports = connection;
