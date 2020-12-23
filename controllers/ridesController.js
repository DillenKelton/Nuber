const Rides = require("../models/Rides");

const ridesController = () => {
  // @routes REST at api/rides
  // @desc Returns rides collection
  const findRides = async (req, res) => {
    try {
      const rides = await Rides.find({});
      res.send(rides);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  return {
    findRides,
  };
};

module.exports = ridesController();
