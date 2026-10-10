const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// FIXED: XSS — escape user input before rendering
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

router.get('/search', (req, res) => {
  const term = escapeHtml(req.query.q);
  res.send(`<html><body><h1>Search results for: ${term}</h1></body></html>`);
});

// REAL VULN: Path traversal — user input in file read
router.get('/image/:name', (req, res) => {
  const filePath = path.join(__dirname, '../uploads', req.params.name);
  res.sendFile(filePath);
});

// FP CANDIDATE: path.join with hardcoded safe prefix — SAST may flag but it's safe
router.get('/static/:category', (req, res) => {
  const allowedCategories = ['electronics', 'clothing', 'food'];
  const cat = req.params.category;
  if (!allowedCategories.includes(cat)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  const safePath = path.join(__dirname, '../static/categories', cat, 'index.html');
  res.sendFile(safePath);
});

// REAL VULN: Command injection
router.get('/export/:format', (req, res) => {
  const { exec } = require('child_process');
  exec('convert products.json ' + req.params.format, (err, stdout) => {
    if (err) return res.status(500).json({ error: 'Export failed' });
    res.send(stdout);
  });
});

module.exports = router;
