const data = (sequelize, Sequelize) => {
  const AssetData = sequelize.define(
    "asset_data",
    {
      nasa_id: {
        type: Sequelize.TEXT,
        allowNull: false,
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
      media_type: {
        type: Sequelize.STRING,
      },
      date_created: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.TEXT,
      },
    },
    { tableName: "asset_data", timestamps: false }
  );
  return AssetData;
};

const link = (sequelize, Sequelize) => {
  const AssetLink = sequelize.define(
    "asset_link",
    {
      href: {
        type: Sequelize.TEXT,
      },
      rel: {
        type: Sequelize.STRING,
      },
      render: {
        type: Sequelize.STRING,
      },
    },
    { tableName: "asset_link", timestamps: false }
  );
  return AssetLink;
};

const UserLike = (sequelize, Sequelize) => {
  const userLike = sequelize.define(
    "user_like",
    {
      href: {
        type: Sequelize.TEXT,
      },
    },
    { tableName: "user_like", timestamps: false }
  );
  userLike.belongsTo(data(sequelize, Sequelize), {
    foreignKey: "assetDataId",
    as: "data",
  });
  userLike.belongsTo(link(sequelize, Sequelize), {
    foreignKey: "assetLinkId",
    as: "links",
  });

  return userLike;
};

// Define associations

module.exports = { UserLike, data, link };
