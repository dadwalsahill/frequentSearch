const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const Location = require("../models/locationSchema");
const { populateLocationData } = require("../models/data");

const app = express();

app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Populate location data
mongoose.connection.once("open", async () => {
  try {
    await populateLocationData();
  } catch (error) {
    console.error("Error populating location data:", error);
  }
});

// Define User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  lastName: { type: String, required: true, match: /^[A-Za-z]+$/ },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
  },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  age: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/countries", async (req, res) => {
  try {
    const countries = await Location.find({}, "country -_id");
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/states/:country", async (req, res) => {
  try {
    const countryData = await Location.findOne(
      { country: req.params.country },
      "states -_id"
    );
    if (!countryData)
      return res.status(404).json({ error: "Country not found" });
    res.status(200).json(countryData.states);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/cities/:country/:state", async (req, res) => {
  try {
    const countryData = await Location.findOne(
      { country: req.params.country },
      { "states.name": 1, "states.cities": 1 }
    );
    if (!countryData)
      return res.status(404).json({ error: "Country not found" });

    const stateData = countryData.states.find(
      (state) => state.name === req.params.state
    );

    if (!stateData) return res.status(404).json({ error: "State not found" });

    res.status(200).json(stateData.cities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/register", async (req, res) => {
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

module.exports = app;
