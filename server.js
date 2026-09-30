require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB();

const authMiddleware = require('./src/middleware/auth');

app.get('/', (req, res) => {
  res.json({ message: 'Group 3 Expense Tracker API running on port 5000' });
});

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/categories', authMiddleware, require('./src/routes/categories'));
app.use('/api/expenses', authMiddleware, require('./src/routes/expenseController'));
app.use('/api/vault', authMiddleware, require('./src/routes/vault'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));