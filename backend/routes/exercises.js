const express = require('express'),
  router = express.Router(),
  url = 'mongodb://localhost:27017/pump-to-the-max',
  mongojs = require('mongojs'),
  db = mongojs(url, ['exercises']);

/* GET all */
router.get('/', function(req, res) {
  db.exercises.find(function(err, exercises) {
    if (err) {
      res.send(err);
    } else {
      res.json(exercises);
    }
  });
});

/* GET by id */
router.get('/:id', function(req, res, next) {
  db.exercises.findOne({
    _id: mongojs.ObjectId(req.params.id)
  }, function(err, exercises) {
    if (err) {
      res.send(err);
    } else {
      res.json(exercises);
    }
  });
});

/* POST/SAVE */
router.post('/', function(req, res) {
  let exercise = req.body;
  if (!exercise.name) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.exercises.save(exercise, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    })
  }
});

/* PUT/UPDATE */
router.put('/:id', function(req, res) {
  let exercise = req.body;
  let updObj = {};
  if (exercise.name) {
    updObj.name = exercise.name;
  }
  if (!updObj) {
    res.status(400);
    res.json({
      "error": "Invalid Data"
    });
  } else {
    db.exercises.update({
      _id: mongojs.ObjectId(req.params.id)
    }, updObj, {}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.json(result);
      }
    });
  }
});

/* DELETE by id */
router.delete('/:id', function(req, res) {
  db.exercises.remove({_id: mongojs.ObjectId(req.params.id)}, '', function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

module.exports = router;