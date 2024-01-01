const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI, {
  timestamps: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.apod = require("../models/apod.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);

db.userLike = require("../models/like.model").UserLike(sequelize, Sequelize);
db.assetData = require("../models/like.model").data(sequelize, Sequelize);
db.assetLink = require("../models/like.model").link(sequelize, Sequelize);

module.exports = db;
