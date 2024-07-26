const splitsClass = require('../src/splitsClass');

// CHECK DAY PLACEMENT

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

// IS VALID SCHEDULE 

// GET TITLE 

// PLACE DAYS 

// GENERATE SCHEDULES 

// ROTATE 

test('FAIL: rotated into low rest right', () => {
  expect(splitsClass.rotate(["chest shoulders triceps", "back biceps", "legs", "chest", "rest", "rest", "rest"], 1)).toStrictEqual([false, ["chest", "chest shoulders triceps", "back biceps", "legs", "rest", "rest", "rest"]]);
})

test('FAIL: rotated into low rest left', () => {
  expect(splitsClass.rotate(["chest shoulders triceps", "back biceps", "legs", "chest", "rest", "rest", "rest"], -1)).toStrictEqual([false, ["back biceps", "legs", "chest", "chest shoulders triceps", "rest", "rest", "rest"]]);
})


