const staticData = require('./staticData');

class SplitsClass {
  constructor() {
    this.selection = 'p1'
    this.a = {
      1: [], 
      2: [], 
      3: [], 
    }
    this.p = {
      1: [], 
      2: [], 
      3: [], 
    }
    this.b = {
      1: [], 
      2: [], 
      3: [], 
    }
    this.u = {
      1: [], 
      2: [], 
    }
  }

  getLiftDays(muscleBias){
    const daysUnsorted = staticData.workoutDays
  
    let daysSorted = []; 
    for (let i = 0; i < 4; i++){
      for (let j = 0; j < daysUnsorted.length; j++){
        let hasPlusGroup = false;
        let hasMinusGroup = false;
        let day = daysUnsorted[j];
  
        muscleBias.forEach((bias, index) => {
          const group = GROUP_NAMES[index];
          if (bias > .5 && day.includes(group)){
            hasPlusGroup = true;
          } 
          if (bias < .5 && day.includes(group)){
            hasMinusGroup = true;
          }
        })
  
        if ((i === 0 && hasPlusGroup && !hasMinusGroup) ||
        (i === 1 && (hasPlusGroup !== hasMinusGroup)) ||
        (i === 2 && !hasPlusGroup && hasMinusGroup) || i === 3 && !daysSorted.includes(day)) {
          if (!daysSorted.includes(day)){
            daysSorted.push(day);
          }
        }
      }
    } 
  
    return daysSorted;
  }

  static checkDayPlacement(schedule, checkedDay, index){
    const GROUP_NAMES = staticData.groupNames;
    const WEEKDAYS = 7;

    let pass = true;

    // set requirments for rest depending on the check number 
    let bigRest = 2;
    let smallRest = 1;
  
    if (schedule[index] !== "lift"){
      pass = false;
    }
  
    // check if each muscle group violates rest requirments 
    for (let i = 0; pass && i < GROUP_NAMES.length; i++){
      const group = GROUP_NAMES[i];
      const restNeeded = i < 3? bigRest: smallRest;

      if (checkedDay.includes(group)){
        pass = SplitsClass.daySpacingCheck(schedule, restNeeded, index, group);           
      }
    }
  
  return pass;
  }

  static daySpacingCheck(schedule, restNeeded, index, group){
    const GROUP_NAMES = staticData.groupNames;
    const WEEKDAYS = 7;

    const secondaries = group === "chest"? ["shoulders", "triceps"]: group === "back"? ["biceps"]: [];
    const primaries = (group === "shoulders" || group === "triceps")? ["chest"]: group === "biceps"? ["back"]: []

    let pass = true;
    if (primaries.length > 0 && primaries.some(group => schedule[(index + 1) % WEEKDAYS].includes(group))){
      pass = false;
    }
    if (secondaries.length > 0 && secondaries.some(group => schedule[(index + 6) % WEEKDAYS].includes(group))){
      pass = false;
    }
    for (let i = 1; pass && i < WEEKDAYS; i++){
      let checkIndex = (index + i) % WEEKDAYS;
      if (((i <= restNeeded) || (WEEKDAYS - i) <= restNeeded) && schedule[checkIndex].includes(group)) {
        pass = false;
      }
    }
  
  return pass;
  }

