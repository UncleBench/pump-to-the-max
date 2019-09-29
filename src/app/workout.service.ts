import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Workout } from './workout';


@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  public workoutsUrl = 'api/workouts';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new workoutUnit to the server */
  addWorkout (workout: Workout): Observable<Workout> {
    return this.http.post<Workout>(this.workoutsUrl, workout, this.httpOptions).pipe(
      tap((newWorkout: Workout) => this.log(`added workout w/ id=${newWorkout.id}`)),
      catchError(this.handleError<Workout>('addWorkout'))
    );
  }

  /** DELETE: delete the workout from the server */
  deleteWorkout (workout: Workout | number): Observable<Workout> {
    const id = typeof workout === 'number' ? workout : workout.id;
    const url = `${this.workoutsUrl}/${id}`;

    return this.http.delete<Workout>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted workout id=${id}`)),
      catchError(this.handleError<Workout>('deleteWorkout'))
    );
  }

  /** GET workouts from the server */
  getWorkouts(): Observable<Workout[]> {
    this.messageService.add('WorkoutService: fetching workouts...');
    return this.http.get<Workout[]>(this.workoutsUrl)
      .pipe(
        tap(_ => this.log('fetched workouts')),
        catchError(this.handleError<Workout[]>('getWorkouts', []))
      );
  }

  /** GET workout by id. Will 404 if id not found */
  getWorkout(id: number): Observable<Workout> {
    const url = `${this.workoutsUrl}/${id}`;
    return this.http.get<Workout>(url).pipe(
      tap(_ => this.log(`fetched workout id=${id}`)),
      catchError(this.handleError<Workout>(`getWorkout id=${id}`))
    );
  }
  
  /** PUT: update the workout on the server */
  updateWorkout (workout: Workout): Observable<any> {
    return this.http.put(this.workoutsUrl, workout, this.httpOptions).pipe(
      tap(_ => this.log(`updated workout id=${workout.id}`)),
      catchError(this.handleError<Workout>(`updateWorkout id=${workout.id}`))
    );
  }

  /* GET workouts whose name contains search term */
  searchWorkouts(term: string): Observable<Workout[]> {
    if (!term.trim()) {
      // if not search term, return empty workout array.
      return of([]);
    }
    return this.http.get<Workout[]>(`${this.workoutsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found workouts matching "${term}"`)),
      catchError(this.handleError<Workout[]>('searchWorkouts', []))
    );
  }

  /** Log a WorkoutService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`WorkoutService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation, result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(
    private http:HttpClient,
    private messageService: MessageService) { }
}
