const bcrypt = require('bcrypt');
const crypto = require('crypto');

// Production hashing — safe
async function hashPassword(password) {
  return bcrypt.hash(password, 12);
}

async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

// FP CANDIDATE: constant salt for test determinism — not used in production
const TEST_SALT = '$2b$10$abcdefghijklmnopqrstuv';
async function hashPasswordForTest(password) {
  return bcrypt.hash(password, TEST_SALT);
}

// REAL VULN: Weak hash used for password reset tokens
function generateResetToken(userId) {
  const md5 = crypto.createHash('md5');
  return md5.update(userId + 'secret-salt').digest('hex');
}

module.exports = { hashPassword, comparePassword, hashPasswordForTest, generateResetToken };
