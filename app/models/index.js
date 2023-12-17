const config = require("../config/db.config");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);
// const sequelize = new Sequelize("tis", "postgres", "password", {
//   host: "localhost",
//   dialect: "postgres",
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model")(sequelize, Sequelize);
db.role = require("../models/role.model")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
});

db.ROLES = ["user", "moderator", "admin"];

module.exports = db;
