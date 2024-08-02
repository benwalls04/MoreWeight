const routineClass = require('../src/routineClass');

/*
test('INSPECT: getSequences', () => {
  const response = routineClass.getSequences('n', 'barbell bench press', 'military press', 'barbell row', 'lat pulldown', 'hack squat', 'deadlift');

  console.log(response);

})
*/ 

/*
test('INSPECT: getStimulus', () => {
  const response = routineClass.getStimulus(["chest shoulders triceps", "back biceps", "legs", "rest", "rest", "rest", "rest"], 3, [.5, .5, .5, .5, .5, .5], 3);

})
*/

test('INSPECT: setMovements', () => {
  const split = ["chest shoulders triceps", "back biceps", "legs", "chest back", "shoulders biceps triceps", "legs", "rest"];
  const muscleBias = [.5, .5, .5, .5, .5, .5];
  const numSets = 3;

  let routine = new routineClass(split, 3, 'a', 'n');

  routine.setMovements(routineClass.getStimulus(split, 3, muscleBias, numSets), routineClass.getSequences('n', 'barbell bench press', 'military press', 'barbell row', 'lat pulldown', 'hack squat', 'deadlift', 'cable curl', 'machine tricep extension'), 'a', numSets, 'n');

  routine.setVariants(50, 50, 50);

  routine.organizeSets();

  routine.getAllSets();

  routine.fitTimeFrame();

})