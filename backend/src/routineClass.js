const staticData = require('./staticData');

class RoutineClass {
  constructor(split, numSets, expIcon, styleIcon) {
    this.numSets = numSets;
    this.expIcon = expIcon;
    this.styleIcon = styleIcon;
    this.split = split
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

  static getSequences(styleIcon, horizPress, vertPress, horizPull, vertPull, kneeFlex, hipExt, curl, extension){
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
        } else if (entry.type === 'curl-0') {
          sequences[index].push(curl)
        } else if (entry.type === 'extension-0') {
          sequences[index].push(extension)
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

  setMovements(idealStimulus, sequences, expIcon, numberOfSets, styleIcon) {
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

      const [workingDays, restDays] = RoutineClass.getWorkingDays(this.split, group);
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
          const RPESeq = movementInfo.sequences[expIcon].slice(numberOfSets * -1)
          const lowerRep = sequencePre.seq[groupLength].lowerRep;
          const upperRep = sequencePre.seq[groupLength].upperRep;
          const movementStim = RoutineClass.getMovementStim(RPESeq, stimVars[lowerRep]);

          stimCount += movementStim;
          let biasIcon = 'n' 
          if (!movementInfo.biasOrder.includes('n')) {
            biasIcon = movementInfo.biasOrder[0];
          }

          this.routine[dayIndex].movements.push({
            movement: movement,
            bias: biasIcon, 
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

  static STD(values) {
    const mean = values.reduce((acc, val) => acc + val, 0) / values.length;
    const squaredDifferences = values.map(val => Math.pow(val - mean, 2));
    const meanSquaredDifference = squaredDifferences.reduce((acc, val) => acc + val, 0) / squaredDifferences.length;
    const standardDeviation = Math.sqrt(meanSquaredDifference);
  
    return standardDeviation;
  }

  evenStimulus(styleIcon, expIcon, numberOfSets){
    const WEEKDAYS = 7;
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;
    const preSequences = staticData.sequences;
    const movementOrders = staticData.movementOrder;
    const stimVars = staticData.stimVars;

    let totalStim = new Array(WEEKDAYS).fill(0);
    this.routine.forEach((day, index) => {
      day.movements.forEach(movement => {
        totalStim[index] += movement.stimulus;
      })
    })

    let best = JSON.parse(JSON.stringify(this.routine));
    let bestStim = JSON.parse(JSON.stringify(totalStim));
    let bestSTD = RoutineClass.STD(totalStim);

    let count = 0;
    while (count === 0 || count < 20 && best.some((workout, index) => workout.movements.length !== this.routine[index].movements.length)){

      // store the best workout sequence 
      if (RoutineClass.STD(totalStim) < bestSTD){
        bestSTD = RoutineClass.STD(totalStim);
        bestStim = JSON.parse(JSON.stringify(totalStim));
        best = JSON.parse(JSON.stringify(this.routine));
      }
      
      for (let i = groupNames.length - 1; i >= 0; i--){
        const group = groupNames[i];
        const [workingDays, restDays] = RoutineClass.getWorkingDays(this.split, group);
        const preSeq = i < 3? preSequences[group][styleIcon] : preSequences[group];
        let maxDay = workingDays[0]; let minDay = workingDays[0];
  
        // move workouts from the max day to the min day 
        workingDays.forEach((day) => {
          maxDay = totalStim[day] > totalStim[maxDay] && this.routine[day].movements.filter(movement => movementInfos[movement.movement].primary === group).length > 1? day: maxDay;
          minDay = totalStim[day] < totalStim[minDay]? day: minDay;
        })

        // get movements of that muscle group
        let maxMovements = this.routine[maxDay].movements.filter(movement => {
          return movementInfos[movement.movement].primary === group
        })

        let minMovements = this.routine[minDay].movements.filter(movement => {
          return movementInfos[movement.movement].primary === group
        })
  
        let oldSets = JSON.parse(JSON.stringify(this.routine)); 
        let oldStim = JSON.parse(JSON.stringify(totalStim));
        let oldSTD = RoutineClass.STD(totalStim); let newSTD = 0;
  
        // move workouts until STD is minimized 
        const min = i < 3? 2: 1;
        while (maxDay !== minDay && oldSTD > newSTD && maxMovements.length > min && minMovements.length < preSeq.seq.length - 1){
          
          oldSTD = RoutineClass.STD(totalStim);
          oldSets = JSON.parse(JSON.stringify(this.routine));
  
          // update the stimulus counts
          let removedIndex = preSeq.order[maxMovements.length - 1];
          if (removedIndex > maxMovements.length - 1){
            removedIndex = maxMovements.length - 1;
          }
          const removed = maxMovements.splice(removedIndex, 1)[0];

          const addedIndex = preSeq.order[minMovements.length];
          const addedMovement = movementOrders[preSeq.seq[addedIndex].type].filter(movement => !minMovements.some(entry => 
            entry.movement === movement
          ))[0];
          const RPESeq = movementInfos[addedMovement].sequences[expIcon].slice(numberOfSets * -1);
          const biasIcon = movementInfos[addedMovement].biasOrder.includes('n')? 'n': movementInfos[addedMovement].biasOrder[0];

          const added = {
            movement: addedMovement,
            bias: biasIcon,
            RPE: RPESeq,
            lowerRep: preSeq.seq[addedIndex].lowerRep,
            upperRep: preSeq.seq[addedIndex].upperRep,
            stimulus: RoutineClass.getMovementStim(RPESeq, stimVars[preSeq.seq[addedIndex].lowerRep]),
          }
          minMovements.push(added);
          // update the movements 
          if (this.routine[maxDay].movements.length > 2 || this.routine[minDay].movements.length < 2){
            totalStim[maxDay] -= removed.stimulus; 
            totalStim[minDay] += added.stimulus;
            this.routine[minDay].movements.push(added);
            this.routine[maxDay].movements.splice(this.routine[maxDay].movements.findIndex(entry => entry.movement === removed.movement), 1);
          }
  
          newSTD = RoutineClass.STD(totalStim);
        }

        // update workouts 
        if (oldSTD <= newSTD) {
          this.routine = JSON.parse(JSON.stringify(oldSets));
          totalStim = JSON.parse(JSON.stringify(oldStim));
        }
      }
      count++;
    }

    this.routine = best;
    totalStim = bestStim;
  }

  setVariants(chestVal, backVal, legsVal){
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;

    for (let i = 0; i < 3; i++){
      const group = groupNames[i];
      const val = i === 0? chestVal: i === 1? backVal: legsVal;
      let icon = 'n';
      if (i === 0){
        icon = val > 50? 'u': val < 50? 'l': 'n'; 
      } else if (i === 1){
        icon = val > 50? 'u': val < 50? 'l': 'n'; 
      } else {
        icon = val > 50? 'q': val < 50? 'h': 'n';
      }

      let totalMovements = 0;
      this.routine.forEach(day => {
        day.movements.forEach(movement => {
          if (movementInfos[movement.movement].primary === group){
            totalMovements += 1;
          }
        })
      })

      const targetRatio = Math.abs(val - 50) / 75;
      let currRatio = 0;
      
      for (let j = 0; j < 3 && currRatio < targetRatio; j++) {
        this.routine.forEach((day, dayIndex) => {
          if (this.split[dayIndex].includes(group) && icon !== 'n'){
            
            let movements = day.movements.filter(movement => movementInfos[movement.movement].primary === group);

            movements.forEach((movement, moveIndex) => {
              if (this.routine[dayIndex].movements.find(entry => entry.movement === movement.movement).bias !== icon && movementInfos[movement.movement].biasOrder.slice(0, j + 1).includes(icon)){

                if (currRatio < targetRatio){
                  currRatio += (1 / totalMovements);
                  this.routine[dayIndex].movements.find(entry => entry.movement === movement.movement).bias = icon;
                }
              }
             })
          }
        })
      }
    }
  }

  organizeSets(){
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;

    this.routine.forEach((day, index) => {
      let lists = [];
      
      groupNames.forEach(group => {
        if (this.split[index].includes(group)){
          const groupArr = day.movements.filter(movement => movementInfos[movement.movement].primary === group);
          lists.push(groupArr);
        }
      })
      lists.sort((a, b) => b.length - a.length); 

      let order = [];

      while (lists.some(list => list.length > 0)){
        lists.forEach(list => {
          if (list.length > 0){
            order.unshift(list.pop());
          }
        })
      }

      let movedInx = [];
      for (let i = 0; i < order.length; i++){
        const group = movementInfos[order[i].movement].primary;
        const secondaries = movementInfos[order[i].movement].secondary;
        const ahead = i < order.length - 1? order[i + 1]: null;
        if (ahead !== null && (movementInfos[ahead.movement].secondary.includes(group))){
          movedInx.push(i);
        }
      }

      while (movedInx.length > 0){
        const inx = movedInx.pop();
        order.push(order.splice(inx, 1)[0]);
      }

      this.routine[index].movements = order;
    })
  }

  getAllSets(){
    this.routine.forEach((day, dayIndex) => {
      day.movements.forEach((movement, i) => {
        for (let j  = 0; j < this.numSets; j++){
          this.routine[dayIndex].sets.push({
            movement: movement.movement, 
            bias: movement.bias,
            lowerRep: movement.lowerRep, 
            upperRep: movement.upperRep,
            RPE: movement.RPE[j],
            rest: RoutineClass.getRestTime(movement.movement, movement.RPE[j], i === day.movements.length - 1? null : day.movements[i + 1].movement, j === this.numSets - 1? true: false, movement.lowerRep)
          })
        }
      })
    })
  }

  static getRestTime(movement, RPE, nextMovement, lastSet, lowerRep){
    const restTimes = staticData.restTimes;
    const movementInfos = staticData.movements;
    let restTime = 1;
    
    if (!lastSet){
      restTime = restTimes[lowerRep/2 - 1][RPE - 7]; 
    } else if (nextMovement !== null){
      if (movementInfos[nextMovement].primary === movementInfos[movement].primary) {
        // next movement primary is current primary
        restTime = restTimes[lowerRep/2 - 1][RPE - 7]
      } else if (movementInfos[nextMovement].secondary.includes(movementInfos[movement].primary)) {
        // next movement secondary is current primary
        restTime = restTimes[lowerRep/2 - 1][RPE -7] / 1.5;
      } else if (movementInfos[movement].secondary.includes(movementInfos[nextMovement].primary)) {
        // next movement primary is a current secondary
        restTime = restTimes[lowerRep/2 - 1][RPE -7] / 2;
      } 
    }

    return restTime
  }

  fitTimeFrame(){
    const accessories = ["calves", "abs", "rear deltoids", "side deltoids", "traps", "forearms"]; 
    const WEEKDAYS = 7;

    const setTime = [.26, .4, .53, .67, .8];

    this.routine.forEach(day => day.accessories = day.movements.findIndex(entry => entry.movement.includes("lateral raise")) > -1? ["side deltoids"] : []);

    // place definite accessories
    this.routine.forEach((workout, dayIndex) => {
      accessories.forEach(accessory => {
        if (accessory === "calves" && this.routine[(dayIndex) % WEEKDAYS].title.includes("legs")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "rear deltoids" || accessory === "traps") && this.routine[(dayIndex) % WEEKDAYS].title.includes("back")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "side deltoids") && this.routine[(dayIndex) % WEEKDAYS].title.includes("chest") && !this.routine[(dayIndex + 1) % WEEKDAYS].title.includes("shoulders") && !this.routine[(dayIndex + 6) % WEEKDAYS].title.includes("shoulders")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "forearms") && (this.routine[(dayIndex) % WEEKDAYS].title.includes("biceps") && this.routine[(dayIndex) % WEEKDAYS].title.includes("triceps"))){
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
} 

module.exports = RoutineClass;