const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => 
  res.json({ message: 'Flash summary - TODO: Group B implement'}));

module.exports = router;