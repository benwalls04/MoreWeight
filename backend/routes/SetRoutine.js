const express = require('express')
const router = express.Router()
// model created which defined tables 
const Log = require('../models/Log')
const Users = require('../models/Users')

// insert to database 
router.post("/", async (req, res) => {
  const routine = req.body.routine;
  const username = req.body.username;

  const existingLog = await Log.findOne({ username: username });

  let newLog = {
    username: username,
    movements: {},
    recents: [], 
  };

  const dayIndex = new Date().getDay();

  for (let i = 0; i < routine.days.length; i++){
    const day = routine.days[(dayIndex + i) % 7];
    day.movements.forEach((movement) => {
      // If an existing log is found, carry over the entries
      if (!newLog.movements[movement]){
        if (existingLog && existingLog.movements[movement]) {
          newLog.movements[movement] = existingLog.movements[movement];
        } else {
          newLog.movements[movement] = [];
        }
      }

      if (!newLog.recents.find(entry => entry.title === movement)) {
        newLog.recents.push({ title: movement, imageId: undefined });
      }
    });
  }
  
  const user = await Users.findOne({ username: username });
  user.routine = routine;
  user.save();

  await Log.create(newLog);
  res.json(newLog);
})

module.exports = router;