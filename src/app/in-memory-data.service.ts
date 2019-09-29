import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Exercise } from './exercise';
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
    return { exercises };
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