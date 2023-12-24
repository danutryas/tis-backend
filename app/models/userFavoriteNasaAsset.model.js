module.exports = (sequelize, Sequelize) => {
  const UserFavoriteNasaAsset = sequelize.define("user_favorite_nasa_asset", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    nasaId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return UserFavoriteNasaAsset;
};
