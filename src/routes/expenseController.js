const express = require('express');
const router = express.Router();
const Expense = require('../models/expenses');

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id });
    res.json(expenses);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const expense = await Expense.create({
      title: req.body.title,
      amount: req.body.amount,
      category: req.body.category,
      user: req.user.id
    });
    res.status(201).json(expense);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

module.exports = router;