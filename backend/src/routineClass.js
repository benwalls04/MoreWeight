const staticData = require('./staticData');

class RoutineClass {
  constructor(split) {
    this.routine = [];
    split.forEach(day => {
      this.routine.push({
        title: day, 
        movements: [], 
        sets: [], 
        accessories: [],
      })
    })
  }

  static getSequences(styleIcon, horizPress, vertPress, horizPull, vertPull, kneeFlex, hipExt){
    const groupNames = staticData.groupNames;
    const seqPresets = staticData.sequences;
    const movementOrder = staticData.movementOrder;

    let sequences = [[], [], [], [], [], []];
    groupNames.forEach((group, index) => {
      const preset = index < 3 ? seqPresets[group][styleIcon].seq : seqPresets[group].seq;

      preset.forEach(entry => {
        if (entry.type === 'horizontal-press-0') {
          sequences[index].push(horizPress);
        } 
        else if (entry.type === 'vertical-press-0') {
          sequences[index].push(vertPress)
        }
        else if (entry.type === 'horizontal-pull-0') {
          sequences[index].push(horizPull)
        }
        else if (entry.type === 'vertical-pull-0') {
          sequences[index].push(vertPull)
        }
        else if (entry.type === 'knee-flexion-0') {
          sequences[index].push(kneeFlex)
        }
        else if (entry.type === 'hip-extension-0') {
          sequences[index].push(hipExt)
        }
        else {
          sequences[index].push(movementOrder[entry.type].filter(movement => !sequences[index].includes(movement))[0]);
        }
      })
    })

    return sequences; 
  }

  static getStimulus(split, experience, muscleBias, numberOfSets){
    const GROUPS = staticData.groups;
    const GROUP_NAMES = staticData.groupNames;

    let stimulus = [];
    for (let i = 0; i < GROUP_NAMES.length; i++){
      const upperBound = GROUPS[GROUP_NAMES[i]].upperStim[experience];
      const lowerBound = GROUPS[GROUP_NAMES[i]].lowerStim[experience];
      const setsWeight = .5;
      const biasWeight = .5;
      const multiplier = muscleBias[i] * biasWeight + (.5 * numberOfSets - 1) * setsWeight;
      stimulus.push(lowerBound + (upperBound - lowerBound) * multiplier);
      if (split.filter(day => day.includes(GROUP_NAMES[i])).length === 0){
        stimulus[i] = 0;
      } 
      if (split.filter(day => day.includes(GROUP_NAMES[i])).length === 1){
        stimulus[i] = stimulus[i] * .66;
      }
    }

    return stimulus;
  }

  setMovements(split, idealStimulus, sequences, expIcon, numberOfSets, styleIcon) {
    const WEEKDAYS = 7;
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;
    const stimVars = staticData.stimVars;
    const sequenceInfo = staticData.sequences;

    let stimArr = [];
    for (let i = 0; i < WEEKDAYS; i++){
      stimArr.push(new Array(groupNames.length).fill(0));
    }

    groupNames.forEach((group, index) => {
      const totalStim = idealStimulus[index];

      const [workingDays, restDays] = RoutineClass.getWorkingDays(split, group);
      const sequence = sequences[index];
      const sequencePre = index < 3? sequenceInfo[group][styleIcon] : sequenceInfo[group];
      const order = sequencePre.order;

      for (let k = 0; k < workingDays.length; k++){
        const dayIndex = workingDays[k];
        let stimCount = 0;
        const stimGoal = totalStim * (restDays[k] / WEEKDAYS);
        let groupLength = 0;

        while (stimCount < stimGoal){

          let movement = sequence[order[groupLength]];
          const movementInfo = movementInfos[movement];
          console.log(movement);
          const RPESeq = movementInfo.sequences[expIcon].slice(numberOfSets * -1)
          const lowerRep = sequencePre.seq[groupLength].lowerRep;
          const upperRep = sequencePre.seq[groupLength].upperRep;
          const movementStim = RoutineClass.getMovementStim(RPESeq, stimVars[lowerRep]);

          stimCount += movementStim;

          this.routine[dayIndex].movements.push({
            variant: movement,
            RPE: RPESeq, 
            lowerRep: lowerRep, 
            upperRep: upperRep, 
            stimulus: movementStim, 
          })

          groupLength++;
        }
      }
      });
  }

  static getMovementStim(RPESeq, stimVars){
    
    let stim = 0;
    for (let i = 0; i < RPESeq.length; i++){
      const k = stimVars.k;
      const RPE0 = stimVars.RPE0;
      stim += 10 / (1 + Math.exp(-1 * k * (RPESeq[i] - RPE0))); 
    }

    return stim;
  }

