const staticData = require('./staticData');
const splitsClass = require('./splitsClass');

function getSplits( inputData ){
  let splits = new splitsClass();

  const schedule = inputData.schedule;
  const bias = inputData.bias;

  splits.generateSplits(schedule, [], bias, 7, 7 - schedule.filter(day => day === "lift").length);

  splits.selection = [];
  
  // Define your objects
  const aObj = {
    a: [{a1: splits.a[1]}, {a2: splits.a[2]}, {a3: splits.a[3]}]
  };
  const pObj = {
    p: [{p1: splits.p[1]}, {p2: splits.p[2]}, {p3: splits.p[3]}]
  };
  const bObj = {
    b: [{b1: splits.b[1]}, {b2: splits.b[2]}, {b3: splits.b[3]}]
  };
  const uObj = {
    u: [{u1: splits.u[1]}, {u2: splits.u[2]}]
  };
  
  // Filter out empty arrays in each object
  aObj.a.forEach(obj => {{
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }})
  pObj.p.forEach(obj => {{
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }})
  bObj.b.forEach(obj => {{
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }})  
  uObj.u.forEach(obj => {{
    for (const key in obj) {
      if (Array.isArray(obj[key]) && obj[key].length === 0) {
        delete obj[key];
      }
    }
  }}) 

  aObj.a = aObj.a.filter(obj => Object.keys(obj).length > 0);
  pObj.p = pObj.p.filter(obj => Object.keys(obj).length > 0);
  bObj.b = bObj.b.filter(obj => Object.keys(obj).length > 0);
  uObj.u = uObj.u.filter(obj => Object.keys(obj).length > 0);


  // Add non-empty objects to the selection array
  if (pObj.p.length > 0) {
    splits.selection.push(pObj);
  }
  if (aObj.a.length > 0) {
    splits.selection.push(aObj);
  }
  if (bObj.b.length > 0) {
    splits.selection.push(bObj);
  }
  if (uObj.u.length > 0) {
    splits.selection.push(uObj);
  }

  return splits;
}

module.exports = getSplits