const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const port = process.env.PORT || 3001;

const app = express();
app.use(express.json({limit: '50mb'}));
app.use(cors());

// Import router
const inputRouter = require('./routes/Inputs');
app.use('/inputs', inputRouter);

const usersRouter = require('./routes/Users');
app.use('/new-user', usersRouter);

const loginRouter = require('./routes/Login');
app.use('/login', loginRouter);

const splitRouter = require('./routes/GetSplits');
app.use('/splits', splitRouter);

const partitionRouter = require('./routes/Partition');
app.use('/partition', partitionRouter);

const setRoutineRouter = require('./routes/SetRoutine');
app.use('/set-routine', setRoutineRouter);

const logRouter = require('./routes/LogSet');
app.use('/log-set', logRouter);

const getLastRouter = require('./routes/GetLast');
app.use('/get-last', getLastRouter);

const featuresRouter = require('./routes/SubmitFeatures');
app.use('/submit-features', featuresRouter);

const staticRouter = require('./routes/Static');
app.use('/static', staticRouter);

mongoose.connect('mongodb+srv://benwalls2004:Bg053104!@cluster0.rlvzg1f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});