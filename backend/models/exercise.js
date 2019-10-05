const mongoose = require('mongoose');


let ExerciseSchema = new mongoose.Schema({
    name: {
        type: String
    }
});

let Exercise = mongoose.model("Exercise", ExerciseSchema);
module.exports = Exercise;