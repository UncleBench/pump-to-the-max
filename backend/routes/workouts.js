const express = require('express'),
  workoutRouter = express.Router(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Workout = require('../models/workout.js');


workoutRouter.use(bodyParser.json());

/* GET */
workoutRouter.get('/', async (request, response) => {
  try {
    let result = await Workout.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* GET by id */
workoutRouter.get('/:id', function(request, response) {
  Workout.findById(request.params.id, function(error, Workout) {
    if (error) {
      return fails(response, error);
    } else {
      response.status(200).json(Workout);
    }
  });
});

/* POST */
workoutRouter.post('/', async (request, response) => {
  try {
    let workout = new Workout(request.body);
    let result = await workout.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* PUT */
workoutRouter.put("/:id", async (request, response) => {
  try {
    let workout = await Workout.findById(request.params.id).exec();
    workout.set(request.body);
    let result = await workout.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* DELETE by id */
workoutRouter.delete("/:id", async (request, response) => {
  try {
    let result = await Workout.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = workoutRouter;