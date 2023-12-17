const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "tis",
  password: "password",
  port: 5432,
  dialect: "postgres",
});

module.exports = pool;
