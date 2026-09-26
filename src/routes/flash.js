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

// Total spent per category, biggest first
router.get('/by-category', async (req, res, next) => {
  try {
    const { from, to } = req.query;

    if (from && isNaN(new Date(from))) {
      return res.status(400).json({ success: false, message: 'Invalid from date' });
    }
    if (to && isNaN(new Date(to))) {
      return res.status(400).json({ success: false, message: 'Invalid to date' });
    }

    const match = {};
    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const data = await Expense.aggregate([
      { $match: match },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $project: { _id: 0, category: '$_id', total: 1, count: 1 } },
      { $sort: { total: -1 } }
    ]);

    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;