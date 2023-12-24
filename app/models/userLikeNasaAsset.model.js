module.exports = (sequelize, Sequelize) => {
  const UserLikeNasaAsset = sequelize.define("user_like_nasa_asset", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nasaId: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  });
  return UserLikeNasaAsset;
};
