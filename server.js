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

process.on("SIGINT", async () => {
  try {
    // Close the Sequelize connection before exiting
    await db.sequelize.close();
    console.log("Sequelize connection closed. Exiting...");
    process.exit(0);
  } catch (error) {
    console.error("Error closing Sequelize connection:", error);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Promise Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Close the server on process termination
process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Closing server...");
  server.close(() => {
    console.log("Server closed. Exiting...");
    process.exit(0);
  });
});
