const express = require('express');
const Expense = require('../models/expenses');
const router = express.Router();

// --- VALIDATION MIDDLEWARE ---
const validateExpense = (req, res, next) => {
  const { amount, category } = req.body;
  if (req.method === 'POST' || (req.method === 'PUT' && amount!== undefined)) {
    if (amount == null || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ message: 'Validation failed: amount must be a number > 0' });
    }
  }
  if (req.method === 'POST' || (req.method === 'PUT' && category!== undefined)) {
    if (!category || String(category).trim() === '') {
      return res.status(400).json({ message: 'Validation failed: category is required' });
    }
  }
  next();
};

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

// --- NEW: UPDATE ENDPOINT ---
// PUT /api/v1/atlas/expenses/:id
router.put('/expenses/:id', validateExpense, async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update expense', error: error.message });
  }
});

// --- NEW: DELETE ENDPOINT ---
// DELETE /api/v1/atlas/expenses/:id
router.delete('/expenses/:id', async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted successfully', deleted });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense', error: error.message });
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

