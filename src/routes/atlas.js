const express = require('express');
const Expense = require('../models/expenses');
const router = express.Router();
router.post('/expenses', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({
      message: 'Failed to create expense',
      error: error.message
    });
  }
});
// GET all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch expenses',
      error: error.message
    });
  }
});

router.get('/summary', (req, res) => 
  res.json({ message: 'Atlas summary - TODO: Group A implement'}));

module.exports = router;

