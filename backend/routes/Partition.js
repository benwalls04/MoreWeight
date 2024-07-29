const express = require('express')
const router = express.Router() 
let splitsClass = require('../src/splitsClass');

router.post("/", (req, res) => {

  let splits = req.body.splits;
  let clusters = splitsClass.kMeansCluster(splits, 2);

  res.json(clusters);
})

module.exports = router