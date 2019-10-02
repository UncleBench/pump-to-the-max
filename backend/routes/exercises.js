  
const uuid = require('uuid').v1;

let express = require('express');
let router = express.Router();
let ExerciseRepository = require('./exercise.repository.js');

let exercises = [];

router.get('/', (req, res, next) => {
  let repository = new ExerciseRepository();

  repository.getExercises().then(exercises => res.send(exercises))
                           .catch(err => console.log(err));
});

router.post('/', (req, res, next) => {
  let repository = new ExerciseRepository();
  repository.createExercise().then(id => {
                                    res.send({ id: id });
                                })
                             .catch(err => { 
                                    console.log(err); 
                                    res.send(500); 
                              });
});

router.get('/:id', (req, res) => {
  let repository = new ExerciseRepository();
  repository.getExercise(req.params.bookuid).then(result => res.send(result))
                                            .catch(res.status(404));
});

router.delete('/:id/notes/:noteuid', (req, res) => {
  let bookuid = req.params.bookuid;
  let noteuid = req.params.noteuid;

  let repository = new ExerciseRepository();

  repository.deleteNote(bookuid, noteuid).then(result => res.sendStatus(200))
                                         .catch(() => res.sendStatus(500));
});

function findExercise(bookuid) {
  return exercises.find(n => n.id === bookuid);
}

module.exports = router;