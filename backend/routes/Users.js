const express = require('express')
const router = express.Router()
// model created which defined tables 
const Users = require('../models/Users')
const Inputs = require('../models/Inputs');
const getRoutines = require('../src/getRoutines');

router.post("/", async (req, res) => {

  const split = req.body.split;
  const inputs = req.body.inputs;
  const username = req.body.username;
  const password = req.body.password

  const existingUser = await Users.findOne({ username: username });
    // FIXME: change to existingUser
    if (existingUser) {
      return res.status(400).json({ message: 'Account with username already exists' });
    } else {
      const routine = getRoutines(inputs, split);
      res.json(routine);
      await Users.create({ username: username, password: password, routine: routine })
      await Inputs.create({ username: username, exp: inputs.experience, style: inputs.style, sets: inputs.sets, time: inputs.time.substring(0, inputs.time.indexOf(' '))})
    }
})

module.exports = router