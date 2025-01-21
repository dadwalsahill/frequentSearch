const Location = require("../models/locationSchema");

module.exports = async (req, res) => {
  try {
    const countryData = await Location.findOne(
      { country: req.params.country },
      { "states.name": 1, "states.cities": 1 }
    );

    if (!countryData) {
      return res.status(404).json({ error: "Country not found" });
    }

    const stateData = countryData.states.find(
      (state) => state.name === req.params.state
    );

    if (!stateData) {
      return res.status(404).json({ error: "State not found" });
    }

    res.status(200).json(stateData.cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
