const cors = require("cors");
const Location = require("../models/locationSchema");
const connectDB = require("../lib/mongoose");
const User = require("../models/userSchema");

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

      if (req.method === "POST") {
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
          return res
            .status(200)
            .json({ message: "User registered successfully", user });
        } catch (error) {
          return res.status(500).json({ error: error.message });
        }
      }

      const { country, state } = req.query;

      if (!country && !state) {
        const countries = await Location.find({}, "country -_id");
        return res.status(200).json(countries);
      }

      if (country && !state) {
        const countryData = await Location.findOne({ country }, "states -_id");
        if (!countryData) {
          return res.status(404).json({ error: "Country not found" });
        }
        return res.status(200).json(countryData.states);
      }

      if (country && state) {
        const countryData = await Location.findOne(
          { country },
          { "states.name": 1, "states.cities": 1 }
        );

        if (!countryData) {
          return res.status(404).json({ error: "Country not found" });
        }

        const stateData = countryData.states.find(
          (stateObj) => stateObj.name === state
        );

        if (!stateData) {
          return res.status(404).json({ error: "State not found" });
        }

        return res.status(200).json(stateData.cities);
      }

      res.status(400).json({ error: "Invalid query parameters" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
