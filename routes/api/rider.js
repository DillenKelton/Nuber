const express = require("express");

const router = express.Router();

const { riderController } = require("../../controllers");

const riderRouter = () => {
  // rider routes
  router.route("/").get(riderController.findRider);
  router.route("/viewDriverByRating").get(riderController.viewDriverByRating);
  router.route("/seeDriverLocation/:id").get(riderController.seeDriverLocation);
  router.route("/findNearByDrivers/:id").get(riderController.findNearByDrivers);
  router
    .route("/viewDriverCapacity/:id")
    .get(riderController.viewDriverCapacity);
  router
    .route("/viewDriverPetPrefs/:id")
    .get(riderController.viewDriverPetPrefs);
  router.route("/selectDriver").post(riderController.selectDriver);
  router.route("/leaveDriverRating").post(riderController.leaveDriverRating);
  router.route("/setRiderDestination").put(riderController.setRiderDestination);
  router.route("/setRiderLocation").put(riderController.setRiderLocation);

  return router;
};

module.exports = riderRouter();
