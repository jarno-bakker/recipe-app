const Grid = require("gridfs-stream");
const mongoose = require("mongoose");
const fs = require("fs");
const DBString = process.env.DATABASE_URL;

//DATABASE Connection
mongoose.connect(DBString);
const database = mongoose.connection;

let gfs;

database.once("open", () => {
  gfs = Grid(database.db, mongoose.mongo);
  gfs.collection("images");
});

async function uploadToGridFS(filePath) {
  const fileStream = fs.createReadStream(filePath);
  const uploadStream = gfs.createWriteStream({
    filename: "filename.jpg", // Naam van het bestand in GridFS
  });
  fileStream.pipe(uploadStream);

  return new Promise((resolve, reject) => {
    uploadStream.on("close", (file) => {
      console.log("nieuwe id", file._id);
      resolve(file._id); // Retourneer de ObjectID van het geüploade bestand
    });

    uploadStream.on("error", (error) => {
      reject(error);
    });
  });
}

module.exports = { uploadToGridFS };
