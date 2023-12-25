const data = (sequelize, Sequelize) => {
  const AssetData = sequelize.define(
    "asset_data",
    {
      nasa_id: {
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

const collection = (sequelize, Sequelize) => {
  const AssetCollection = sequelize.define(
    "asset_collection",
    {
      href: {
        type: Sequelize.TEXT,
      },
    },
    { tableName: "asset_collection", timestamps: false }
  );
  return AssetCollection;
};

const nasaAsset = (sequelize, Sequelize) => {
  const NasaAsset = sequelize.define(
    "nasa_assets",
    {
      collection_id: {
        type: Sequelize.INTEGER,
      },
      nasa_id: {
        type: Sequelize.TEXT,
      },
      link_id: {
        type: Sequelize.INTEGER,
      },
    },
    { tableName: "nasa_asset", timestamps: false }
  );
  NasaAsset.belongsTo(data(sequelize, Sequelize), {
    foreignKey: "nasa_id",
    targetKey: "nasa_id",
  });
  NasaAsset.belongsTo(link(sequelize, Sequelize), {
    foreignKey: "link_id",
    targetKey: "id",
  });
  NasaAsset.belongsTo(collection(sequelize, Sequelize), {
    foreignKey: "collection_id",
    targetKey: "id",
  });

  return NasaAsset;
};

module.exports = {
  collection,
  link,
  data,
  nasaAsset,
};
