const express = require('express');
const router = express.Router();

router.get('/summary', (req, res) => 
  res.json({ message: 'Vault summary - TODO: Group C implement'}));

module.exports = router;