  isValidSchedule(schedule, muscleBias){
    let isValid = true;
  
    // check to make sure the schedule is full with no duplicates 
    let isFull = !schedule.some(entry => entry.includes("lift"));
  
    let isDuplicate = Splits.some(existingArray =>
      existingArray.every((value , index ) => value === schedule[index])
    );
  
    if (isDuplicate || !isFull){
      isValid = false;
    }
  
    if (isValid){
    // count the number of times each muscle group is hit per week
      let muscleFreq = [];
      for (let i = 0; i < GROUP_NAMES.length; i++){
        let group = GROUP_NAMES[i];
        muscleFreq[i] = getMuscleFreq(schedule, group);
      }
  
    // choose the required frequency depending on the number of lifts per week 
      let minFreq = 0;
      if (frequency > 5){
        minFreq = 2;
      } else {
        minFreq = 1;
      }
  
    // check if each muscle group hits frequency requirments 
      for (let i = 0; i < GROUP_NAMES.length && isValid; i++){ 
        const initMinFreq = minFreq;
  
        if (muscleBias[i] <= .25){
          minFreq = 1;
        }
  
        if (muscleBias[i] >= .75 && frequency > 4){
          minFreq = 2;
        }
  
        if (muscleFreq[i] < minFreq){
          isValid = false;
        }
  
        minFreq = initMinFreq;
      }
    }
  
    return isValid;
  }

  getMuscleFreq(schedule, group){
    let counter = 0;
  
    for (let i = 0; i < WEEKDAYS; i++){
      if (schedule[i].includes(group)){
        counter++;
      }
    }
  
    return counter;
  }

  placeDays(schedule, toPlace, presetIcon){
    let index = schedule.indexOf("lift"); 

    if (toPlace > 0){
      for (let i = 0; i < liftDays.length; i++){
        let scheduleCopy = schedule.slice(0, WEEKDAYS);
  
        // try placing each day
        if (checkDayPlacement(scheduleCopy, liftDays[i], index)){
          scheduleCopy[index] = liftDays[i];
          placeDays(scheduleCopy, toPlace - 1, presetIcon);
        }
      }
    } else {
      if (isValidSchedule(schedule)){
        Splits.push(schedule);
        Titles.push(getTitle(presetIcon))
        Bases.push(presetIcon);
      }
    }
  }

  getTitle(presetIcon){
    let title = "";
    if (presetIcon.length === 0){
      title += "untitled split"; 
    } else {
      for (let i = 0; i < presetIcon.length; i++){
        const entry = presetIcon[i];
        if (entry === 'p1' || entry === 'p2' || entry === 'p3'){
          title += "push pull legs / ";
        }
        if (entry === 'a1' || entry === 'a2' || entry === 'a3'){
          title += "arnold split / ";
        } 
        if (entry === 'b1' || entry === 'b2' || entry === 'b3'){
          title += "body part split / ";
        }
      }
      title = title.substring(0, title.length - 3);
    }

    return title;
  }

  generateSplits(schedule, presetIcons){
    // place all possible base splits
    for (let day = 0; day < WEEKDAYS; day++){
      if (schedule[day] !== "rest"){
        for (let i = 0; i < BASE_SPLITS.length; i++){
          let base = BASE_SPLITS[i][0];
          const loopCap = frequency === 7? 1: base.length
          for (let j = 0; j < loopCap; j++){
            // copy schedule frame 
            let scheduleCopy = schedule.slice(0, WEEKDAYS);

            if (frequency < 7){
              base.unshift(base.pop());
            }
            // rotate the base and try to place each day
            let placedCount = 0; let m = 0; let canPlace = true;
            while (canPlace && placedCount < base.length && m < WEEKDAYS){
              if (scheduleCopy[(day + m) % WEEKDAYS] === "lift"){
                canPlace = checkDayPlacement(scheduleCopy, base[placedCount], (day + m) % WEEKDAYS)
                if (canPlace){
                  scheduleCopy[(day + m) % WEEKDAYS] = base[placedCount];
                  placedCount++;
                } 
              }
              m++;
            }

            // keep track of the type of split 
            let presetIcons2 = [...presetIcons];
            if (canPlace === true){
              presetIcons2.push(BASE_SPLITS[i][1]);
            }

            let toPlace = scheduleCopy.filter(entry => entry === "lift").length;

            // if there is space for another base, recall method 
            if (toPlace >= 3 && placedCount > 0){
              generateSplits(scheduleCopy, presetIcons2);
            } else {
              placeDays(scheduleCopy, toPlace, presetIcons2);
            }
          }
        }
      }
    }
  }

