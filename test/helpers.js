const { execSync } = require('child_process');

// FP CANDIDATES: All patterns here are test-only code

// Test helper: eval for parsing test fixtures
function loadFixture(name) {
  const raw = require('fs').readFileSync('./test/fixtures/' + name + '.json', 'utf8');
  return eval('(' + raw + ')');
}

// Test helper: exec for test setup/teardown
function resetTestDB() {
  execSync('psql -c "TRUNCATE users, products, orders CASCADE" test_db');
}

// Test helper: hardcoded credentials for test database
const TEST_DB_CONFIG = {
  host: 'localhost',
  user: 'test_user',
  password: 'test_password_123',
  database: 'test_db'
};

// Test helper: mock JWT secret
const TEST_JWT_SECRET = 'test-jwt-secret-not-for-production';

module.exports = { loadFixture, resetTestDB, TEST_DB_CONFIG, TEST_JWT_SECRET };
