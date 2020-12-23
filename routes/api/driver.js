const express = require("express");

const router = express.Router();

const { driverController } = require("../../controllers");

const driverRouter = () => {
  // driver routes
  router.route("/").get(driverController.findDriver);
  router
    .route("/seeRiderDestination/:id")
    .get(driverController.seeRiderDestination);
  router
    .route("/getAssignedRiderLocation/:id")
    .get(driverController.viewAssignedRiderLocation);
  router.route("/leaveRiderRating").post(driverController.leaveRiderRating);
  router
    .route("/updateDriverAvailability")
    .put(driverController.updateDriverAvailability);
  router
    .route("/updateDriverCapacity")
    .put(driverController.updateDriverCapacity);
  router
    .route("/updateDriverPosition")
    .put(driverController.updateDriverPosition);
  router.route("/updateDriverPet").put(driverController.updateDriverPet);

  return router;
};

module.exports = driverRouter();
