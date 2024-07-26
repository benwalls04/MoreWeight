const Queue = require('./Queue')
const { erf, sqrt, exp, pi, setMultiplicityDependencies } = require('mathjs');
const liftData = require('./liftData');
const math = require('mathjs'); 

function partitionSplits( Splits ){
  // constants 
  const WEEKDAYS = 7;
  const GROUP_NAMES = ["chest", "back", "legs", "shoulders", "biceps", "triceps"];
  const [REST_TIMES, REP_RANGES, VARIANTS, MOVEMENTS, GROUPS, BASE_SPLITS, TYPE_SEQ, COMPOUND_MULTS, STIM_VARS] = liftData;

  const baseToText = new Map(Object.entries(
    {
      "": "",
      'b': "chest.back.legs.shoulders.biceps triceps", 
      'a': "chest back.triceps shoulders biceps.legs",
      'p': "chest triceps shoulders.back biceps.legs", 
      'b1': "chest triceps.back.legs.shoulders biceps",
      'b2': "chest.back biceps.shoulders triceps.legs",
      'b3': "chest.back.legs.shoulders biceps triceps", 
      'p1': "chest shoulders triceps.back biceps.legs", 
      'p2': "chest triceps.back biceps.legs shoulders", 
      'p3': "chest triceps.legs.shoulders.back biceps", 
      'a1': "chest back.shoulders biceps triceps.legs", 
      'a2': "chest back.legs shoulders.biceps triceps", 
      'a3': "chest back.biceps triceps.shoulders.legs",
    }
  ))

  const splits = Object.values(Splits);

  let partitioned = [];
  let count = 0;
  splits.forEach(split => {
    if (split.base.length  > 0){
      split.oldBase = [...split.base];
      split.base = decrementBase(split.base);
    }
    if (split.base.length === 0){
      count++;
    }
  })
  let emptyBases = count >= splits.length / 2? true: false;

  if (!emptyBases){
    let hashValues = [];
    let emptyTable = [];

    for (let i = 0; i < Splits.length; i++){
      const split = Splits[i];
      const base = split.base[0];
      if (base.length > 0){
        if (hashValues.includes(base)){
          partitioned[hashValues.indexOf(base)].splits.push({
            split: split.split, 
            oldBase: split.oldBase,
            base: base,
            score: split.score
          });
        } else {
          partitioned.push({
            base: base,
            splits: [
              {
                split: split.split,
                oldBase: split.oldBase,
                base: base,
                score: split.score,
              }
            ]
          })
          hashValues.push(base);
        }
      } else {
        emptyTable.push({
          split: split.split, 
          oldBase: split.oldBase,
          base: base,
          score: split.score
         })
      }
    }

    if (emptyTable.length > 0){
      partitioned.push({
        base: [], 
        splits: emptyTable
      });
    }

  } else {
    let clusters = kMeansCluster(splits.map(entry => [entry.split, entry.base, entry.score, entry.oldBase]), 2);
    clusters.forEach(cluster => {
      partitioned.push({
        base: cluster[0].base,
        splits: cluster
      })
    })
  }

  partitioned.forEach((table) => {
    const sortedSplits = table.splits.sort((a, b) => {
      // Calculate similarity sum for split b
      const bSimilarity = table.splits
        .filter(split => !split.split.every(day => b.split.includes(day))) // Ensure we're not comparing the split to itself
        .reduce((acc, split) => acc + getSimilarity(b.split, split.split), 0);
  
      // Calculate similarity sum for split a
      const aSimilarity = table.splits
        .filter(split => !split.split.every(day => a.split.includes(day))) // Ensure we're not comparing the split to itself
        .reduce((acc, split) => acc + getSimilarity(a.split, split.split), 0);
  
      // Calculate the combined metric for sorting
      return (bSimilarity + .5 * b.score) - (aSimilarity + .5 * a.score);
    });
    
    table.splits = sortedSplits;
    table.base = table.splits[0].base;
    table.sample = getSampleText(table.splits[0].oldBase);
  });

  return partitioned;

  function decrementBase(base){
    let newBase = [];
    if (!isNaN(parseInt(base[0][0]))){
      newBase = base.slice(1, base.length);
    } else {
      newBase = base;
      newBase[0] = newBase[0].slice(1, newBase[0].length);
    }

    return newBase;
  }
  
  function getSimilarity(a, b){

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

  function kMeansCluster(splits, k){
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

  function getSampleText(base){
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

};

module.exports = partitionSplits;