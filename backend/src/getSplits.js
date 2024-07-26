const Queue = require('./Queue')
const { erf, sqrt, exp, pi, setMultiplicityDependencies } = require('mathjs');
const liftData = require('./staticData');

function getSplits( inputData ){
  // constants 
  const WEEKDAYS = 7;
  const GROUP_NAMES = ["chest", "back", "legs", "shoulders", "biceps", "triceps"];
  const [REST_TIMES, REP_RANGES, VARIANTS, MOVEMENTS, GROUPS, BASE_SPLITS, TYPE_SEQ, COMPOUND_MULTS, STIM_VARS] = liftData;

  const [frequency, muscleBias, daysToLift, experience, bias, injuries] = getInputs(inputData);

  let liftDays  = getLiftDays();

  let Splits = [];
  let Titles = [];
  let Bases = [];

  generateSplits(daysToLift, [], frequency);
  return sortRoutines();

  function getInputs(inputData){
    let frequency = 0;
    let daysToLift = ["rest", "rest", "rest", "rest","rest", "rest", "rest"]; 
    for (let i = 0; i < inputData.days.length; i++){
      if (inputData.days[i] === 'true'){
        frequency++; 
        daysToLift[i] = "lift";
      }
    }

    let muscleBias = [];
    let empahsisArr = inputData.bias;
    let neglectArr = inputData.injuries;
    for (let i = 0; i < GROUP_NAMES.length; i++){
      if (neglectArr[i] === 'true'){
        muscleBias.push(.25);
      } else if (empahsisArr[i] === 'true'){
        muscleBias.push(.75);
      } else {
        muscleBias.push(.5);
      }
    }

    let experience = inputData.experience !== '5+'? parseInt(inputData.experience) : 5;

    return [frequency, muscleBias, daysToLift, experience];
  }

  // FIXME: consider removing 
  function getLiftDays(){
  const daysUnsorted = [
    "chest shoulders triceps", "back biceps", "legs", "legs shoulders", "chest back", "shoulders biceps triceps", "back shoulders", "shoulders", "chest back shoulders biceps triceps", "chest shoulders", "back", "chest"
  ];

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

  function getMuscleFreq(schedule, group){
  let counter = 0;

  for (let i = 0; i < WEEKDAYS; i++){
    if (schedule[i].includes(group)){
      counter++;
    }
  }

  return counter;
  }

  function generateSplits(schedule, presetIcons){
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
                canPlace = checkDayPlacement(scheduleCopy, base[placedCount], (day + m) % WEEKDAYS, 3)
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

    function placeDays(schedule, toPlace, presetIcon){
      let index = schedule.indexOf("lift"); 
  
      if (toPlace > 0){
        for (let i = 0; i < liftDays.length; i++){
          let scheduleCopy = schedule.slice(0, WEEKDAYS);
    
          // try placing each day
          if (checkDayPlacement(scheduleCopy, liftDays[i], index, 3)){
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
  
    function checkDayPlacement(schedule, checkedDay, index, checkNumber){
      let pass = true;

      // set requirments for rest depending on the check number 
      let bigRest = checkNumber === 1? 3: 2;
      let smallRest = checkNumber === 3? 1: 2;
    
      if (schedule[index] !== "lift"){
        pass = false;
      }
    
      // check if each muscle group violates rest requirments 
      for (let i = 0; pass && i < GROUP_NAMES.length; i++){
        const group = GROUP_NAMES[i];
        const restNeeded = i < 3? bigRest: smallRest;

        if (checkedDay.includes(group)){
            pass = daySpacingCheck(schedule, restNeeded, index, group);           
        }
      }
    
    return pass;
    }
  
    function daySpacingCheck(schedule, restNeeded, index, group){
      let pass = true;
      for (let i = 1; i < WEEKDAYS; i++){
        let checkIndex = (index + i) % WEEKDAYS;
        if (((i <= restNeeded) || (WEEKDAYS - i) <= restNeeded) && schedule[checkIndex].includes(group)) {
          pass = false;
        }
      }
    
    return pass;
    }
   
    function isValidSchedule(schedule){
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

    function getTitle(presetIcon){
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
  }

  function sortRoutines(){
    // get scores 
    const metrics = getMetrics();
    const scores = getScores(metrics);

    // hash table for different types of splits 
    let hashTable = [];
    let hashValues = [];

    for (let i = 0; i < Splits.length; i++){
      const split = Splits[i];
      const title = Titles[i].includes("/")? Titles[i].substring(0, Titles.indexOf("/") - 1) : Titles[i];
      if (hashValues.includes(title)){
        hashTable[hashValues.indexOf(title)].splits.push({
          split: split, 
          base: Bases[i],
          score: scores[i]
        });
      } else {
        hashTable.push({
          title: title,
          splits: [
            {
              split: split,
              base: Bases[i],
              score: scores[i],
            }
          ]
        })
        hashValues.push(title);
      }
    }
    hashTable.forEach((table) => {
      const title = table.title;
      table.sample = 
        title.includes("push pull legs") ? "chest shoulders triceps.back biceps.legs":
        title.includes("arnold split") ? "chest back.shoulders biceps triceps.legs":
        title.includes("body part split") ? "chest.back.legs.shoulders.biceps triceps": 
        "";
    });

    return hashTable;

    function getMetrics(){

      let metrics = [];
      
      for (let i = 0; i < Splits.length; i++){
          let spacing = spacingScore(Splits[i]);
          const frequency = frequencyScore(Splits[i]);
          const dailyGroups = dailyGroupsDev(Splits[i]);
          metrics.push([spacing, frequency, dailyGroups]);
      }
  
    return metrics;
  
    function spacingScore(schedule) {
      let counter = 0;
    
      for (let i = 0; i < GROUP_NAMES.length; i++) {
        let group = GROUP_NAMES[i];
        let minSpacing = i < 3 ? 3 : 2;
    
        for (let j = 0; j < schedule.length; j++) {
          let day = schedule[j];
    
          // Increment counter any time a muscle group occurs within the minimum spacing 
          if (day.includes(group)) {
            for (let k = 1; k <= minSpacing; k++) {
              if (schedule[(j + k) % WEEKDAYS].includes(group) || schedule[(j + WEEKDAYS - k) % WEEKDAYS].includes(group)) {
                counter++;
              }
            }
    
            // Increment counter if the previous day may interfere with the current day
            const prevDay = schedule[(j + WEEKDAYS - 1) % WEEKDAYS];
            if (group === "back" && prevDay.includes("biceps")) {
              counter++;
            }
            if (group === "chest" && (prevDay.includes("shoulders") || prevDay.includes("triceps"))) {
              counter++;
            }
            if (group === "shoulders" && prevDay.includes("chest")) {
              counter++;
            }
            if (group === "triceps" && (prevDay.includes("chest") || prevDay.includes("shoulders"))) {
              counter++;
            }
          }
        }
      }
    
      return counter;
    }

    function frequencyScore(schedule) {
      let score = 0;

      GROUP_NAMES.forEach((group, i) => {
        let freq = getMuscleFreq(schedule, group);
        score += freq * muscleBias[i];
      })

      return score;
    }

    function dailyGroupsDev(schedule){
      let deviation = 0;
      let avgDailyGroups = 0;
      let dailyGroups = [];
      schedule.forEach(day => {
        GROUP_NAMES.forEach(group => {
          if (day.includes(group)){
            avgDailyGroups++;
            dailyGroups.push(group);
          }
        })
      })
      avgDailyGroups /= frequency;

      dailyGroups.forEach(day => {
        if (day.length > 0){
          deviation += Math.pow((day.length - avgDailyGroups), 2);
        }
      })
      deviation /= frequency; 

      return deviation;
    }
    }

    function getScores(metrics){
      let scores = [];
      
      let sums = [0, 0, 0]
      let means = [0, 0, 0]
      let std = [0, 0, 0];

      // mean of metrics 
      for (let i = 0; i < metrics.length; i++){
        for (let j = 0; j < 3; j++){
          sums[j] += metrics[i][j];
        }
      }

      // standard deviation of metrics
      for (let j = 0; j < 3; j++){
        means[j] = sums[j] / metrics.length;
        let stdSum = 0;
        for (let k = 0; k < metrics.length; k++){
            stdSum += Math.pow((means[j] - metrics[k][j]), 2);
        }
        std[j] = Math.sqrt(stdSum / metrics.length);
      }

      // probability of metrics 
      for (let i = 0; i < metrics.length; i++){
        let score = 0;
        for (let j = 0; j < 3; j++){
          let zVal = (metrics[i][j] - means[j])/std[j];
          if (j === 1){
            score += normCDF(zVal);
          } else {
            score += (1 - normCDF(zVal));
          }
        }
        score /= 3;

        scores.push(score);
      }

      return scores;

      function normCDF(x) {
        return (1 + erf(x / Math.sqrt(2))) / 2;
      }
    }
  } 

};

module.exports = getSplits;