import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';

@Component({
  selector: 'app-exercise-search',
  templateUrl: './exercise-search.component.html',
  styleUrls: [ './exercise-search.component.scss' ]
})

export class ExerciseSearchComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  private searchTerms = new Subject<string>();

  constructor(private exerciseService: ExerciseService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.exercises$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.exerciseService.searchExercises(term)),
    );
  }
}