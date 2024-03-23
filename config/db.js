const Pool = require("pg").Pool;
const dotenv = require("dotenv");

dotenv.config();

// Connection
const pool = new Pool({
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

module.exports = { pool };
