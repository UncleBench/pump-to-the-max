import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { WorkoutService } from './workout.service';
import { TestBed } from '@angular/core/testing';
import { MessageService } from './message.service';
import { Workout } from '../models/workout';

const mockData = [
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' }
] as Workout[];

describe('WorkoutService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let workoutService: WorkoutService;
  let mockWorkouts: Workout[];
  let mockWorkout: Workout;
  let mockId: number;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule
        ],
        providers: [
          WorkoutService,
          MessageService
        ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    httpClient = TestBed.get(HttpClient);

    mockWorkouts = [...mockData];
    mockWorkout = mockWorkouts[0];
    mockId = mockWorkout.id;
    workoutService = TestBed.get(WorkoutService);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  
  it('should be created', () => {
    expect(workoutService).toBeTruthy();
  });

  describe('#getWorkouts', () => {
    it('should return mock workouts (called once)', () => {
      let handleErrorSpy = spyOn<any>(workoutService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(workoutService, 'log').and.callThrough();
      
      workoutService.getWorkouts().subscribe(
        actualWorkouts => expect(actualWorkouts).toEqual(mockWorkouts, 'should return expected workouts'),
        fail
      );

      // WorkoutService should have made one request to GET workouts from expected URL
      const req = httpTestingController.expectOne(workoutService.workoutsUrl);
      expect(req.request.method).toEqual('GET');

      // Respond with the mock workouts
      req.flush(mockWorkouts);

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getWorkouts', []);
    });

    it('should be OK returning no workouts', () => {
      let handleErrorSpy = spyOn<any>(workoutService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(workoutService, 'log').and.callThrough();

      workoutService.getWorkouts().subscribe(
        actualWorkouts => expect(actualWorkouts.length).toEqual(0, 'should have empty workouts array'),
        fail
      );

      const req = httpTestingController.expectOne(workoutService.workoutsUrl);
      req.flush([]); // Respond with no workouts

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getWorkouts', []);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 into an empty workouts result', () => {
      let handleErrorSpy = spyOn<any>(workoutService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(workoutService, 'log').and.callThrough();

      workoutService.getWorkouts().subscribe(
        actualWorkouts => expect(actualWorkouts.length).toEqual(0, 'should return empty workouts array'),
        fail
      );

      const req = httpTestingController.expectOne(workoutService.workoutsUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getWorkouts', []);
    });

    it('should return expected workouts (called multiple times)', () => {
      workoutService.getWorkouts().subscribe();
      workoutService.getWorkouts().subscribe();
      workoutService.getWorkouts().subscribe(
        actualWorkouts => expect(actualWorkouts).toEqual(mockWorkouts, 'should return expected workouts'),
        fail
      );

      const requests = httpTestingController.match(workoutService.workoutsUrl);
      expect(requests.length).toEqual(3, 'calls to getWorkouts()');

      // Respond to each request with different mock workout results
      requests[0].flush([]);
      requests[1].flush([{id: 1, name: 'bob'}]);
      requests[2].flush(mockWorkouts);
    });
  });

  describe('#getWorkout', () => {
    it('should return a single mock workout', () => {
      let handleErrorSpy = spyOn<any>(workoutService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(workoutService, 'log').and.callThrough();

      workoutService.getWorkout(mockWorkout.id).subscribe(
        response => expect(response).toEqual(mockWorkout),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${workoutService.workoutsUrl}/${mockWorkout.id}`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock workouts
      req.flush(mockWorkout);
      
      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith(`getWorkout id=${mockWorkout.id}`);
    });

    it('should fail gracefully on error', () => {
      let handleErrorSpy = spyOn<any>(workoutService, 'handleError').and.callThrough();
      let logSpy = spyOn<any>(workoutService, 'log').and.callThrough();

      workoutService.getWorkout(666).subscribe(
        response => expect(response).toBeUndefined(),
        fail
      );
      // Receive GET request
      const req = httpTestingController.expectOne(`${workoutService.workoutsUrl}/666`);
      expect(req.request.method).toEqual('GET');
      // Respond with the mock workouts
      req.flush('Invalid request parameters', { status: 404, statusText: 'Bad Request' });

      expect(handleErrorSpy).toHaveBeenCalledTimes(1);
      expect(logSpy).toHaveBeenCalledTimes(1);
      expect(handleErrorSpy).toHaveBeenCalledWith('getWorkout id=666');
    });
  });
});
