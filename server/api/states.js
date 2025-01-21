const Location = require("../models/locationSchema");
const connectDB = require("../lib/mongoose");

module.exports = async (req, res) => {
  try {
    await connectDB();
    const countryData = await Location.findOne(
      { country: req.params.country },
      "states -_id"
    );
    if (!countryData) {
      return res.status(404).json({ error: "Country not found" });
    }
    res.status(200).json(countryData.states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
