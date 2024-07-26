const express = require('express')
const router = express.Router()
const Features = require('../models/Features');

router.post("/", async (req, res) => {

  const { username, selections, text } = req.body;
  console.log(selections)

  let existingFeature = await Features.findOne({ username: username });

  if (existingFeature){
    existingFeature.options = selections;
    existingFeature.text = text;
    existingFeature.save();
  } else {
    const newFeature = new Features({
      username: username,
      options: selections,
      text: text
    });

    await newFeature.save();
  }
}) 

module.exports = router;