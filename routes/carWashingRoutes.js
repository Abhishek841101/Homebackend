const express = require("express");
const router = express.Router();

const CarWashing = require("../models/carWashingModel");

/* =========================
   CREATE
========================= */
router.post("/create", async (req, res) => {
  try {
    const { serviceType, name, price } = req.body;

    // Validation
    if (!serviceType || !name || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const carwashing = await CarWashing.create({
      serviceType,
      name,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Car Washing Added Successfully",
      carwashing,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET ALL
========================= */
router.get("/", async (req, res) => {
  try {
    const carwashing = await CarWashing.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      carwashing,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await CarWashing.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;