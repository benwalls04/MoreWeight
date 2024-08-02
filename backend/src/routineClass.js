const staticData = require('./staticData');

class RoutineClass {
  constructor(split, numSets, expIcon, styleIcon, numDays) {
    this.numSets = numSets;
    this.expIcon = expIcon;
    this.styleIcon = styleIcon;
    this.numDays = numDays;
    this.split = split
    this.routine = [];
    this.title = '';
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
    const groupInfos = staticData.groups;
    const groupNames = staticData.groupNames;
    const expIndex = experience === 'b' ? 0: experience === 'i'? 1: 2;

    let stimulus = [];
    for (let i = 0; i < groupNames.length; i++){
      const upperBound = groupInfos[groupNames[i]].upperStim[expIndex];
      const lowerBound = groupInfos[groupNames[i]].lowerStim[expIndex];
      const setsWeight = .5;
      const biasWeight = .5;
      const multiplier = muscleBias[i] * biasWeight + (.5 * numberOfSets - 1) * setsWeight;
      stimulus.push(lowerBound + (upperBound - lowerBound) * multiplier);
      if (split.filter(day => day.includes(groupNames[i])).length === 0){
        stimulus[i] = 0;
      } 
      if (split.filter(day => day.includes(groupNames[i])).length === 1){
        stimulus[i] = stimulus[i] * .66;
      }
    }

    return stimulus;
  }

