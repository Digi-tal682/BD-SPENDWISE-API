require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('SpendWise API is working + MongoDB config ready!');
});

// Temporary stub, remove once real CRUD lives in atlas router
app.get('/api/expenses', (req, res) => {
  res.json({ message: 'List of expenses - ready for DB' });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});