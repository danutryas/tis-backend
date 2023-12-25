const db = require("../models");
const User = db.user;
const NasaAsset = db.nasaAsset;
const Role = db.role;
const AssetData = db.assetData;
const AssetCollection = db.assetCollection;
const AssetLink = db.assetLink;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  // Save User to Database
  try {
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: bcrypt.hashSync(req.body.password, 8),
    });

    if (user) res.send({ message: "User registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).send({
        message: "Invalid Password!",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.secretKey,
      {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      }
    );

    req.session.token = token;

    return res.status(200).send({
      userId: user.userId,
      username: user.username,
      email: user.email,
      token: token,
      phoneNumber: user.phoneNumber,
    });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

exports.likeNasaAsset = async (req, res) => {
  try {
    const { userId, nasaId } = req.body;

    const user = await User.findByPk(userId);
    const nasaAsset = await NasaAsset.findByPk(nasaId);

    if (!user || !nasaAsset) {
      return res.status(404).json({ message: "User or NASA asset not found" });
    }

    // Create the association (user liking NASA asset)
    await UserLikeNasaAsset.create({
      userId,
      nasaId,
    });

    res.status(201).json({ message: "User liked NASA asset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.likeNasaAsset = async (req, res) => {
  try {
    const { userId, nasaId } = req.body;

    const user = await User.findByPk(userId);
    const nasaAsset = await NasaAsset.findByPk(nasaId);

    if (!user || !nasaAsset) {
      return res.status(404).json({ message: "User or NASA asset not found" });
    }

    // Create the association (user liking NASA asset)
    await UserLikeNasaAsset.create({
      userId,
      nasaId,
    });

    res.status(201).json({ message: "User liked NASA asset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createNasaAsset = async (req, res) => {
  try {
    const { href, data, links } = req.body;

    // Create NasaAsset
    const newNasaAsset = await NasaAsset.create({});

    // Create associated AssetData
    const newAssetData = await AssetData.create({
      nasa_id: data[0].nasa_id,
      center: data[0].center,
      title: data[0].title,
      photographer: data[0].photographer,
      location: data[0].location,
      media_type: data[0].media_type,
      date_created: data[0].date_created,
      description: data[0].description,
    });

    // Create associated AssetLink
    const newAssetLink = await AssetLink.create({
      href: links[0].href,
      rel: links[0].rel,
      render: links[0].render,
    });

    // Create associated AssetCollection
    const newAssetCollection = await AssetCollection.create({
      href,
    });

    // Associate the records
    await newNasaAsset.setAssetData(newAssetData);
    await newNasaAsset.setAssetLink(newAssetLink);
    await newNasaAsset.setAssetCollection(newAssetCollection);

    res.status(201).json(newNasaAsset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

exports.getAsset = async (req, res) => {
  const nasaId = req.params.nasaId;
  try {
    const result = await NasaAsset.findOne({
      where: { nasa_id: nasaId },
      include: [
        {
          model: AssetData,
          attributes: [
            "center",
            "title",
            "center",
            "title",
            "photographer",
            "location",
            "media_type",
            "date_created",
            "description",
          ],
        },
        { model: AssetLink, attributes: ["href", "rel", "render"] },
        { model: AssetCollection, attributes: ["href"] },
      ],
    });

    if (result) {
      const formattedResult = {
        data: [result.asset_datum],
        link: [result.asset_link],
        href: result.asset_collection.href,
      };
      res.json(formattedResult);
    } else {
      res.status(404).send("Record not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
exports.getAssetAll = async (req, res) => {
  try {
    const result = await NasaAsset.findAll({
      include: [
        {
          model: AssetData,
          attributes: [
            "nasa_id",
            "center",
            "title",
            "center",
            "title",
            "photographer",
            "location",
            "media_type",
            "date_created",
            "description",
          ],
        },
        { model: AssetLink, attributes: ["href", "rel", "render"] },
        { model: AssetCollection, attributes: ["href"] },
      ],
    });

    if (result) {
      const formattedResult = result.map((item) => ({
        data: [item.asset_datum],
        link: [item.asset_link],
        href: item.asset_collection.href,
      }));
      res.json(formattedResult);
    } else {
      res.status(404).send("No NasaAssets found.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
