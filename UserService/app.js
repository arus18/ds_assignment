const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const MONGO_URI = process.env.MONGO_URI + "/userdb";

const app = express();
const sellerRoutes = require("./routes/seller");
const buyerRoutes = require("./routes/buyer");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
console.log("Connecting using URI - " + MONGO_URI);

// Routes
app.use("/seller", sellerRoutes);
app.use("/buyer", buyerRoutes);

// Start the server
const port = process.env.PORT || 3006;

async function main() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    app.listen(port, () => console.log(`Listening on port ${port}...`));
  } catch (e) {
    console.log("Starting User Service failed with ", e);
  }
}

main();
