const staticData = require('./staticData');

class SplitsClass {
  constructor() {
    this.selection = [];
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

  static checkDayPlacement(schedule, checkedDay, index, cycle){
    const GROUP_NAMES = staticData.groupNames;

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
        pass = SplitsClass.daySpacingCheck(schedule, restNeeded, index, group, cycle);           
      }
    }
  
  return pass;
  }

  static daySpacingCheck(schedule, restNeeded, index, group, cycle){
    const GROUP_NAMES = staticData.groupNames;

    const secondaries = group === "chest"? ["shoulders", "triceps"]: group === "back"? ["biceps"]: [];
    const primaries = (group === "shoulders" || group === "triceps")? ["chest"]: group === "biceps"? ["back"]: []

    let pass = true;
    if (primaries.length > 0 && primaries.some(group => schedule[(index + 1) % cycle].includes(group))){
      pass = false;
    }
    if (secondaries.length > 0 && secondaries.some(group => schedule[(index + 6) % cycle].includes(group))){
      pass = false;
    }
    for (let i = 1; pass && i < cycle; i++){
      let checkIndex = (index + i) % cycle;
      if (((i <= restNeeded) || (cycle - i) <= restNeeded) && schedule[checkIndex].includes(group)) {
        pass = false;
      }
    }
  
  return pass;
  }

  isValidSchedule(schedule, icons, cycle, frequency, bias){
    const GROUP_NAMES = staticData.groupNames;

    let isValid = true;
  
    // check to make sure the schedule is full with no duplicates 
    let isFull = !schedule.some(entry => entry.includes("lift"));
  
    let isDuplicate = false;
    icons.forEach((icon) => {
      const type = icon[0];
      const num = icon[1];
      if (this[type][num].some(existingArray =>
        existingArray.every((value, index ) => value === schedule[index])
      )) {
        isDuplicate = true;
      };
    })
  
    if (isDuplicate || !isFull){
      isValid = false;
    }
  
    if (isValid){
    // count the number of times each muscle group is hit per week
      let muscleFreq = [];
      for (let i = 0; i < GROUP_NAMES.length; i++){
        let group = GROUP_NAMES[i];
        muscleFreq[i] = SplitsClass.getMuscleFreq(schedule, group, cycle);
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

        if (i > 3){
          minFreq = 1;
          
          if (frequency > 4 & bias[i] >= .75){
            minFreq = 2;
          }

        } else {
          if (bias[i] <= .25){
            minFreq = 1;
          }
    
          if (bias[i] >= .75 && frequency > 4){
            minFreq = 2;
          }
    
        }
  
        if (muscleFreq[i] < minFreq){
          isValid = false;
        }
  
        minFreq = initMinFreq;
      }
    }
  
    return isValid;
  }

  static getMuscleFreq(schedule, group, cycle){
    let counter = 0;
  
    for (let i = 0; i < cycle; i++){
      if (schedule[i].includes(group)){
        counter++;
      }
    }
  
    return counter;
  }

  static placeDays(schedule, toPlace, icons, splits, cycle, bias, frequency){
    const liftDays = staticData.workoutDays;

    let index = schedule.indexOf("lift"); 

    if (toPlace > 0){
      for (let i = 0; i < liftDays.length; i++){
        let scheduleCopy = schedule.slice(0, cycle);
  
        // try placing each day
        if (SplitsClass.checkDayPlacement(scheduleCopy, liftDays[i], index, cycle)){
          scheduleCopy[index] = liftDays[i];
          SplitsClass.placeDays(scheduleCopy, toPlace - 1, icons, splits, cycle, bias, frequency);
        }
      }
    } else {
      if (splits.isValidSchedule(schedule, icons, cycle, frequency, bias)){
        icons.forEach(icon => {
          const type = icon[0]
          const num = icon[1]
          splits[type][num].push(schedule);
        })
      }
    }
  }

  static getTitle(icons){
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

  generateSplits(schedule, icons, bias, cycle, frequency){
    const baseSplits = staticData.baseSplits;

    // place all possible base splits
    for (let day = 0; day < cycle; day++){
      if (schedule[day] !== "rest"){
        for (const baseIcon in baseSplits){
          baseSplits[baseIcon].forEach(base => {
            
            // copy schedule frame 
            let scheduleCopy = [...schedule];

            let placedCount = 0; let m = 0; let canPlace = true;
            while (canPlace && placedCount < base.length && m < cycle){
              if (scheduleCopy[(day + m) % cycle] === "lift"){
                canPlace = SplitsClass.checkDayPlacement(scheduleCopy, base[placedCount], (day + m) % cycle, cycle)
                if (canPlace){
                  scheduleCopy[(day + m) % cycle] = base[placedCount];
                  placedCount++;
                } 
              }
              m++;
            }
            
            // keep track of the type of split 
            let newIcons = [...icons];
            if (canPlace === true && !newIcons.includes(baseIcon)){
              newIcons.push(baseIcon);
            }

            let toPlace = scheduleCopy.filter(entry => entry === "lift").length;

            // if there is space for another base, recall method 
            if (toPlace >= 3 && placedCount > 0){
              this.generateSplits(scheduleCopy, newIcons, bias, cycle, frequency);
            } else {
              SplitsClass.placeDays(scheduleCopy, toPlace, newIcons, this, cycle, bias, frequency);
            }
          }) 
        }
      }
    }
  }

  static rotate(split, dir, cycle) {
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
    for (let i = 0; i < cycle; i++) {
      if (split[i] !== "rest") {
        const day = newOrder.shift();
        if (!SplitsClass.checkDayPlacement(newSplit, day, i, cycle)) {
          valid = false;
        }
        newSplit[i] = day;
      }
    }
  
    return [valid, newSplit];
  }

  static getSimilarity(a, b){

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

  static kMeansCluster(splits, k){
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
          let tryCenter = splits[index];

          while (centers.some(center => center.every(entry => tryCenter === entry))){
            index = Math.floor(Math.random() * splits.length);
            tryCenter = splits[index];
          }

          centers.push(tryCenter);
        }   

        splits.forEach(split => {
          const similarities = [];
          centers.forEach(center => {
            similarities.push(SplitsClass.getSimilarity(split, center));
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

        clusters.forEach((cluster, index) => {
          let centerIndex = cluster.findIndex(element => element === centers[index]);
          if (centerIndex > 0){
            cluster.splice(centerIndex, 1);
          }
          cluster.unshift(centers[index])
        })
        
      }
      list.push({
        similarity: SplitsClass.getCenterSimilarity(centers), 
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
    return best.clusters;
  }

  static getCenterSimilarity(centers){
    let variance = 0;
    for (let i = 0; i < centers.length; i++){
      for (let j = 0; j < centers.length; j++){
        if (i !== j){
          variance += SplitsClass.getSimilarity(centers[i], centers[j]);
        }
      }
    }
    return variance;
  }

}

module.exports = SplitsClass;
