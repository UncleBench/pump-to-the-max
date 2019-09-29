import { Component, OnInit, Input } from '@angular/core';
import { Workout } from '../workout';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WorkoutService }  from '../workout.service';

@Component({
  selector: 'app-workout-detail',
  templateUrl: './workout-detail.component.html',
  styleUrls: ['./workout-detail.component.scss']
})
export class WorkoutDetailComponent implements OnInit {
  
  @Input() workout: Workout;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getWorkout();
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

  save(): void {
    this.workoutService.updateWorkout(this.workout)
      .subscribe(() => this.goBack());
  }
}
