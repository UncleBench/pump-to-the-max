const mongoose = require('mongoose');

let WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    exerciseUnits: [{
        sets: Number,
        reps: Number,
        weight: Number,
        exerciseId: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Exercise'
        }
    }]
});

let Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;