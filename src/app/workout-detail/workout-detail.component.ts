import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../workout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutService }  from '../workout.service';
import { NgSelectOption } from '@angular/forms';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';
import { ExerciseUnit } from '../exercise-unit';

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
      .subscribe(availableExercises => this.availableExercises = availableExercises)
  }

  save(): void {
    this.workoutService.updateWorkout(this.workout)
      .subscribe(() => this.goBack());
  }
}
