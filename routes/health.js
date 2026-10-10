const express = require('express');
const router = express.Router();
const { execSync } = require('child_process');

// FP CANDIDATE: command exec with fixed string — no user input
router.get('/', (req, res) => {
  const uptime = execSync('uptime').toString().trim();
  const diskUsage = execSync('df -h /').toString().trim();
  res.json({
    status: 'healthy',
    uptime: uptime,
    disk: diskUsage,
    timestamp: new Date().toISOString()
  });
});

// FP CANDIDATE: another fixed command — SAST may flag execSync
router.get('/memory', (req, res) => {
  const memInfo = execSync('free -m').toString().trim();
  res.json({ memory: memInfo });
});

module.exports = router;

// R8: Health logging
console.log('health ok');
