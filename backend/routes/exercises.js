const express = require('express'),
  exerciseRouter = express.Router(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  Exercise = require('../models/exercise.js');


exerciseRouter.use(bodyParser.json());

/* GET */
exerciseRouter.get('/', async (request, response) => {
  try {
    var result = await Exercise.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* GET by id */
exerciseRouter.get('/:id', function(request, response) {
  Exercise.findById(request.params.id, function(err, Exercise) {
    if (err) {
      return fails(response, err);
    } else {
      response.status(200).json(Exercise);
    }
  });
});

/* POST */
exerciseRouter.post('/', async (request, response) => {
  try {
    var exercise = new Exercise(request.body);
    var result = await exercise.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* PUT */
exerciseRouter.put("/:id", async (request, response) => {
  try {
    var exercise = await Exercise.findById(request.params.id).exec();
    exercise.set(request.body);
    var result = await exercise.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

/* DELETE by id */
exerciseRouter.delete("/:id", async (request, response) => {
  try {
    var result = await Exercise.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = exerciseRouter;