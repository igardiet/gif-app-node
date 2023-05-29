const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gifSchema = new Schema(
  {
    title: {
      type: String,
      required: false,
    },
    img: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gif', gifSchema);
