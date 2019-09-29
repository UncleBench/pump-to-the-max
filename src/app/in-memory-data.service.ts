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
    ];

    const workouts = [
      { id: 11, name: 'Leg day', exerciseUnits: [ 
        { exerciseId: 12, sets: 5, reps: 5, weight: 80 },
        { exerciseId: 15, sets: 4, reps: 8, weight: 60 },
        { exerciseId: 18, sets: 3, reps: 12, weight: 35 },
        { exerciseId: 19, sets: 3, reps: 12, weight: 35 },
      ]},
      { id: 12, name: 'Push day', exerciseUnits: [
        { exerciseId: 11, sets: 5, reps: 5, weight: 65 },
        { exerciseId: 25, sets: 3, reps: 10, weight: 40 },
        { exerciseId: 14, sets: 3, reps: 6, weight: 0 },
        { exerciseId: 28, sets: 3, reps: 15, weight: 35 },        
        { exerciseId: 21, sets: 3, reps: 5, weight: 50 },
      ]},
      { id: 13, name: 'Pull day', exerciseUnits: [
        { exerciseId: 22, sets: 3, reps: 12, weight: 35 },
        { exerciseId: 24, sets: 4, reps: 10, weight: 40 },
        { exerciseId: 23, sets: 3, reps: 8, weight: 0 },
      ]},
      { id: 14, name: 'Rest day', exerciseUnits: []},
    ];

    return { exercises, workouts };
  }

  // Overrides the genId method to ensure that an exercise always has an id.
  // If the exercises array is empty,
  // the method below returns the initial number (11).
  // if the exercises array is not empty, the method below returns the highest
  // exercise id + 1.
  genId(exercises: Exercise[]): number {
    return exercises.length > 0 ? Math.max(...exercises.map(exercise => exercise.id)) + 1 : 11;
  }
}