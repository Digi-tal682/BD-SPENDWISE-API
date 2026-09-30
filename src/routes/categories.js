// routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/', (req, res) => {
  const all = Category.getAll().filter(c => c.userId === req.userId);
  res.json(all);
});

router.post('/', (req, res) => {
  const { name, type } = req.body;

  if (!name ||!type) {
    return res.status(400).json({ message: 'name and type required' });
  }
  if (!['income', 'expense'].includes(type)) {
    return res.status(400).json({ message: 'type must be income or expense' });
  }

  const cat = Category.create({ name, type, userId: req.userId });
  res.status(201).json(cat);
});

router.delete('/:id', (req, res) => {
  // simple delete logic
  const categories = require('../models/category');
  const all = categories.getAll();
  const idx = all.findIndex(c => c.id === req.params.id && c.userId === req.userId);
  if(idx === -1) return res.status(404).json({ message: 'Category not found' });
  const deleted = all.splice(idx,1)[0];
  res.json({ message: 'Category deleted', deleted });
});

module.exports = router;