const splitsClass = require('../src/splitsClass');

// CHECK DAY PLACEMENT

/*
test('FAIL: back to back large muscle group', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "lift", "lift", "lift", "lift"], "legs", 3)).toBe(false);
})

test('FAIL: back to back small muscle group', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "biceps triceps", 6)).toBe(false);
})

test('FAIL: one gap large muscle group', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "legs", 4)).toBe(false);
})

test('FAIL: secondary placed before primary', () => {
  expect(splitsClass.checkDayPlacement(["chest", "back biceps", "legs", "rest", "lift", "lift", "lift"], "shoulders triceps", 6)).toBe(false);
})

test('FAIL: primary placed after primary', () => {
  expect(splitsClass.checkDayPlacement(["lift", "back biceps", "legs", "rest", "lift", "lift", "shoulders triceps"], "chest", 1)).toBe(false);
})

test('FAIL: place on rest day', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "chest shoulders trieps", 3)).toBe(false);
})

test('FAIL: place on filled day', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "chest shoulders trieps", 0)).toBe(false);
})

test('FAIL: one gap wrap around', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "chest shoulders trieps", 5)).toBe(false);
})

test('PASS: base case', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "rest", "lift", "lift", "lift"], "chest shoulders trieps", 4)).toBe(true);
})

test('PASS: one gap secondary groups', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "lift", "lift", "lift", "lift"], "triceps biceps", 3)).toBe(true);
})

test('PASS: secondary worked after primary', () => {
  expect(splitsClass.checkDayPlacement(["chest shoulders triceps", "back biceps", "legs", "chest", "lift", "lift", "lift"], "shoulders triceps", 4)).toBe(true);
})

*/

// IS VALID SCHEDULE 

/*
test('FAIL: 5 freq, 1 leg day on no bias', () => {
  expect(splitsClass.isValidSchedule(["legs", "chest shoulders triceps", "back biceps", "chest shoulders triceps", "back biceps", "shoulders", "rest"], [.5, .5, .5, .5, .5, .5])).toBe(false);
})

test('FAIL: not enough small muscle freq', () => {
  expect(splitsClass.isValidSchedule(["chest shoulders triceps", "back biceps", "legs", "chest", "back", "legs", "rest"], [.5, .5, .5, .5, 1, .5])).toBe(false);
})

test('PASS: one per week small muscle no bias', () => {
  expect(splitsClass.isValidSchedule(["chest shoulders triceps", "back biceps", "legs", "chest", "back", "legs", "rest"], [.5, .5, .5, .5, .5, .5])).toBe(false);
})
*/

// GET TITLE 

// PLACE DAYS 

// GENERATE SCHEDULES 

// ROTATE 

/*

test('FAIL: rotated into low rest right', () => {
  expect(splitsClass.rotate(["chest shoulders triceps", "back biceps", "legs", "chest", "rest", "rest", "rest"], 1)).toStrictEqual([false, ["chest", "chest shoulders triceps", "back biceps", "legs", "rest", "rest", "rest"]]);
})

test('FAIL: rotated into low rest left', () => {
  expect(splitsClass.rotate(["chest shoulders triceps", "back biceps", "legs", "chest", "rest", "rest", "rest"], -1)).toStrictEqual([false, ["back biceps", "legs", "chest", "chest shoulders triceps", "rest", "rest", "rest"]]);
})

*/

// K MEANS CLUSTER 

/* 
test('INSPECT: k means cluster', () => {
  const response = splitsClass.kMeansCluster([
    ["chest shoulders triceps", "legs", "back biceps", "chest"], 
    ["chest shoulders triceps", "back biceps", "legs", "back"],
    ["chest back", "shoulders biceps triceps", "legs", "chest"], 
    ["chest back", "legs shoulders", "shoulders biceps triceps", "back"], 
    ["chest", "back", "shoulders biceps triceps", "legs"], ], 3);

  response.forEach(cluster => {
    console.log("///// NEW CLUSTER //////")
    console.log(cluster)
  })
})
*/
