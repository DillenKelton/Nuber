const mongoose = require("mongoose");

const { Schema } = mongoose;

const DriverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    latitude: {
      type: Number,
      required: true,
      default: 0,
    },
    longitude: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  availability: {
    type: Boolean,
    required: true,
    default: false,
  },
  petsAllowed: {
    type: Boolean,
    required: true,
    default: false,
  },
  vehicleCapacity: {
    type: Number,
    required: true,
    default: 1,
  },
  rating: {
    ratingArray: {
      type: [Number],
      required: true,
      default: [],
    },
    ratingAverage: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  userType: {
    type: String,
    required: true,
    default: "Driver",
  },
});

module.exports = mongoose.model("Driver", DriverSchema);
