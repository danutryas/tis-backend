const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.post("/api/asset/like", controller.likeNasaAsset);
  app.get("/api/asset/like", controller.getAssetAll);
};
