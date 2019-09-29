import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Exercise } from './exercise';
import { ExerciseUnit } from './exercise-unit'
import { Workout } from './workout';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const exercises = [
      { id: 11, name: 'Bench press' },
      { id: 12, name: 'Squat' },
      { id: 13, name: 'Deadlift' },
      { id: 14, name: 'Dip' },
      { id: 15, name: 'Leg press' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Bicep curl' },
      { id: 18, name: 'Leg extension' },
      { id: 19, name: 'Leg curl' },
      { id: 20, name: 'Chest fly' },
      { id: 21, name: 'Dumbbell bench press' },
      { id: 22, name: 'Pull down' },
      { id: 23, name: 'Pull up' },
      { id: 24, name: 'Bent-over row' },
      { id: 25, name: 'Military press' },
      { id: 26, name: 'Shoulder press' },
      { id: 27, name: 'Lateral raise' },
      { id: 28, name: 'Tricep extension' },
    ] as Exercise[];

    const workouts = [
      { id: 11, name: 'Leg day', exerciseUnits: [ 
        { exercise: exercises[12], sets: 5, reps: 5, weight: 80 },
        { exercise: exercises[15], sets: 4, reps: 8, weight: 60 },
        { exercise: exercises[18], sets: 3, reps: 12, weight: 35 },
        { exercise: exercises[19], sets: 3, reps: 12, weight: 35 },
      ]},
      { id: 12, name: 'Push day', exerciseUnits: [
        { exercise: exercises[11], sets: 5, reps: 5, weight: 65 },
        { exercise: exercises[25], sets: 3, reps: 10, weight: 40 },
        { exercise: exercises[14], sets: 3, reps: 6, weight: 0 },
        { exercise: exercises[28], sets: 3, reps: 15, weight: 35 },        
        { exercise: exercises[21], sets: 3, reps: 5, weight: 50 },
      ]},
      { id: 13, name: 'Pull day', exerciseUnits: [
        { exercise: exercises[22], sets: 3, reps: 12, weight: 35 },
        { exercise: exercises[24], sets: 4, reps: 10, weight: 40 },
        { exercise: exercises[23], sets: 3, reps: 8, weight: 0 },
      ]},
      { id: 14, name: 'Rest day', exerciseUnits: []},
    ] as Workout[];

    return { exercises, workouts };
  }

  // Overrides the genId method to ensure that an entity always has an id.
  // If one of the returned arrays is empty,
  // the method below returns the initial number (11).
  // if the array is not empty, the method below returns the highest
  // entity's id + 1.
  genId(entities: any[]): number {
    return entities.length > 0 ? Math.max(...entities.map(entity => entity.id)) + 1 : 11;
  }
}