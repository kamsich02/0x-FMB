// database.js
const postgres = require('postgres');
require('dotenv').config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const pool = postgres(URL, { ssl: 'require' });

async function checkUserRegistration(telegramId) {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT COUNT(*) FROM users WHERE telegram_id = $1', [telegramId]);
    return result.rows[0].count > 0 || false; // Check if the count exists and is greater than 0
  } finally {
    client.release();
  }
}

async function registerUser(telegramId, recoveryPhrase, privateKey, walletAddress) {
  const client = await pool.connect();
  try {
    await client.query('INSERT INTO users (telegram_id, recovery_phrase, private_key, wallet_address) VALUES ($1, $2, $3, $4)', [telegramId, recoveryPhrase, privateKey, walletAddress]);
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  checkUserRegistration,
  registerUser,
};

