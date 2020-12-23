const express = require("express");

const router = express.Router();

const { adminController } = require("../../controllers");

const adminRouter = () => {
  // admin routes
  router.route("/").get(adminController.findAdmin);
  router.route("/addAdmin").post(adminController.addAdmin);
  router.route("/addDriver").post(adminController.addDriver);
  router.route("/addRider").post(adminController.addRider);
  router.route("/:id").delete(adminController.removeAdmin);
  router.route("/removeDriver/:id").delete(adminController.removeDriver);
  router.route("/removeRider/:id").delete(adminController.removeRider);

  return router;
};

module.exports = adminRouter();
