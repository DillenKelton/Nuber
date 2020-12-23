const Rider = require("../models/Rider");
const Driver = require("../models/Driver");
const Rides = require("../models/Rides");
const {
  verifyAddress,
  getCoords,
  getDistance,
} = require("../utils/googleApiUtils");
const { findRatingAverage } = require("../utils/ratingsUtils");

const riderController = () => {
  // @routes REST at api/rider
  // @desc Returns rider collection
  const findRider = async (req, res) => {
    try {
      const riders = await Rider.find({});
      res.send(riders);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const selectDriver = async (req, res) => {
    try {
      // check that rider exists
      await Rider.findById(req.body.riderId);

      // update driver availability to false
      const selectedDriver = await Driver.findByIdAndUpdate(req.body.driverId, {
        availability: false,
      });

      // create a ride in Rides
      await Rides.create({
        driverId: req.body.driverId,
        riderId: req.body.riderId,
      });

      res.send(`Success, your driver is ${selectedDriver.name}`);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  const seeDriverLocation = async (req, res) => {
    try {
      const rider = await Rider.findById(req.params.id);
      if (!rider) {
        throw new Error("rider does not exist");
      }

      const ride = await Rides.findOne({ riderId: req.params.id });

      if (!ride) {
        throw new Error("No assigned rider found");
      }

      const driver = await Driver.findById(ride.driverId);

      res.status(200).send({ position: driver.position });
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  // Sets Rider destination based on ID if address and ID are verified
  const setRiderDestination = async (req, res) => {
    try {
      // Check that rider exists
      const rider = await Rider.findById(req.body.riderId);
      if (!rider) {
        throw new Error("Rider not found");
      }

      // Verifies that the adress is correct
      const check = await verifyAddress(req.body.destination);

      const riderDestination = await Rider.findByIdAndUpdate(
        req.body.riderId,
        {
          destination: check,
        },
        { new: true }
      );

      res.send(riderDestination);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  // Sets Rider location based on ID if address and ID are verified
  const setRiderLocation = async (req, res) => {
    try {
      // Check that rider exists
      const rider = await Rider.findById(req.body.riderId);
      if (!rider) {
        throw new Error("Rider not found");
      }
      // Verifies that the adress is correct
      const check = await verifyAddress(req.body.location);

      if (!check) {
        throw new Error("Address not found");
      }

      const riderLocation = await Rider.findByIdAndUpdate(
        req.body.riderId,
        {
          location: check,
        },
        { new: true }
      );
      res.send(riderLocation);
    } catch (e) {
      res.status(400).send({ error: e.message });
    }
  };

  // @desc leave driver rating using driver id and calculate the rating average
  const leaveDriverRating = async (req, res) => {
    try {
      // Update driver array with new rating
      let driver = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          $push: { "rating.ratingArray": [req.body.rating] },
        },
        { new: true }
      );

      if (!driver) throw new Error("Driver not found");

      // Update driver rating average with new ratings
      driver = await Driver.findByIdAndUpdate(
        req.body.driverId,
        {
          "rating.ratingAverage": findRatingAverage(driver.rating.ratingArray),
        },
        { new: true }
      );

      res.status(200).send(driver);
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };
  // function will get all drivers within 10mi and send them to rider
  const findNearByDrivers = async (req, res) => {
    try {
      // check that rider exists and puts the object found into a temp
      const rider = await Rider.findById(req.params.id);
      if (!rider) throw new Error("Rider does not exist");

      // get riders coordinates
      const riderCoords = await getCoords(rider.location);

      // Grabs all available Drivers from DB into a local array
      const localDrivers = await Driver.find({
        availability: true,
      });

      let driversDistance = [];
      // Get all drivers distance from the Rider synchronously
      localDrivers.forEach((driver) => {
        driversDistance.push(
          getDistance(
            riderCoords.lat,
            riderCoords.lng,
            driver.position.latitude,
            driver.position.longitude
          )
        );
      });

      driversDistance = await Promise.all(driversDistance);

      const result = [];

      // only show drivers distance within 10 miles
      for (let i = 0; i < driversDistance.length; i += 1) {
        if (driversDistance[i] <= 10) {
          const driverWithDistance = {
            driver: localDrivers[i],
            distance: driversDistance[i],
          };
          result.push(driverWithDistance);
        }
      }

      result.sort((a, b) => (a.distance > b.distance) ? 1 : -1);

      res.send(result);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };

  // Views Driver Capacity
  const viewDriverCapacity = async (req, res) => {
    try {
      // Check that driver exists
      const driver = await Driver.findById(req.params.id);
      if (!driver) {
        throw new Error("Driver not found");
      }

      res.status(200).send({ vehicleCapacity: driver.vehicleCapacity });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  // @desc Returns a list of all available drivers sorted by their rating averages
  const viewDriverByRating = async (req, res) => {
    try {
      // Grabs all available drivers
      const drivers = await Driver.find({ availability: true });

      // Sorts drivers by rating average
      drivers.sort((a, b) => {
        return b.rating.ratingAverage - a.rating.ratingAverage;
      });

      // Sends a response with the sorted list of drivers
      res.send(drivers);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  };
  // Views Pet Prefrences
  const viewDriverPetPrefs = async (req, res) => {
    try {
      // Check that driver exists
      const driver = await Driver.findById(req.params.id);
      if (!driver) {
        throw new Error("Driver not found");
      }

      res.status(200).send({ petsAllowed: driver.petsAllowed });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  };

  return {
    findRider,
    selectDriver,
    setRiderLocation,
    seeDriverLocation,
    findNearByDrivers,
    setRiderDestination,
    leaveDriverRating,
    viewDriverCapacity,
    viewDriverByRating,
    viewDriverPetPrefs,
  };
};
module.exports = riderController();
