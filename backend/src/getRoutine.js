const staticData = require('./staticData');
const routineClass = require('./routineClass');

function getRoutine( inputData ){

  const testSplits = [
    ['chest shoulders triceps', 'back biceps', 'legs', 'rest', 'rest', 'rest', 'rest'], 
    ['chest shoulders triceps', 'back biceps', 'legs', 'rest', 'chest shoulders triceps', 'back biceps', 'legs'], 
    ['chest back', 'shoulders triceps biceps', 'legs', 'rest', 'chest shoulders triceps', 'back biceps', 'legs'], 
    ['chest', 'back', 'shoulders biceps triceps', 'legs', 'chest back shoulders biceps triceps', 'rest', 'rest'], 
    ['chest', 'back', 'shoulders triceps biceps', 'legs', 'chest shoulders triceps', 'back biceps', 'legs'],
    ['chest shoulders triceps', 'rest', 'back biceps', 'legs', 'chest shoulders triceps', 'rest', 'back biceps'], 
    ['chest', 'back', 'legs shoulders', 'rest', 'rest', 'chest shoulders triceps', 'back biceps']
  ]

  const split = inputData.splits.selection;

  let routine = new routineClass(split, inputData.sets, inputData.exp, inputData.style, inputData.numDays);

  const idealStim = routineClass.getStimulus(split, inputData.exp, inputData.bias, inputData.sets);

  const sequences = routineClass.getSequences('n', inputData["horizontal-press"], inputData["vertical-press"], inputData["horizontal-pull"], inputData["vertical-pull"], inputData["knee-flexion"], inputData["hip-extension"], inputData["curl"], inputData["extension"]);

  routine.setMovements(idealStim, sequences);

  routine.evenStimulus();

  routine.setVariants(inputData.chest, inputData.back, inputData.legs);

  routine.organizeSets();

  routine.getAllSets();

  routine.fitTimeFrame(inputData.time, inputData.accessories);

  return routine;

  function rndInputs() {
    let inputData = {};

    const setsOptions = [2, 3, 4]
    const expOptions = ['b', 'i', 'a']
    const styleOptions = ['n', 'b', 'p']
    const timeOptions = [30, 60, 75, 90, 105, 120]
    const horizPressOptions = ["barbell bench press", "dumbell bench press", "smith machine bench press", "machine chest press"]
    const horizPullOptions = ["t-bar row", "barbell row", "seated cable row", "machine row"]
    const vertPressOptions = ["military press", "dumbell overhead press", "smith machine overhead press", "machine overhead press"]
    const vertPullOptions = ["pull ups", "lat pulldown", "kneeling cable row", "machine pulldown"]
    const kneeFlexOptions = ["barbell squat", "hack squat", "front squat", "leg press"]
    const hipExtOptions = ["deadlift", "barbell romanian deadlift", "dumbell romanian deadlift", "barbell hip thrust"]
    const curlOptions = ['dumbell curl', "cable curl", "preacher curl", "dumbell hammer curl"]
    const extOptions = ['tricep pushdown', 'skullcrusher', 'cable overhead extension', 'machine tricep extension']
    const accessoriesOptions = ['abs', 'calves', 'forearms', 'side deltoids', 'rear deltoids', 'traps']
    
    inputData.sets = setsOptions[Math.floor(Math.random() * setsOptions.length)];
    inputData.exp = expOptions[Math.floor(Math.random() * expOptions.length)];
    inputData.style = styleOptions[Math.floor(Math.random() * styleOptions.length)];
    inputData.time = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    inputData["horizontal-press"] = horizPressOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["horizontal-pull"] = horizPullOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["vertical-press"] = vertPressOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["vertical-pull"] = vertPullOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["knee-flexion"] = kneeFlexOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["hip-extension"] = hipExtOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["curl"] = curlOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData["extension"] = extOptions[Math.floor(Math.random() * horizPressOptions.length)];
    inputData.chest = Math.floor(Math.random() * 100);
    inputData.back = Math.floor(Math.random() * 100);
    inputData.legs = Math.floor(Math.random() * 100);

    let muscleBias = [.5, .5, .5, .5, .5, .5]
    const numBias = Math.floor(Math.random() * 6) + 1;
    for (let i = 0; i < numBias; i++){
      let index = Math.floor(Math.random() * 6);
      while (muscleBias[index] !== .5){
        index = Math.floor(Math.random() * 6);
      } 
      muscleBias[index] = .75;
    }

    const numAvoid = Math.floor(Math.random() * (6 - numBias));
    for (let i = 0; i < numAvoid; i++){
      let index = Math.floor(Math.random() * 6);
      while (muscleBias[index] !== .5){
        index = Math.floor(Math.random() * 6);
      } 
      muscleBias[index] = .25;
    }
    inputData.bias = muscleBias;

    let accesories = [];
    const numAccessories = Math.floor(Math.random() * accessoriesOptions.length);
    for (let i = 0; i < numAvoid; i++){
      let group = accessoriesOptions[Math.floor(Math.random() * 6)];
      while (accesories.includes(group)){
        group = accessoriesOptions[Math.floor(Math.random() * 6)];
      } 
      accesories.push(group);
    }
    inputData.accessories = accesories;

    console.log(inputData);

    return inputData;
  }
}

module.exports = getRoutine;