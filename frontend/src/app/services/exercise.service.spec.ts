import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ExerciseService } from './exercise.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { Exercise } from '../models/exercise';

const mockData = [
  { _id: '123qweasd1', name: 'A' },
  { _id: '123qweasd2', name: 'B' },
  { _id: '123qweasd3', name: 'C' }
] as Exercise[];

describe('ExerciseService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let exerciseService: ExerciseService;
  let mockExercises: Exercise[];
  let mockExercise: Exercise;
  let mockId: string;
  
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

    mockExercises = [...mockData];
    mockExercise = mockExercises[0];
    mockId = mockExercise._id;
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
    it('should return mock exercises (called once)', () => {
      let handleErrorSpy = spyOn<any>(exerciseService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(exerciseService, 'log').and.callThrough();
      
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises).toEqual(mockExercises, 'should return expected exercises'),
        fail
      );

      // ExerciseService should have made one request to GET exercises from expected URL
      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock exercises
      req.flush(mockExercises);

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getExercises', []);
    });

    it('should be OK returning no exercises', () => {
      let handleErrorSpy = spyOn<any>(exerciseService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(exerciseService, 'log').and.callThrough();

      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises.length).toEqual(0, 'should have empty exercises array'),
        fail
      );

      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);
      req.flush([]); // Respond with no exercises

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getExercises', []);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty exercises result', () => {
      let handleErrorSpy = spyOn<any>(exerciseService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(exerciseService, 'log').and.callThrough();

      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises.length).toEqual(0, 'should return empty exercises array'),
        fail
      );

      const req = httpTestingController.expectOne(exerciseService.exercisesUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getExercises', []);
    });

    it('should return expected exercises (called multiple times)', () => {
      exerciseService.getExercises().subscribe();
      exerciseService.getExercises().subscribe();
      exerciseService.getExercises().subscribe(
        actualExercises => expect(actualExercises).toEqual(mockExercises, 'should return expected exercises'),
        fail
      );

      const requests = httpTestingController.match(exerciseService.exercisesUrl);
      expect(requests.length).toEqual(3, 'calls to getExercises()');

      // Respond to each request with different mock exercise results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(mockExercises);
    });
  });

  describe('#getExercise', () => {
    it('should return a single mock exercise', () => {
      let handleErrorSpy = spyOn<any>(exerciseService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(exerciseService, 'log').and.callThrough();

      exerciseService.getExercise(mockExercise._id).subscribe(
        response => expect(response).toEqual(mockExercise),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${exerciseService.exercisesUrl}/${mockExercise._id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock exercises
      req.flush(mockExercise);
      
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith(`getExercise id=${mockExercise._id}`);
    });

    it('should fail gracefully on error', () => {
      let handleErrorSpy = spyOn<any>(exerciseService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(exerciseService, 'log').and.callThrough();

      exerciseService.getExercise('666').subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${exerciseService.exercisesUrl}/666`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock exercises
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getExercise id=666');
    });
  });
});
