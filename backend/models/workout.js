const mongoose = require('mongoose');


let WorkoutSchema = new mongoose.Schema({
    name: {
        type: String
    },
    exerciseUnits: [{
        sets: Number,
        reps: Number,
        weight: Number,
        exerciseId: String
    }]
});

let Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;