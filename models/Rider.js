const mongoose = require("mongoose");

const { Schema } = mongoose;

const RiderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: "default",
  },
  destination: {
    type: String,
    required: true,
    default: "default",
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
  usertype: {
    type: String,
    required: true,
    default: "Rider",
  },
});

module.exports = mongoose.model("Rider", RiderSchema);
