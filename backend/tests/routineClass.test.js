const routineClass = require('../src/routineClass');

/*
test('INSPECT: getSequences', () => {
  const response = routineClass.getSequences('n', 'barbell bench press', 'military press', 'barbell row', 'lat pulldown', 'hack squat', 'deadlift');

  console.log(response);

})
*/ 

test('INSPECT: getStimulus', () => {
  const response = routineClass.getStimulus(["chest shoulders triceps", "back biceps", "legs", "rest", "rest", "rest", "rest"], 3, [.5, .5, .5, .5, .5, .5], 3);

  console.log(response);

})

test('INSPECT: setMovements', () => {
  const split = ["chest shoulders triceps", "back biceps", "legs", "rest", "rest", "rest", "rest"];
  const muscleBias = [.5, .5, .5, .5, .5, .5];
  const numSets = 3;

  let routine = new routineClass(split);

  routine.setMovements(split, routineClass.getStimulus(split, 3, muscleBias, numSets), routineClass.getSequences('n', 'barbell bench press', 'military press', 'barbell row', 'lat pulldown', 'hack squat', 'deadlift'), 'i', numSets, 'n');

  split.routine.forEach(day => {
    console.log(day.movements); 
  })
})