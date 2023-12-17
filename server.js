require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "tis-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
  })
);

const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to tis application" });
});

// app.options("*", cors());

// app.use("/api/v1/clothes", clothesRouter);

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

const APP_PORT = process.env.PORT || 8000;

app.listen(APP_PORT, () => console.log(`app listening on port ${APP_PORT}`));

const initial = () => {
  Role.create({
    id: 1,
    name: "user",
  });
  Role.create({
    id: 2,
    name: "moderator",
  });
  Role.create({
    id: 3,
    name: "admin",
  });
};
