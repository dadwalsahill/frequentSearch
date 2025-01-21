const cors = require("cors");
const mongoose = require("mongoose");
const Location = require("../models/locationSchema");
const connectDB = require("../lib/mongoose");

// CORS options
const corsOptions = {
  origin: "*", // Adjust as necessary (e.g., use specific frontend URL)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

module.exports = async (req, res) => {
  try {
    // Log the incoming request method and headers
    console.log("Request Method:", req.method);
    console.log("Request Headers:", req.headers);

    // Apply CORS manually
    cors(corsOptions)(req, res, async () => {
      await connectDB();

      // Your actual API logic
      const countries = await Location.find({}, "country -_id");
      res.status(200).json(countries);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
