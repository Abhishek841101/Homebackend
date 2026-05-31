const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    // ======================
    // SAFE CHECK (ADDED ONLY)
    // ======================
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    console.log("Mongo URI:", process.env.MONGO_URI);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connection Successful");
    console.log(`📦 DB Host: ${conn.connection.host}`);
    console.log(`📂 DB Name: ${conn.connection.name}`);

  } catch (error) {

    console.error("❌ MongoDB Connection Error:", error.message);

    process.exit(1);
  }
};

module.exports = connectDB;