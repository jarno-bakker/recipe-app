const express = require("express");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");

const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(
  cors({
    origin: ["https://recepten.jarno-bakker.nl", "http://localhost:5173"],
  })
);

const mongoURI = process.env.DATABASE_URL;
const connection = mongoose.createConnection(mongoURI);

let gfs;
connection.once("open", () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection("uploads");
});

app.get("/files/:filename", async (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, res) => {
    if (!file || file.listen === 0) {
      return res.status(404).json({
        err: "No file exists",
      });
    }
    return res.json(file);
  });
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
