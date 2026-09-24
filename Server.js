require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
connectDB();

app.get('/', (req, res) => {
  res.send('SpendWise API is working + MongoDB config ready!');
});

app.get('/api/expenses', (req, res) => {
  res.json({ message: 'List of expenses - ready for DB' });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
