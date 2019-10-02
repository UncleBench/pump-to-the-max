import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExercisesComponent } from './exercises/exercises.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { ExerciseDetailComponent }  from './exercise-detail/exercise-detail.component';
import { ContactComponent } from './contact/contact.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'exercises/:id', component: ExerciseDetailComponent },
  { path: 'workouts/:id', component: WorkoutDetailComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'workouts', component: WorkoutsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
