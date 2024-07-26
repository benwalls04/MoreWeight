const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the set schema
const SetSchema = new Schema({
  weight: { type: Number, required: true },
  reps: { type: Number, required: true },
  RPE: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }, 
})

const RecentSchema = new Schema({
  title: { type: String, required: true },
  imageId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'fs.files' }, 
});

// Define the User schema with an object of routines
const LogSchema = new Schema({
  username: { type: String, required: true },
  movements: { type: Map, of: [SetSchema], required: true }, 
  recents: {
    type: [RecentSchema],
    required: true
  }
});

// Create the model
const Log = mongoose.model('Log', LogSchema);

module.exports = Log;