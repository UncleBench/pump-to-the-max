const uuid = require('uuid').v1,
    express = require('express'),
    router = express.Router(),
    url = 'mongodb://localhost:27017/pump-to-the-max',
    mongojs = require('mongojs'),
    db = mongojs(url, ['workouts']);

/* GET all */
router.get('/', function(req, res) {
    db.workouts.find(function(err, workouts) {
        if (err) {
            res.send(err);
        } else {
            res.json(workouts);
        }
    });
});

/* GET by id */
router.get('/:id', function(req, res, next) {
    db.workouts.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function(err, workouts) {
        if (err) {
            res.send(err);
        } else {
            res.json(workouts);
        }
    });
});

/* POST/SAVE */
router.post('/', function(req, res) {
    let workout = req.body;
    if (!workout.name || 
            workout.exerciseUnits.length == 0 ||
            !workout.sets ||
            !workout.reps ||
            !workout.weight) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.workouts.save(workout, function(err, result) {
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
    let workout = req.body;
    let updObj = {};
    if (workout.name) {
        updObj.name = workout.name;
    }
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.workouts.update({
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
    db.workouts.remove({_id: mongojs.ObjectId(req.params.id)}, '', function(err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;