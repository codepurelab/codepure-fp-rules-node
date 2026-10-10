const mysql = require('mysql');

// REAL VULN: Hardcoded production credentials
const connection = mysql.createConnection({
  host: 'db.production.internal',
  user: 'admin',
  password: 'Pr0duction_DB_Pass_2026',
  database: 'ecommerce_prod',
  port: 3306
});

// REAL VULN: Another hardcoded secret
const REDIS_PASSWORD = 'R3d1s_Internal_Key_2026';

// REAL VULN: API key in code
const PAYMENT_KEY = 'pay_live_key_0123456789abcdef';

connection.connect((err) => {
  if (err) console.error('DB connection error:', err);
});

module.exports = connection;
