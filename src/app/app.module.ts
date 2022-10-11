import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AppService } from './services/app.service';
import { NewuserComponent } from './newuser/newuser.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { SubjectlistComponent } from './subjectlist/subjectlist.component';
import { SubjectUpdateComponent } from './subject-update/subject-update.component';
import { SubjectDetailsComponent } from './subject-details/subject-details.component';
import { TimetableComponent } from './timetable/timetable.component';

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
    TimetableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
