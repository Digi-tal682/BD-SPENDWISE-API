// TODO: Team - Implement JWT auth middleware before Saturday 26th Sept 2026
// Steps:
// 1. Get token from Authorization header
// 2. Verify with jwt.verify(token, process.env.JWT_SECRET)
// 3. Add decoded user to req.user and call next()

const auth = (req, res, next) => {
  // Team will fill this logic
  next();
};
// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'group3-secret-key'; // use same for demo

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token, login first' });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id; // This userId will filter all your models
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = auth;