import { ObjectId } from 'bson';

export class ExerciseUnit {
    _exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
    constructor() {
        if (this._exerciseId === undefined) {
            this._exerciseId = new ObjectId() + '';
        }
    }
}