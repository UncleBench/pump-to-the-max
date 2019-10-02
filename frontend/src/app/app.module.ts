import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExercisesComponent as ExercisesComponent } from './exercises/exercises.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule }    from '@angular/common/http';
// import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './services/in-memory-data.service';
import { ExerciseSearchComponent } from './exercise-search/exercise-search.component';
import { ContactComponent } from './contact/contact.component';
import { WorkoutsComponent } from './workouts/workouts.component';
import { WorkoutDetailComponent } from './workout-detail/workout-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ExercisesComponent,
    ExerciseDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ExerciseSearchComponent,
    ContactComponent,
    WorkoutsComponent,
    WorkoutDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // // and returns simulated server responses.
    // // Remove it when a real server is ready to receive requests.
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
