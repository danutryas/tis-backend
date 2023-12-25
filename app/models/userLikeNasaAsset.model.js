module.exports = (sequelize, Sequelize) => {
  const UserLikeNasaAsset = sequelize.define(
    "user_like_nasa_asset",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nasaId: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "user_like_nasa_asset",
      timestamp: false,
    }
  );
  return UserLikeNasaAsset;
};
