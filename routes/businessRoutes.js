// routes/businessRoutes.js

const express = require("express");

const router = express.Router();

const Business = require("../models/Business");

/* =========================
   CREATE BUSINESS
========================= */
router.post("/create", async (req, res) => {
  try {
    console.log("🚀 BUSINESS CREATE HIT");
    console.log("📦 BODY:", req.body);

    const business = new Business({
      businessName: req.body.businessName,
      ownerName: req.body.ownerName,
      mobile: req.body.mobile,
      email: req.body.email,
      category: req.body.category,
      city: req.body.city,
      description: req.body.description,
    });

    await business.save();

    res.status(201).json({
      success: true,
      message: "Business added successfully",
      business,
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
   GET ALL BUSINESSES
========================= */
router.get("/", async (req, res) => {
  try {
    const businesses = await Business.find().sort({
      createdAt: -1,
    });

    console.log("🚀 GET ALL BUSINESSES");

    res.status(200).json({
      success: true,
      businesses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET SINGLE BUSINESS
========================= */
router.get("/:id", async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);

    if (!business) {
      return res.status(404).json({
        success: false,
        message: "Business not found",
      });
    }

    res.status(200).json({
      success: true,
      business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE BUSINESS
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Business.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Business deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;