const express = require('express')
const router = express.Router() 
const getSplits = require('../utils/getSplits');

router.get("/", (req, res) => {
  const result = getSplits(req.query);
  res.json(result);
})

module.exports = router