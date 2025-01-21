const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // If already connected, use the existing connection
    if (mongoose.connection.readyState >= 1) {
      console.log("Already connected to MongoDB");
      return;
    }

    // MongoDB URI from environment variable or fallback for local development
    const dbUri = process.env.MONGODB_URI;

    // Connect to MongoDB
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error: ", error.message);
    throw new Error("Failed to connect to MongoDB");
  }
};

// Event listeners for better debugging and cleanup
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to the database");
});

mongoose.connection.on("error", (err) => {
  console.error(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose connection is disconnected");
});

// Close the Mongoose connection when the process ends
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("Mongoose connection is disconnected due to app termination");
  process.exit(0);
});

module.exports = connectDB;
