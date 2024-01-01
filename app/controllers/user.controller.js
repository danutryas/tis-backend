const db = require("../models");

const UserLike = db.userLike;
const assetData = db.assetData;
const assetLink = db.assetLink;

exports.likeNasaAsset = async (req, res) => {
  try {
    const { href, data, links } = req.body;

    const createdAssetData = await assetData.create(data[0]);
    const createdAssetLink = await assetLink.create(links[0]);

    const addLike = await UserLike.create({
      href,
      assetDataId: createdAssetData.id,
      assetLinkId: createdAssetLink.id,
    });

    if (addLike) {
      res.status(201).json({ message: "User liked NASA asset successfully" });
    } else {
      res.status(500).json({ message: "Creation is failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
exports.getAssetAll = async (req, res) => {
  try {
    const likedAssets = await UserLike.findAll({
      attributes: { exclude: ["id", "assetDataId", "assetLinkId"] },
      include: [
        {
          model: assetData,
          attributes: [
            "center",
            "title",
            "photographer",
            "location",
            "media_type",
            "date_created",
            "description",
          ],
          as: "data",
        },
        {
          model: assetLink,
          attributes: ["href", "rel", "render"],
          as: "links",
        },
      ],
    });

    // Transforming the data to the desired format
    const formattedAssets = likedAssets.map((asset) => {
      return {
        href: asset.links.href,
        data: [
          {
            center: asset.data.center,
            title: asset.data.title,
            keywords: [], // Add your keywords logic here if available
            location: asset.data.location,
            nasa_id: asset.data.nasa_id,
            date_created: asset.data.date_created,
            media_type: asset.data.media_type,
            description_508: asset.data.description_508,
            secondary_creator: asset.data.secondary_creator,
            description: asset.data.description,
          },
        ],
        links: [
          {
            href: asset.links.href,
            rel: asset.links.rel,
            render: asset.links.render,
          },
          // Add more link objects if available
        ],
      };
    });

    res.status(200).json(formattedAssets);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
