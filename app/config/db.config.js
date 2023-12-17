const { Pool } = require("pg");

const pool = new Pool({
  user: "obgbaoao",
  host: "kiouni.db.elephantsql.com",
  database: "obgbaoao",
  password: "Zv6aut5sEK0Kjt-mHPLTf1RhZrB1c6XJ",
  port: 5432,
  dialect: "postgres",
});
// const pool = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "tis",
//   password: "password",
//   port: 5432,
//   dialect: "postgres",
// });

module.exports = pool;
