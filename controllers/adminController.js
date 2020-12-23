const mongoose = require("mongoose");

const Admin = require("../models/Admin");
const Driver = require("../models/Driver");
const Rider = require("../models/Rider");

mongoose.set("useFindAndModify", false);

const adminController = () => {
  // @routes REST at api/admin
  // @desc Returns admin collection
  const findAdmin = async (req, res) => {
    try {
      const admins = await Admin.find({});
      res.send(admins);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Add a new Admin
  const addAdmin = async (req, res) => {
    try {
      // create new admin in Admin
      const newAdmin = await Admin.create(req.body);
      res.status(200).send(newAdmin);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Remove an Admin
  const removeAdmin = async (req, res) => {
    try {
      // remove admin from Admin
      const removedAdmin = await Admin.findByIdAndDelete(req.params.id);
      res.status(200).send(removedAdmin);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Add a new Driver
  const addDriver = async (req, res) => {
    try {
      // create new driver in Admin
      const newDriver = await Driver.create(req.body);
      res.status(200).send(newDriver);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Remove a Driver
  const removeDriver = async (req, res) => {
    try {
      // remove driver from Admin
      const removedDriver = await Driver.findByIdAndDelete(req.params.id);
      res.status(200).send(removedDriver);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Add a new Rider
  const addRider = async (req, res) => {
    try {
      // create new rider in Admin
      const newRider = await Rider.create(req.body);
      res.status(200).send(newRider);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  // @desc Remove a Rider
  const removeRider = async (req, res) => {
    try {
      // remove rider from Admin
      const removedRider = await Rider.findByIdAndDelete(req.params.id);
      res.status(200).send(removedRider);
    } catch (error) {
      res.status(400).send(error);
    }
  };

  return {
    findAdmin,
    addAdmin,
    removeAdmin,
    addDriver,
    removeDriver,
    addRider,
    removeRider,
  };
};

module.exports = adminController();
