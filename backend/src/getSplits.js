const staticData = require('./staticData');
const splitsClass = require('./splitsClass');

const inputData = {
  cycle: 7,
  schedule: ["lift", "lift", "lift", "lift", "lift", "lift", "rest"], 
  bias: [.5, .5, .5, .5, .5, .5], 
  frequency: [6], 
}

function getSplits( inputData ){
  // constants 
  
  let splits = new splitsClass();

  splits.generateSplits(inputData.schedule, [], inputData.bias, inputData.cycle, inputData.frequency);

  return splits;
}

getSplits(inputData);

module.exports = getSplits