const Driver = require("../models/Driver");
const Rider = require("../models/Rider");
const Rides = require("../models/Rides");

const { findRatingAverage } = require("../utils/ratingsUtils");

const driverController = () => {
  // @routes REST at api/driver
  // @desc Returns driver collection
  const findDriver = async (req, res) => {
    try {
      const drivers = await Driver.find({});
      res.send(drivers);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // This function updates driver availability when requested by driver.
  const updateDriverAvailability = async (req, res) => {
    try {
      const tempDriver = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          availability: req.body.availability,
        },
        { new: true }
      );

      if (!tempDriver) {
        throw new Error("Driver does not exist");
      }

      if (req.body.availability === true) {
        Rides.findOneAndDelete(
          { driverId: req.body.driverId },
          (error, docs) => {}
        );
      }

      res.send(tempDriver);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  // @desc Get driver's assigned rider's location
  const viewAssignedRiderLocation = async (req, res) => {
    try {
      const driver = await Driver.findById(req.params.id);
      if (!driver) {
        throw new Error("Driver does not exist");
      }

      const ride = await Rides.findOne({ driverId: req.params.id });

      if (!ride) {
        throw new Error("No assigned rider found");
      }

      const rider = await Rider.findById(ride.riderId);

      res.status(200).send({ location: rider.location });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  // @desc update driver's position
  const updateDriverPosition = async (req, res) => {
    try {
      const driverPos = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          position: req.body.position,
        },
        { new: true }
      );

      if (!driverPos) throw new Error("Driver does not exist");

      res.send(driverPos);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  // @desc Updates driver's rider capacity
  const updateDriverCapacity = async (req, res) => {
    try {
      const driver = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          vehicleCapacity: req.body.vehicleCapacity,
        },
        { new: true }
      );

      if (!driver) throw new Error("Driver does not exist");

      res.send(driver);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  // @desc Updates rider rating array and avg with drivers new rating
  const leaveRiderRating = async (req, res) => {
    try {
      // Pushes new rating to ratingArray
      let rider = await Rider.findByIdAndUpdate(
        req.body.riderId,
        {
          $push: { "rating.ratingArray": [req.body.rating] },
        },
        { new: true }
      );

      if (!rider) throw new Error("Rider does not exist");

      // Updates rating average
      rider = await Rider.findByIdAndUpdate(
        req.body.riderId,
        {
          "rating.ratingAverage": findRatingAverage(rider.rating.ratingArray),
        },
        { new: true }
      );

      res.send(rider);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  // @desc Driver views Rider's destination
  const seeRiderDestination = async (req, res) => {
    try {
      // checks that Driver exists
      const driver = await Driver.findById(req.params.id);
      if (!driver) {
        throw new Error("driver does not exist");
      }

      // find existing Ride by Driver ID
      const ride = await Rides.findOne({ driverId: req.params.id });
      if (!ride) {
        throw new Error("No assigned driver found");
      }

      // get Rider ID from Ride
      const rider = await Rider.findById(ride.riderId);

      // return Rider destination
      res.status(200).send({ destination: rider.destination });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  // @desc Driver set pet preference
  const updateDriverPet = async (req, res) => {
    try {
      const driverPet = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          petsAllowed: req.body.petsAllowed,
        },
        { new: true }
      );
      if (!driverPet) {
        throw new Error("Driver does not exist");
      }

      res.send(driverPet);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  return {
    findDriver,
    updateDriverAvailability,
    seeRiderDestination,
    viewAssignedRiderLocation,
    updateDriverPosition,
    updateDriverCapacity,
    leaveRiderRating,
    updateDriverPet,
  };
};

module.exports = driverController();
