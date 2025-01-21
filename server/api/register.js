const cors = require("cors");
const User = require("../models/userSchema");
const connectDB = require("../lib/mongoose");

// CORS options
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
};

module.exports = async (req, res) => {
  try {
    cors(corsOptions)(req, res, async () => {
      await connectDB();

      const userData = req.body;

      const age = Math.floor(
        (new Date() - new Date(userData.dob)) / (365.25 * 24 * 60 * 60 * 1000)
      );

      if (age < 14 || age > 99) {
        return res
          .status(400)
          .json({ error: "Age must be between 14 and 99 years" });
      }

      try {
        const user = new User({ ...userData, age });

        await user.save();

        res.status(200).json({ message: "User registered successfully", user });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
