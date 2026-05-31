const mongoose = require("mongoose");

const solarSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    watt: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      default: "Not specified",
    },
    lat: String,
    lng: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Solar", solarSchema);