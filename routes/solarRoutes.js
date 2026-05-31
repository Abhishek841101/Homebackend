const express = require("express");
const router = express.Router();

const Solar = require("../models/Solar");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

/* =========================
   CREATE SOLAR LISTING
========================= */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const solar = new Solar({
        image: req.file ? req.file.path : "",
        phone: req.body.phone,
        location: req.body.location,
        watt: req.body.watt,
        warranty: req.body.warranty,
        lat: req.body.lat,
        lng: req.body.lng,
      });

      await solar.save();

      res.status(201).json({
        success: true,
        message: "Solar added successfully",
        solar,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

/* =========================
   GET ALL SOLAR LISTINGS
========================= */
router.get("/", async (req, res) => {
  try {
    const solarList = await Solar.find().sort({ createdAt: -1 });

      console.log("🚀 visha el");


    res.status(200).json({
      success: true,
      solarList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   GET SINGLE SOLAR BY ID
========================= */
router.get("/:id", async (req, res) => {
  try {
    const solar = await Solar.findById(req.params.id);

    if (!solar) {
      return res.status(404).json({
        success: false,
        message: "Solar not found",
      });
    }

    res.status(200).json({
      success: true,
      solar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE SOLAR
========================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Solar.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Solar deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;