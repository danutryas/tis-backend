module.exports = (sequelize, Sequelize) => {
  const NasaAssetKeyword = sequelize.define(
    "nasa_asset_keyword",
    {
      nasaId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      keywordId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: "nasa_asset_keyword", timestamp: false }
  );
  return NasaAssetKeyword;
};
