require('dotenv').config({ quiet: true });
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// connect to DB only if not in test
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const { protect } = require('./src/middleware/auth');

app.get('/', (req, res) => {
  res.json({ message: 'Group 3B Spendwise Expense Tracker API running' });
});

// Routes - ONLY mount the real router files
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/categories', protect, require('./src/routes/categories'));
app.use('/api/vault', protect, require('./src/routes/vault'));
app.use('/api/expenses', protect, require('./src/routes/expenseController'));

// Add this to see real errors
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;