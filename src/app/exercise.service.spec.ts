import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ExerciseService } from './exercise.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { Exercise } from './exercise';

describe('ExerciseService', () => {
  let httpClient: HttpClient;
  let messageService: MessageService;
  let httpTestingController: HttpTestingController;
  let exerciseService: ExerciseService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          ExerciseService,
          MessageService
        ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);
    exerciseService = TestBed.get(ExerciseService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  
  it('should be created', () => {
    expect(exerciseService).toBeTruthy();
  });

  describe('#getExercises', () => {
    let expectedExercises: Exercise[];

    beforeEach(() => {
      exerciseService = TestBed.get(ExerciseService);
      expectedExercises = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
       ] as Exercise[];
    });

    it('should return expected exercises (called once)', () => {
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises).toEqual(expectedExercises, 'should return expected exercises'),
        fail
      );

      // ExerciseService should have made one request to GET exercises from expected URL
      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock exercises
      req.flush(expectedExercises);
    });

    it('should be OK returning no exercises', () => {
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises.length).toEqual(0, 'should have empty exercises array'),
        fail
      );

      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);
      req.flush([]); // Respond with no exercises
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty exercises result', () => {
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises.length).toEqual(0, 'should return empty exercises array'),
        fail
      );

      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected exercises (called multiple times)', () => {
      exerciseService.getExercises().subscribe();
      exerciseService.getExercises().subscribe();
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises).toEqual(expectedExercises, 'should return expected exercises'),
        fail
      );

      const requests = httpTestingController.match(exerciseService.exercisesUrl);
      expect(requests.length).toEqual(3, 'calls to getExercises()');

      // Respond to each request with different mock exercise results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(expectedExercises);
    });
  });

  // it('should get a exercise', () => {
    
  // })

  // it('add a exercise', () => {
    
  // })
});
