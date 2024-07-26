const express = require('express')
const router = express.Router()
const { exec } = require('child_process');
const Log = require('../models/Log')

// insert to database 
router.post("/", async (req, res) => {

  const { username, movement, weight, reps, RPE} = req.body;
  const newSet = {weight: Number(weight), reps: Number(reps), RPE: Number(RPE)};

  let log = await Log.findOne({ username: username });
  const recentEntry = log.recents.find(entry => entry.title === movement);

  // Check if movement already exists in recents, remove if exists
  log.recents = log.recents.filter(entry => entry.title !== movement);

  // Update movements array
  if (!log.movements.has(movement)) {
    log.movements.set(movement, []);
  }
  log.movements.get(movement).push(newSet);

  // Push the movement to recents at the start of the array
  log.recents.unshift({ title: movement, ...newSet });

  // Save the log
  await log.save();
  res.json({log: log.movements, recents: log.recents});
})

module.exports = router