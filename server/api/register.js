const mongoose = require("mongoose");
const User = require("../models/locationSchema"); // Assuming `locationSchema` also contains the `User` model

module.exports = async (req, res) => {
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
};
