const express = require("express");

const router = express.Router();

const { ridesController } = require("../../controllers");

const ridesRouter = () => {
  // rides routes
  router.route("/").get(ridesController.findRides);

  return router;
};

module.exports = ridesRouter();
