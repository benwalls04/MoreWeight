const Queue = require('./Queue')
const { erf, sqrt, exp, pi, setMultiplicityDependencies } = require('mathjs');
const liftData = require('./staticData');

function getRoutines(inputData, Split){
  // constants 
  const WEEKDAYS = 7;
  const GROUP_NAMES = ["chest", "back", "legs", "shoulders", "biceps", "triceps"];
  const [REST_TIMES, REP_RANGES, VARIANTS, MOVEMENTS, GROUPS, BASE_SPLITS, TYPE_SEQ, COMPOUND_MULTS, STIM_VARS, ACCESSORY_GROUPS, ACCESSORIES] = liftData;

  const [frequency, experience, style, numberOfSets, muscleBias, time, priorityMovements, accessories, expIcon] = getInputs(inputData);

  let typeSeq  = TYPE_SEQ[Math.ceil(style / 20) * 20][numberOfSets];
  let idealStimulus = getStimulus();

  let Workouts = [];
  let TotalStim = new Array(WEEKDAYS).fill(0);
  const [compoundsSorted, isolationsSorted] = sortMovements();

  setWorkouts(idealStimulus);
  
  evenStimulus();

  // organize each day   
  organizeSets();

  Workouts.forEach(workout => {
    workout.title = getWorkoutTitle(workout.movements.map(movement => movement.variant));
    workout.allSets = getAllSets(workout.movements);
    workout.movements = workout.movements.map(set => set.variant);
  });


  fitTimeFrame();

  return {title: 'title', days: Workouts};

  function getInputs(inputData){
    const frequency = inputData.days.filter(day => day === true).length;
  
    const experience = parseInt(inputData.experience);
    const expIcon = experience < 2? "b": experience < 4? "i": "a";

    let accessories = [];
    if (inputData.accesories[0]){
      accessories.push("calves")
    }
    if (inputData.accesories[1]){
      accessories.push("abs")
    }
    if (inputData.accesories[2]){
      accessories.push("traps")
    }
    if (inputData.accesories[3]){
      accessories.push("side deltoids")
    }
    if (inputData.accesories[4]){
      accessories.push("rear deltoids")
    }
    if (inputData.accesories[5]){
      accessories.push("forearms")
    }
  
    const style = parseInt(inputData.style);  

    const numberOfSets = parseInt(inputData.sets);
  
    let muscleBias = [];
    let biasArr = inputData.bias;
    let injuries = inputData.injuries;
    for (let i = 0; i < GROUP_NAMES.length; i++){
      if (biasArr[i] == true){
        muscleBias.push(1); 
      } else if (injuries[i] == true){
        muscleBias.push(.25);
      } else {
        muscleBias.push(.5);
      } 
    }
  
    const chestValue = parseInt(inputData.chest);
    const backValue = parseInt(inputData.back);
    const legValue = parseInt(inputData.legs)
  
    if (chestValue > 80){
      GROUPS.chest.bias = "upper chest+"
    } else if (chestValue > 60){
      GROUPS.chest.bias = "upper chest";
    } else if (chestValue > 40){
      GROUPS.chest.bias = "neutral";
    } else if (chestValue > 20){
      GROUPS.chest.bias = "lower chest";
    } else {
      GROUPS.chest.bias = "lower chest+";
    }
  
    if (backValue > 80){
      GROUPS.back.bias = "upper back+"
    } else if (backValue > 60){
      GROUPS.back.bias = "upper back";
    } else if (backValue > 40){
      GROUPS.back.bias = "neutral";
    } else if (backValue > 20){
      GROUPS.back.bias = "lats";
    } else {
      GROUPS.back.bias = "lats+";
    }
  
    if (legValue > 80){
      GROUPS.legs.bias = "quads+"
    } else if (legValue > 60){
      GROUPS.legs.bias = "quads";
    } else if (legValue > 40){
      GROUPS.legs.bias = "neutral";
    } else if (legValue > 20){
      GROUPS.legs.bias = "hamstrings";
    } else {
      GROUPS.legs.bias = "hamstrings+";
    }

    GROUPS.biceps.bias = inputData.biceps.toLowerCase();
    GROUPS.triceps.bias = inputData.triceps.toLowerCase();
    const shoulderBias = inputData.shoulders.toLowerCase();
    GROUPS.shoulders.bias = shoulderBias === "front deltoids"? "front delts": shoulderBias === "side deltoids"? "side delts": "neutral";
  
    let time = parseInt(inputData.time.substring(0, inputData.time.indexOf(" ")));

    let priorityMovements = [];
    priorityMovements.push(inputData["horizontal-press"].toLowerCase());
    priorityMovements.push(inputData["vertical-pull"].toLowerCase());
    priorityMovements.push(inputData["horizontal-pull"].toLowerCase());
    priorityMovements.push(inputData["vertical-press"].toLowerCase());
    priorityMovements.push(inputData["knee-flexion"].toLowerCase());
    priorityMovements.push(inputData["hip-extension"].toLowerCase());

    return [frequency, experience, style, numberOfSets, muscleBias, time, priorityMovements, accessories, expIcon];
  }

  function sortMovements(){
    let compoundsSorted = [];
    let isolationsSorted = [];

    Object.values(GROUPS).forEach((group) => {
      let compoundSeqs = [[], [], []];
      let isolationSeqs = [[], [], []];
      const compounds = group.compounds;
      let biasSeqs = group[group.bias];
      let isolations = group.isolations;

      for (let i = 0; i < 1; i++){
        let currCompounds = [];
        let currIsolations = [];
        
        for (let j = 0; j < 2; j++){
          const biasSeq = j === 0? biasSeqs.compound : biasSeqs.isolation;
          let sortedList = [];
          let movements = j === 0? compounds: isolations;
          let q = new Queue();
          let shuffledArray = shuffleArray(movements);

          // add priority movements first  
          for (let m = 0; m < 2; m++){
            priorityMovements.forEach((movement) => {
              if (movements.includes(movement)){
                let placed = false;
                for (let k = 0; !placed && m === 0 && k < MOVEMENTS[movement].variants.length; k++){
                  const variant = MOVEMENTS[movement].variants[k];
                  if (VARIANTS[variant].region === biasSeq[sortedList.length % biasSeq.length]){
                    sortedList.push(variant);
                    placed = true;
                  } 
                }
                if (m === 1 && !sortedList.some(entry => MOVEMENTS[movement].variants.includes(entry))){
                  sortedList.push(MOVEMENTS[movement].variants[0]);
                }
              }
            })
          }

          // add remaining movements to the queue 
          shuffledArray.forEach((movement) => {
            if (!priorityMovements.includes(movement)){
              q.enqueue(movement);
            }
          })

          while (sortedList.length < movements.length){
            let noSpots = false;
            // try all possible combonations
            while (q.size() > 0 && !noSpots){
              let initLength = q.size();
              for (let k = 0; k < initLength; k++){
                const entry = q.dequeue(); 
                const variant = sortCheck(entry, biasSeq, typeSeq, sortedList, j === 0? "compounds" : "isolations", i + 1)
                if (variant !== null){
                  sortedList.push(variant);
                } else {
                  q.enqueue(entry);
                }
              }
              if (initLength === q.size()){
                noSpots = true;
                if (q.size() > 0){
                  getBestSub(sortedList, q, group, biasSeq[sortedList.length % biasSeq.length], typeSeq[sortedList.length % typeSeq.length])
                }
              }
            }
          }

          if (j == 0){
            currCompounds.push([...sortedList]);
          } else {
            currIsolations.push([...sortedList]);
          }
        }
        compoundSeqs[i] = [...currCompounds];
        isolationSeqs[i] = [...currIsolations];
      }

      compoundsSorted.push(compoundSeqs);
      isolationsSorted.push(isolationSeqs);
    })

  return [compoundsSorted, isolationsSorted];

  function sortCheck(movement, biasSeq, liftTypeSeq, currSeq, type, checkNum){

    let variant = null;
    const typeNeeded = liftTypeSeq[currSeq.length % liftTypeSeq.length];
    const biasNeeded = biasSeq[currSeq.length % biasSeq.length];

    MOVEMENTS[movement].variants.forEach((entry) => {
      if (currSeq.includes(entry)){
        return null;
      }
    })

    const typeOptions = MOVEMENTS[movement].liftTypes;
    if (priorityMovements.includes(movement) && (type === "compounds" && typeOptions.slice(0, Math.min(checkNum, typeOptions.length)).includes(typeNeeded))){
      variant = MOVEMENTS[movement].variants[0];
      MOVEMENTS[movement].variants.forEach((entry) => {
        if (VARIANTS[entry].region === biasNeeded){
          return entry;
        }
      }) 
    }

    if (type === "isolations"){
      MOVEMENTS[movement].variants.forEach((entry) => {
        if (VARIANTS[entry].region === biasNeeded){
          return entry;
        }
      }) 
    }

    if (type === "compounds" && !typeOptions.slice(0, Math.min(checkNum, typeOptions.length)).includes(typeNeeded)){
      return null;
    } 

    if (variant === null){
      MOVEMENTS[movement].variants.forEach((entry) => {
        if (VARIANTS[entry].region === biasNeeded){
          variant = entry;
        }
      }) 
    }

    return variant;
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function getBestSub(sortedList, queue, bias, type){
    let subFound = false;
    // strength (check for liftType first)
    if (style > 50){
      subFound = tryLiftTypes();
      if (!subFound){
        subFound = tryBias();
      }
      if (!subFound){
        sortedList.push(queue.dequeue());
      }
    } else {
      subFound = tryBias();
      if (!subFound){
        subFound = tryLiftTypes();
      }
      if (!subFound){
        sortedList.push(MOVEMENTS[queue.dequeue()].variants[0]);
      }
    }
    function tryLiftTypes(){
      let subFound = false;
      for (let i = 0; i < queue.size() && !subFound; i++){
        const movement = queue.dequeue();
        const typeOptions = MOVEMENTS[movement].liftTypes;
        if (typeOptions.includes(type)){
          sortedList.push(MOVEMENTS[movement].variants[0]);
          subFound = true;
        } else {
          queue.enqueue(movement);
        }
      }

      return subFound;
    }
    function tryBias(){
      let subFound = false;
      for (let i = 0; i < queue.size() && !subFound; i++){
        const movement = queue.dequeue();
        const variants = MOVEMENTS[movement].variants;
        if (variants.some(variant => VARIANTS[variant].region === bias)){
          const variants = MOVEMENTS[movement].variants;
          sortedList.push(variants.find(variant => VARIANTS[variant].region === bias));
          subFound = true;
        } else {
          queue.enqueue(movement);
        }
      }

      return subFound;
    }
  }
  }

  function getStimulus(){
    let stimulus = [];
    for (let i = 0; i < GROUP_NAMES.length; i++){
      const upperBound = GROUPS[GROUP_NAMES[i]].upperStim[experience];
      const lowerBound = GROUPS[GROUP_NAMES[i]].lowerStim[experience];
      const setsWeight = .5;
      const biasWeight = .5;
      const multiplier = muscleBias[i] * biasWeight + (.5 * numberOfSets - 1) * setsWeight;
      stimulus.push(lowerBound + (upperBound - lowerBound) * multiplier);
      if (Split.filter(day => day.includes(GROUP_NAMES[i])).length === 0){
        stimulus[i] = 0;
      } 
      if (Split.filter(day => day.includes(GROUP_NAMES[i])).length === 1){
        stimulus[i] = stimulus[i] * .66;
      }
    }

    return stimulus;
  }

  function setWorkouts(idealStimulus){
    const compoundStim = [];
    const isolationStim = [];

    for (let i = 0; i < GROUP_NAMES.length; i++) {
      const compStim = ((COMPOUND_MULTS[GROUP_NAMES[i]][1] - COMPOUND_MULTS[GROUP_NAMES[i]][0]) * style/100 + COMPOUND_MULTS[GROUP_NAMES[i]][0]) * idealStimulus[i];
      compoundStim.push(compStim);
      isolationStim.push(idealStimulus[i] - compStim);
    }

    for (let i = 0; i < Split.length; i++){
      Workouts.push({
        title: "",
        movements: [],
        allSets: []
      })
    }

    for (let j = 0; j < GROUP_NAMES.length; j++){
      const [workingDays, restDays] = getWorkingDays(GROUP_NAMES[j]);

      let compoundSeq = [...compoundsSorted[j][0].find(array => array.length > 0) || []];
      let isolationSeq = [...isolationsSorted[j][0].find(array => array.length > 0) || []];
      for (let a = 0; a < 2; a++){
        // alternate between compound and isolation lifts
        let stim = a === 0? compoundStim[j] : isolationStim[j];
        let movementSeq = a === 0? compoundSeq : isolationSeq;

        for (let k = 0; k < workingDays.length; k++){

          // day stimulus is proportional to the amount of rest
          const stimGoal = stim * (restDays[k] / WEEKDAYS);
          let stimCount = 0;
          const daySets = [];

          let groupLength = Workouts[workingDays[k]].movements.filter(movement => MOVEMENTS[VARIANTS[movement.variant].movement].primary === GROUP_NAMES[j]).length;

          while (stimCount < stimGoal){
            let variantName = movementSeq[groupLength % movementSeq.length];
            for (const set of daySets) {
              if (set.variant === variantName) {
              variantName = subsituteMovement(variantName, daySets, VARIANTS[variantName].group);
                break;
              }
            }
            if (variantName !== null){
              const variant = VARIANTS[variantName];
              const movement = MOVEMENTS[variant.movement];

              // FIXME: change data to have numbers instead of icons 
              const RPESeq = movement.sequences[expIcon].slice(numberOfSets * -1)
              const idealType = typeSeq[daySets.length % typeSeq.length];
              const liftType = movement.liftTypes.includes(idealType) ? idealType : movement.liftTypes[0];

              const movementStim = getMovementStim(liftType, RPESeq);

              stimCount += movementStim;

              daySets.push({
                variant: variantName,
                liftType: liftType, 
                RPE: RPESeq
              })
              groupLength++;

            } else {
              stimCount = stimGoal;
            }
          }

          // add muscle group workouts to the day
          TotalStim[workingDays[k]] += stimCount;
          Workouts[workingDays[k]].movements.push(...daySets);
        }
      }  
    }
  }

  function evenStimulus(){

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

  function subsituteMovement(subbed, day, group){
    const subOptions = GROUPS[group].isolations.includes(subbed)? GROUPS[group].isolations: GROUPS[group].compounds;

    let sub = null; let added = false;
    for (let i = 0; !added && i < subOptions.length; i++){
      if (!day.some(movement => MOVEMENTS[VARIANTS[movement.variant].movement].variants[0] === MOVEMENTS[subOptions[i]].variants[0])){
        MOVEMENTS[subOptions[i]].variants.forEach((variant) => {
          sub = MOVEMENTS[subOptions[i]].variants[0];
          added = true;
        })
      }
    }
    return sub;
  }

  function getWorkingDays(group){
    let workingDays = [];
    let restDays = [];

    // find working days for the muscle group
    for (let i = 0; i < WEEKDAYS; i++){
      if (Split[i].includes(group)){
        workingDays.push(i);

        // get the number of rest days  
        let nextFound = false;
        let count = 1;
        while (!nextFound){
          if (Split[(i + count) % WEEKDAYS].includes(group)){  
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

  function getMovementStim(liftType, RPESeq){
      
    let stim = 0;
    for (let i = 0; i < RPESeq.length; i++){
      const k = STIM_VARS[liftType].k;
      const RPE0 = STIM_VARS[liftType].RPE0;
      stim += 10 / (1 + Math.exp(-1 * k * (RPESeq[i] - RPE0))); 
    }

    return stim;
  }
   
  function organizeSets(){
    Workouts.forEach((workout) => {
      let movements = workout.movements;
      let order  = [];
      let isoQueu = new Queue();
      let compQueue =  new Queue();
  
      movements.forEach(movementObj => {
        const variant = movementObj.variant;
        const movement = VARIANTS[variant].movement;
        const group = MOVEMENTS[movement].primary;
        if (GROUPS[group].compounds.includes(movement)){
          compQueue.enqueue(variant);
        } else {
          isoQueu.enqueue(variant);
        }
      })
  
      let typeOrder = [];
      for (let i = 0; i < 2; i++){
        const queue = i === 0? compQueue: isoQueu;
        if (queue.size > 0){
          typeOrder.push(queue.dequeue());
        }
  
        let noSpots = false;
        while (queue.size() > 0 && !noSpots){
          const initLength = queue.size();
          
          for (let i = 0; i < initLength; i++){
            const variant  = queue.dequeue();
            let workoutInserted = insertWorkout(variant, order);
            if (!workoutInserted){
              queue.enqueue(variant);
            }
          }
  
          // if the length hasn't changed, end all elements to the end 
          noSpots = initLength === queue.size()? true: false;
        } 
        // add remaining workouts
        while (queue.size() > 0){
          typeOrder.push(queue.dequeue());
        }
        order.push(...typeOrder);
      }
  
      movements = movements.sort((a, b) => {
        return order.indexOf(a.variant) - order.indexOf(b.variant);
      });
      workout.movements = movements;
    })

    function insertWorkout(variant, list){
      let inserted = false;
                    
      // get other workouts of the movements muscle group
      const movement = VARIANTS[variant].movement;
      const group = MOVEMENTS[movement].primary;
      const groupMoves = GROUPS[group].compounds.concat(GROUPS[group].isolations);
      let isIsolation = GROUPS[group].isolations.includes(movement);
  
      // iterate backwards through the day to find a spot 
      for (let h = list.length - 1; h >= 0 && !inserted; h--) {
        const prev = VARIANTS[list[h]].movement;
        const next = h < list.length - 1? VARIANTS[list[h + 1]].movement : "";

        // if adjacent workouts have different groups, add the workout
        if (!groupMoves.includes(prev) && (h === list.length - 1 || h < list.length - 1 && !groupMoves.includes(next)) && (!isIsolation || isIsolation && !GROUPS[MOVEMENTS[movement].primary].compounds.includes(prev))) {
          list.splice(h + 1, 0, variant);
          inserted = true;
        }
      }
  
      return inserted;
    }
  }
  
  function getWorkoutTitle(sets){
    let groups = [];
    sets.forEach((set) => {
      const group = MOVEMENTS[VARIANTS[set].movement].primary;
      if (!groups.includes(group)){
        groups.push(group);
      }
    })

    let title = "";

    groups.forEach((group) => {
      title += group + ', ';
    })

    if (title.length > 0){
      title = title.substring(0, title.length - 2);
    } else {
      title = 'rest';
    }

    return title;
  }

  function getAllSets(sets){
    let allSets = [];

    for (let i = 0; i < sets.length; i++){
      const workout = sets[i];
      for (let j = 0; j < workout.RPE.length; j++){
        const variant = workout.variant;
        const RPE = workout.RPE[j];
        const liftType = workout.liftType;

        allSets.push({
          "variant": variant,
          "liftType": liftType, 
          "RPE": RPE,
          // pass next workout as an argument unless its the last workout, otherwise null
          "rest": getRestTime(VARIANTS[variant].movement, RPE, liftType, i === sets.length - 1? null :  VARIANTS[sets[i + 1].variant].movement, j === workout.RPE.length - 1? true: false)
        })
      }
    }

    return allSets;

    function getRestTime(movement, RPE, liftType, nextMovement, lastSet){
      let restTime = 1;
      
      if (!lastSet){
        restTime = REST_TIMES[liftType - 1][RPE - 7]; 
      } else if (nextMovement !== null){
        if (MOVEMENTS[nextMovement].primary === MOVEMENTS[movement].primary) {
          // next movement primary is current primary
          restTime = REST_TIMES[liftType - 1][RPE - 7]
        } else if (MOVEMENTS[nextMovement].secondary.includes(MOVEMENTS[movement].primary)) {
          // next movement secondary is current primary
          restTime = REST_TIMES[liftType - 1][RPE -7] / 1.5;
        } else if (MOVEMENTS[movement].secondary.includes(MOVEMENTS[nextMovement].primary)) {
          // next movement primary is a current secondary
          restTime = REST_TIMES[liftType - 1][RPE -7] / 2;
        } 
      }

      return restTime
    }
}

  function fitTimeFrame(){

    const setTime = [.26, .4, .53, .67, .8];

    Workouts.forEach(day => day.accessories = day.movements.findIndex(entry => VARIANTS[entry].region === "side delts") > -1? ["side deltoids"] : []);

    // place definite accessories
    Workouts.forEach((workout, dayIndex) => {
      accessories.forEach(accessory => {
        if (accessory === "calves" && Workouts[(dayIndex) % WEEKDAYS].title.includes("legs")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "rear deltoids" || accessory === "traps") && Workouts[(dayIndex) % WEEKDAYS].title.includes("back")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "side deltoids") && Workouts[(dayIndex) % WEEKDAYS].title.includes("chest") && !Workouts[(dayIndex + 1) % WEEKDAYS].title.includes("shoulders") && !Workouts[(dayIndex + 6) % WEEKDAYS].title.includes("shoulders")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "forearms") && (Workouts[(dayIndex) % WEEKDAYS].title.includes("biceps") && Workouts[(dayIndex) % WEEKDAYS].title.includes("triceps"))){
          workout.accessories.push(accessory);
        }
      })
    })

    for (let j = 0; j < WEEKDAYS; j++){
      let allSets = Workouts[j].allSets;
      let movements = Workouts[j].movements;
      let sorted = sortRemoved(movements);
      let accessoriesSorted = getAccessories(j, movements);
      let totalTime = 0;

      allSets.forEach(set => {
        totalTime += set.rest + setTime[set.liftType - 1];
      })

      // remove sets until time is met
      let done = false;
      for (let k = 0; !done && totalTime > time && k < sorted.length; k++){
        const movement = sorted[k];
        let restRemoved = 0;
        let firstSet = allSets.find(entry => entry.variant === movement) 
        const liftType = firstSet.liftType;
        allSets.filter(entry => entry.variant === movement).forEach(entry => {
          restRemoved += (entry.rest + setTime[liftType - 1]);
        })
        
        if (Math.abs(totalTime - restRemoved) - time < Math.abs(totalTime - time)){
          totalTime -= restRemoved;
          const lastIndex = allSets.findIndex(entry => entry.variant === movement) - 1;
          allSets = allSets.filter(entry => entry.variant !== movement);
          if (lastIndex >= 0){
            updateRest(allSets, lastIndex);
          }
          movements = movements.filter(entry => entry !== movement);
        } else {
          done = true;
        }
      } 

      // add accesories 
      done = false;
      for (let k = 0; !done && totalTime !== 0 && totalTime < time && k < accessoriesSorted.length; k++){
        const movement = accessoriesSorted[k];
        let group = VARIANTS[movement].group;
        if (group === "shoulders"){
          group = "side deltoids";
        }
        let RPESeq = ACCESSORIES[VARIANTS[movement].movement].sequences[expIcon];
        RPESeq = RPESeq.slice(RPESeq.length - numberOfSets, RPESeq.length);
        let restAdded = 0;
        RPESeq.forEach(entry => {
          restAdded += REST_TIMES[4][entry - 7];
        }) 
        if (Math.abs(totalTime + restAdded) - time < Math.abs(totalTime - time)){
          totalTime += restAdded;
          RPESeq.forEach(entry => {
            allSets.push({
              variant: movement,
              liftType: 5,
              RPE: entry,  
              rest: REST_TIMES[4][entry - 7]
            })
          })
          updateRest(allSets, allSets.length - (numberOfSets + 1));
          movements.push(movement);
          if (!Workouts[j].accessories.includes(group)){
            Workouts[j].accessories.push(group);
          }
        } else {
          done = true;
        }
      }

      Workouts[j].allSets = allSets;
      Workouts[j].movements = movements;
    }

    function sortRemoved(movements){
      let sortedList = [];
      let groupClusters = [];
      let groups = [];

      movements.forEach(movement => {
        const group = MOVEMENTS[VARIANTS[movement].movement].primary;
        if (!groups.includes(group)){
          groupClusters.push([movement]);
          groups.push(group);
        } else {
          groupClusters[groups.indexOf(group)].push(movement);
        }
      })

      let count = 0;
      while (groups.length > 0 && groupClusters.some(cluster => cluster.length > 1)){
        let cluster = groupClusters[count % groupClusters.length];

        if (!(cluster.length === 1 && groupClusters.some(cl => cl.length > 2))) {
          if (cluster.length > 1) {
            sortedList.push(cluster.pop());
          }
        }
        count++;
      }

      return sortedList;
    }

    function getAccessories(dayIndex, movements) {
      let sortedList = [];

      const accessoryGroups = accessories.filter(accessory => {
        let allowed = true;
        if (Workouts[(dayIndex + 1) % WEEKDAYS].accessories.includes(accessory) || Workouts[(dayIndex + 6) % WEEKDAYS].accessories.includes(accessory)){
          allowed = false;
        }
        if ((accessory === "calves")){
          if (!Workouts[dayIndex].title.includes("legs")) {
            allowed = false;
          }
          if (Workouts[(dayIndex + 1) % WEEKDAYS].title.includes("legs") || Workouts[(dayIndex + 6) % WEEKDAYS].title.includes("legs")){
            allowed = false;
          }
        }
        if ((accessory === "rear deltoids" || accessory === "traps")){
          if (Workouts[(dayIndex + 1) % WEEKDAYS].title.includes("back")){
            allowed = false;
          }
        }

        if ((accessory === "side deltoids")){
          if (Workouts[(dayIndex + 1) % WEEKDAYS].title.includes("shoulders")){
            allowed = false;
          }
        }

        if ((accessory === "forearms")){
          if (Workouts[(dayIndex + 1) % WEEKDAYS].title.includes("back")){
            allowed = false;
          }
        }

        return allowed;
      });

      let groupClusters = [];
      accessoryGroups.forEach((group, index) => {
        groupClusters.push([]);
        for (let i = 0; i < Math.min(2, ACCESSORY_GROUPS[group].isolations.length); i++){
          const variant = ACCESSORIES[ACCESSORY_GROUPS[group].isolations[i]].variants[0];
          if (!movements.includes(variant)){
            groupClusters[index].unshift(variant);
          }
        }
      })

      let count = 0;
      while (groupClusters.some(cluster => cluster.length > 0)){
        const cl = groupClusters[count % groupClusters.length];
        if (cl.length > 0){
          sortedList.push(cl.pop());
        }
        count++;
      }

      return sortedList;
    }

    function updateRest(allSets, index) {
      const set = allSets[index];
      const nextSet = index < allSets.length - 1? allSets[index + 1] : null;
      set.rest = nextSet === null || VARIANTS[set.variant].group !== VARIANTS[nextSet.variant].group ? 1 : REST_TIMES[set.liftType - 1][set.RPE - 7];
    }
  }

};

module.exports = getRoutines;