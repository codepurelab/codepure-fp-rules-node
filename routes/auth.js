const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('../config/database');

// FIXED: SQL injection via parameterized query
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (results.length > 0) {
      res.json({ token: 'jwt-token-here', user: results[0] });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

// FIXED: SQL injection in search - using parameterized query
router.get('/users', (req, res) => {
  const search = req.query.q;
  const query = "SELECT id, username, email FROM users WHERE username LIKE ?";
  db.query(query, ['%' + search + '%'], (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

// FP CANDIDATE: eval() only used in test/debug mode — not user-controlled
if (process.env.NODE_ENV === 'test') {
  router.get('/debug/eval-config', (req, res) => {
    const testConfig = '({ timeout: 5000, retries: 3 })';
    const parsed = eval(testConfig);
    res.json(parsed);
  });
}

module.exports = router;
