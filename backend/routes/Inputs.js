const express = require('express')
const router = express.Router()
// model created which defined tables 
const Inputs = require('../models/Inputs')

router.get("/", async (req, res) => {
  // use async when sequelize 
  const inputData = await Inputs.find()
  // res.json returns json 
  res.json(inputData)
})

// insert to database 
router.post("/", async (req, res) => {
  const newInput = req.body;
  await Inputs.create(newInput);
  res.json(newInput);
})

module.exports = router