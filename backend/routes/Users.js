const express = require('express')
const router = express.Router()
// model created which defined tables 
const Users = require('../models/Users')
const Inputs = require('../models/Inputs');
const getRoutine = require('../src/getRoutine');

router.post("/", async (req, res) => {

  const inputs = req.body.inputs;
  const username = req.body.username;
  const password = req.body.password

  const existingUser = await Users.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: 'Account with username already exists' });
    } else {
      let routine = getRoutine(inputs);
      routine.title = inputs.title;
      
      res.json(routine);
      await Users.create({ username: username, password: password, routine: routine })
      await Inputs.create({ username: username, exp: inputs.exp, style: inputs.style, sets: inputs.sets, time: inputs.time, numDays: inputs.numDays, accessories: inputs.accessories, bias: inputs.bias })
    }
})

module.exports = router