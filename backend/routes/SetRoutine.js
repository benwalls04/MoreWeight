const express = require('express')
const router = express.Router()
// model created which defined tables 
const Log = require('../models/Log')
const Users = require('../models/Users')

// insert to database 
router.post("/", async (req, res) => {
  const routineObj = req.body.routine;
  const username = req.body.username;
  const routine = routineObj.routine;

  const existingLog = await Log.findOne({ username: username });

  let newLog = {
    username: username,
    movements: {},
    recents: [], 
  };

  const dayIndex = new Date().getDay();

  for (let i = 0; i < routine.length; i++){
    const day = routine[(dayIndex + i) % 7];
    day.movements.forEach((movementObj) => {
      // If an existing log is found, carry over the entries
      const movement = movementObj.movement;
      if (!newLog.movements[movement]){
        if (existingLog && existingLog.movements[movement]) {
          newLog.movements[movement] = existingLog.movements[movement];
        } else {
          newLog.movements[movement] = [];
        }
      }

      if (!newLog.recents.includes(movement)) {
        newLog.recents.push(movement);
      }
    });
  }
  
  const user = await Users.findOne({ username: username });
  user.routine = routineObj;
  user.save();

  await Log.create(newLog);
  res.json(newLog);
})

module.exports = router;