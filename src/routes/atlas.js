const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => 
  res.json({ message: 'Atlas summary - TODO: Group A implement'}));

module.exports = router;

