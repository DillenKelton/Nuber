const mongoose = require("mongoose");

const { Schema } = mongoose;

const RidesSchema = new Schema({
  driverId: {
    type: String,
    required: true,
  },
  riderId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Rides", RidesSchema);