  static getWorkingDays(split, group){
    const WEEKDAYS = 7 
    let workingDays = [];
    let restDays = [];

    // find working days for the muscle group
    for (let i = 0; i < WEEKDAYS; i++){
      if (split[i].includes(group)){
        workingDays.push(i);

        // get the number of rest days  
        let nextFound = false;
        let count = 1;
        while (!nextFound){
          if (split[(i + count) % WEEKDAYS].includes(group)){  
            nextFound = true;
            restDays.push(count)
          } 
          count++;
        }
      }
    }

    // sort the days by rest time
    let combined = workingDays.map((day, index) => [day, restDays[index]]);
    combined.sort((a, b) => b[1] - a[1]);
    workingDays = combined.map(item => item[0]);
    restDays = combined.map(item => item[1]);

    return [workingDays, restDays];
  }

  static STD(values){
    const average = values.reduce((a, b) => a + b) / values.length;
    const variance = values.reduce((a, b) => a + (b - average) ** 2) / values.length;
    return Math.sqrt(variance);
  }

  evenStimulus(){

    let best = JSON.parse(JSON.stringify(Workouts));
    let bestStim = JSON.parse(JSON.stringify(TotalStim));
    let bestSTD = getSTD(TotalStim);

    let count = 0;
    while (count === 0 || count < 20 && best.some((workout, index) => workout.movements.length !== Workouts[index].movements.length)){

      // store the best workout sequence 
      if (getSTD(TotalStim) < bestSTD){
        bestSTD = getSTD(TotalStim);
        bestStim = JSON.parse(JSON.stringify(TotalStim));
        best = JSON.parse(JSON.stringify(Workouts));
      }
      
      for (let i = GROUP_NAMES.length - 1; i >= 0; i--){
        const group = GROUP_NAMES[i];
        const [workingDays, restDays] = getWorkingDays(group);
        let maxDay = workingDays[0]; let minDay = workingDays[0];
  
        // move workouts from the max day to the min day 
        workingDays.forEach((day) => {
          maxDay = TotalStim[day] > TotalStim[maxDay] && Workouts[day].movements.filter(movement => MOVEMENTS[VARIANTS[movement.variant].movement].primary === group).length > 1? day: maxDay;
          minDay = TotalStim[day] < TotalStim[minDay]? day: minDay;
        })
  
        // get movements of that muscle group
        let movements = Workouts[maxDay].movements.filter(movement => {
          return MOVEMENTS[VARIANTS[movement.variant].movement].primary === group
        })
  
        let oldSets = JSON.parse(JSON.stringify(Workouts)); 
        let oldStim = JSON.parse(JSON.stringify(TotalStim));
        let oldSTD = getSTD(TotalStim); let newSTD = 0;
  
        // move workouts until STD is minimized 
        while (maxDay !== minDay && oldSTD > newSTD && movements.length > 1){
          
          oldSTD = getSTD(TotalStim);
          oldSets = JSON.parse(JSON.stringify(Workouts));
  
          // update the stimulus counts 
          let removed = movements.pop();
          let added = JSON.parse(JSON.stringify(removed));
          const removedStim = getMovementStim(removed.liftType, removed.RPE);
  
          // get a substitue if the movement is in the new day
          if (Workouts[minDay].movements.some(movement => VARIANTS[movement.variant].movement === VARIANTS[removed.variant].movement)){
            const sub = subsituteMovement(removed.variant, Workouts[minDay].movements, group);
            if (sub !== null){
              added.variant = sub;
            } else {
              movements.push(removed);
              newSTD = oldSTD
            }
          }
  
          // update the movements 
          if (Workouts[maxDay].movements.length > 2 || Workouts[minDay].movements.length < 2){
            TotalStim[maxDay] -= removedStim; TotalStim[minDay] += removedStim;
            Workouts[maxDay].movements = Workouts[maxDay].movements.filter(movement => movement.variant !== removed.variant);
            Workouts[minDay].movements.push(added);
          }
  
          newSTD = getSTD(TotalStim);
        }
        
        // update workouts 
        if (oldSTD <= newSTD) {
          Workouts = JSON.parse(JSON.stringify(oldSets));
          TotalStim = JSON.parse(JSON.stringify(oldStim));
        }
      }

      count++;
    }

    Workouts = best;
    TotalStim = bestStim;
  
    function getSTD(values) {
      const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
      const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
      const meanSquaredDifference = squaredDifferences.reduce((acc, val) => acc + val, 0) / squaredDifferences.length;
      const standardDeviation = Math.sqrt(meanSquaredDifference);
    
      return standardDeviation;
    }
  }

} 

module.exports = RoutineClass;