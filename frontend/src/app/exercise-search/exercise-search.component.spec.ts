import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExerciseSearchComponent } from './exercise-search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExerciseSearchComponent', () => {
  let component: ExerciseSearchComponent;
  let fixture: ComponentFixture<ExerciseSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ ExerciseSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
