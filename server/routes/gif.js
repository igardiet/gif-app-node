const express = require('express');
// const multer = require("multer");
// const upload = multer({ dest: "./uploads" });
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const {
  postGif,
  getGifs,
  getGif,
  updateGif,
  deleteGif,
} = require('../controllers/gifController');

router.get('/', getGifs);
router.get('/:id', getGif);
router.post('/', requireAuth, postGif);
router.patch('/:id', requireAuth, updateGif);
router.delete('/:id', requireAuth, deleteGif);

module.exports = router;
