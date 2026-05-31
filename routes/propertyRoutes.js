const router = require("express").Router();

const upload = require("../middleware/upload");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const Property = require("../models/Property");


const {
  createProperty,
  getProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
  bookFlat,
  
} = require("../controllers/propertyController");


router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      properties,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// =========================
// PUBLIC
// =========================
router.get("/", getProperties);
router.get("/:id", getSingleProperty);

// =========================
// ADMIN
// =========================
router.post(
  "/",
  auth,
  isAdmin,
  upload.array("images", 5),
  createProperty
);

router.put(
  "/:id",
  auth,
  isAdmin,
  upload.array("images", 5),
  updateProperty
);

router.delete("/:id", auth, isAdmin, deleteProperty);

// =========================
// USER
// =========================
router.post("/:id/book", auth, bookFlat);

module.exports = router;