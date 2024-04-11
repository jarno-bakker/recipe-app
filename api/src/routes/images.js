const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const Image = require("../models/image");
const { GridFSBucket, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

// Endpoint om afbeelding op te halen op basis van imageId
router.get("/images/:imageId", async (req, res) => {
  try {
    const imageId = req.params.imageId;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "images" // Naam van je GridFS-bucket
    });

    const objectId = new ObjectId(imageId);
    const downloadStream = bucket.openDownloadStream(objectId);

    // Stuur de afbeeldingsgegevens als respons
    downloadStream.pipe(res);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
