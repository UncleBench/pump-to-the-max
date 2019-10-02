import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '../models/exercise';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExerciseService }  from '../services/exercise.service';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.component.html',
  styleUrls: ['./exercise-detail.component.scss']
})
export class ExerciseDetailComponent implements OnInit {
  
  @Input() exercise: Exercise;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExerciseService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getExercise();
  }

  goBack(): void {
    this.location.back();
  }
  
  getExercise(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.exerciseService
      .getExercise(id)
      .subscribe(exercise => this.exercise = exercise);
  }

  save(): void {
    this.exerciseService.updateExercise(this.exercise)
      .subscribe(() => this.goBack());
  }
}
