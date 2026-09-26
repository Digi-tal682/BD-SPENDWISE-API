const express = require('express');
const router = express.Router();
const Expense = require('../models/expenses');

// Overview of all expenses: totals and average
router.get('/summary', async (req, res, next) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          totalExpenses: { $sum: 1 },
          totalAmount: { $sum: '$amount' },
          averageAmount: { $avg: '$amount' }
        }
      },
      {
        $project: {
          _id: 0,
          totalExpenses: 1,
          totalAmount: 1,
          averageAmount: 1
        }
      }
    ]);

    // No expenses yet, return zeros instead of an empty array
    const summary = result[0] || {
      totalExpenses: 0,
      totalAmount: 0,
      averageAmount: 0
    };

    res.json({ success: true, data: summary });
  } catch (error) {
    next(error);
  }
});

module.exports = router;