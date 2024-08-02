const mongoose = require('mongoose');
const { accesoryGroups } = require('../src/staticData');
const Schema = mongoose.Schema;

// Define the set schema
const Set = new Schema({
  movement: { type: String, required: true },
  RPE: { type: Number, required: true },
  rest: { type: Number, required: true },
  num: { type: Number, required: true}, 
  lowerRep: { type: Number, required: true },
  upperRep: { type: Number, required: true },
})

const Movement = new Schema({
  movement: { type: String, required: true },
  bias: { type: String, required: false },
  lowerRep: { type: Number, required: true },
  upperRep: { type: Number, required: true },
  stimulus: { type: Number, required: false},
})

// Define the day schema 
const Day = new Schema({
  title: { type: String, required: true },
  movements: { type: [Movement], required: true },
  sets: [Set],
  accessories: { type: [String], required: false },
})

// Define the Routine schema
const Routine = new Schema({
  title: { type: String, required: true },
  routine: { type: [Day], required: true}, 
});

// Define the User schema with an object of routines
const UserSchema = new Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  routine: Routine, 
});

// Create the model
const User = mongoose.model('UserInfo', UserSchema);

module.exports = User;