const express = require('express');
const Expense = require('../models/expenses');
const router = express.Router();

// POST /api/v1/atlas/expenses - Create expense
router.post('/expenses', async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create expense', error: error.message });
  }
});

// GET /api/v1/atlas/expenses - Get all
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
});

// GET /api/v1/atlas/summary - THIS WAS THE TODO
router.get('/summary', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { totalAmount: -1 } }
    ]);

    const totalStats = await Expense.aggregate([
      {
        $group: {
          _id: null,
          grandTotal: { $sum: '$amount' },
          totalTransactions: { $sum: 1 }
        }
      }
    ]);

    res.json({
      grandTotal: totalStats[0]?.grandTotal || 0,
      totalTransactions: totalStats[0]?.totalTransactions || 0,
      byCategory: summary
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summary', error: error.message });
  }
});

module.exports = router;

