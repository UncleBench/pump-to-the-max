import { Exercise } from './exercise';
import { isUndefined } from 'util';
import * as uuid from 'uuid';

export class ExerciseUnit {
    _exerciseId: string;
    sets: number;
    reps: number;
    weight: number;
    constructor() {
        if (isUndefined(this._exerciseId)) {
            this._exerciseId = uuid.v4();
        }
    }
}