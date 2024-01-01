const db = require("../models");
const User = db.user;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    // Extract user input from request body
    const { username, email, password, name } = req.body;

    // Check if required fields are provided
    if (!username || !email || !password || !name) {
      return res.status(400).json({
        error: "Validation Error",
        ok: false,
        status: 400,
        message: "Name, username, email, and password are required fields.",
      });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      name,
      email,
      password: bcrypt.hashSync(password, 8),
    });

    if (newUser) {
      return res.status(201).json({
        error: null,
        ok: true,
        status: 201,
        message: "User registered successfully!",
      });
    } else {
      return res.status(500).json({
        error: "Server Error",
        ok: false,
        status: 500,
        message: "Failed to register user. Please Try Again.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "Server Error",
      ok: false,
      status: 500,
      message: "Internal server error.",
    });
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
      name: user.name,
      username: user.username,
      email: user.email,
      token: token,
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
