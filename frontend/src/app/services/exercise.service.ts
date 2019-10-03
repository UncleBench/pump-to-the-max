import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  public exercisesUrl = 'http://localhost:4000/exercises';  // URL to web api
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new exercise to the server */
  addExercise (exercise: Exercise): Observable<Exercise> {
    return this.http.post<Exercise>(this.exercisesUrl, JSON.stringify(exercise), this.httpOptions).pipe(
      tap((newExercise: Exercise) => this.log(`added exercise w/ id=${newExercise._id}`)),
      catchError(this.handleError<Exercise>('addExercise'))
    );
  }

  /** DELETE: delete the exercise from the server */
  deleteExercise (exercise: Exercise): Observable<Exercise> {
    let url = `${this.exercisesUrl}/${exercise._id}`;
    return this.http.delete<Exercise>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted exercise id=${exercise._id}`)),
      catchError(this.handleError<Exercise>('deleteExercise'))
    );
  }

  /** GET exercises from the server */
  getExercises(): Observable<Exercise[]> {
    this.messageService.add('ExerciseService: fetching exercises...');
    return this.http.get<Exercise[]>(this.exercisesUrl)
      .pipe(
        tap(_ => this.log('fetched exercises')),
        catchError(this.handleError<Exercise[]>('getExercises', []))
      );
  }

  /** GET exercise by id. Will 404 if id not found */
  getExercise(id: string): Observable<Exercise> {
    let url = `${this.exercisesUrl}/${id}`;
    return this.http.get<Exercise>(url).pipe(
      tap(_ => this.log(`fetched exercise id=${id}`)),
      catchError(this.handleError<Exercise>(`getExercise id=${id}`))
    );
  }
  
  /** PUT: update the exercise on the server */
  updateExercise (exercise: Exercise): Observable<any> {
    let url = `${this.exercisesUrl}/${exercise._id}`;
    return this.http.put(url, JSON.stringify(exercise), this.httpOptions).pipe(
      tap(_ => this.log(`updated exercise id=${exercise._id}`)),
      catchError(this.handleError<any>('updateExercise'))
    );
  }

  /* GET exercises whose name contains search term */
  searchExercises(term: string): Observable<Exercise[]> {
    if (!term.trim()) {
      // if not search term, return empty exercise array.
      return of([]);
    }
    return this.http.get<Exercise[]>(`${this.exercisesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found exercises matching "${term}"`)),
      catchError(this.handleError<Exercise[]>('searchExercises', []))
    );
  }

  /** Log a ExerciseService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ExerciseService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
  */
  private handleError<T> (operation = 'operation', result?: T) {
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
