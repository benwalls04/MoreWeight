const express = require('express')
const router = express.Router() 
const partitionSplits = require('../src/partitionSplits');

router.post("/", (req, res) => {
  const result = partitionSplits(req.body.splits);
  res.json(result);
})

module.exports = router