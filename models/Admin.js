const mongoose = require("mongoose");

const { Schema } = mongoose;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  usertype: {
    type: String,
    required: true,
    default: "Admin",
  },
});

module.exports = mongoose.model("Admin", AdminSchema);
