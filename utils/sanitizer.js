// FP CANDIDATE: fixed regex patterns — SAST may flag as ReDoS but these are safe
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;
const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function sanitizeEmail(email) {
  if (!EMAIL_REGEX.test(email)) {
    throw new Error('Invalid email format');
  }
  return email.toLowerCase().trim();
}

function sanitizePhone(phone) {
  if (!PHONE_REGEX.test(phone)) {
    throw new Error('Invalid phone format');
  }
  return phone.replace(/[^\d+]/g, '');
}

function sanitizeSlug(slug) {
  if (!SLUG_REGEX.test(slug)) {
    throw new Error('Invalid slug format');
  }
  return slug;
}

// FP CANDIDATE: HTML stripping with regex — commonly flagged but safe for display
function stripHtml(input) {
  return input.replace(/<[^>]*>/g, '');
}

module.exports = { sanitizeEmail, sanitizePhone, sanitizeSlug, stripHtml };
