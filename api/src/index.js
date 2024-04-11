const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const DBString = process.env.DATABASE_URL;
const bodyParser = require("body-parser");

// Set up the express app
const app = express();
app.use(
  cors({
    origin: "https://recepten.jarno-bakker.nl",
  })
);
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));

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
app.use("/recipes", router);

const wakeupRouter = express.Router();
app.use(
  "/wakeup",
  wakeupRouter.get("/", async (req, res) => {
    res.json("Hi there!");
  })
);

//Server Started
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
