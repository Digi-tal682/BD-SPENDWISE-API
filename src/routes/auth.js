// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// For "without database" version
const User = require('../models/user');
const SECRET = 'group3-secret-key';

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // validation
  if (!name ||!email ||!password) {
    return res.status(400).json({ message: 'Name, email, password required' });
  }

  if (User.findByEmail(email)) {
    return res.status(400).json({ message: 'Email already exists' });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = User.create({ name, email, password: hashed });

  res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '1d' });
  res.json({ message: 'Login successful', token, userId: user.id });
});

module.exports = router;