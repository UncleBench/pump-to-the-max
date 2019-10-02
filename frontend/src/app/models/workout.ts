import { ExerciseUnit } from './exercise-unit';

export class Workout {
    _id: string;
    name: string;
    exerciseUnits: ExerciseUnit[] = [];
    constructor(init: Workout) {
        Object.assign(this, init);
    }
}