const staticData = require('./staticData');
const splitsClass = require('./splitsClass');

function getSplits( inputData ){
  let splits = new splitsClass();

  const schedule = inputData.schedule;
  const bias = inputData.bias;

  splits.generateSplits(schedule, [], bias, 7, 7 - schedule.filter(day => day === "lift").length);

  splits.selection = [{a: [{a1: splits.a[1]}, {a2: splits.a[2]}, {a3: splits.a[3]}]}, {p: [{p1: splits.p[1]}, {p2: splits.p[2]}, {p3: splits.p[3]}]}, {b: [{b1: splits.b[1]}, {b2: splits.b[2]}, {b3: splits.b[3]}]}, {u: [{u1: splits.u[1]}, {u2: splits.u[2]}]}];

  return splits;
}

module.exports = getSplits