const express = require('express')
const router = express.Router() 
const Log = require('../models/Log')

router.get("/", async (req, res) => {
  const { username, movement, numberOfSets } = req.query;
  const userLog = await Log.findOne({username: username});
  let movementLog = userLog.movements.get(movement);

  if (!movementLog) {
    movementLog = [];
    userLog.movements.set(movement, movementLog);
    await userLog.save();
  }

  const lastSet = movementLog.length >= numberOfSets ? movementLog[movementLog.length - numberOfSets] : null;
  const weight = lastSet ? lastSet.weight : 0;
  const reps = lastSet ? lastSet.reps : 0;
  const result = {weight: weight, reps: reps};

  res.json(result);
})

module.exports = router