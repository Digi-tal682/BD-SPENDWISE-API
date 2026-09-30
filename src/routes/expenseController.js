// routes/expenses.js
const express = require('express');
const router = express.Router();
const Expense = require('../models/expenses');



router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;