  setMovements(idealStimulus, sequences) {
    const numDays = this.numDays;
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;
    const stimVars = staticData.stimVars;
    const sequenceInfo = staticData.sequences;

    let stimArr = [];
    for (let i = 0; i < numDays; i++){
      stimArr.push(new Array(groupNames.length).fill(0));
    }

    groupNames.forEach((group, index) => {
      const totalStim = idealStimulus[index];

      const [workingDays, restDays] = RoutineClass.getWorkingDays(this.split, group, numDays);
      const sequence = sequences[index];
      const preSeq = index < 3? sequenceInfo[group][this.styleIcon] : sequenceInfo[group];
      const order = preSeq.order;

      for (let k = 0; k < workingDays.length; k++){
        const dayIndex = workingDays[k];
        let stimCount = 0;
        const stimGoal = totalStim * (restDays[k] / numDays);
        let groupLength = 0;
        let groupArr = [];

        while (stimCount < stimGoal && groupLength < sequence.length){
          let movement = sequence[order[groupLength]];
          const movementInfo = movementInfos[movement];
          const RPESeq = movementInfo.sequences[this.expIcon].slice(this.numSets * -1)
          const lowerRep = preSeq.seq[groupLength].lowerRep;
          const upperRep = preSeq.seq[groupLength].upperRep;
          const movementStim = RoutineClass.getMovementStim(RPESeq, stimVars[lowerRep]);

          stimCount += movementStim;
          let biasIcon = 'n' 
          if (!movementInfo.biasOrder.includes('n')) {
            biasIcon = movementInfo.biasOrder[0];
          }

          const added = {
            movement: movement,
            bias: biasIcon,
            RPE: RPESeq,
            lowerRep: lowerRep,
            upperRep: upperRep,
            stimulus: movementStim,
          }
          if (order[groupLength] < groupLength){
            groupArr.splice(order[groupLength], 0, added)
          } else {
            groupArr.push(added)
          }

          groupLength++;
        }

        groupArr.forEach(entry => {
          this.routine[dayIndex].movements.push(entry)
        })
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

  static getWorkingDays(split, group, numDays){
    let workingDays = [];
    let restDays = [];

    // find working days for the muscle group
    for (let i = 0; i < numDays; i++){
      if (split[i].includes(group)){
        workingDays.push(i);

        // get the number of rest days  
        let nextFound = false;
        let count = 1;
        while (!nextFound){
          if (split[(i + count) % numDays].includes(group)){  
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

  evenStimulus(){
    const numDays = this.numDays;
    const groupNames = staticData.groupNames;
    const movementInfos = staticData.movements;
    const sequenceInfo = staticData.sequences;
    const movementOrders = staticData.movementOrder;
    const stimVars = staticData.stimVars;

    let totalStim = new Array(numDays).fill(0);
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
        const [workingDays, restDays] = RoutineClass.getWorkingDays(this.split, group, numDays);
        const preSeq = i < 3? sequenceInfo[group][this.styleIcon] : sequenceInfo[group];
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

        let minMovementsFill = JSON.parse(JSON.stringify(minMovements));

        preSeq.order.slice(minMovements.length).sort((a, b) => a - b).forEach(finalIndex => {
          minMovementsFill.splice(finalIndex, 0, preSeq.seq[finalIndex]);
        })
  
        let oldSets = JSON.parse(JSON.stringify(this.routine)); 
        let oldStim = JSON.parse(JSON.stringify(totalStim));
        let oldSTD = RoutineClass.STD(totalStim); let newSTD = 0;
  
        // move workouts until STD is minimized 
        const min = i < 3? 2: 1;
        while (maxDay !== minDay && oldSTD > newSTD && maxMovements.length > min){
          
          oldSTD = RoutineClass.STD(totalStim);
          oldSets = JSON.parse(JSON.stringify(this.routine));
  
          // update the stimulus counts
          let removedIndex = preSeq.order[maxMovements.length - 1];
          if (removedIndex > maxMovements.length - 1){
            removedIndex = maxMovements.length - 1;
          }
          const removed = maxMovements.splice(removedIndex, 1)[0];

          // get added movement
          const addedIndex = preSeq.order[minMovements.length];

          let type = preSeq.seq[preSeq.order[minMovements.length]].type;
          if (type.includes('-0')){
            type = type.replace('-0', '-1');
          }
          const addedMovement = movementOrders[type].filter(movement => !minMovements.map(entry => entry.movement).includes(movement))[0];
  
          const RPESeq = movementInfos[addedMovement].sequences[this.expIcon].slice(this.numSets * -1);
          const biasIcon = movementInfos[addedMovement].biasOrder.includes('n')? 'n': movementInfos[addedMovement].biasOrder[0];

          const added = {
            movement: addedMovement,
            bias: biasIcon,
            RPE: RPESeq,
            lowerRep: preSeq.seq[addedIndex].lowerRep,
            upperRep: preSeq.seq[addedIndex].upperRep,
            stimulus: RoutineClass.getMovementStim(RPESeq, stimVars[preSeq.seq[addedIndex].lowerRep]),
          }

          const indeciesnBehind = preSeq.order.filter(entry => entry < addedIndex);
          const firstBehind = minMovementsFill[Math.max(...indeciesnBehind)]
          const moveBehind = firstBehind? firstBehind.movement : null; 
          
          // update the movements 
          if (this.routine[maxDay].movements.length > 2 || this.routine[minDay].movements.length < 2){
            totalStim[maxDay] -= removed.stimulus; 
            totalStim[minDay] += added.stimulus;

            // update min day movements
            const minDayIndex = moveBehind !== null? this.routine[minDay].movements.findIndex(entry => entry.movement === moveBehind): 0;
            this.routine[minDay].movements.splice(minDayIndex, 0, added);
            minMovements.splice(addedIndex, 0, added);

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

      // place movements alterating muscle groups 
      while (lists.some(list => list.length > 0)){
        lists.forEach(list => {
          if (list.length > 0){
            order.unshift(list.pop());
          }
        })
      }
      
      // move isolations to the back
      let movedInx = [];
      for (let i = 0; i < order.length; i++){
        const secondary = movementInfos[order[i].movement].secondary;
        if (secondary.length === 0 && order.slice(i + 1).some(entry => movementInfos[entry.movement].secondary.length > 0)){
          movedInx.push(i)
        }
      }
      while (movedInx.length > 0){
        const inx = movedInx.pop();
        order.push(order.splice(inx, 1)[0]);
      }

      // move heavy compounds to the front
      if (order.some(entry => entry.movement === "barbell bench press" || entry.movement === "deadlift")) {
        const firstIndex = order.findIndex(entry => entry.movement === "barbell bench press" || entry.movement === "deadlift");
        
        if (firstIndex !== -1) {
          const [element] = order.splice(firstIndex, 1);
          order.unshift(element);
        }
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
            rest: RoutineClass.getRestTime(movement.movement, movement.RPE[j], i === day.movements.length - 1? null : day.movements[i + 1].movement, j === this.numSets - 1? true: false, movement.lowerRep), 
            num: j + 1,
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

  fitTimeFrame(time, accessories){
    const movementOrders = staticData.movementOrder;
    const movementInfos = staticData.movements;
    const restTimes = staticData.restTimes;
    
    const setTime = [.26, .4, .53, .67, .8];

    this.routine.forEach(day => day.accessories = day.movements.findIndex(entry => entry.movement.includes("lateral raise")) > -1? ["side deltoids"] : []);

    // place definite accessories
    this.routine.forEach((workout, dayIndex) => {
      accessories.forEach(accessory => {
        if (accessory === "calves" && this.routine[(dayIndex) % this.numDays].title.includes("legs")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "rear deltoids" || accessory === "traps") && this.routine[(dayIndex) % this.numDays].title.includes("back")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "side deltoids") && this.routine[(dayIndex) % this.numDays].title.includes("chest") && !this.routine[(dayIndex + 1) % this.numDays].title.includes("shoulders") && !this.routine[(dayIndex + 6) % this.numDays].title.includes("shoulders")){
          workout.accessories.push(accessory);
        }
        if ((accessory === "forearms") && (this.routine[(dayIndex) % this.numDays].title.includes("biceps") && this.routine[(dayIndex) % this.numDays].title.includes("triceps"))){
          workout.accessories.push(accessory);
        }
      })
    })

    for (let j = 0; j < this.numDays; j++){
      let allSets = this.routine[j].sets;
      let movements = this.routine[j].movements;
      let sorted = RoutineClass.sortRemoved(movements, this.styleIcon);
      let accessoriesSorted = RoutineClass.getAccessories(this.routine, j, movements, movementOrders, this.numDays, accessories);
      let totalTime = 0;

      allSets.forEach(set => {
        totalTime += set.rest + setTime[set.lowerRep / 2 - 1];
      })

      // remove sets until time is met
      let done = false;

      for (let k = 0; !done && totalTime > time && k < sorted.length; k++){
        const movement = sorted[k].movement;
        let restRemoved = 0;
        let firstSet = allSets.find(entry => entry.movement === movement) 
        allSets.filter(entry => entry.movement === movement).forEach(entry => {
          restRemoved += (entry.rest + setTime[firstSet.lowerRep / 2 - 1]);
        })
        
        if (totalTime > time){
          totalTime -= restRemoved;
          const lastIndex = allSets.findIndex(entry => entry.movement === movement) - 1;
          allSets = allSets.filter(entry => entry.movement !== movement);
          if (lastIndex >= 0){
            RoutineClass.updateRest(allSets, lastIndex, movementInfos);
          }
          movements = movements.filter(entry => entry.movement !== movement);
        } else {
          done = true;
        }
      } 

      // add accesories 
      done = false;
      for (let k = 0; !done && totalTime !== 0 && totalTime < time && k < accessoriesSorted.length; k++){
        const movement = accessoriesSorted[k];

        let group = movementInfos[movement].primary;
        if (group === "shoulders"){
          group = "side deltoids";
        }

        let RPESeq = movementInfos[movement].sequences[this.expIcon];
        RPESeq = RPESeq.slice(RPESeq.length - this.numSets, RPESeq.length);
        let restAdded = 0;
        RPESeq.forEach(entry => {
          restAdded += restTimes[4][entry - 7];
        }) 

        // add to allSets and movements 
        if (totalTime < time){
          totalTime += restAdded;
          movements.push({
            movement: movement,
            bias: 'n',
            RPE: RPESeq,
            lowerRep: 10,
            upperRep: 14,
          })
          RPESeq.forEach((entry, n) => {
            allSets.push({
              movement: movement,
              RPE: entry,  
              rest: restTimes[4][entry - 7], 
              lowerRep: 10, 
              upperRep: 14,
              num: n + 1,
            })
          })

          // update variables 
          RoutineClass.updateRest(allSets, allSets.length - (this.numSets + 1), movementInfos);
          if (!this.routine[j].accessories.includes(group)){
            this.routine[j].accessories.push(group);
          }
        } else {
          done = true;
        }
      }
      this.routine[j].sets = allSets;
      this.routine[j].movements = movements;
    }
  }

  static sortRemoved(movements, styleIcon){
    const movementInfos = staticData.movements;
    const sequenceInfo = staticData.sequences;
    const groupNames = staticData.groupNames;
    
    let sortedList = [];
    let groupClusters = [];
    let groups = [];
    let seqs = [];

    movements.forEach((movement) => {
      const group = movementInfos[movement.movement].primary;
      if (!groups.includes(group)){
        groupClusters.push([movement]);
        groups.push(group);
        const preSeq = groupNames.indexOf(group) < 3? sequenceInfo[group][styleIcon]: sequenceInfo[group];
        seqs.push(JSON.parse(JSON.stringify(preSeq)));
      } else {
        groupClusters[groups.indexOf(group)].push(movement);
      }
    })

    groupClusters.sort((a, b) => a.length - b.length)

    seqs.forEach((entry, index) => {
      entry.seq = entry.seq.slice(0, groupClusters[index].length)
      entry.order = entry.order.slice(0, groupClusters[index].length)
    })

    let count = 0;
    while (groups.length > 0 && groupClusters.some(cluster => cluster.length > 1)){
      let cluster = groupClusters[count % groupClusters.length];

      if (!(cluster.length === 1 && groupClusters.some(cl => cl.length > 2))) {
        if (cluster.length > 1) {
          const moveIndex = seqs[count % groupClusters.length].order.pop();
          const movement = cluster.splice(Math.min(moveIndex, cluster.length - 1), 1)[0];
          sortedList.push(movement);
        }
      }
      count++;
    }

    return sortedList;
  }

  static getAccessories(routine, dayIndex, movements, movementOrders, numDays, accessories) {
    let sortedList = [];

    const accessoryGroups = accessories.filter(accessory => {
      let allowed = true;
      if (routine[(dayIndex + 1) % numDays].accessories.includes(accessory) || routine[(dayIndex + 6) % numDays].accessories.includes(accessory)){
        allowed = false;
      }
      if ((accessory === "calves")){
        if (!routine[dayIndex].title.includes("legs")) {
          allowed = false;
        }
        if (routine[(dayIndex + 1) % numDays].title.includes("legs") || routine[(dayIndex + 6) % numDays].title.includes("legs")){
          allowed = false;
        }
      }
      if ((accessory === "rear deltoids" || accessory === "traps")){
        if (routine[(dayIndex + 1) % numDays].title.includes("back")){
          allowed = false;
        }
      }
      if ((accessory === "side deltoids")){
        if (routine[(dayIndex + 1) % numDays].title.includes("shoulders")){
          allowed = false;
        }
      }
      if ((accessory === "forearms")){
        if (routine[(dayIndex + 1) % numDays].title.includes("back")){
          allowed = false;
        }
      }
      if((accessory === "abs")){
        if (routine[(dayIndex + 1) % numDays].title.includes("legs")){
          allowed = false;
        }
      }

      return allowed;
    });

    let groupClusters = [];
    accessoryGroups.forEach((group, index) => {
      groupClusters.push([]);
      const max = group === "traps" || group === "forearms"? 1: 2;
      for (let i = 0; i < Math.min(max, movementOrders[group].filter(move => !movements.some(entry => entry.movement === move)).length); i++){
        const movement = movementOrders[group][groupClusters[index].length];
        if (!movements.some(entry => entry.movement === movement)){
          groupClusters[index].unshift(movement);
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

  static updateRest(allSets, index, movementInfos) {
    const set = allSets[index];
    const nextSet = index < allSets.length - 1? allSets[index + 1] : null;
    set.rest = nextSet === null || movementInfos[set.movement].primary !== movementInfos[nextSet.movement].primary ? 1 : staticData.restTimes[set.lowerRep / 2 - 1][set.RPE - 7];
  }
} 

module.exports = RoutineClass;