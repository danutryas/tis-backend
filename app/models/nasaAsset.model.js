module.exports = (sequelize, Sequelize) => {
  const NasaAsset = sequelize.define(
    "nasa_assets",
    {
      nasaId: {
        type: Sequelize.TEXT,
        allowNull: false,
        primaryKey: true,
      },
      center: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      photographer: {
        type: Sequelize.STRING,
      },
      location: {
        type: Sequelize.STRING,
      },
      mediaType: {
        type: Sequelize.STRING,
      },
      dateCreated: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
    },
    { tableName: "nasa_asset", timestamps: false }
  );
  return NasaAsset;
};
