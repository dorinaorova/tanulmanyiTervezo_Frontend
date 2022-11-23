import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppService } from './services/app.service';
import { NewuserComponent } from './components/newuser/newuser.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserupdateComponent } from './components/userupdate/userupdate.component';
import { SubjectlistComponent } from './components/subjectlist/subjectlist.component';
import { SubjectUpdateComponent } from './components/subject-update/subject-update.component';
import { SubjectDetailsComponent } from './components/subject-details/subject-details.component';
import { TimetableComponent } from './components/timetable/timetable.component';
import { SemesterDetailsComponent } from './components/semester-details/semester-details.component';
import { NewsemesterComponent } from './components/newsemester/newsemester.component';
import { HolidayupdateComponent } from './components/holidayupdate/holidayupdate.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { TaskUpdateComponent } from './components/task-update/task-update.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { authInterceptorProviders } from './auth-helpers/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NewuserComponent,
    UserProfileComponent,
    UserupdateComponent,
    SubjectlistComponent,
    SubjectUpdateComponent,
    SubjectDetailsComponent,
    TimetableComponent,
    SemesterDetailsComponent,
    NewsemesterComponent,
    HolidayupdateComponent,
    TasklistComponent,
    TaskUpdateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
