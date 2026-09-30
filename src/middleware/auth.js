// 
// Steps:
// 1. Get token from Authorization header
// 2. Verify with jwt.verify(token, process.env.JWT_SECRET)
// 3. Add decoded user to req.user and call next()

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SECRET = process.env.JWT_SECRET || 'group3-secret-key';

exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
 if (!token) return res.status(401).json({ message: 'Not authorized, no token' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token invalid' });
  }
};