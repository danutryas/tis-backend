const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    // Username
    let user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (user) {
      return res.status(400).json({
        error: "Validation Error",
        ok: false,
        status: 400,
        message: "Username is already exists.",
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      return res.status(400).json({
        error: "Validation Error",
        ok: false,
        status: 400,
        message: "Email is already exists.",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
      ok: false,
      status: 500,
      message: "Internal server error.",
    });
  }
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
