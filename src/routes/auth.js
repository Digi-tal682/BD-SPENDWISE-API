const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

const SECRET = process.env.JWT_SECRET || 'group3-secret-key';

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name ||!email ||!password) {
      return res.status(400).json({ message: 'Name, email, password required' });
    }

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email: email.toLowerCase(), password: hashed });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User created',
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, userId: user._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;