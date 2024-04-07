const express = require("express");
const mongoose = require("mongoose");
const isAuthorized = require("./middleware/authorization");
require("dotenv").config();
const DBString = process.env.DATABASE_URL;

// Set up the express app
const app = express();

//Allows us to accept the data in JSON format
app.use(express.json());

//DATABASE Connection
mongoose.connect(DBString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

const router = require("./routes/recipes");
app.use("/recipes", isAuthorized, router);

//Server Started
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
