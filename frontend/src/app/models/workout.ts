import { ExerciseUnit } from './exercise-unit';
import { ObjectId } from 'bson';

export class Workout {
    _id: string;
    name: string;
    exerciseUnits: ExerciseUnit[];
    constructor(name: string) {
        if (this._id === undefined) {
            this._id = new ObjectId() + '';
        }
        this.name = name;
        this.exerciseUnits = new Array<ExerciseUnit>();
    }
}