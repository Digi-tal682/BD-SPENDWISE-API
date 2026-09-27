require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
connectDB();

// Health check
app.get('/', (req, res) => {
  res.send('SpendWise API is working + MongoDB config ready!');
});

// Temporary stub, remove once expenses live in atlas routes
app.get('/api/expenses', (req, res) => {
  res.json({ message: 'List of expenses - ready for DB' });
});

// Feature routers
app.use('/api/v1/atlas', require('./src/routes/atlas'));
app.use('/api/v1/flash', require('./src/routes/flash'));
app.use('/api/v1/vault', require('./src/routes/vault'));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});