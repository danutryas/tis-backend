const Sequelize = require("sequelize");
// const { assetData, assetLink, assetCollection } = ; // Update the path

const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI, {
  timestamps: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.apod = require("../models/apod.model")(sequelize, Sequelize);
db.user = require("../models/user.model")(sequelize, Sequelize);

db.keyword = require("../models/keyword.model")(sequelize, Sequelize);
db.nasaAsset = require("../models/nasaAsset.model").nasaAsset(
  sequelize,
  Sequelize
);
db.assetData = require("../models/nasaAsset.model").data(sequelize, Sequelize);
db.assetCollection = require("../models/nasaAsset.model").collection(
  sequelize,
  Sequelize
);
db.assetLink = require("../models/nasaAsset.model").link(sequelize, Sequelize);
db.nasaAssetKeyword = require("../models/NasaAssetKeyword.model")(
  sequelize,
  Sequelize
);

db.userLikeNasaAsset = require("../models/userLikeNasaAsset.model")(
  sequelize,
  Sequelize
);
db.userFavoriteNasaAsset = require("../models/userFavoriteNasaAsset.model")(
  sequelize,
  Sequelize
);

// assetKeyword
db.keyword.belongsToMany(db.nasaAsset, {
  through: "nasa_asset_keyword",
});
db.nasaAsset.belongsToMany(db.keyword, {
  through: "nasa_asset_keyword",
});

db.nasaAsset.belongsToMany(db.user, {
  through: "user_like_nasa_asset",
});
db.user.belongsToMany(db.nasaAsset, {
  through: "user_like_nasa_asset",
});

db.nasaAsset.belongsToMany(db.user, {
  through: "user_favorite_nasa_asset",
});
db.user.belongsToMany(db.nasaAsset, {
  through: "user_favorite_nasa_asset",
});

module.exports = db;
