import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../models/workout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutService }  from '../services/workout.service';
import { ExerciseService } from '../services/exercise.service';
import { Exercise } from '../models/exercise';
import { ExerciseUnit } from '../models/exercise-unit';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  
  @Input() workout: Workout;
  
  availableExercises: Exercise[];

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private exerciseService: ExerciseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getWorkout();
    this.getExercises();
  }

  goBack(): void {
    this.location.back();
  }
  
  getWorkout(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.workoutService
      .getWorkout(id)
      .subscribe(workout => this.workout = workout);
  }

  getExercises(): void {
    this.exerciseService
      .getExercises()
      .subscribe(availableExercises => this.availableExercises = availableExercises);
  }

  add(): void {
    this.workout.exerciseUnits
      .push(new ExerciseUnit());
  }

  delete(exerciseUnit: ExerciseUnit): void {
    this.workout.exerciseUnits = this.workout.exerciseUnits
      .filter(h => h !== exerciseUnit);
  }

  save(): void {
    this.workoutService
      .updateWorkout(this.workout)
      .subscribe();
  }
}
