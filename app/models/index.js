const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI, {
  timestamps: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.apod = require("../models/apod.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);

db.keyword = require("../models/keyword.model")(sequelize, Sequelize);
db.nasaAsset = require("../models/nasaAsset.model")(sequelize, Sequelize);
db.nasaAssetKeyword = require("../models/NasaAssetKeyword.model")(
  sequelize,
  Sequelize
);

// db.userLikeNasaAsset = require("../models/userLikeNasaAsset.model")(
//   sequelize,
//   Sequelize
// );
// db.userFavoriteNasaAsset = require("../models/userFavoriteNasaAsset.model")(
//   sequelize,
//   Sequelize
// );

// assetKeyword
db.keyword.belongsToMany(db.nasaAsset, {
  through: "nasa_asset_keyword",
});
db.nasaAsset.belongsToMany(db.keyword, {
  through: "nasa_asset_keyword",
});

// db.nasaAset.belongsToMany(db.user, {
//   through: db.userLikeNasaAsset,
//   foreignKey: "nasaId",
// });
// db.user.belongsToMany(db.nasaAset, {
//   through: db.userLikeNasaAsset,
//   foreignKey: "userId",
// });

// db.nasaAset.belongsToMany(db.user, {
//   through: db.userFavoriteNasaAsset,
//   foreignKey: "nasaId",
// });
// db.user.belongsToMany(db.nasaAset, {
//   through: db.userFavoriteNasaAsset,
//   foreignKey: "userId",
// });

// db.role.belongsToMany(db.user, {
//   through: "user_roles",
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
// });

module.exports = db;
