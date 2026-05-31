const mongoose = require("mongoose");

const popularProductSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["B2B", "REAL STATE", "Solar", "CarWashing"],
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PopularProduct", popularProductSchema);