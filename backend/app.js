const express = require('express'),
    path = require('path'),
    bodyParser = require("body-parser"),
    cors = require('cors'),
    exerciseRouter = require('./routes/exercises'),
    workoutRouter = require('./routes/workouts');
    indexRouter = require('./routes/index'),
    url = 'mongodb://localhost:27017/pump-to-the-max',
    mongoose = require("mongoose"),
    app = express();;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(url);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/exercises', exerciseRouter);
app.use('/workouts', workoutRouter);

let port = process.env.PORT || 4000;
let server = app.listen(port, function() {
  console.log('Listening on port ' + port);
});