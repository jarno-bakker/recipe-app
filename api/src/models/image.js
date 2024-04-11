const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  uploadDate: { type: Date, required: true },
  length: { type: Number, required: true },
  chunkSize: { type: Number, required: true },
  md5: { type: String, required: true },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
