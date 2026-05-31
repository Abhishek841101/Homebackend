// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// // LOAD ENV
// dotenv.config();

// // APP
// const app = express();

// /* ======================
//    ENV CHECK
// ====================== */
// console.log("ENV CHECK MONGO_URI:", process.env.MONGO_URI);

// /* ======================
//    DB CONNECT
// ====================== */
// const connectDB = require("./config/db");

// /* ======================
//    CORS FIX (UPDATED ONLY THIS PART)
// ====================== */
// const allowedOrigins = [
//   "http://localhost:5173",
//   "http://localhost:3000",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // allow requests like Postman or server-to-server
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }

//       return callback(new Error("Not allowed by CORS"));
//     },
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     credentials: true,
//   })
// );

// /* OPTIONS HANDLER */
// app.options("*", cors());

// /* ======================
//    BODY PARSER
// ====================== */
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// /* ======================
//    GLOBAL REQUEST LOGGER
// ====================== */
// app.use((req, res, next) => {
//   console.log(`\n📩 GLOBAL HIT -> ${req.method} ${req.url}`);
//   next();
// });

// /* ======================
//    PROPERTY DEBUG LOGGER
// ====================== */
// app.use("/api/properties", (req, res, next) => {
//   console.log("🚀 vishal");
//   console.log("\n🏠 PROPERTY ROUTE HIT");
//   console.log("📩 METHOD:", req.method);
//   console.log("📍 URL:", req.originalUrl);
//   console.log("📦 BODY:", req.body);
//   console.log("📎 QUERY:", req.query);
//   next();
// });

// /* ======================
//    STATIC FILES
// ====================== */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ======================
//    ROUTES IMPORT
// ====================== */
// const authRoutes = require("./routes/authRoutes");
// const propertyRoutes = require("./routes/propertyRoutes");
// const solarRoutes = require("./routes/solarRoutes");
// const businessRoutes = require("./routes/businessRoutes"); // ADD THIS
// const carWashingRoutes = require("./routes/carWashingRoutes");
// const popularProductRoutes = require("./routes/popularProductRoutes");


// /* ======================
//    ROUTES
// ====================== */
// app.use("/api/auth", authRoutes);
// app.use("/api/properties", propertyRoutes);
// app.use("/api/solar", solarRoutes);
// app.use("/api/business", businessRoutes); // ADD THIS
// app.use("/api/carwashing", carWashingRoutes);  
// app.use("/api/popularproduct", popularProductRoutes);


// /* ======================
//    HEALTH CHECK
// ====================== */
// app.get("/healthz", (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Backend is healthy 🚀",
//   });
// });

// /* ======================
//    ROOT ROUTE
// ====================== */
// app.get("/", (req, res) => {
//   res.send("Backend Running 🚀");
// });

// /* ======================
//    404 HANDLER
// ====================== */
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// /* ======================
//    GLOBAL ERROR HANDLER
// ====================== */
// app.use((err, req, res, next) => {
//   console.error("🔥 ERROR:", err);

//   res.status(500).json({
//     success: false,
//     message: err.message || "Internal Server Error",
//   });
// });

// /* ======================
//    START SERVER
// ====================== */
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();

//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("🔥 Failed to start server:", error);
//   }
// };

// startServer();







const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// LOAD ENV
dotenv.config();

// APP
const app = express();

/* ======================
   ENV CHECK
====================== */
console.log("ENV CHECK MONGO_URI:", process.env.MONGO_URI);

/* ======================
   DB CONNECT
====================== */
const connectDB = require("./config/db");

/* ======================
   CORS FIX
====================== */
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* ======================
   BODY PARSER
====================== */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   GLOBAL REQUEST LOGGER
====================== */
app.use((req, res, next) => {
  console.log(`📩 GLOBAL HIT -> ${req.method} ${req.url}`);
  next();
});

/* ======================
   PROPERTY DEBUG LOGGER
====================== */
app.use("/api/properties", (req, res, next) => {
  console.log("🏠 PROPERTY ROUTE HIT");
  next();
});

/* ======================
   STATIC FILES
====================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ======================
   ROUTES IMPORT
====================== */
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const solarRoutes = require("./routes/solarRoutes");
const businessRoutes = require("./routes/businessRoutes");
const carWashingRoutes = require("./routes/carWashingRoutes");
const popularProductRoutes = require("./routes/popularProductRoutes");

/* ======================
   ROUTES
====================== */
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/solar", solarRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/carwashing", carWashingRoutes);
app.use("/api/popularproduct", popularProductRoutes);

/* ======================
   HEALTH CHECK
====================== */
app.get("/healthz", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy 🚀",
  });
});

/* ======================
   ROOT ROUTE
====================== */
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

/* ======================
   404 HANDLER
====================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ======================
   GLOBAL ERROR HANDLER
====================== */
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ======================
   START SERVER
====================== */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("🔥 Failed to start server:", error);
  }
};

startServer();