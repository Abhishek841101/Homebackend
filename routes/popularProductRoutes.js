const express = require("express");
const router = express.Router();

const PopularProduct = require("../models/popularProductModel");
const authMiddleware = require("../middleware/auth");
const upload = require("../middleware/upload");

/* =========================
   CREATE PRODUCT
========================= */
router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { category, name, location, phone } = req.body;

      if (!category || !name || !location || !phone) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      const product = await PopularProduct.create({
        category,
        name,
        location,
        phone,
        image: req.file ? req.file.path : "",
      });

      res.status(201).json({
        success: true,
        message: "Popular Product Added Successfully",
        popularProduct: product,
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
   GET ALL PRODUCTS
========================= */
router.get("/", async (req, res) => {
  try {
    const products = await PopularProduct.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      popularProducts: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* =========================
   DELETE PRODUCT
========================= */
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await PopularProduct.findByIdAndDelete(req.params.id);

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