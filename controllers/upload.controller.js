
const upload = require('../middlewares/uploadMiddleware')
const AppError = require("../utils/AppError")

const uploadSingleImage = async(req,res) => {
  if (!req.file) {
    throw new AppError('No image uploaded',404)
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  res.status(200).json({
    status: true,
    message: 'Image uploaded successfully',
    url: imageUrl,
  });
}


const uploadMultipleImage = async(req,res) => {
  if (!req.files || req.files.length === 0) {
    return next(new AppError('No image uploaded', 400));
  }

  const urls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);


  res.status(200).json({
    status: true,
    message: 'Images uploaded successfully',
    urls: urls,
  });
}

module.exports = {
    uploadSingleImage,
    uploadMultipleImage
}