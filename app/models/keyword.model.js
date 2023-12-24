module.exports = (sequelize, Sequelize) => {
  const Keyword = sequelize.define(
    "keyword",
    {
      keywordId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: "keyword", timestamps: false }
  );

  return Keyword;
};
