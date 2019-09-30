import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service';
import { Workout } from '../workout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  workouts: Workout[] = [];
  showAll: boolean;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
    this.showAll = false;
    this.getWorkouts();
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
    this.getWorkouts();
  }

  getWorkouts(): void {
    if (this.showAll) {
      this.workoutService
        .getWorkouts()
        .subscribe(workouts => this.workouts = workouts);
    }
    else {
      this.workoutService
        .getWorkouts()
        .subscribe(workouts => this.workouts = workouts.slice(1, 5));
    }
  }
}
