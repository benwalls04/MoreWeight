const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the set schema
const Set = new Schema({
  variant: { type: String, required: true },
  RPE: { type: Number, required: true },
  rest: { type: Number, required: true },
  liftType: { type: Number, required: true },
})

// Define the day schema 
const Day = new Schema({
  title: { type: String, required: true },
  movements: { type: [String], required: true },
  allSets: [Set],
})

// Define the Routine schema
const Routine = new Schema({
  title: { type: String, required: true },
  days: { type: [Day], required: true}, 
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