module.exports = (sequelize, Sequelize) => {
  const Apod = sequelize.define(
    "apod",
    {
      date: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
      },
      explanation: {
        type: Sequelize.TEXT,
      },
      hdurl: {
        type: Sequelize.STRING,
      },
      media_type: {
        type: Sequelize.STRING,
      },
      service_version: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
    },
    { tableName: "apod", timestamps: false }
  );
  return Apod;
};
