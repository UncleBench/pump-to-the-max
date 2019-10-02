const uuid = require('uuid').v1,
  express = require('express'),
  router = express.Router(),
  url = 'mongodb://localhost:27017/pump-to-the-max',
  mongojs = require('mongojs'),
  db = mongojs(url, ['exercises']);

/* GET All Exercises */
router.get('/', function(req, res) {
  db.exercises.find(function(err, exercises) {
    if (err) {
      res.send(err);
    } else {
      res.json(exercises);
    }
  });
});

/* GET One Hero with the provided ID */
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

/* POST/SAVE a Hero */
router.post('/', function(req, res) {
  var exercise = req.body;
  if (!exercise.name || !exercise.power) {
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

/* PUT/UPDATE a Hero */
router.put('/:id', function(req, res) {
  var exercise = req.body;
  var updObj = {};
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

/* DELETE a Hero */
router.delete('/:id', function(req, res) {
  db.exercises.remove({_id: mongojs.ObjectId(req.params.id)}, '', function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.json(result);
    }
  });
});

// router.get('/', (req, res, next) => {
//   let repository = new ExerciseRepository();

//   repository.getExercises().then(exercises => res.send(exercises))
//                            .catch(err => console.log(err));
// });

// router.post('/', (req, res, next) => {
//   let repository = new ExerciseRepository();
//   repository.createExercise().then(id => {
//                                     res.send({ id: id });
//                                 })
//                              .catch(err => { 
//                                     console.log(err); 
//                                     res.send(500); 
//                               });
// });

// router.get('/:id', (req, res) => {
//   let repository = new ExerciseRepository();
//   repository.getExercise(req.params.bookuid).then(result => res.send(result))
//                                             .catch(res.status(404));
// });

// router.delete('/:id/notes/:noteuid', (req, res) => {
//   let bookuid = req.params.bookuid;
//   let noteuid = req.params.noteuid;

//   let repository = new ExerciseRepository();

//   repository.deleteNote(bookuid, noteuid).then(result => res.sendStatus(200))
//                                          .catch(() => res.sendStatus(500));
// });

// function findExercise(bookuid) {
//   return exercises.find(n => n.id === bookuid);
// }

module.exports = router;