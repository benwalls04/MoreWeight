const express = require('express')
const router = express.Router()
// model created which defined tables 
const Users = require('../models/Users')
const Log = require('../models/Log');
const Inputs = require('../models/Inputs');

router.get("/", async (req, res) => {

  const {username, password} = req.query;

  const existingUser = await Users.findOne({ username: username });
    if (existingUser) {
      if (existingUser.password !== password){
        return res.status(400).json({ message: 'Invalid password' });
      } else {
        const routine = existingUser.routine;
        const log = await Log.findOne({ username: username});
        const inputs = await Inputs.findOne({ username: username});
        res.json({
          routine: routine,
          log: log.movements,
          recents: log.recents,
          inputs: inputs
        });
      }
    } else {
      return res.status(400).json({ message: 'Account does not exist' });
    }
})

module.exports = router