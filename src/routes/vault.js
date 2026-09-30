const express = require('express');
const router = express.Router();
const Expense = require('../models/expenses');

// In-memory storage for Vault (as per project spec)
let budgets = [];
let idCounter = 1;

// Validation for Vault
const validateBudget = (req, res, next) => {
  const { category, limit } = req.body;
  if (req.method === 'POST') {
    if (!category || String(category).trim() === '') {
      return res.status(400).json({ message: 'Validation failed: category is required' });
    }
    if (limit == null || isNaN(limit) || Number(limit) <= 0) {
      return res.status(400).json({ message: 'Validation failed: limit must be > 0' });
    }
  }
  if (req.method === 'PUT') {
    if (limit!== undefined && (isNaN(limit) || Number(limit) <= 0)) {
      return res.status(400).json({ message: 'Validation failed: limit must be > 0' });
    }
    if (category!== undefined && String(category).trim() === '') {
      return res.status(400).json({ message: 'Validation failed: category cannot be empty' });
    }
  }
  next();
};

// POST /api/v1/vault/budgets - Create budget
router.post('/budgets', validateBudget, (req, res) => {
  const { category, limit } = req.body;
  const newBudget = { id: String(idCounter++), category, limit: Number(limit), createdAt: new Date() };
  budgets.push(newBudget);
  res.status(201).json(newBudget);
});

// GET /api/v1/vault/budgets - Get all budgets
router.get('/budgets', (req, res) => {
  res.status(200).json(budgets);
});

// PUT /api/v1/vault/budgets/:id - UPDATE
router.put('/budgets/:id', validateBudget, (req, res) => {
  const budget = budgets.find(b => b.id === req.params.id);
  if (!budget) return res.status(404).json({ message: 'Budget not found' });

  if (req.body.category) budget.category = req.body.category;
  if (req.body.limit!== undefined) budget.limit = Number(req.body.limit);

  res.status(200).json(budget);
});

// DELETE /api/v1/vault/budgets/:id - DELETE
router.delete('/budgets/:id', (req, res) => {
  const index = budgets.findIndex(b => b.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Budget not found' });

  const deleted = budgets.splice(index, 1);
  res.status(200).json({ message: 'Budget deleted successfully', deleted: deleted[0] });
});

// GET /api/v1/vault/summary - Compare budgets vs actual expenses
router.get('/summary', async (req, res) => {
  try {
    const expenseSummary = await Expense.aggregate([
      { $group: { _id: '$category', spent: { $sum: '$amount' } } }
    ]);

    const spentMap = {};
    expenseSummary.forEach(e => spentMap[e._id] = e.spent);

    const vaultSummary = budgets.map(b => ({
     ...b,
      spent: spentMap[b.category] || 0,
      remaining: b.limit - (spentMap[b.category] || 0),
      status: (spentMap[b.category] || 0) > b.limit? 'OVER BUDGET' : 'OK'
    }));

    res.json({ message: 'Vault summary', budgets: vaultSummary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch vault summary', error: error.message });
  }
});

module.exports = router;
