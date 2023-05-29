const mongoose = require('mongoose');
const Gif = require('../models/gifModel');
const User = require('../models/userModel');
const { uploadFile } = require('../cloudinary/cloudinary');

const getGifs = async (req, res) => {
  try {
    const gifs = await Gif.find({ category: 'akira' })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json(gifs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid GIF ID!' });
  }

  const gif = await Gif.findById(id);

  if (!gif) {
    return res.status(404).json({ error: 'Gif not found!' });
  }
  res.status(200).json(gif);
};

const postGif = async (req, res) => {
  const { email } = req.body;
  const img = req.files.img.tempFilePath;
  try {
    const user = await User.findOne({ email });
    const result = await uploadFile(img);

    const gif = await Gif.create({
      user_id: user._id,
      img: result.secure_url,
    });
    return res.status(201).json({
      success: true,
      gif,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid GIF ID!' });
  }
  const gif = await Gif.findOneAndDelete({ _id: id });

  if (!gif) {
    return res.status(400).json({ error: 'Invalid GIF ID!' });
  }
  res.status(200).json(gif);
};

const updateGif = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid GIF ID!' });
  }
  const gif = await Gif.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!gif) {
    return res.status(400).json({ error: 'Gif not found!' });
  }
  res.status(200).json(gif);
};

module.exports = {
  getGifs,
  getGif,
  postGif,
  deleteGif,
  updateGif,
};
