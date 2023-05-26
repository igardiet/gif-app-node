const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/requireAuth');
const categoryModel = require('../models/categoryModel');

router.get('/', async (req, res) => {
  try {
    const categories = await categoryModel.find();
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { name } = req.body;
    const category = await categoryModel.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
