const express = require('express')
const router = express.Router() 
const staticData = require('../src/staticData');

router.get("/", async (req, res) => {
  const { key } = req.query;

  console.log(staticData[key]);
  res.json(staticData[key]);
})

module.exports = router