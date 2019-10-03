import { ExerciseUnit } from './exercise-unit';

export class Workout {
    _id: string;
    name: string;
    exerciseUnits: Array<ExerciseUnit> = new Array<ExerciseUnit>();
    constructor(name: string) {
        this.name = name;
        this.exerciseUnits = new Array<ExerciseUnit>();
    }
}