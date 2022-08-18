const { BadRequestError } = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//in app.js u need to const fileUpload = require('express-fileUpload')
//invoke it with tempFile: true -> app.use(fileUpload({useTempFiles: true}))

const sendLocal = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("no file uploaded");
  }

  const image = res.files.image;
  if (!image.mimetype.startsWith("image")) {
    throw new BadRequestError("no image");
  }

  const maxSize = 1024 * 1024;

  if (image.size > maxSize) {
    throw new BadRequestError("image too big");
  }

  const imagePath = path.join(__dirname, `../public/uploads/${image.name}`);
  await image.mv(imagePath);

  res.status(200).json({ image: { src: `/uploads/${image.name}` } });
};

//use cloudinary *VERSION 2* in app.js
// const cloudinary = require('cloudinary).v2
//cloudinary.config({cloudname, api-key, api-secret})

const send = async (req, res) => {
  if (!req.files) {
    throw new BadRequestError("no file uploaded");
  }
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "Upload",
    }
  );
  fs.unlinkSync(req.files.image.tempFilePath);
  res.status(200).json({ image: { src: result.secure_url } });
};

module.exports = { sendLocal, send };