  static rotate(split, dir) {
    const WEEKDAYS = 7;
    let valid = true;
  
    // Set rest days in new array
    let newSplit = [...split];
    newSplit.forEach((day, index) => {
      if (day !== "rest") {
        newSplit[index] = "rest";
      }
    });
  
    // Rotate the working days
    let newOrder = split.filter(entry => entry !== 'rest');
    if (dir === 1) {
      // Rotate right
      const lastElement = newOrder.pop();
      newOrder.unshift(lastElement);
    } else {
      // Rotate left
      const firstElement = newOrder.shift();
      newOrder.push(firstElement);
    }
  
    // Place rotated days
    for (let i = 0; i < WEEKDAYS; i++) {
      if (split[i] !== "rest") {
        const day = newOrder.shift();
        if (!SplitsClass.checkDayPlacement(newSplit, day, i)) {
          valid = false;
        }
        newSplit[i] = day;
      }
    }
  
    return [valid, newSplit];
  }

  getSimilarity(a, b){

    const aCopy = a.filter(entry => entry !== 'rest');
    const bCopy = b.filter(entry => entry !== 'rest');
    let union = 0;
    let difference = 0;
    aCopy.forEach((day) => {
      if (bCopy.includes(day)){
        union++;
      } else {
        difference ++;
      }
    })
    bCopy.forEach((day) => {
      if (!aCopy.includes(day)){
        difference++;
      }
    })

    return union / difference;
  }

  getSampleText(base){
    if (base.length > 0){
      if (base[0].length === 2){
        return baseToText.get(base[0]);
      } else if (base.length > 1){
        return baseToText.get(base[1][0]);
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  decrementBase(base){
    let newBase = [];
    if (!isNaN(parseInt(base[0][0]))){
      newBase = base.slice(1, base.length);
    } else {
      newBase = base;
      newBase[0] = newBase[0].slice(1, newBase[0].length);
    }

    return newBase;
  }

  kMeansCluster(splits, k){
    const list = [];

    for (let i = 0; i < 5; i++){
      let clusters = [[], []];
      let centers = [];

      for (let m = 0; m < 5; m++){
        clusters = [[], []];
        centers = [];

        // randomly select centers
        for (let j = 0; j < k; j++){
          let index = Math.floor(Math.random() * splits.length);
          let tryCenter = splits[index][0];

          while (centers.some(center => center.every(entry => tryCenter === entry))){
            index = Math.floor(Math.random() * splits.length);
            tryCenter = splits[index][0];
          }

          centers.push(tryCenter);
        }   

        splits.forEach(split => {
          const similarities = [];
          centers.forEach(center => {
            similarities.push(getSimilarity(split[0], center));
          })

          if (similarities[0] === similarities[1]){
            const clusterIndex = clusters[0].length <= clusters[1].length? 0: 1;
            clusters[clusterIndex].push(split);
          } else if (similarities[0] > similarities[1]){
            clusters[0].push(split);
          } else {
            clusters[1].push(split);
          }
        })
        
      }
      list.push({
        similarity: getCenterSimilarity(centers), 
        clusters: clusters
      })
    }

    let best = list[0];
    for (let i = 1; i < list.length; i++) {
      if (list[i].similarity < best.similarity) {
          best = list[i];
      }
    }

    // return the splits without their icons
    return best.clusters.map(cluster => cluster.map(entry => ({split: entry[0], base: entry[1], score: entry[2], oldBase: entry[3]})));

    function getCenterSimilarity(centers){
      let variance = 0;
      for (let i = 0; i < centers.length; i++){
        for (let j = 0; j < centers.length; j++){
          if (i !== j){
            variance += getSimilarity(centers[i], centers[j]);
          }
        }
      }
      return variance;
    }

  }

}

module.exports = SplitsClass;
